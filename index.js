const http = require('http');
const scraper = require('images-scraper');
const { URL, URLSearchParams } = require('url');

const google = new scraper({
    puppeteer: {
        headless: false,
    },
});

const app = http.createServer(async (req, res) => {
    try {
        const { search } = new URL(req.url, 'http://localhost:3000');

        const query = new URLSearchParams(search);

        const { keyword, amount } = Array.from(query).reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

        if(keyword == null) throw new Error('network error');

        const results = await google.scrape(keyword, amount);

        res.writeHead(200);
        res.end(JSON.stringify(results));
    }
    catch (err) {
        console.error(err);
        res.writeHead(500);
        res.end();
    }

})

app.listen(3000);