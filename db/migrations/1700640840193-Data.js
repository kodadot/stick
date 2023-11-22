module.exports = class Data1700640840193 {
    name = 'Data1700640840193'

    async up(db) {
        await db.query(`ALTER TABLE "token_entity" DROP CONSTRAINT "FK_637db5c040f1d9f935817ae1e8a"`)
        await db.query(`DROP INDEX "public"."IDX_637db5c040f1d9f935817ae1e8"`)
        await db.query(`ALTER TABLE "token_entity" DROP COLUMN "cheapest_id"`)
        await db.query(`ALTER TABLE "metadata_entity" ADD "banner" text`)
    }

    async down(db) {
        await db.query(`ALTER TABLE "token_entity" ADD CONSTRAINT "FK_637db5c040f1d9f935817ae1e8a" FOREIGN KEY ("cheapest_id") REFERENCES "nft_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`CREATE INDEX "IDX_637db5c040f1d9f935817ae1e8" ON "token_entity" ("cheapest_id") `)
        await db.query(`ALTER TABLE "token_entity" ADD "cheapest_id" character varying`)
        await db.query(`ALTER TABLE "metadata_entity" DROP COLUMN "banner"`)
    }
}
