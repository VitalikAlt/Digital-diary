const BaseRoute = require(appRoot + '/routing/BaseRoute');

class UserGetRoute extends BaseRoute {
    constructor(core, req, res, params) {
        super(core, req, res, params);
    }

    get paramNames() {
        return ['id'];
    }

    async handle() {
        try {
            const user = await this.core.user.getById(this.params.id);

            if (!user)
                return this.complete(null, 'Error: incorrect data', 'No user with that id!');

            this.complete(user);
        } catch (err) {
            this.core.log.error('UserGet error', err);
            this.complete(null, err, 'UserGet error');
        }
    }
}

module.exports = UserGetRoute;