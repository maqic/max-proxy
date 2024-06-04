const http = require('http');
const httpProxy = require('http-proxy');

const PORT = 9898;
const TARGET = 'https://v5api.maxjia.com';

const proxy = httpProxy.createProxyServer({ target: TARGET, changeOrigin: true });

const server = http.createServer((req, res) => {
  proxy.web(req, res, {}, (err) => {
    console.error('Proxy error:', err);
    res.writeHead(502, { 'Content-Type': 'text/plain' });
    res.end('Bad Gateway');
  });
});

server.listen(PORT, () => {
  console.log(`Proxy server is listening on port ${PORT}`);
});
