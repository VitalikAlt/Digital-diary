global.appRoot = __dirname + '/../..';
const assert = require('assert');

const BaseRoute = require(appRoot + '/routing/BaseRoute');

const core = {handle: false, log: {debug: () => {}}, errors: {BAD_PARAMS: () => {}}};
const res = {setHeader: () => {}, writeHead: () => {}, end: () => {}};
const params = {};

class TestClass extends BaseRoute {
    constructor(core, req, res, params) {
        super(core, req, res, params)
    }

    handle() {
        core.handle = true;
    }
}

const testClass = new TestClass(core, null, res, params);

describe('Test checkParamsAndHandle', () => {
    it('no paramNames', async () => {
        await testClass.checkParamsAndHandle();
        assert.equal(core.handle, true)
    });

    it('paramNames has 0 length', async () => {
        core.handle = false;
        testClass.paramNames = [];
        await testClass.checkParamsAndHandle();
        assert.equal(core.handle, true)
    });

    it('params are right', async () => {
        core.handle = false;
        testClass.params = {a: 1};
        testClass.paramNames = ['a'];
        await testClass.checkParamsAndHandle();
        assert.equal(core.handle, true)
    });

    it('roles are not right', async () => {
        core.handle = false;
        testClass.paramNames = ['a', 'b'];
        await testClass.checkParamsAndHandle();
        assert.equal(core.handle, false)
    });

    it('params are not right', async () => {
        core.handle = false;
        testClass.checkRoles = () => {return false};
        await testClass.checkParamsAndHandle();
        assert.equal(core.handle, false)
    });
});