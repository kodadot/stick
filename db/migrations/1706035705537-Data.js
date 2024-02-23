module.exports = class Data1706035705537 {
    name = 'Data1706035705537'

    async up(db) {
        await db.query(`CREATE TABLE "cache_status" ("id" character varying NOT NULL, "last_block_timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_1001e39eb0aa38d043d96f7f4fa" PRIMARY KEY ("id"))`)
    }

    async down(db) {
        await db.query(`DROP TABLE "cache_status"`)
    }
}
