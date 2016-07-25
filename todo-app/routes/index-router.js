var express = require('express');
var router = express.Router();
var Task = require('../models/task.js');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

router.get('/tasks',function(req,res,next){
    Task.get(function(err, tasks){
        if(err)
            res.json({error: err});
        else
            res.json(tasks);
    })
});

router.post('/tasks',function(req,res,next){
    var newTask = new Task({
        task: req.body.task,
        done: 0
    });
    Task.add(newTask,function(err, task){
        if(err)
            res.json({error: err});
        else
            res.json(task);
    });
});

router.get('/task/done/:id',function(req,res,next){
    var id = req.params.id;
    Task.done(id,function(err,task){
        if(err)
            res.json({error: err});
        else
            res.json(task);
    })
});

router.post('/task/:id',function(req,res,next){
    var id = req.params.id;
    var task = req.body.task;
    Task.update({id:id, task: task},function(err,task) {
        if (err)
            res.json({error: err});
        else
            res.json(task);
    })
});

router.delete('/task/:id',function(req,res,next){
    var id = req.params.id;
    Task.delete(id,function(err,task) {
        if (err)
            res.json({error: err});
        else
            res.json(task);
    });
});

module.exports = router;
