const BaseRoute = require(appRoot + '/routing/BaseRoute');

class MissesGetByDateRoute extends BaseRoute {
    constructor(core, req, res, params) {
        super(core, req, res, params);
    }

    get paramNames() {
        return ['date'];
    }

    async handle() {
        try {
            const test = await this.core.db.studentMisses.get({date: this.params.date});

            this.complete(test);
        } catch (err) {
            this.core.log.error('MissesGetByDateRoute error', err);
            this.complete(null, err, 'MissesGetByDateRoute error');
        }
    }
}

module.exports = MissesGetByDateRoute;