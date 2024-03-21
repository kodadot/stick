module.exports = class Data1711017751137 {
    name = 'Data1711017751137'

    async up(db) {
        await db.query(`ALTER TABLE "token_entity" ADD "deleted" boolean NOT NULL`)
    }

    async down(db) {
        await db.query(`ALTER TABLE "token_entity" DROP COLUMN "deleted"`)
    }
}
