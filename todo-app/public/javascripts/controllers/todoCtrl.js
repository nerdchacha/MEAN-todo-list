/**
 * Created by dell on 7/25/2016.
 */
angular.module('todoApp')
    .controller('todoCtrl',function($scope,todoFactory){
        todoFactory.get()
            .then(function(res){
                $scope.tasks = res.data;
            });

        $scope.newTask = {};
        $scope.add = function(){
            var task = {};
            task.task = $scope.newTask.task;
            todoFactory.add(task)
                .then(function(res){
                    $scope.tasks.push(res.data);
                    $scope.newTask.task = "";
                })
                .catch(function(err){
                    console.log(err);
                })
        };
        $scope.tasks = [];
        $scope.rerender = function(){
            todoFactory.get()
                .then(function(res){
                    $scope.tasks = res.data;
                });
        }
    });