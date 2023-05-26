import { getOrCreate } from '@kodadot1/metasquid/entity'
import md5 from 'md5'
import {
  CollectionEntity as CE
} from '../../model'
import { handleMetadata } from '../shared/metadata'
import { unwrap } from '../utils/extract'
import { versionOf } from '../utils/helper'
import { debug, pending, success } from '../utils/logger'
import { Action, Context } from '../utils/types'
import { getForceCreateCollectionEvent } from './getters'

const OPERATION = Action.CREATE

export async function handleForceCollectionCreate(context: Context): Promise<void> {
  pending(OPERATION, `[FORCE]: ${context.block.height}`);
  const event = unwrap(context, getForceCreateCollectionEvent);
  debug(OPERATION, event);
  const final = await getOrCreate(context.store, CE, event.id, {});
  // plsBe(remintable, final);

  final.blockNumber = BigInt(event.blockNumber);
  final.burned = false;
  final.createdAt = event.timestamp;
  final.currentOwner = event.owner;
  final.distribution = 0;
  final.floor = BigInt(0);
  final.hash = md5(event.id)
  final.highestSale = BigInt(0);
  final.id = event.id;
  final.issuer = event.caller;
  final.max = undefined;
  final.metadata = event.metadata;
  final.nftCount = 0;
  final.ownerCount = 0;
  final.supply = 0;
  final.updatedAt = event.timestamp;
  final.volume = BigInt(0);
  final.version = versionOf(context);

  debug(OPERATION, { metadata: final.metadata});

  if (final.metadata) {
    const metadata = await handleMetadata(final.metadata, context.store);
    final.meta = metadata;
    final.name = metadata?.name;
    final.image = metadata?.image;
    final.media = metadata?.animationUrl;
  }

  success(OPERATION, `[COLLECTION] ${final.id}`);
  await context.store.save(final);
  // await createCollectionEvent(final, OPERATION, event, '', context.store);
}