const asyncHandler = require("express-async-handler");
const { getAllStudents, addNewStudent, getStudentDetail, setStudentStatus, updateStudent } = require("./students-service");

const handleGetAllStudents = asyncHandler(async (req, res) => {
    const students = await getAllStudents(req.query);

  
    return res.status(200).json({
        success: true,
        data: students
    });
  

});

const handleAddStudent = asyncHandler(async (req, res) => {
    const student = await addNewStudent(req.body);


    return res.status(201).json({
        success: true,
        message: "Student created successfully",
        data: student
    });
  

});

const handleUpdateStudent = asyncHandler(async (req, res) => {
    const student = await updateStudent(req.body);

   
    return res.status(200).json({
        success: true,
        message: "Student updated successfully",
        data: student
    });
  

});

const handleGetStudentDetail = asyncHandler(async (req, res) => {
    const { id } = req.params;

   
    const student = await getStudentDetail(id);

    if (!student) {
        return res.status(404).json({
            success: false,
            message: "Student not found"
        });
    }

    return res.status(200).json({
        success: true,
        data: student
    });
   

});

const handleStudentStatus = asyncHandler(async (req, res) => {
    const { userId, status } = req.body;

  
    const reviewerId = req.user.id;

    const updated = await setStudentStatus({
        userId,
        reviewerId,
        status
    });

    return res.status(200).json({
        success: true,
        message: "Student status updated successfully",
        data: {
            updated
        }
    });
   

});

module.exports = {
handleGetAllStudents,
handleGetStudentDetail,
handleAddStudent,
handleStudentStatus,
handleUpdateStudent,
};
