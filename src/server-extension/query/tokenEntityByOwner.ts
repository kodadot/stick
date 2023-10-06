export const tokenEntityByOwner = `WITH CheapestNFT AS (
    SELECT 
        ne.token_id,
        MIN(ne.price) AS "cheapestNFTPrice"
    FROM 
        nft_entity ne
    WHERE 
        ne.current_owner = $1
    GROUP BY
        ne.token_id
)

SELECT
    t.id as id,
    t.name as name,
    t.image as image,
    t.media as media,
    t.block_number as "blockNumber",
    t.created_at AS "createdAt",
    t.updated_at AS "updatedAt",
    COUNT(ne.id) as count,
    
    c."cheapestNFTPrice",
    
    col.id AS "collectionId",
    col.name AS "collectionName"
FROM
    token_entity as t
    LEFT JOIN nft_entity as ne ON t.id = ne.token_id AND ne.current_owner = $1
    LEFT JOIN CheapestNFT as c ON t.id = c.token_id
    LEFT JOIN collection_entity as col ON t.collection_id = col.id
GROUP BY
    t.id, c."cheapestNFTPrice", col.id
HAVING 
    COUNT(ne.id) > 0 AND
    ($5::bigint IS NULL OR c."cheapestNFTPrice" >= $5::bigint) AND
    ($6::bigint IS NULL OR c."cheapestNFTPrice" > $6::bigint) AND
    ($7::bigint IS NULL OR c."cheapestNFTPrice" <= $7::bigint)

ORDER BY $4 LIMIT $2 OFFSET $3;

`