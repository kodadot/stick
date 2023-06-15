import { create } from '@kodadot1/metasquid/entity'
import { BlockHandlerContext } from '@subsquid/substrate-processor'
import { AssetEntity } from '../../model'
import { Store } from '../utils/types'
import { pending, success } from '../utils/logger'

const OPERATION = 'ASSET_REGISTER' as any

export async function forceCreateKusamaAsset(context: BlockHandlerContext<Store>): Promise<void> {
  pending(OPERATION, `${context.block.height}`);
  const asset = create<AssetEntity>(AssetEntity, '', {
    name: 'Kusama',
    symbol: 'KSM',
    decimals: 12,
  });
  success(OPERATION,`${asset.id} is ${asset.name || ''}`);
  await context.store.save<AssetEntity>(asset);
}