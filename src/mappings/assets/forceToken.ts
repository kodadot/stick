import { create } from '@kodadot1/metasquid/entity'
import { Store } from '@subsquid/typeorm-store'
import { CHAIN, Chain } from '../../environment'
import { AssetEntity } from '../../model'
import { pending, success } from '../utils/logger'
import { BatchContext } from '../utils/types'


const OPERATION = 'ASSET_REGISTER' as any

type Asset = {
  name: string,
  symbol: string,
  decimals: number,
}

const systemAsset: Record<Chain, Asset> = 
{
  kusama: {
    name: 'Kusama',
    symbol: 'KSM',
    decimals: 12,
  },
  polkadot: {
    name: 'Polkadot',
    symbol: 'DOT',
    decimals: 10,
  },
  rococo: {
    name: 'Rococo',
    symbol: 'ROC',
    decimals: 12,
  },
}

export const ALLOW_LIST = ['1984']

export async function forceCreateSystemAsset(context: BatchContext<Store>): Promise<void> {
  pending(OPERATION, `${context.blocks.at(0)?.header.height}`)
  const selected = systemAsset[CHAIN]

  const asset = create<AssetEntity>(AssetEntity, '', selected)
  success(OPERATION,`${asset.id} is ${asset.name || ''}`)
  await context.store.save<AssetEntity>(asset)
}

export async function forceCreateUsdtAsset(context: BatchContext): Promise<void> {
  pending(OPERATION, `${context.blocks.at(0)?.header.height}`)
  const asset = create<AssetEntity>(AssetEntity, '1984', {
    name: 'Tether USD',
    symbol: 'USDt',
    decimals: 6,
  })
  success(OPERATION,`${asset.id} is ${asset.name || ''}`)
  await context.store.save<AssetEntity>(asset)
}

export async function forceCreateRmrkAsset(context: BatchContext): Promise<void> {
  pending(OPERATION, `${context.blocks.at(0)?.header.height}`)
  const asset = create<AssetEntity>(AssetEntity, '8', {
    name: 'RMRK.app',
    symbol: 'RMRK',
    decimals: 10,
  })
  success(OPERATION,`${asset.id} is ${asset.name || ''}`)
  await context.store.save<AssetEntity>(asset)
}