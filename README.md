# stick

![](https://media.tenor.com/Eu0LNbU4hQMAAAAC/jeanne-darc-vanitas-no-carte.gif)

[Squid](https://docs.subsquid.io) based data used to index, process, and query on top of AssetHub for [KodaDot](https://kodadot.xyz) NFT Marketplace.

## Hosted Squids

* Kusama AssetHub Processor (Statemine -> KSM): [AHK GraphQL](https://kodadot.squids.live/stick:prod/api/graphql)
* Polkadot AssetHub Processor (Statemint -> DOT): [AHP GraphQL](https://kodadot.squids.live/speck:prod/api/graphql)
* Paseo Testnet Processor: 🚧 Coming soon 🚧

## Project structure

* `src/generated` - model/server definitions created by `codegen`. Do not alter the contents of this directory manually.
* `src/server-extension` - module with custom `type-graphql` based resolvers.
* `src/types` - data type definitions for chain events and extrinsics created by `typegen`.
* `src/mappings` - mapping module.
* `lib` - compiled js files. The structure of this directory must reflect `src`.
* `.env` - environment variables defined here or supplied by a shell.

## Prerequisites

* Node 18.x
* Docker
* npm
* [just](https://github.com/casey/just)

## Quickly running the sample

```bash
# 1. Install dependencies
npm ci

# 2. Build project
just build

# 3. Start target Postgres database container
just upd

# 4. Update database with data objects
just migrate

# 5. Start the processor
just process

# 6. Open a separate terminal and launch the graphql server to query the processed data
just serve

# 7. Visit localhost:4350/graphql to see the result
```

## Dev flow

### 1. Define database schema

Start development by defining the schema of the target database via `schema.graphql`.
Schema definition consists of regular graphql type declarations annotated with custom directives.
A full description of `schema.graphql` dialect is available [here](https://docs.subsquid.io/schema-file).

### 2. Generate TypeORM classes

Mapping developers use [TypeORM](https://typeorm.io) entities to interact with the target database during data processing. The squid framework generates All necessary entity classes from `schema.graphql`. This is done by running `just codegen` command.

### 3. Generate database migration

All database changes are applied through migration files located at `db/migrations`.
`squid-typeorm-migration` tool provides several commands to drive the process.
It is all [TypeORM](https://typeorm.io/#/migrations) under the hood.

```bash
# Connect to the database, analyze its state, and generate a migration to match the target schema.
# Launch Docker instance of the database
just upd

# The target schema is derived from entity classes generated earlier.
# Remember to compile your entity classes beforehand!
just update-db

# Apply database migrations from `db/migrations`
just migrate

# Revert the last performed migration
just revert-db
```

Available `sqd` shortcuts:

```bash
# Build the project, remove any old migrations, then run `npx squid-typeorm-migration generate`
sqd migration:generate

# Run npx squid-typeorm-migration apply
sqd migration:apply
```

### Testing

> Unit test early, unit test often

> [!NOTE]
> Any code imported from @kodadot [packages has unit test written in the separated repository](https://github.com/kodadot/packages)

This indexer contains unit tests for utility/parsing functions we wrote.

Tests are located in the `tests/` directory.
To run the tests, use:

```bash
npm run test
```

> [!WARNING]
> Currently, it is impossible to unit test the whole indexer workflow as a dry run. If you encounter some problem, please head over to the telegram group **HydraDevs**

## Architecture

The architecture of this project is following:

* `src/processable.ts` - definition of Events and Extrinsic to be processed by Squid
* `src/processor.ts` - processor definition
* `src/mappings/index` - the main function that is called by the processor to process events and extrinsic
* `src/mappings/<pallet>` - mapping functions for each event and extrinsic
* `src/mappings/<pallet>/types.ts` - types for each event and extrinsic
* `src/mappings/<pallet>/getters/<chain>.ts` - transformation functions for each event and extrinsic
* `src/mappings/utils` - utility functions used by mappings

## Misc

1. fast generate event handlers 

```bash
pbpaste | cut -d '=' -f 1 | tr -d ' '  | xargs -I_ echo "processor.addEventHandler(Event._, dummy);"
```

2. enable debug logs (in .env)

```bash
SQD_DEBUG=squid:log
```

3. generate metagetters from getters 

```bash
pbpaste | grep 'export'  | xargs -I_ echo "_  return proc.  }"
```

4. Enable different chain (currently only Kusama and Polkadot are supported)

> [!NOTE]
> By default the chain is set to `kusama`

```bash
CHAIN=polkadot # or kusama
```

5. enable offers 

`Offers` support is a hack on top of the `Atomic Swap` to enable `Offers` set in `.env` file

```bash
OFFER=<ID_OF_THE_COLLECTION>
```

6. debugging the processor

As the processor can run for a longer period of time it is useful to turn off the "features" that you do not need,
Handlers that need to be always enabled are `createCollection` and `createItem` as they are the base for the rest of the processor.

> [!NOTE]
> If you do not wish to index `uniques` pallet you can turn it off by setting `UNIQUES_ENABLED=false` in `.env` file

### Note on Swaps

1. Swaps can be overwritten at any time

Therefore if you have a swap, and will create a new one, the old one will be overwritten. This is mentioned in `createSwap.ts` Line 31.

2. Swaps are autocancelled by few conditions

- if you `burn` the NFT
- if you `transfer` the NFT

in any other condition the swap will have to be cancelled manually.

## Funding

Project was funded as a common good by

<div align="center">
  <img width="200" alt="version" src="https://user-images.githubusercontent.com/55763425/211145923-f7ee2a57-3e63-4b7d-9674-2da9db46b2ee.png" />
</div>



