import { create, getOptional } from '@kodadot1/metasquid/entity'
import { Holder } from '../../model'
import { Context } from '../utils/types'
import { warn } from '../utils/logger'

export class HolderEventHandler {
  context: Context

  constructor(context: Context) {
    this.context = context
  }

  async getOrCreateHolder(ownerId: string, timestamp: Date): Promise<Holder> {
    let holder = await getOptional<Holder>(this.context.store, Holder, ownerId)

    if (!holder) {
      holder = create(Holder, ownerId, {
        id: ownerId,
        nftCount: 0,
        totalBought: 0n,
        totalSold: 0n,
        lastActivity: timestamp,
      })
    }
    return holder
  }

  async decrementFromHolder(ownerId: string, timestamp: Date, sellPrice?: bigint): Promise<Holder | undefined> {
    let owner = (await getOptional<Holder>(this.context.store, Holder, ownerId)) as Holder
    if (!owner) {
      warn('HolderEventHandler::decrementFromHolder' as any, `holder ${ownerId} not found`)
      return
    }

    owner.nftCount = owner.nftCount > 0 ? owner.nftCount - 1 : 0
    owner.lastActivity = timestamp
    if (sellPrice) {
      owner.totalSold += sellPrice

      await this.context.store.save(owner)
      return owner
    }
  }

  async handleMint(ownerId: string, timestamp: Date): Promise<Holder> {
    const holder = await this.getOrCreateHolder(ownerId, timestamp)
    holder.nftCount += 1
    await this.context.store.save(holder)
    return holder
  }

  async handleSend(previousOwnerId: string, newOwnerId: string, timestamp: Date): Promise<Holder> {
    await this.decrementFromHolder(previousOwnerId, timestamp)

    const newOwner = await this.getOrCreateHolder(newOwnerId, timestamp)
    newOwner.nftCount += 1
    await this.context.store.save(newOwner)

    return newOwner
  }

  async handleBuy(
    previousOwnerId: string,
    newOwnerId: string,
    timestamp: Date,
    amount?: bigint | null
  ): Promise<Holder> {
    await this.decrementFromHolder(previousOwnerId, timestamp, amount || 0n)

    const buyer = await this.getOrCreateHolder(newOwnerId, timestamp)
    buyer.totalBought += amount || 0n
    buyer.nftCount += 1

    await this.context.store.save(buyer)
    return buyer
  }

  async handleBurn(ownerId: string, timestamp: Date): Promise<Holder | undefined> {
    return await this.decrementFromHolder(ownerId, timestamp)
  }
}
