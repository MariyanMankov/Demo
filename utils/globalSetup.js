//globalSetup.js file

const dotenv = require('dotenv');
async function globalSetup() {
    try {
        if (process.env.ENV) {
            dotenv.config({
                path: `./env/.env.${process.env.ENV}`,
                override: true
            });
        }else {
            dotenv.config({
                path: `./env/.env.stage`
            });
        }
    } catch (error) {
        console.error("Error in loading environment variables", error)
    }
}
export default globalSetup;