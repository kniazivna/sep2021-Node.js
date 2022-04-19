import { Router } from 'express';

import { studentsController } from '../controller';

const router = Router();

router.post('/', studentsController.createStudent);



router.get('/', studentsController.getStudents);

router.patch('/:student_id', studentsController.updateStudent);

export const studentsRouter = router;
