global.appRoot = __dirname + '/../..';
const assert = require('assert');

const Sign_in = require(appRoot + '/routing/post/Sign_in');

let result;
const core = {
    db: {
        usersData: [
                {login: 'a', password: '1', _id: 1, role: 'admin'}
        ],
        users: {
            getUser: (login, password) => {
                return core.db.usersData.filter((el) => {
                    return el.login === login && el.password === password
                })[0]
            }
        }
    },
    log: {debug: () => {}},
    errors: {
        BAD_PARAMS: () => {}
    }
}, params = {};
const res = {setHeader: () => {}, writeHead: () => {}, end: () => {}};

const sign_in = new Sign_in(core, null, res, params);

sign_in.complete = function(req, err, message) {
    if (err)
        return result = err;
    result = req;
};

describe('Test sign in', () => {
    //Проверка на то, что если данные объект юзера есть в бд, то метод вернёт верный объект
    it('row in db', async () => {
        params.login = 'a';
        params.password = '1';
        await sign_in.handle();
        assert.equal(result.role, 'admin');
    });

    //Проверка на то, что если данные объект юзера нет в бд, то метод вернёт верный объект
    it('no row with id in db', async () => {
        params.login = 'a1';
        params.password = '1';
        await sign_in.handle();
        assert.equal(result, 'Error: incorrect data');
    });

    //Проверка на то, что если данные объект юзеров нет в бд, то метод вернёт верный объект
    it('no row in db', async () => {
        core.db.usersData = [];
        await sign_in.handle();
        assert.equal(result, 'Error: incorrect data');
    });

    //Проверяем на кейсоустойчивость
    it('match case', async () => {
        params.login = 'A';
        params.password = '1';
        await sign_in.handle();
        assert.equal(result, 'Error: incorrect data')
    });
});