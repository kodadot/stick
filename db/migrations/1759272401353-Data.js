module.exports = class Data1759272401353 {
    name = 'Data1759272401353'

    async up(db) {
        await db.query(`ALTER TABLE "metadata_entity" DROP COLUMN "kind"`)
        await db.query(`ALTER TABLE "metadata_entity" ADD "kind" character varying(11)`)
        await db.query(`ALTER TABLE "collection_entity" DROP COLUMN "kind"`)
        await db.query(`ALTER TABLE "collection_entity" ADD "kind" character varying(11)`)
    }

    async down(db) {
        await db.query(`ALTER TABLE "metadata_entity" ADD "kind" character varying(6)`)
        await db.query(`ALTER TABLE "metadata_entity" DROP COLUMN "kind"`)
        await db.query(`ALTER TABLE "collection_entity" ADD "kind" character varying(6)`)
        await db.query(`ALTER TABLE "collection_entity" DROP COLUMN "kind"`)
    }
}
