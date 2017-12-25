global.appRoot = __dirname + '/../..';
const assert = require('assert');

const StudentProfileQuery = require(appRoot + '/db/models/student_profiles/query');

describe('Test db student profile get', () => {
    it('no rows in db', async () => {
        await StudentProfileQuery.delete();
        const res = await StudentProfileQuery.get();
        assert.equal(JSON.stringify(res), JSON.stringify([]))
    });

    it('one element in db', async () => {
        await StudentProfileQuery.add({user_id: 1, group_id: 2});
        const res = await StudentProfileQuery.get();
        assert.equal(res.length, 1)
    });

    it('more than one row in db', async () => {
        await StudentProfileQuery.add({user_id: 1, group_id: 2});
        const res = await StudentProfileQuery.get();
        assert.equal(res.length, 2)
    });
});