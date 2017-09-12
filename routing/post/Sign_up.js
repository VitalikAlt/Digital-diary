const BaseRoute = require(appRoot + '/routing/BaseRoute');

class SignUpRoute extends BaseRoute {
    constructor(core, req, res, params) {
        super(core, req, res, params);
    }

    get allowedRoles() {
        return ['student', 'teacher', 'admin']
    }

    get paramNames() {
        return ['login', 'password', 'user'];
    }

    async handle() {
        try {
            if (!(await this.checkDataForSignUp()))
                return;

            await this.core.db.users.add({
                login: this.params.user.login,
                password: this.params.user.password,
                role: this.params.user.role
            });

            this.complete(true);
        } catch (err) {
            this.complete(null, err, 'SignUp error');
        }
    }

    async checkDataForSignUp() {
        const sender = await this.core.db.users.getUser(this.params.login, this.params.password);

        if (!sender || sender.role !== 'admin') {
            this.complete('Error: no permission for this request!');
            return false;
        }

        if (!this.params.user.login || !this.params.user.password || this.allowedRoles.indexOf(this.params.user.role) === -1) {
            this.complete('Error: wrong user params!');
            return false;
        }

        const exist = await this.core.db.users.getUserLoginExist(this.params.user.login);

        if (exist) {
            this.complete('Error: user already exist!');
            return false;
        }

        return true;
    }
}

module.exports = SignUpRoute;