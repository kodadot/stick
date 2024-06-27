module.exports = class Data1719489409922 {
    name = 'Data1719489409922'

    async up(db) {
        await db.query(`ALTER TABLE "collection_entity" ADD "base_uri" text`)
    }

    async down(db) {
        await db.query(`ALTER TABLE "collection_entity" DROP COLUMN "base_uri"`)
    }
}
