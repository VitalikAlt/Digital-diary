const BaseRoute = require(appRoot + '/routing/BaseRoute');

class ChangePasswordRoute extends BaseRoute {
    constructor(core, req, res, params) {
        super(core, req, res, params);
    }

    get paramNames() {
        return ['id', 'new_password'];
    }

    async handle() {
        try {
            //TODO: убрать заглушку на роль пользователя
            const role = 'admin';

            if (!(await this.core.db.users.getById(this.params.id)))
                return this.complete(null, 'Error: incorrect data', 'No user with that id!');

            if (role === 'admin')
                await this.core.db.users.updatePassword(this.params.id, this.params.new_password);
            else
                //sadsadsadasd
                console.log(1111111111111)

            this.complete(true);
        } catch (err) {
            this.core.log.error('ChangePassword', err);
            this.complete(null, err, 'ChangePassword error');
        }
    }
}

module.exports = ChangePasswordRoute;