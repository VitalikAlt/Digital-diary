const StudentProfile = require('./table');

class StudentProfileQuery {
    static get(params = {}) {
        return new Promise((res, rej) => {
            StudentProfile.find(params, (err, data) => {
                return res(data);
            })
        });
    }

    static add(el) {
        return new Promise((res, rej) => {
            const newItem = new StudentProfile(el);

            newItem.save(function (err) {
                return (!err)? res(newItem) : rej(err);
            });
        });
    }

    static update(params, conditions) {
        return new Promise((res, rej) => {
            StudentProfile.update(conditions, params, function (err) {
                return (!err)? res(true) : rej(err);
            });
        });
    }

    static delete(params) {
        return new Promise((res, rej) => {
            StudentProfile.remove(params, (err, success) => {
                return (!err)? res(success) : rej(err);
            })
        })
    }
}

module.exports = StudentProfileQuery;