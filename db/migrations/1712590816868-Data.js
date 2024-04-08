module.exports = class Data1712590816868 {
    name = 'Data1712590816868'

    async up(db) {
        await db.query(`CREATE INDEX "IDX_f0abf665028feb26e32d4201c5" ON "nft_entity" ("created_at") `)
    }

    async down(db) {
        await db.query(`DROP INDEX "public"."IDX_f0abf665028feb26e32d4201c5"`)
    }
}
