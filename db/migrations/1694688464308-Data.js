module.exports = class Data1694688464308 {
    name = 'Data1694688464308'

    async up(db) {
        await db.query(`CREATE TABLE "flip_event" ("id" character varying NOT NULL, "sold_price" numeric, "sold_to" text, "sell_timestamp" TIMESTAMP WITH TIME ZONE, "bought_price" numeric NOT NULL, "profit" numeric, "flipper_id" character varying, "nft_id" character varying, CONSTRAINT "PK_fa045c959eb49fd330b7130cabb" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_b440835d296fabbade4a08f56d" ON "flip_event" ("flipper_id") `)
        await db.query(`CREATE INDEX "IDX_0896c2680b0a6fbff1e68d3ada" ON "flip_event" ("nft_id") `)
        await db.query(`CREATE TABLE "flipper_entity" ("id" character varying NOT NULL, "address" text NOT NULL, "owned" integer NOT NULL, "total_bought" numeric NOT NULL, "total_sold" numeric NOT NULL, "best_flip" numeric NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "collection_id" character varying, CONSTRAINT "PK_1715ba6adaecb7e138d4716e73e" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_caf50ab81db0d2aa16265da559" ON "flipper_entity" ("address") `)
        await db.query(`CREATE INDEX "IDX_020450854a403a64ea22a1487f" ON "flipper_entity" ("collection_id") `)
        await db.query(`ALTER TABLE "flip_event" ADD CONSTRAINT "FK_b440835d296fabbade4a08f56db" FOREIGN KEY ("flipper_id") REFERENCES "flipper_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "flip_event" ADD CONSTRAINT "FK_0896c2680b0a6fbff1e68d3adaa" FOREIGN KEY ("nft_id") REFERENCES "nft_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "flipper_entity" ADD CONSTRAINT "FK_020450854a403a64ea22a1487f2" FOREIGN KEY ("collection_id") REFERENCES "collection_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    }

    async down(db) {
        await db.query(`DROP TABLE "flip_event"`)
        await db.query(`DROP INDEX "public"."IDX_b440835d296fabbade4a08f56d"`)
        await db.query(`DROP INDEX "public"."IDX_0896c2680b0a6fbff1e68d3ada"`)
        await db.query(`DROP TABLE "flipper_entity"`)
        await db.query(`DROP INDEX "public"."IDX_caf50ab81db0d2aa16265da559"`)
        await db.query(`DROP INDEX "public"."IDX_020450854a403a64ea22a1487f"`)
        await db.query(`ALTER TABLE "flip_event" DROP CONSTRAINT "FK_b440835d296fabbade4a08f56db"`)
        await db.query(`ALTER TABLE "flip_event" DROP CONSTRAINT "FK_0896c2680b0a6fbff1e68d3adaa"`)
        await db.query(`ALTER TABLE "flipper_entity" DROP CONSTRAINT "FK_020450854a403a64ea22a1487f2"`)
    }
}
