export const tokenEntities = `WITH 
filters_applied AS (
    SELECT *
    FROM nft_entity ne
    WHERE
        ($1::text IS NULL OR ne.current_owner = $1) AND 
        ($8::text IS NULL OR ne.issuer = $8) AND 
        ($7::text[] IS NULL OR ne.issuer NOT IN (SELECT unnest($7))) AND
        ($4::bigint IS NULL OR ne.price >= $4::bigint) AND
        ($5::bigint IS NULL OR ne.price > $5::bigint) AND
        ($6::bigint IS NULL OR ne.price <= $6::bigint) AND
        ($9::text[] IS NULL OR ne.collection_id = ANY($9))
),
nft_count AS (
    SELECT 
        token_id, 
        COUNT(*) as count,
        COUNT(CASE WHEN burned = false THEN 1 END) as supply
    FROM 
        filters_applied

    GROUP BY 
        token_id
),
cheapest AS (
    SELECT DISTINCT ON (token_id)
        current_owner,
        token_id,
        id,
        price
    FROM filters_applied
    WHERE burned = false
    ORDER BY token_id, price ASC, id ASC
)


SELECT
    t.id as id,
    t.name as name,
    t.image as image,
    t.media as media,
    t.metadata as metadata,
    me.id as meta_id,
    me.description as meta_description,
    me.image as meta_image,
    me.animation_url as meta_animation_url,
    t.block_number as block_number,
    t.created_at AS created_at,
    t.updated_at AS updated_at,
    cheapest.id as cheapest_id,
    cheapest.price as cheapest_price,
    cheapest.current_owner as cheapest_current_owner,
    nc.count as count,
    nc.supply as supply,
    col.id AS collection_id,
    col.name AS collection_name
FROM
    token_entity as t
        JOIN collection_entity as col ON t.collection_id = col.id
        JOIN metadata_entity as me ON t.meta_id = me.id
        JOIN nft_count as nc ON t.id = nc.token_id
        LEFT JOIN cheapest ON t.id = cheapest.token_id
WHERE
    nc.supply > 0 AND 
    t.deleted = false AND
    ($10::text IS NULL OR LOWER(t.name) LIKE LOWER('%' || $10 || '%'))
`
