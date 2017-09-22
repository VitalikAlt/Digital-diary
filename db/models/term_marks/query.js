const TermMarks = require('./table');

class TermMarksQuery {
    static get(discipline_id, student_ids) {
        return new Promise((res, rej) => {
            TermMarks.find({discipline_id, student_id: { $in: student_ids }}, {_v: false}, (err, data) => {
                return err? rej(err) : res(data);
            })
        });
    }

    static getId(course, squad) {
        return new Promise((res, rej) => {
            TermMarks.find({course, squad}, (err, data) => {
                return data[0]? res(data[0]._id) : res(undefined);
            })
        });
    }

    static add(data) {
        return new Promise((res, rej) => {
            const newItem = new TermMarks(data);

            newItem.save(function (err) {
                return (!err)? res(newItem._id) : rej(err);
            });
        });
    }

    static update(params, conditions = {}) {
        return new Promise((res, rej) => {
            TermMarks.update(conditions, params, function (err) {
                return (!err)? res(true) : rej(err);
            });
        });
    }

    static delete(params) {
        return new Promise((res, rej) => {
            TermMarks.remove(params, (err, success) => {
                return (!err)? res(success) : rej(err);
            })
        })
    }
}

module.exports = TermMarksQuery;