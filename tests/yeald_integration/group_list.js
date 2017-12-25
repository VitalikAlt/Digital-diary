global.appRoot = __dirname + '/../..';
const assert = require('assert');

const Server = require(appRoot + '/Server');
const GroupsListRoute = require(appRoot + '/routing/post/group/List');

new Server(async (core) => {
    const result = {};
    const groupsListRoute = new GroupsListRoute(core, null, null, {});
    groupsListRoute.complete = function(res, err, message) {
        result.data = res;
    };

    describe('Test group list', () => {
        it('no data in db', async () => {
            await core.db.groups.delete({course: 1});
            await core.db.groups.delete({course: 2});
            await groupsListRoute.handle();
            assert.equal(JSON.stringify(result.data), JSON.stringify([]))
        });

        it('one element in db', async () => {
            const id = await core.db.groups.add(1, 1);
            await core.db.studentProfile.add({user_id: '1', group_id: id});
            await groupsListRoute.handle();
            assert.equal(JSON.stringify(result.data), JSON.stringify([{course: 1, squad: 1, student_count: 1}]))
        });

        it('success complete', async () => {
            const id = await core.db.groups.add(2, 1);
            await core.db.studentProfile.add({user_id: '2', group_id: id});
            groupsListRoute.handle();
            assert.equal(JSON.stringify(result.data), JSON.stringify([{course: 1, squad: 1, student_count: 1}]));
            assert.notEqual(JSON.stringify(result.data), JSON.stringify([
                {course: 1, squad: 1, student_count: 1},
                {course: 2, squad: 1, student_count: 1}
            ]));
            setTimeout(core.stop, 20);
        });
    });
});