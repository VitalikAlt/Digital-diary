const fs = require('fs');
const BaseRoute = require(appRoot + '/routing/BaseRoute');

class IndexRoute extends BaseRoute{
    constructor(core, req, res, params) {
        super(core, req, res, params);
    }

    handle() {
        let path = (this.req.url === '/')? 'index.html' : this.req.url;

        if (path.indexOf('?') !== -1)
          path = path.slice(0, path.indexOf('?'))

        const html = fs.readFileSync(`./frontend/dist/${path}`);

        this.res.writeHeader(200, {"Content-Type": "text/html"});
        this.res.write(html);
        this.res.end();
    }
}

module.exports = IndexRoute;
