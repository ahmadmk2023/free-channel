const http = require('http');
const https = require('https');
const url = require('url');

const proxy = http.createServer((req, res) => {
    const targetUrl = url.parse(req.url.slice(1));
    const options = {
        hostname: targetUrl.hostname,
        path: targetUrl.path,
        headers: {
            'Referer': 'https://snrtlive.ma/'
        }
    };

    const proxyReq = https.request(options, (proxyRes) => {
        res.writeHead(proxyRes.statusCode, proxyRes.headers);
        proxyRes.pipe(res, { end: true });
    });

    req.pipe(proxyReq, { end: true });
});

proxy.listen(8080, () => {
    console.log('Proxy server is running on http://localhost:8080');
});
