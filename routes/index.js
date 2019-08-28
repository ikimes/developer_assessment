var express = require('express');
var router = express.Router();
var actions = require('./../models');
const app = express();


router.get('/people', async function(req, res, next) {
    var data = await actions.getPeople();
    console.log(data);
    res.json(data);
});

router.get('/', async function(req,res,next){
    // var data = await actions.getPerson();
    // console.log(data);
    res.render('index');
});

router.get('/person', async function(req, res, next) {
    var first = req.query.first;
    var last = req.query.last;
    console.log(first,last);
    var data = await actions.getPerson(first,last);
    console.log(data);
    res.json(data);
})

module.exports = router;