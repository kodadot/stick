const { Keyring } = require('@polkadot/keyring');
const { ApiPromise, WsProvider } = require('@polkadot/api');

async function main() {
  const api = await connect();
  const keyring = new Keyring({ type: 'sr25519' });
  const alice = keyring.addFromUri('//Alice');
  const charlie = keyring.addFromUri('//Charlie');

  await createCollection(api, alice, 'Issuer');
  await createCollection(api, charlie, 'Public');
  const aliceCollectionId = 0;
  const offersCollectionId = 1;

  const aliceNFTId = 0;
  const chequeNFTId = 1;
  await mintNFT(api, aliceCollectionId, aliceNFTId, alice);
  await mintNFT(api, offersCollectionId, chequeNFTId, charlie);

  const price = unitToPlanck(12, api.registry.chainDecimals[0]);
  await createOffer(api, offersCollectionId, chequeNFTId, aliceCollectionId, aliceNFTId, price, charlie);
  await acceptOffer(api, aliceCollectionId, aliceNFTId, offersCollectionId, chequeNFTId, price, alice);
}

async function connect() {
  const wsProvider = new WsProvider('ws://127.0.0.1:9944');
  const api = await ApiPromise.create({ provider: wsProvider });
  await api.isReady;

  return api;
}

// create a collection with the default settings
async function createCollection(api, account, mintType) {
  return api.tx.nfts
    .create(account.address, {
      settings: 0,
      mintSettings: {
        mintType,
        defaultItemSettings: 0,
      },
    })
    .signAndSend(account);
}

async function mintNFT(api, collectionId, itemId, account) {
  return api.tx.nfts.mint(collectionId, itemId, account.address, null).signAndSend(account);
}

async function createOffer(api, offeredCollection, offeredItem, desiredCollection, desiredItem, price, account) {
  const duration = 10000; // a number of blocks the offer will be valid
  return api.tx.nfts
    .createSwap(
      offeredCollection,
      offeredItem,
      desiredCollection,
      desiredItem,
      {
        amount: price,
        direction: 'Send',
      },
      duration,
    )
    .signAndSend(account);
}

async function acceptOffer(api, sendCollection, sendItem, receiveCollection, receiveItem, confirmPrice, account) {
  return api.tx.nfts
    .claimSwap(sendCollection, sendItem, receiveCollection, receiveItem, {
      amount: confirmPrice,
      direction: 'Send',
    })
    .signAndSend(account);
}

function unitToPlanck(units, decimals) {
  const separated = units.toString().split('.');
  const [whole] = separated;
  let [, decimal] = separated;

  if (typeof decimal === 'undefined') {
    decimal = '';
  }

  return `${whole}${decimal.padEnd(decimals, '0')}`.replace(/^0+/, '');
}

main()
  .catch(console.error)
  .finally(() => process.exit());
