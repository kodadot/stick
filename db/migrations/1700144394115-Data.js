module.exports = class Data1700144394115 {
    name = 'Data1700144394115'

    async up(db) {
        await db.query(`ALTER TABLE "token_entity" DROP CONSTRAINT "FK_637db5c040f1d9f935817ae1e8a"`)
        await db.query(`DROP INDEX "public"."IDX_637db5c040f1d9f935817ae1e8"`)
        await db.query(`ALTER TABLE "token_entity" DROP COLUMN "cheapest_id"`)
        await db.query(`ALTER TABLE "collection_entity" ADD "recipient" text`)
        await db.query(`ALTER TABLE "collection_entity" ADD "royalty" numeric`)
    }

    async down(db) {
        await db.query(`ALTER TABLE "token_entity" ADD CONSTRAINT "FK_637db5c040f1d9f935817ae1e8a" FOREIGN KEY ("cheapest_id") REFERENCES "nft_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`CREATE INDEX "IDX_637db5c040f1d9f935817ae1e8" ON "token_entity" ("cheapest_id") `)
        await db.query(`ALTER TABLE "token_entity" ADD "cheapest_id" character varying`)
        await db.query(`ALTER TABLE "collection_entity" DROP COLUMN "recipient"`)
        await db.query(`ALTER TABLE "collection_entity" DROP COLUMN "royalty"`)
    }
}
