const BaseRoute = require(appRoot + '/routing/BaseRoute');

class AdminResetRoute extends BaseRoute {
    constructor(core, req, res, params) {
        super(core, req, res, params);
    }

    get paramNames() {
        return ['secret_key', 'login', 'password'];
    }

    async handle() {
        try {
            if (!this.params.secret_key !== this.core.cfg.secret.reset_key)
                return this.complete('Error: no permission for this request!');

            const result = await this.core.db.users.adminReset(this.params.login, this.params.password);

            this.complete(result);
        } catch (err) {
            this.complete(null, err, 'AdminReset error');
        }
    }
}

module.exports = AdminResetRoute;