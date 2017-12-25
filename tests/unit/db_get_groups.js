global.appRoot = __dirname + '/../..';
const assert = require('assert');

const GroupQuery = require(appRoot + '/db/models/groups/query');

describe('Test db groups get', () => {
    it('no rows in db', async () => {
        await GroupQuery.delete();
        const res = await GroupQuery.get();
        assert.equal(JSON.stringify(res), JSON.stringify([]))
    });

    it('one element in db', async () => {
        await GroupQuery.add('1', '1');
        const res = await GroupQuery.get();
        assert.equal(res.length, 1)
    });

    it('more than one row in db', async () => {
        await GroupQuery.add('1', '2');
        const res = await GroupQuery.get();
        assert.equal(res.length, 2)
    });
});