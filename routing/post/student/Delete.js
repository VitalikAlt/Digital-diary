const BaseRoute = require(appRoot + '/routing/BaseRoute');

class StudentDeleteRoute extends BaseRoute {
    constructor(core, req, res, params) {
        super(core, req, res, params);
    }

    get paramNames() {
        return [];
    }

    async handle() {
        try {
            // if (await this.core.db.users.getUserLoginExist(this.params.login))
            //     this.complete(null, 'Error: incorrect data', 'No user with that id!');
            //
            // const userId = await this.core.db.users.add(this.params);
            //
            // let groupId = await this.core.db.groups.get(this.params.course, this.params.squad);
            // groupId = groupId || (await this.core.db.groups.add(this.params.course, this.params.squad));
            //
            // await this.core.db.studentProfile.add(Object.assign(this.params, {group_id: groupId, user_id: userId}));
            this.complete(true);
        } catch (err) {
            this.core.log.error('StudentDelete error', err);
            this.complete(null, err, 'StudentDelete error');
        }
    }
}

module.exports = StudentDeleteRoute;