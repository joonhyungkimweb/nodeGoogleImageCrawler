const scraper = require("images-scraper");

const google = new scraper({
    puppeteer: {
        headless: false,
    },
});

console.log("google", google);

(async() => {
    try {
        console.log('brower ready');
        const results = await google.scrape('banana', 200);
        console.log('results', results);
    }
    catch (err) {
        console.error(err);
    }
})();