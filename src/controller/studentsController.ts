import { studentModel } from '../models/student';
//import { teacherModel } from '../models/teacher';

class StudentsController {
    // @ts-ignore
    public async createStudent(req, res, next) {
        try {
            const createdStudent = await studentModel.create(req.body);

            res.json(createdStudent);
        } catch (e) {
            next(e);
        }
    }

    // @ts-ignore
    public async getStudents(req, res, next) {
        try {
            let students = await studentModel.find({})
                .populate('teacher');
            // await teacherModel.create({
            //  name: 'Olena',
            //  age: 34,
            //  email: 'olenkaskursy@gmail.com    '
            // })

            console.log(students);

            res.json(students);
        } catch (e) {
            next(e);
        }
    }

    // @ts-ignore
    public async updateStudent(req, res, next) {
        try {
            const updatedStudent = await studentModel.findByIdAndUpdate(
                req.params.student_id,
                { teacher: '625ede7dadb4d686eef7709b' },
                { new: true }
            );

            res.json(updatedStudent);
        } catch (e) {
            next(e);
        }
    }
}

export const studentsController = new StudentsController();
