const BaseRoute = require(appRoot + '/routing/BaseRoute');

//TODO добавить удаление завязанных на него групп и данных из discipline_groups, вызывать ngOnInit (вместо получения списка в роуте)
class TeacherDeleteRoute extends BaseRoute {
    constructor(core, req, res, params) {
        super(core, req, res, params);
    }

    get paramNames() {
        return ['ids'];
    }

    async handle() {
        try {
            const userIds = await this.core.db.teacherProfile.getUserIds(this.params.ids);

            await Promise.all([
                this.core.db.teacherProfile.deleteByIds(this.params.ids),
                this.core.db.users.deleteByIds(userIds),
            ]);

            this.complete(await this.getList());
        } catch (err) {
            this.core.log.error('TeacherDelete error', err);
            this.complete(null, err, 'TeacherDelete error');
        }
    }

    async getList() {
        const teacherList = [];

        const teachers = await this.core.db.teacherProfile.get();

        for (let i = 0; i < teachers.length; i++) {
            teacherList.push({
                id: teachers[i]._id,
                name: `${teachers[i].surname} ${teachers[i].name[0]}. ${teachers[i].father_name[0]}.`
            })
        }

        return teacherList
    }
}

module.exports = TeacherDeleteRoute;