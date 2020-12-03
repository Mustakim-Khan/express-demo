const express = require('express');
const app = express();
const Joi = require('joi');

app.use(express.json());

const courses = [
    { id: 1, name: 'course1'},
    { id: 2, name: 'course2'},
    { id: 3, name: 'course3'}
];

app.get('/', (req, res) => {
    res.send('In ' + req.path);
})

app.get('/api', (req, res) => {
    res.send('In ' + req.path);
})

app.get('/api/courses', (req, res) => {
    // res.send('In ' + req.path);
    res.send(courses);
})

app.get('/api/courses/:id', (req, res) => {
    //chercher id
    const course = courses.find(c => c.id  === parseInt(req.params.id));
    if(!course) return res.status(404).send('Course not found');
    res.send(course);
})

app.post('/api/courses', (req, res) => {
    //verfier vadilité param
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    const result = schema.validate(req.body);
    if(result.error){
        return res.status(400).send(result.error.details[0].message);
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course);
})

app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('id does not exist');

    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    const result = schema.validate(req.body);
    if(result.error){
        return res.status(400).send(result.error.details[0].message);
    }

    course.name = req.body.name;
    res.send(course);
})

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('id does not exist');

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
})



const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Lisntening on port ${port}...`)
});