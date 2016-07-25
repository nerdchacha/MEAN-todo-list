/**
 * Created by dell on 7/25/2016.
 */
angular.module('todoApp')
    .directive('ygEditable',function(todoFactory){
        return{
            restrict: 'E',
            templateUrl: '/templates/ygEditable.html',
            scope:{
                task: '=',
                rerender : '&'
            },
            controller: function($scope,$element,$attrs){
                var spanElement = $element.find('span');
                var inputElement = $element.find('input');
                var beforeEditDiv = angular.element($element[0].querySelector('#before-edit'));
                var afterEditDiv = angular.element($element[0].querySelector('#after-edit'));

                var toggleElements = function(){
                    spanElement.toggleClass('active');
                    inputElement.toggleClass('active');
                    beforeEditDiv.toggleClass('active');
                    afterEditDiv.toggleClass('active');
                };
                $scope.edit = function(){
                    $scope.task.newValue = angular.copy($scope.task.task);
                    toggleElements()
                };

                $scope.cancel = function(){
                    $scope.task.newValue = angular.copy($scope.task.task);
                    toggleElements();
                };

                $scope.done = function(task){
                    todoFactory.done(task)
                        .then(function(res){
                            //successfully updated
                            $scope.task.done = res.data.done;
                        })
                        .catch(function(err){
                            //cannot update ticket
                            console.log(err);
                            console.log('could not update ticket');
                        });
                };

                $scope.update = function(task,newValue){
                    todoFactory.update(task, newValue)
                        .then(function(res){
                            task.task = res.data.task;
                            toggleElements();
                        })
                        .catch(function(err){
                            //cannot update ticket
                            console.log(err);
                            console.log('could not update ticket');
                        })
                };

                $scope.delete = function(task){
                    todoFactory.delete(task)
                        .then(function(res){
                            //successfully updated
                            $scope.rerender();
                        })
                        .catch(function(err){
                            //cannot update ticket
                            console.log(err);
                            console.log('could not update ticket state');
                        });
                }
            }
        }
    });