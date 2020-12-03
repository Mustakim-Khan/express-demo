const coursesModel = require('../model/coursesModel');

function createCourse(req, res) {
    const newCourse = new coursesModel({ name: req.body.name });
    newCourse.save()
    .then(() =>  {
        return res.status(200).json({ msg: 'Save done'});
        // return res.redirect('/');
    })
    .catch(err => {
        return res.status(500).json({ msg: err.message});
    });
}

function getAll(req, res) {
    coursesModel.find()
    .then((courses) => {
        return res.status(200).json({ result: courses});
    })
    .catch((err) => {
        return res.status(500).json({ msg: err.message});
    })
}

function getOne(req, res) {
    coursesModel.findOne({ _id: req.params.id })
    .then((course) => {
        return res.status(200).json({ result: course });
    })
    .catch((err) => {
        return res.status(500).json({ msg: err.message });
    })
}

function updateCourse(req, res) {
    coursesModel.updateOne({ _id: req.params.id }, { name: req.body.name })
    .then(() => {
        return res.status(200).json({ result: `name: ${ req.body.name }` });
    })
    .catch((err) => {
        return res.status(500).json({ msg: err.message });
    })
}

function deleteCourse(req, res) {
    coursesModel.deleteOne({ _id: req.params.id })
    .then(() => {
        return res.status(200).json({ result: `id: ${ req.params.id }` });
    })
    .catch((err) => {
        return res.status(500).json({ msg: err.message });
    })
}

module.exports = {createCourse, getAll, getOne, updateCourse, deleteCourse}