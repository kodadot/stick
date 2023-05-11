export const activeWallets = `
    SELECT COUNT(DISTINCT e.caller) as total
    FROM event e`;
