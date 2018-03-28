const mongoose = require('mongoose');

const studentMisses = mongoose.Schema;

const StudentMisses = new studentMisses({
    student_id: { type: String, required: true },
    lesson_number: { type: Number, required: true, min: 0, max: 4 },
    date: { type: Date, required: true},
    reason: { type: String, required: true }
});

const StudentMissesModel = mongoose.model('student_misses', StudentMisses);

module.exports = StudentMissesModel;