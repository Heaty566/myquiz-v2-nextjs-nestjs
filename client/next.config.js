require('dotenv').config({ path: `./config/.env.${process.env.NODE_ENV}` });
const withBundleAnalyzer = require('@next/bundle-analyzer')({
        enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
        env: {
                SERVER_URL: process.env.SERVER_URL,
                DOMAIN: process.env.DOMAIN,
        },
});
