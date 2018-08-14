const Disciplines = require('./table');

class DisciplinesQuery {
    static get(params = {}) {
        return new Promise((res, rej) => {
            Disciplines.find(params, {
                _v: false
            }, (err, data) => {
                return err ? rej(err) : res(data);
            })
        });
    }

    static getAllTeachersDisciplines(teacherIds) {
        return new Promise((res, rej) => {
            Disciplines.find({
                teacher_id: {
                    $in: teacherIds
                }
            }, {
                _id: true
            }, (err, data) => {
                return err ? rej(err) : res(data.map((el) => {
                    return el._id
                }));
            })
        });
    }

    static getNames(disciplineIds) {
        return new Promise((res, rej) => {
            Disciplines.find({
                _id: {
                    $in: disciplineIds
                }
            }, (err, data) => {
                const names = [];

                for (let i = 0; i < data.length; i++) {
                    names.push(data[i].name);
                }

                return res(names);
            })
        })
    }

    static add(name, teacher_id) {
        return new Promise((res, rej) => {
            const newItem = new Disciplines({
                name,
                teacher_id
            });

            newItem.save(function (err) {
                return (!err) ? res(newItem._id) : rej(err);
            });
        });
    }

    static update(params, conditions) {
        return new Promise((res, rej) => {
            Disciplines.update(conditions, params, function (err) {
                return (!err) ? res(true) : rej(err);
            });
        });
    }

    static delete(params) {
        return new Promise((res, rej) => {
            Disciplines.remove(params, (err, success) => {
                return (!err) ? res(success) : rej(err);
            })
        })
    }

    static deleteAllTeacherDisciplines(teacherIds) {
        return new Promise((res, rej) => {
            Disciplines.remove({
                teacher_id: {
                    $in: teacherIds
                }
            }, (err, success) => {
                return (!err) ? res(success) : rej(err);
            })
        })
    }
}

module.exports = DisciplinesQuery;