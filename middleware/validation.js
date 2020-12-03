function validation(req, res, next){
    if (req.body.name.length >= 3 && typeof(req.body.name) === 'string') {
        return next();
    }
    return res.status(400).json({ err: 'Erreur de name'});
}

module.exports = validation;