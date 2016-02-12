const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
	for (var i = 0; i < numCPUs; i++) {
		cluster.fork();
	}
	cluster.on('exit', (worker, code, signal) => {
		console.log(`worker ${worker.process.pid} died`);
	});
	console.log('Server started, using ' + numCPUs + ' cores and ' + (numCPUs*2) + ' processes...');
} else {
	http.createServer((req, res) => {
		body = '<h1>Hello world</h1>\n';
		res.writeHead(200, {
			'Content-Length': body.length,
			'Content-Type': 'text/html;charset=utf-8'
		});
		res.end(body);
	}).listen(8080);
}
