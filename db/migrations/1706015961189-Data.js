module.exports = class Data1706015961189 {
    name = 'Data1706015961189'

    async up(db) {
        await db.query(`ALTER TABLE "collection_entity" ADD "type" character varying(8)`)
        await db.query(`ALTER TABLE "collection_entity" ADD "settings" jsonb`)
    }

    async down(db) {
        await db.query(`ALTER TABLE "collection_entity" DROP COLUMN "type"`)
        await db.query(`ALTER TABLE "collection_entity" DROP COLUMN "settings"`)
    }
}
