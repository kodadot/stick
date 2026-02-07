module.exports = class Data1760160000000 {
    name = 'Data1760160000000'

    async up(db) {
        await db.query(`ALTER TABLE "nft_entity" ADD "rarity_score" numeric`)
        await db.query(`ALTER TABLE "nft_entity" ADD "rarity_rank" integer`)
        await db.query(`ALTER TABLE "nft_entity" ADD "rarity_percentile" numeric`)
        await db.query(`ALTER TABLE "nft_entity" ADD "rarity_tier" text`)

        await db.query(`CREATE INDEX "IDX_nft_entity_collection_rarity_rank" ON "nft_entity" ("collection_id", "rarity_rank") `)
        await db.query(`CREATE INDEX "IDX_nft_entity_collection_rarity_tier" ON "nft_entity" ("collection_id", "rarity_tier") `)
        await db.query(`CREATE INDEX "IDX_nft_entity_collection_rarity_percentile" ON "nft_entity" ("collection_id", "rarity_percentile") `)
    }

    async down(db) {
        await db.query(`DROP INDEX "public"."IDX_nft_entity_collection_rarity_percentile"`)
        await db.query(`DROP INDEX "public"."IDX_nft_entity_collection_rarity_tier"`)
        await db.query(`DROP INDEX "public"."IDX_nft_entity_collection_rarity_rank"`)

        await db.query(`ALTER TABLE "nft_entity" DROP COLUMN "rarity_tier"`)
        await db.query(`ALTER TABLE "nft_entity" DROP COLUMN "rarity_percentile"`)
        await db.query(`ALTER TABLE "nft_entity" DROP COLUMN "rarity_rank"`)
        await db.query(`ALTER TABLE "nft_entity" DROP COLUMN "rarity_score"`)
    }
}
