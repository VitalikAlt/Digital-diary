const Group = require('./table');

class GroupQuery {
    static getId(course, squad) {
        return new Promise((res, rej) => {
            Group.find({course, squad}, (err, data) => {
                return data[0]? res(data[0]._id) : res(undefined);
            })
        });
    }

    static add(course, squad) {
        return new Promise((res, rej) => {
            const newItem = new Group({course, squad});

            newItem.save(function (err) {
                return (!err)? res(newItem._id) : rej(err);
            });
        });
    }

    static update(params, conditions) {
        return new Promise((res, rej) => {
            Group.update(conditions, params, function (err) {
                return (!err)? res(true) : rej(err);
            });
        });
    }

    static delete(params) {
        return new Promise((res, rej) => {
            Group.remove(params, (err, success) => {
                return (!err)? res(success) : rej(err);
            })
        })
    }
}

module.exports = GroupQuery;