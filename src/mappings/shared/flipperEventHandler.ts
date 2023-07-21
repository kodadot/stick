import { EntityManager } from 'typeorm'
import { create, getOptional } from '@kodadot1/metasquid/entity'
import { FlipperEntity, FlipEvent, CollectionEntity, NFTEntity } from '../../model'
import { CallWith } from '../utils/types'
import { BuyTokenEvent } from '../nfts/types'
import { pending, warn } from '../utils/logger'

const OPERATION = 'BUY => FlipperEventHandler' as any

type HandleFlipParams = {
  event: CallWith<BuyTokenEvent>
  nft: NFTEntity
}

export class FlipperEventHandler {
  store: EntityManager

  constructor(store: EntityManager) {
    this.store = store
  }

  private getFlipperId(address: string, collectionId: string): string {
    return `${address}-${collectionId}`
  }

  private getFlipEventId(address: string, collectionId: string, blockNumber: string): string {
    return `${blockNumber}-${address}-${collectionId}`
  }

  async getOrCreateFlipper(address: string, collection: CollectionEntity, timestamp: Date): Promise<FlipperEntity> {
    const id = this.getFlipperId(address, collection.id)
    let flipper = await getOptional<FlipperEntity>(this.store, FlipperEntity, id)

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
      await this.store.save(flipper)
    }

    return flipper
  }

  async handleNewOwner(event: CallWith<BuyTokenEvent>, nft: NFTEntity): Promise<FlipperEntity> {
    const { caller: newOwner, collectionId, timestamp, price, blockNumber } = event
    const flipper = await this.getOrCreateFlipper(newOwner, nft.collection, timestamp)

    const flipEventId = this.getFlipEventId(newOwner, collectionId, blockNumber)
    const flipEvent = create(FlipEvent, flipEventId, {
      flipper,
      nft,
      boughtPrice: price,
    })

    await this.store.save(flipEvent)
    await this.store.update(
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

  async handlePreviousOwner(event: CallWith<BuyTokenEvent>, nft: NFTEntity): Promise<void> {
    const { caller: newOwner, currentOwner: previousOwner, timestamp, price } = event

    const previousFlipperId = this.getFlipperId(previousOwner, nft.collection.id)
    let previousFlipper = await getOptional<FlipperEntity>(this.store, FlipperEntity, previousFlipperId)

    if (!previousFlipper) {
      pending(
        OPERATION,
        `No previous flipper found for the previous owner (${previousOwner}). No previous flip to handle.`
      )
      return
    }

    if (!previousFlipper.flips) {
      warn(OPERATION, `No previous flips found for the previous owner (${previousOwner}). No previous flip to handle.`)
      return
    }

    const previousFlipEvent = previousFlipper.flips.find((flip) => flip.nft.id === nft.id)

    if (!previousFlipEvent) {
      pending(
        OPERATION,
        `No previous flip event found for the previous owner (${previousOwner}). No previous flip event to handle.`
      )
      return
    }

    const soldPrice = BigInt(price || 0)
    const profit = soldPrice - previousFlipEvent.boughtPrice
    const profitPercentage =
      previousFlipEvent.boughtPrice !== BigInt(0) ? (Number(profit) / Number(previousFlipEvent.boughtPrice)) * 100 : 0

    await this.store.update(
      FlipEvent,
      { id: previousFlipEvent.id },
      {
        soldPrice,
        soldTo: newOwner,
        sellTimestamp: timestamp,
        profit,
      }
    )
    await this.store.update(
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

  async handleBuy({ event, nft }: HandleFlipParams): Promise<void> {
    await this.handleNewOwner(event, nft)
    await this.handlePreviousOwner(event, nft)
  }
}
