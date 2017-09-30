const BaseRoute = require(appRoot + '/routing/BaseRoute');

//TODO удалить повторяющиеся элементы из списков групп и курсов
class GroupGetAssignedRoute extends BaseRoute {
    constructor(core, req, res, params) {
        super(core, req, res, params);
    }

    get paramNames() {
        return [];
    }

    async handle() {
        try {
            const groupList = {courses: [], squads: [], ids: {}}, assignedGroupIds = {};

            const groups = await this.core.db.groups.get();
            const assignedGroups = await this.core.db.groupDiscipline.get({discipline_id: this.params.discipline_id});

            for (let i = 0; i < assignedGroups.length; i++) {
                assignedGroupIds[assignedGroups[i].group_id] = true;
            }

            for (let i = 0; i < groups.length; i++) {
                if (!assignedGroupIds[groups[i]._id] && this.params.discipline_id)
                    continue;

                groupList.squads.push(groups[i].squad);
                groupList.courses.push(groups[i].course);
                groupList.ids[`${groups[i].course}_${groups[i].squad}`] = groups[i]._id;
            }

            this.complete(groupList);
        } catch (err) {
            this.core.log.error('GroupGetAssignedRoute error', err);
            this.complete(null, err, 'GroupGetAssignedRoute error');
        }
    }
}

module.exports = GroupGetAssignedRoute;