# stick

![](https://media.tenor.com/eK1dyB3TOLsAAAAC/anime-stick.gif)

[Squid](https://docs.subsquid.io) based data used to index, process, and query on top of AssetHub for [KodaDot](https://kodadot.xyz) NFT Marketplace.

## Hosted Squids

* Kusama AssetHub Processor (Statemine -> KSM): https://squid.subsquid.io/stick/graphql
* Polkadot AssetHub Processor (Statemint -> DOT): https://squid.subsquid.io/speck/graphql
* Rococo Testnet Processor: 🚧 WIP 🚧

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

```
pbpaste | cut -d '=' -f 1 | tr -d ' '  | xargs -I_ echo "processor.addEventHandler(Event._, dummy);"
```

2. enable debug logs (in .env)

```
SQD_DEBUG=squid:log
```

3. generate metagetters from getters 

```
pbpaste | grep 'export'  | xargs -I_ echo "_  return proc.  }"
```
