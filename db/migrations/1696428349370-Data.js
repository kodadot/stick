module.exports = class Data1696428349370 {
    name = 'Data1696428349370'

    async up(db) {
        await db.query(`ALTER TABLE "token_entity" ADD "cheapest_nft_id" character varying`)
        await db.query(`CREATE INDEX "IDX_6d56119ac99ab53644b1b21a6e" ON "token_entity" ("cheapest_nft_id") `)
        await db.query(`ALTER TABLE "token_entity" ADD CONSTRAINT "FK_6d56119ac99ab53644b1b21a6ef" FOREIGN KEY ("cheapest_nft_id") REFERENCES "nft_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    }

    async down(db) {
        await db.query(`ALTER TABLE "token_entity" DROP COLUMN "cheapest_nft_id"`)
        await db.query(`DROP INDEX "public"."IDX_6d56119ac99ab53644b1b21a6e"`)
        await db.query(`ALTER TABLE "token_entity" DROP CONSTRAINT "FK_6d56119ac99ab53644b1b21a6ef"`)
    }
}
