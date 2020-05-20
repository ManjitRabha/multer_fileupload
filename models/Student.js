const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  fatherName: {
    type: String,
    required: true,
  },
  courses: {
    type: String,
    required: true,
  },
  profilepic: {
    type: String,
  },
});
const Student = mongoose.model("student", studentSchema);
module.exports = Student;
