module.exports = class Data1689623692588 {
  name = 'Data1689623692588'

  async up(db) {
    await db.query(
      `CREATE TABLE "token_entity" ("id" character varying NOT NULL, "block_number" numeric, "hash" text NOT NULL, "image" text, "media" text, "name" text, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "count" integer NOT NULL, "collection_id" character varying, CONSTRAINT "PK_687443f2a51af49b5472e2c5ddc" PRIMARY KEY ("id"))`
    )
    await db.query(`ALTER TABLE "token_entity" ADD "total_count" integer NOT NULL`)
    await db.query(`CREATE INDEX "IDX_0eb2ed7929c3e81941fa1b51b3" ON "token_entity" ("collection_id") `)
    await db.query(`CREATE INDEX "IDX_40d6049fd30532dada71922792" ON "token_entity" ("hash") `)
    await db.query(`CREATE INDEX "IDX_47b385945a425667b9e690bc02" ON "token_entity" ("name") `)
    await db.query(`ALTER TABLE "nft_entity" ADD "token_id" character varying`)
    await db.query(`CREATE INDEX "IDX_060d0f515d293fac1d81ee61a7" ON "nft_entity" ("token_id") `)
    await db.query(
      `ALTER TABLE "token_entity" ADD CONSTRAINT "FK_0eb2ed7929c3e81941fa1b51b35" FOREIGN KEY ("collection_id") REFERENCES "collection_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await db.query(
      `ALTER TABLE "nft_entity" ADD CONSTRAINT "FK_060d0f515d293fac1d81ee61a79" FOREIGN KEY ("token_id") REFERENCES "token_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )

    // Commands from Data1696428349370
    await db.query(`ALTER TABLE "token_entity" ADD "cheapest_nft_id" character varying`)
    await db.query(`CREATE INDEX "IDX_6d56119ac99ab53644b1b21a6e" ON "token_entity" ("cheapest_nft_id") `)
    await db.query(
      `ALTER TABLE "token_entity" ADD CONSTRAINT "FK_6d56119ac99ab53644b1b21a6ef" FOREIGN KEY ("cheapest_nft_id") REFERENCES "nft_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )

    // Commands from Data1696576165016
    await db.query(`ALTER TABLE "token_entity" ADD "metadata" text`)
    await db.query(`ALTER TABLE "token_entity" ADD "meta_id" character varying`)
    await db.query(`CREATE INDEX "IDX_ae4ff3b28e3fec72aa14124d1e" ON "token_entity" ("meta_id") `)
    await db.query(
      `ALTER TABLE "token_entity" ADD CONSTRAINT "FK_ae4ff3b28e3fec72aa14124d1e1" FOREIGN KEY ("meta_id") REFERENCES "metadata_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
  }

  async down(db) {
    // Rollback commands from Data1696576165016
    await db.query(`ALTER TABLE "token_entity" DROP COLUMN "metadata"`)
    await db.query(`ALTER TABLE "token_entity" DROP COLUMN "meta_id"`)
    await db.query(`DROP INDEX "public"."IDX_ae4ff3b28e3fec72aa14124d1e"`)
    await db.query(`ALTER TABLE "token_entity" DROP CONSTRAINT "FK_ae4ff3b28e3fec72aa14124d1e1"`)

    // Rollback commands from Data1696428349370
    await db.query(`ALTER TABLE "token_entity" DROP COLUMN "cheapest_nft_id"`)
    await db.query(`DROP INDEX "public"."IDX_6d56119ac99ab53644b1b21a6e"`)
    await db.query(`ALTER TABLE "token_entity" DROP CONSTRAINT "FK_6d56119ac99ab53644b1b21a6ef"`)

    await db.query(`DROP TABLE "token_entity"`)
    await db.query(`DROP INDEX "public"."IDX_0eb2ed7929c3e81941fa1b51b3"`)
    await db.query(`DROP INDEX "public"."IDX_40d6049fd30532dada71922792"`)
    await db.query(`DROP INDEX "public"."IDX_47b385945a425667b9e690bc02"`)
    await db.query(`ALTER TABLE "nft_entity" DROP COLUMN "token_id"`)
    await db.query(`DROP INDEX "public"."IDX_060d0f515d293fac1d81ee61a7"`)
    await db.query(`ALTER TABLE "token_entity" DROP CONSTRAINT "FK_0eb2ed7929c3e81941fa1b51b35"`)
    await db.query(`ALTER TABLE "nft_entity" DROP CONSTRAINT "FK_060d0f515d293fac1d81ee61a79"`)
  }
}
