module.exports = class Data1721653971599 {
    name = 'Data1721653971599'

    async up(db) {
        await db.query(`CREATE TABLE "offer" ("id" character varying NOT NULL, "block_number" numeric NOT NULL, "caller" text NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "expiration" numeric NOT NULL, "price" numeric NOT NULL, "status" character varying(9) NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE, "considered_id" character varying, "desired_id" character varying, "nft_id" character varying, CONSTRAINT "REL_71609884f4478ed41be6672a66" UNIQUE ("nft_id"), CONSTRAINT "PK_57c6ae1abe49201919ef68de900" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_004a20a1eed4189bc23b13efa0" ON "offer" ("considered_id") `)
        await db.query(`CREATE INDEX "IDX_f8c1e3faf9cdba27703e0ea2c5" ON "offer" ("desired_id") `)
        await db.query(`CREATE UNIQUE INDEX "IDX_71609884f4478ed41be6672a66" ON "offer" ("nft_id") `)
        await db.query(`CREATE TABLE "swap" ("id" character varying NOT NULL, "block_number" numeric NOT NULL, "caller" text NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "expiration" numeric NOT NULL, "price" numeric, "status" character varying(9) NOT NULL, "surcharge" character varying(7), "updated_at" TIMESTAMP WITH TIME ZONE, "considered_id" character varying, "desired_id" character varying, "nft_id" character varying, CONSTRAINT "REL_4a045cf15c5c5c44e6cf52e70c" UNIQUE ("nft_id"), CONSTRAINT "PK_4a10d0f359339acef77e7f986d9" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_ef7a3bc067c4f3dd314c90f79a" ON "swap" ("considered_id") `)
        await db.query(`CREATE INDEX "IDX_ded173f5a5ff89483d9ffa4dce" ON "swap" ("desired_id") `)
        await db.query(`CREATE UNIQUE INDEX "IDX_4a045cf15c5c5c44e6cf52e70c" ON "swap" ("nft_id") `)
        await db.query(`ALTER TABLE "offer" ADD CONSTRAINT "FK_004a20a1eed4189bc23b13efa0d" FOREIGN KEY ("considered_id") REFERENCES "collection_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "offer" ADD CONSTRAINT "FK_f8c1e3faf9cdba27703e0ea2c54" FOREIGN KEY ("desired_id") REFERENCES "nft_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "offer" ADD CONSTRAINT "FK_71609884f4478ed41be6672a668" FOREIGN KEY ("nft_id") REFERENCES "nft_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "swap" ADD CONSTRAINT "FK_ef7a3bc067c4f3dd314c90f79a5" FOREIGN KEY ("considered_id") REFERENCES "collection_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "swap" ADD CONSTRAINT "FK_ded173f5a5ff89483d9ffa4dce6" FOREIGN KEY ("desired_id") REFERENCES "nft_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "swap" ADD CONSTRAINT "FK_4a045cf15c5c5c44e6cf52e70c2" FOREIGN KEY ("nft_id") REFERENCES "nft_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    }

    async down(db) {
        await db.query(`DROP TABLE "offer"`)
        await db.query(`DROP INDEX "public"."IDX_004a20a1eed4189bc23b13efa0"`)
        await db.query(`DROP INDEX "public"."IDX_f8c1e3faf9cdba27703e0ea2c5"`)
        await db.query(`DROP INDEX "public"."IDX_71609884f4478ed41be6672a66"`)
        await db.query(`DROP TABLE "swap"`)
        await db.query(`DROP INDEX "public"."IDX_ef7a3bc067c4f3dd314c90f79a"`)
        await db.query(`DROP INDEX "public"."IDX_ded173f5a5ff89483d9ffa4dce"`)
        await db.query(`DROP INDEX "public"."IDX_4a045cf15c5c5c44e6cf52e70c"`)
        await db.query(`ALTER TABLE "offer" DROP CONSTRAINT "FK_004a20a1eed4189bc23b13efa0d"`)
        await db.query(`ALTER TABLE "offer" DROP CONSTRAINT "FK_f8c1e3faf9cdba27703e0ea2c54"`)
        await db.query(`ALTER TABLE "offer" DROP CONSTRAINT "FK_71609884f4478ed41be6672a668"`)
        await db.query(`ALTER TABLE "swap" DROP CONSTRAINT "FK_ef7a3bc067c4f3dd314c90f79a5"`)
        await db.query(`ALTER TABLE "swap" DROP CONSTRAINT "FK_ded173f5a5ff89483d9ffa4dce6"`)
        await db.query(`ALTER TABLE "swap" DROP CONSTRAINT "FK_4a045cf15c5c5c44e6cf52e70c2"`)
    }
}
