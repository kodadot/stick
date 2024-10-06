export const totalTokenEntities = `
SELECT COUNT(DISTINCT ne.token_id) as total_count
FROM nft_entity as ne
JOIN token_entity ON ne.token_id = token_entity.id AND
token_entity.deleted = false
WHERE
    ($1::text IS NULL OR ne.current_owner = $1) AND
    ($6::text IS NULL OR ne.issuer = $6) AND 
    ($5::text[] IS NULL OR ne.issuer NOT IN (SELECT unnest($5))) AND
    ($2::bigint IS NULL OR ne.price >= $2::bigint) AND
    ($3::bigint IS NULL OR ne.price > $3::bigint) AND
    ($4::bigint IS NULL OR ne.price <= $4::bigint) AND
    ($7::text[] IS NULL OR ne.collection_id = ANY($7)) AND
    ($8::text IS NULL OR LOWER(ne.name) LIKE LOWER('%' || $8 || '%')) AND
    ($9::text IS NULL OR ne.kind = $9);
`;
