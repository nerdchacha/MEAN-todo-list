/**
 * Created by dell on 7/25/2016.
 */
var mongoose = require('mongoose');

var TaskSchema = mongoose.Schema({
    task:String,
    done:Number
});

var Task = mongoose.model('task',TaskSchema);

Task.get = function(callback){
    return Task.find({}, callback);
};

Task.add  =function(newTask,callback) {
    newTask.save(callback);
};

Task.done = function(id, callback){
    Task.findByIdAndUpdate(
        id,
        {$inc: { done: 1 }},
        {new: true},
        callback)
};

Task.delete = function(id,callback){
    Task.findByIdAndRemove(id,callback);
};

Task.update = function(task,callback){
    Task.findByIdAndUpdate(task.id,
        {$set: {task: task.task}},
        {new: true},
        callback);
};

module.exports = Task;