const mongoose = require('mongoose');
const users = require('./models/users/query');
const groups = require('./models/groups/query');
const studentProfile = require('./models/student_profiles/query');
const teacherProfile = require('./models/teacher_profiles/query');
const discipline = require('./models/discipline/query');
const groupDiscipline = require('./models/group_discipline/query');

class Db {
    static connect(url) {
        mongoose.connect(url);
    }

    static get users() {
        return users;
    }

    static get groups() {
        return groups;
    }

    static get studentProfile() {
        return studentProfile;
    }

    static get teacherProfile() {
        return teacherProfile;
    }

    static get discipline() {
        return discipline;
    }

    static get groupDiscipline() {
        return groupDiscipline;
    }
}

module.exports = Db;