export const tokenEntities = `WITH cheapest_nft AS (
    SELECT 
        ne.token_id,
        ne.id AS nft_id,
        ne.price AS cheapest,
        ROW_NUMBER() OVER(PARTITION BY ne.token_id ORDER BY ne.price ASC) AS rnk
    FROM 
        nft_entity ne
    WHERE 
    ($1::text IS NULL OR ne.current_owner = $1) AND 
    ($7::text[] IS NULL OR ne.issuer NOT IN (SELECT unnest($7)))
),
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
    nft_count.count as count,
    nft_count.supply as supply,
    c.nft_id as cheapest_id,
    c.cheapest as cheapest_price,
    col.id AS collection_id,
    col.name AS collection_name
FROM
    token_entity as t
        JOIN cheapest_nft as c ON t.id = c.token_id AND c.rnk = 1
        JOIN collection_entity as col ON t.collection_id = col.id
        JOIN metadata_entity as me ON t.meta_id = me.id
        JOIN nft_count ON t.id = nft_count.token_id
WHERE
    ($4::bigint IS NULL OR c.cheapest >= $4::bigint) AND
    ($5::bigint IS NULL OR c.cheapest > $5::bigint) AND
    ($6::bigint IS NULL OR c.cheapest <= $6::bigint)
`
