var http = require('http'),
    exec = require('child_process').exec,
    fs = require('fs'),
    LOG = __dirname + '/log';

fs.openSync(LOG, 'a');
let hooks = fs.readFileSync('hooks.json');
hooks = JSON.parse(hooks);

http.createServer(function(req, res) {

    for (let i in hooks) {
        if (req.url === hooks[i].url) {
            let SCRIPT = 'sh ' + __dirname + '/bash/' + hooks[i].command;
            exec([SCRIPT, '>>', LOG, '2>&1'].join(' '))
            res.writeHead(200);
            return res.end("success deploy");
        }
    }

    res.writeHead(405);
    res.end("access forbidden");

}).listen(8088);