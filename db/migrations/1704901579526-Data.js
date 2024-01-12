module.exports = class Data1704901579526 {
    name = 'Data1704901579526'

    async up(db) {
        await db.query(`DROP INDEX "public"."IDX_fb5a810a729fee4b0b0d3301eb"`)
        await db.query(`ALTER TABLE "nft_entity" DROP COLUMN "sn"`)
        await db.query(`ALTER TABLE "nft_entity" ADD "sn" numeric NOT NULL`)
        await db.query(`CREATE INDEX "IDX_fb5a810a729fee4b0b0d3301eb" ON "nft_entity" ("sn") `)
    }

    async down(db) {
        await db.query(`CREATE INDEX "IDX_fb5a810a729fee4b0b0d3301eb" ON "nft_entity" ("sn") `)
        await db.query(`ALTER TABLE "nft_entity" ADD "sn" text NOT NULL`)
        await db.query(`ALTER TABLE "nft_entity" DROP COLUMN "sn"`)
        await db.query(`DROP INDEX "public"."IDX_fb5a810a729fee4b0b0d3301eb"`)
    }
}
