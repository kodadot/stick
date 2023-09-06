module.exports = class Data1693998172302 {
    name = 'Data1693998172302'

    async up(db) {
        await db.query(`CREATE INDEX "IDX_8fed68c917920ff529994c2c65" ON "nft_entity" ("block_number") `)
        await db.query(`CREATE INDEX "IDX_86a1515e09897c4de46f530734" ON "nft_entity" ("price") `)
        await db.query(`CREATE INDEX "IDX_fb5a810a729fee4b0b0d3301eb" ON "nft_entity" ("sn") `)
        await db.query(`CREATE INDEX "IDX_b250112ffe307b3141f83181e7" ON "nft_entity" ("updated_at") `)
        await db.query(`CREATE INDEX "IDX_703bf1a1b47a340c5675fdda85" ON "collection_entity" ("block_number") `)
        await db.query(`CREATE INDEX "IDX_b09e3db203a007fa67648832be" ON "collection_entity" ("created_at") `)
        await db.query(`CREATE INDEX "IDX_72ed70f83555fc3c80bac8e38a" ON "collection_entity" ("floor") `)
        await db.query(`CREATE INDEX "IDX_01cdb33e93f9accb9902831788" ON "collection_entity" ("highest_sale") `)
        await db.query(`CREATE INDEX "IDX_ca72b774ddea4dc39fbb5bf6c4" ON "collection_entity" ("nft_count") `)
        await db.query(`CREATE INDEX "IDX_8ae50565da6e56f122ccad6c57" ON "collection_entity" ("supply") `)
        await db.query(`CREATE INDEX "IDX_fba85326b71638259b87a35197" ON "collection_entity" ("updated_at") `)
        await db.query(`CREATE INDEX "IDX_c359c4f500cfa8d2dcabb8755d" ON "collection_entity" ("volume") `)
    }

    async down(db) {
        await db.query(`DROP INDEX "public"."IDX_8fed68c917920ff529994c2c65"`)
        await db.query(`DROP INDEX "public"."IDX_86a1515e09897c4de46f530734"`)
        await db.query(`DROP INDEX "public"."IDX_fb5a810a729fee4b0b0d3301eb"`)
        await db.query(`DROP INDEX "public"."IDX_b250112ffe307b3141f83181e7"`)
        await db.query(`DROP INDEX "public"."IDX_703bf1a1b47a340c5675fdda85"`)
        await db.query(`DROP INDEX "public"."IDX_b09e3db203a007fa67648832be"`)
        await db.query(`DROP INDEX "public"."IDX_72ed70f83555fc3c80bac8e38a"`)
        await db.query(`DROP INDEX "public"."IDX_01cdb33e93f9accb9902831788"`)
        await db.query(`DROP INDEX "public"."IDX_ca72b774ddea4dc39fbb5bf6c4"`)
        await db.query(`DROP INDEX "public"."IDX_8ae50565da6e56f122ccad6c57"`)
        await db.query(`DROP INDEX "public"."IDX_fba85326b71638259b87a35197"`)
        await db.query(`DROP INDEX "public"."IDX_c359c4f500cfa8d2dcabb8755d"`)
    }
}
