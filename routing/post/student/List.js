const BaseRoute = require(appRoot + '/routing/BaseRoute');

class StudentListRoute extends BaseRoute {
    constructor(core, req, res, params) {
        super(core, req, res, params);
    }

    get paramNames() {
        return [];
    }

    async handle() {
        try {
            const studentList = await this.core.db.studentProfile.get();
            this.complete(studentList);
        } catch (err) {
            this.core.log.error('StudentList error', err);
            this.complete(null, err, 'StudentList error');
        }
    }
}

module.exports = StudentListRoute;