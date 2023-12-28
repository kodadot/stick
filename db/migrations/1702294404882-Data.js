module.exports = class Data1702294404882 {
    name = 'Data1702294404882'

    async up(db) {
        await db.query(`ALTER TABLE "metadata_entity" ADD "banner" text`)
    }

    async down(db) {
        await db.query(`ALTER TABLE "metadata_entity" DROP COLUMN "banner"`)
    }
}
