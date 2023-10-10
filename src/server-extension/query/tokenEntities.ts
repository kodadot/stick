export const tokenEntities = `WITH 
nft_count AS (
    SELECT 
        token_id, 
        COUNT(*) as count,
        COUNT(CASE WHEN burned = false THEN 1 END) as supply
    FROM 
        nft_entity ne
    WHERE 
    ($1::text IS NULL OR ne.current_owner = $1) AND 
    ($7::text[] IS NULL OR ne.issuer NOT IN (SELECT unnest($7)))
    GROUP BY 
        token_id
),
 collection_floor_price AS (
    SELECT
        collection_id,
        MIN(price) as floor_price
    FROM 
        nft_entity
    WHERE 
        burned = false
    GROUP BY 
        collection_id
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
    c.id as cheapest_id,
    c.price as cheapest_price,
    nft_count.count as count,
    nft_count.supply as supply,
    col.id AS collection_id,
    col.name AS collection_name,
    cfp.floor_price AS collection_floor_price
FROM
    token_entity as t
        JOIN collection_entity as col ON t.collection_id = col.id
        JOIN metadata_entity as me ON t.meta_id = me.id
        JOIN nft_count ON t.id = nft_count.token_id
        JOIN collection_floor_price as cfp ON t.collection_id = cfp.collection_id
        LEFT JOIN nft_entity as c ON t.cheapest_id = c.id
WHERE
    ($4::bigint IS NULL OR c.price >= $4::bigint) AND
    ($5::bigint IS NULL OR c.price > $5::bigint) AND
    ($6::bigint IS NULL OR c.price <= $6::bigint)
`
