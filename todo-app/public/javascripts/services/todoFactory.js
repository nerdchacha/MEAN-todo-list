/**
 * Created by dell on 7/25/2016.
 */
angular.module('todoApp')
    .factory('todoFactory',function($http){
       var task = {};
        task.get = function(){
            return $http.get('/tasks');
        };
        task.add = function(task){
            return $http.post('/tasks', task);
        };
        task.delete = function(task){
            return $http.delete('/task/' + task._id);
        };
        task.update = function(task,value){
            return $http.post('/task/' + task._id, {task: value});
        };
        task.done = function(task){
            return $http.get('/task/done/' + task._id);
        };
        return task;
    });