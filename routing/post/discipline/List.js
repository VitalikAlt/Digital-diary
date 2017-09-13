const BaseRoute = require(appRoot + '/routing/BaseRoute');

class TeacherListRoute extends BaseRoute {
    constructor(core, req, res, params) {
        super(core, req, res, params);
    }

    get paramNames() {
        return [];
    }

    async handle() {
        try {
            // const disciplineList = [];
            //
            // const disciplines = await this.core.db.discipline.get();
            //
            // for (let i = 0; i < disciplines.length; i++) {
            //     teacherList.push({
            //         id: teachers[i]._id,
            //         name: `${teachers[i].surname} ${teachers[i].name[0]}. ${teachers[i].father_name[0]}.`
            //     })
            // }

            this.complete([]);
        } catch (err) {
            this.core.log.error('TeacherList error', err);
            this.complete(null, err, 'TeacherList error');
        }
    }
}

module.exports = TeacherListRoute;