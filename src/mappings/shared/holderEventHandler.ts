import { create, getOptional } from '@kodadot1/metasquid/entity'
import { EntityManager } from 'typeorm'
import { CollectionEntity, HolderActivity as HA, HolderActivity } from '../../model'
import { Context } from '../utils/types'
import { warn, debug } from '../utils/logger'

type BaseParams = {
  collection: CollectionEntity
  timestamp: Date
  ownerId: string
}

type HandleMintParams = BaseParams

type HandleSendParams = BaseParams & {
  newOwnerId: string
}

type HandleBuyParams = BaseParams & {
  newOwnerId: string
  amount?: bigint | null
}

type HandleBurnParams = {
  ownerId: string
  collectionId: string
  timestamp: Date
}

export class HolderEventHandler {
  store: EntityManager

  constructor(context: Context) {
    this.store = context.store
  }

  private getHolderId(ownerId: string, collectionId: string): string {
    return `${ownerId}-${collectionId}`
  }

  async getOrCreateHolder(ownerId: string, collection: CollectionEntity, timestamp: Date): Promise<HA> {
    const id = this.getHolderId(ownerId, collection.id)
    let holderActivity = await getOptional<HA>(this.store, HA, id)

    if (!holderActivity) {
      holderActivity = create(HA, id, {
        holder: ownerId,
        id,
        nftCount: 0,
        totalBought: BigInt(0),
        totalSold: BigInt(0),
        lastActivity: timestamp,
        collection,
      })
      await this.store.save(holderActivity)
    }

    return holderActivity
  }

  async decrementFromHolder(holderId: string, timestamp: Date, sellPrice?: bigint | null): Promise<void> {
    let holderActivity = (await getOptional<HA>(this.store, HA, holderId)) as HA
    if (!holderActivity) {
      warn('HolderEventHandler::decrementFromHolder' as any, `holder ${holderId} not found`)
      return
    }

    const updateArgs: Partial<HA> = {
      nftCount: Math.max(holderActivity.nftCount - 1, 0),
      lastActivity: timestamp,
    }
    if (sellPrice) {
      debug('HolderEventHandler::decrementFromHolder' as any, { typeof_sellPrice: typeof sellPrice, sellPrice })
      updateArgs.totalSold = BigInt(holderActivity.totalSold) + BigInt(sellPrice)
      debug('HolderEventHandler::decrementFromHolder' as any, updateArgs)
      debug('HolderEventHandler::decrementFromHolder' as any, holderActivity)
    }

    await this.store.update(HolderActivity, { id: holderId }, updateArgs)
  }

  async handleMint({ ownerId, collection, timestamp }: HandleMintParams): Promise<HA> {
    const holderActivity = await this.getOrCreateHolder(ownerId, collection, timestamp)
    await this.store.update(
      HA,
      { id: holderActivity.id },
      { nftCount: 1, lastActivity: timestamp }
    )
    return holderActivity
  }

  async handleSend({ ownerId: previousOwnerId, newOwnerId, collection, timestamp }: HandleSendParams): Promise<HA> {
    const previousHolderActvityId = this.getHolderId(previousOwnerId, collection.id)
    await this.decrementFromHolder(previousHolderActvityId, timestamp)

    const newHolderActivity = await this.getOrCreateHolder(newOwnerId, collection, timestamp)
    await this.store.update(
      HA,
      { id: newHolderActivity.id },
      { nftCount: newHolderActivity.nftCount + 1, lastActivity: timestamp }
    )
    return newHolderActivity
  }

  async handleBuy({
    ownerId: previousOwnerId,
    newOwnerId,
    collection,
    timestamp,
    amount,
  }: HandleBuyParams): Promise<HA> {
    const previousHolderActvityId = this.getHolderId(previousOwnerId, collection.id)
    if (amount) {
      debug('HolderEventHandler::handleBuy' as any, { typeof_amount: typeof amount, amount })
      debug('HolderEventHandler::handleBuy' as any, { previousOwnerId, newOwnerId, collection, timestamp, amount })
    }

    await this.decrementFromHolder(previousHolderActvityId, timestamp, amount)

    const buyerActivity = await this.getOrCreateHolder(newOwnerId, collection, timestamp)

    const updateArgs: Partial<HA> = {
      nftCount: buyerActivity.nftCount + 1,
      lastActivity: timestamp,
    }
    if (amount) {
      debug('HolderEventHandler::handleBuy' as any, { typeof_amount: typeof amount, amount })
      updateArgs.totalBought = BigInt(buyerActivity.totalBought) + BigInt(amount)
      debug('HolderEventHandler::handleBuy' as any, updateArgs)
      debug('HolderEventHandler::handleBuy' as any, { previousOwnerId, newOwnerId, collection, timestamp, amount })
    }

    await this.store.update(HA, { id: buyerActivity.id }, updateArgs)
    if (amount) {
      throw new Error('DEBUG BREAKPOINT - HolderEventHandler::handleBuy')
    }

    return buyerActivity
  }

  async handleBurn({ ownerId, collectionId, timestamp }: HandleBurnParams): Promise<void> {
    const previousHolderActvityId = this.getHolderId(ownerId, collectionId)

    await this.decrementFromHolder(previousHolderActvityId, timestamp)
  }
}
