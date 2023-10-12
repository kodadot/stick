module.exports = class Data1696751796584 {
    name = 'Data1696751796584'

    async up(db) {
        await db.query(`ALTER TABLE "token_entity" ADD "metadata" text`)
        await db.query(`ALTER TABLE "token_entity" ADD "supply" integer NOT NULL`)
        await db.query(`ALTER TABLE "token_entity" ADD "cheapest_id" character varying`)
        await db.query(`ALTER TABLE "token_entity" ADD "meta_id" character varying`)
        await db.query(`CREATE INDEX "IDX_637db5c040f1d9f935817ae1e8" ON "token_entity" ("cheapest_id") `)
        await db.query(`CREATE INDEX "IDX_ae4ff3b28e3fec72aa14124d1e" ON "token_entity" ("meta_id") `)
        await db.query(`ALTER TABLE "token_entity" ADD CONSTRAINT "FK_637db5c040f1d9f935817ae1e8a" FOREIGN KEY ("cheapest_id") REFERENCES "nft_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "token_entity" ADD CONSTRAINT "FK_ae4ff3b28e3fec72aa14124d1e1" FOREIGN KEY ("meta_id") REFERENCES "metadata_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    }

    async down(db) {
        await db.query(`ALTER TABLE "token_entity" DROP COLUMN "metadata"`)
        await db.query(`ALTER TABLE "token_entity" DROP COLUMN "supply"`)
        await db.query(`ALTER TABLE "token_entity" DROP COLUMN "cheapest_id"`)
        await db.query(`ALTER TABLE "token_entity" DROP COLUMN "meta_id"`)
        await db.query(`DROP INDEX "public"."IDX_637db5c040f1d9f935817ae1e8"`)
        await db.query(`DROP INDEX "public"."IDX_ae4ff3b28e3fec72aa14124d1e"`)
        await db.query(`ALTER TABLE "token_entity" DROP CONSTRAINT "FK_637db5c040f1d9f935817ae1e8a"`)
        await db.query(`ALTER TABLE "token_entity" DROP CONSTRAINT "FK_ae4ff3b28e3fec72aa14124d1e1"`)
    }
}
