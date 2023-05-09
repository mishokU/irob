const cron = require('node-cron');
const axios = require("axios");

const api = axios.create({
    baseURL: 'http://server:5000',
});

async function indexRequirementsDay() {
    await api.post('/room/requirements/index', {}).catch((error) => {
        console.error("Error in day indexing: " + error);
    });
}

// Remove the error.log file every twenty-first day of the month.
cron.schedule('0 0 */1 * *', async function () {
    console.log('---------------------');
    const datetime = new Date();
    const date = datetime.toISOString().slice(0, 10)
    console.log('Index all days at: ' + date);
    await indexRequirementsDay().then(r => {})
}).start();