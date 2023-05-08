module.exports = class Data1683034190372 {
    name = 'Data1683034190372'

    async up(db) {
        await db.query(`CREATE TABLE "collection_event" ("id" character varying NOT NULL, "block_number" numeric, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "caller" text NOT NULL, "current_owner" text, "interaction" character varying(12) NOT NULL, "meta" text NOT NULL, "collection_id" character varying, CONSTRAINT "PK_5071dfbea812b4caade2ede2139" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_93f81f26d6b052b289167b3ae3" ON "collection_event" ("collection_id") `)
        await db.query(`CREATE TABLE "metadata_entity" ("id" character varying NOT NULL, "name" text, "description" text, "image" text, "attributes" jsonb, "animation_url" text, "type" text, CONSTRAINT "PK_2cb9d5d4ae99d9a27497bf8d2e8" PRIMARY KEY ("id"))`)
        await db.query(`CREATE TABLE "event" ("id" character varying NOT NULL, "block_number" numeric, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "caller" text NOT NULL, "current_owner" text NOT NULL, "interaction" character varying(12) NOT NULL, "meta" text NOT NULL, "nft_id" character varying, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_9380d479563e5a664759359470" ON "event" ("nft_id") `)
        await db.query(`CREATE TABLE "nft_entity" ("attributes" jsonb, "block_number" numeric, "burned" boolean NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "current_owner" text NOT NULL, "hash" text NOT NULL, "id" character varying NOT NULL, "image" text, "issuer" text NOT NULL, "lewd" boolean NOT NULL, "media" text, "metadata" text, "name" text, "price" numeric, "recipient" text, "royalty" numeric, "sn" text NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL, "collection_id" character varying, "meta_id" character varying, CONSTRAINT "PK_ed09c6a38c0f0a867d5a7b63f0d" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_4b98bf4d630de0037475b9bbb7" ON "nft_entity" ("collection_id") `)
        await db.query(`CREATE INDEX "IDX_0a42c2c09b35a7535045d4a2f4" ON "nft_entity" ("current_owner") `)
        await db.query(`CREATE INDEX "IDX_16e57ac8478b6ea1f383e3eb03" ON "nft_entity" ("hash") `)
        await db.query(`CREATE INDEX "IDX_2bfc45b91959a14ab8b2d734cd" ON "nft_entity" ("meta_id") `)
        await db.query(`CREATE INDEX "IDX_54ca209d76ebe11ccc3c4e75d1" ON "nft_entity" ("name") `)
        await db.query(`CREATE TABLE "collection_entity" ("attributes" jsonb, "block_number" numeric, "burned" boolean NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "current_owner" text NOT NULL, "distribution" integer NOT NULL, "floor" numeric NOT NULL, "hash" text NOT NULL, "highest_sale" numeric NOT NULL, "id" character varying NOT NULL, "image" text, "issuer" text NOT NULL, "max" integer, "media" text, "metadata" text, "name" text, "nft_count" integer NOT NULL, "owner_count" integer NOT NULL, "supply" integer NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL, "volume" numeric NOT NULL, "meta_id" character varying, CONSTRAINT "PK_5d44e140c4fcb3d961f9e83405f" PRIMARY KEY ("id"))`)
        await db.query(`CREATE UNIQUE INDEX "IDX_90561baea428b17fdaf8e484d7" ON "collection_entity" ("hash") `)
        await db.query(`CREATE INDEX "IDX_014542183f297493eab0cd8bdf" ON "collection_entity" ("meta_id") `)
        await db.query(`CREATE INDEX "IDX_b0d709797451c6237e8ec0fee8" ON "collection_entity" ("name") `)
        await db.query(`ALTER TABLE "collection_event" ADD CONSTRAINT "FK_93f81f26d6b052b289167b3ae3e" FOREIGN KEY ("collection_id") REFERENCES "collection_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_9380d479563e5a664759359470a" FOREIGN KEY ("nft_id") REFERENCES "nft_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "nft_entity" ADD CONSTRAINT "FK_4b98bf4d630de0037475b9bbb7a" FOREIGN KEY ("collection_id") REFERENCES "collection_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "nft_entity" ADD CONSTRAINT "FK_2bfc45b91959a14ab8b2d734cd2" FOREIGN KEY ("meta_id") REFERENCES "metadata_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "collection_entity" ADD CONSTRAINT "FK_014542183f297493eab0cd8bdf8" FOREIGN KEY ("meta_id") REFERENCES "metadata_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    }

    async down(db) {
        await db.query(`DROP TABLE "collection_event"`)
        await db.query(`DROP INDEX "public"."IDX_93f81f26d6b052b289167b3ae3"`)
        await db.query(`DROP TABLE "metadata_entity"`)
        await db.query(`DROP TABLE "event"`)
        await db.query(`DROP INDEX "public"."IDX_9380d479563e5a664759359470"`)
        await db.query(`DROP TABLE "nft_entity"`)
        await db.query(`DROP INDEX "public"."IDX_4b98bf4d630de0037475b9bbb7"`)
        await db.query(`DROP INDEX "public"."IDX_0a42c2c09b35a7535045d4a2f4"`)
        await db.query(`DROP INDEX "public"."IDX_16e57ac8478b6ea1f383e3eb03"`)
        await db.query(`DROP INDEX "public"."IDX_2bfc45b91959a14ab8b2d734cd"`)
        await db.query(`DROP INDEX "public"."IDX_54ca209d76ebe11ccc3c4e75d1"`)
        await db.query(`DROP TABLE "collection_entity"`)
        await db.query(`DROP INDEX "public"."IDX_90561baea428b17fdaf8e484d7"`)
        await db.query(`DROP INDEX "public"."IDX_014542183f297493eab0cd8bdf"`)
        await db.query(`DROP INDEX "public"."IDX_b0d709797451c6237e8ec0fee8"`)
        await db.query(`ALTER TABLE "collection_event" DROP CONSTRAINT "FK_93f81f26d6b052b289167b3ae3e"`)
        await db.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_9380d479563e5a664759359470a"`)
        await db.query(`ALTER TABLE "nft_entity" DROP CONSTRAINT "FK_4b98bf4d630de0037475b9bbb7a"`)
        await db.query(`ALTER TABLE "nft_entity" DROP CONSTRAINT "FK_2bfc45b91959a14ab8b2d734cd2"`)
        await db.query(`ALTER TABLE "collection_entity" DROP CONSTRAINT "FK_014542183f297493eab0cd8bdf8"`)
    }
}
