global.appRoot = __dirname + '/../..';
const assert = require('assert');

const BaseRoute = require(appRoot + '/routing/BaseRoute');

class Moka extends BaseRoute{
    constructor(core, req, res, params) {
        super(core, req, res, params)
    }

    handle() {

    }
}

const testMoka = new Moka({}, null, null, {});
const result = {};

testMoka.sendResponse = function(data, code) {
    result.data = data;
    result.code = code;
};

describe('Test base route complete', () => {
    it('no data', async () => {
        testMoka.complete();
        assert.equal(result.code, 400);
    });

    it('string data', async () => {
        testMoka.complete('test message');
        assert.equal(result.data, 'test message');
        assert.equal(result.code, 200);
    });

    it('object data', async () => {
        testMoka.complete({text: 'test message'});
        assert.equal(JSON.stringify(result.data), JSON.stringify({text: 'test message'}));
        assert.equal(result.code, 200);
    });

    it('error', async () => {
        testMoka.complete(null, new Error('error message'), 'some error message');
        assert.equal(result.data.message, 'some error message');
        assert.equal(result.data.err.message, 'error message');
        assert.equal(result.code, 400);
    });
});