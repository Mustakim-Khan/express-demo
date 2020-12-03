const express = require('express');
const {createCourse, getAll, getOne, updateCourse, deleteCourse} = require('../controller/coursesController');

const validation = require('../middleware/validation');

const router = express.Router();

router.post('/create', validation, createCourse);

router.get('/get', getAll);
router.get('/get/:id', getOne);

router.put('/update/:id', validation, updateCourse);

router.delete('/delete/:id', deleteCourse);

module.exports = router;