const BaseRoute = require(appRoot + '/routing/BaseRoute');

class TeacherDeleteRoute extends BaseRoute {
    constructor(core, req, res, params) {
        super(core, req, res, params);
    }

    get paramNames() {
        return ['ids'];
    }

    get roles() {
        return ['admin']
    }

    async handle() {
        try {
            const userIds = await this.core.db.teacherProfile.getUserIds(this.params.ids);

            const teacherDisciplineIds = await this.core.db.discipline.getAllTeachersDisciplines(this.params.ids)

            const deletePrms = [
                this.core.db.teacherProfile.deleteByIds(this.params.ids),
                this.core.db.users.deleteByIds(userIds),
                this.core.db.discipline.deleteAllTeacherDisciplines(this.params.ids),
                this.core.db.scheduleCell.deleteByDisciplineIds(teacherDisciplineIds)
            ];

            for (let i = 0; i < teacherDisciplineIds.length; i++) {
                deletePrms.push(
                    this.core.db.groupDiscipline.delete({
                        discipline_id: teacherDisciplineIds[i]
                    }),
                    this.core.db.termMarks.delete({
                        discipline_id: teacherDisciplineIds[i]
                    })
                )
            }

            await Promise.all(deletePrms)
            this.complete(true);
        } catch (err) {
            this.core.log.error('TeacherDelete error', err);
            this.complete(null, err, 'TeacherDelete error');
        }
    }
}

module.exports = TeacherDeleteRoute;