export const totalTokenEntities = `
SELECT COUNT(DISTINCT token_id) as total_count
FROM nft_entity
WHERE
    ($1::text IS NULL OR current_owner = $1) AND
    ($6::text IS NULL OR issuer = $6) AND 
    ($5::text[] IS NULL OR issuer NOT IN (SELECT unnest($5))) AND
    ($2::bigint IS NULL OR price >= $2::bigint) AND
    ($3::bigint IS NULL OR price > $3::bigint) AND
    ($4::bigint IS NULL OR price <= $4::bigint) AND
    ($7::text[] IS NULL OR nft_entity.collection_id = ANY($7)) AND
    ($8::text IS NULL OR LOWER(nft_entity.name) LIKE LOWER('%' || $8 || '%'));
`
