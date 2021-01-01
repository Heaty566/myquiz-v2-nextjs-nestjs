require('dotenv').config({ path: `./config/.env.${process.env.NODE_ENV}` });

module.exports = {
        env: {
                SERVER_URL: process.env.SERVER_URL,
                DOMAIN: process.env.DOMAIN,
        },
};
