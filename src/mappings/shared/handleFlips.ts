import { EntityManager } from 'typeorm'
import { create, findByRawQuery, findWhere, getOptional } from '@kodadot1/metasquid/entity'
import { FlipperEntity, FlipEvent, CollectionEntity, NFTEntity } from '../../model'
import { CallWith } from '../utils/types'
import { BuyTokenEvent } from '../nfts/types'
import { pending, warn } from '../utils/logger'

const OPERATION = 'BUY => FlipperEventHandler' as any

type HandleFlipParams = {
  event: CallWith<BuyTokenEvent>
  nft: NFTEntity
}

function getFlipperId(address: string, collectionId: string): string {
  return `${address}-${collectionId}`
}

function getFlipEventId(address: string, collectionId: string, blockNumber: string): string {
  return `${blockNumber}-${address}-${collectionId}`
}

async function getOrCreateFlipper(
  store: EntityManager,
  address: string,
  collection: CollectionEntity,
  timestamp: Date
): Promise<FlipperEntity> {
  const id = getFlipperId(address, collection.id)
  let flipper = await getOptional<FlipperEntity>(store, FlipperEntity, id)

  if (!flipper) {
    flipper = create(FlipperEntity, id, {
      address,
      collection,
      owned: 0,
      totalBought: BigInt(0),
      totalSold: BigInt(0),
      bestFlip: BigInt(0),
      timestamp,
    })
    await store.save(flipper)
  }

  return flipper
}

async function handleNewOwner(
  store: EntityManager,
  event: CallWith<BuyTokenEvent>,
  nft: NFTEntity
): Promise<FlipperEntity> {
  const { caller: newOwner, collectionId, timestamp, price, blockNumber } = event
  const flipper = await getOrCreateFlipper(store, newOwner, nft.collection, timestamp)

  const flipEventId = getFlipEventId(newOwner, collectionId, blockNumber)
  const flipEvent = create(FlipEvent, flipEventId, {
    flipper,
    nft,
    boughtPrice: price,
  })

  await store.save(flipEvent)
  await store.update(
    FlipperEntity,
    { id: flipper.id },
    {
      owned: flipper.owned + 1,
      totalBought: BigInt(flipper.totalBought) + BigInt(price || 0),
      timestamp,
    }
  )

  return flipper
}

async function handlePreviousOwner(
  store: EntityManager,
  event: CallWith<BuyTokenEvent>,
  nft: NFTEntity
): Promise<void> {
  const { caller: newOwner, currentOwner: previousOwner, timestamp, price } = event

  const previousFlipperId = getFlipperId(previousOwner, nft.collection.id)
  let previousFlipper = await getOptional<FlipperEntity>(store, FlipperEntity, previousFlipperId)

  if (!previousFlipper) {
    pending(
      OPERATION,
      `No previous flipper found for the previous owner (${previousOwner}). No previous flip to handle.`
    )
    return
  }

    const previousBuyEvents = await findWhere<FlipEvent>(store, FlipEvent, { nft: { id: nft.id }, flipper: { id: previousFlipper.id } })


  if (!previousBuyEvents || previousBuyEvents.length === 0) {
    warn(OPERATION, `No previous flips found for the previous owner (${previousOwner}). No previous flip to handle.`)
    return
  }


  const previousBuyEvent = previousBuyEvents[0] // there should be only 1  
  pending(OPERATION, `Previous flip event: ${previousBuyEvent}`)

   

  const soldPrice = BigInt(price || 0)
  const profit = soldPrice - previousBuyEvent.boughtPrice
  const profitPercentage =
    previousBuyEvent.boughtPrice !== BigInt(0) ? (Number(profit) / Number(previousBuyEvent.boughtPrice)) * 100 : 0

  await store.update(
    FlipEvent,
    { id: previousBuyEvent.id },
    {
      soldPrice,
      soldTo: newOwner,
      sellTimestamp: timestamp,
      profit,
    }
  )
  await store.update(
    FlipperEntity,
    { id: previousFlipper.id },
    {
      owned: previousFlipper.owned - 1,
      totalSold: BigInt(previousFlipper.totalSold) + soldPrice,
      timestamp,
      bestFlip:
        previousFlipper.bestFlip > BigInt(profitPercentage) ? previousFlipper.bestFlip : BigInt(profitPercentage),
    }
  )
}

export async function handleBuy(store: EntityManager, params: HandleFlipParams): Promise<void> {
  await handleNewOwner(store, params.event, params.nft)
  await handlePreviousOwner(store, params.event, params.nft)
}
