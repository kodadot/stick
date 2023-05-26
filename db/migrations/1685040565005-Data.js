module.exports = class Data1685040565005 {
    name = 'Data1685040565005'

    async up(db) {
        await db.query(`ALTER TABLE "nft_entity" ADD "version" integer NOT NULL`)
        await db.query(`ALTER TABLE "collection_entity" ADD "version" integer NOT NULL`)
    }

    async down(db) {
        await db.query(`ALTER TABLE "nft_entity" DROP COLUMN "version"`)
        await db.query(`ALTER TABLE "collection_entity" DROP COLUMN "version"`)
    }
}
