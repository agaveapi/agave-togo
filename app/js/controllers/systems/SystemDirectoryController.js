angular.module('AgaveToGo').controller('SystemDirectoryController', function ($injector, $timeout, $rootScope, $scope, $state, $stateParams, $q, Commons, SystemsController, SystemActionTypeEnum, RolesService, ActionsService) {

    $scope.offset = $scope.offset || 0;
    $scope.limit = $scope.limit || 50;
    $scope.systems = [];
    $scope.modalResource = '';

    $scope.systemActions = SystemActionTypeEnum;

    $scope._COLLECTION_NAME = 'systems';
    $scope._RESOURCE_NAME = 'system';

    $scope.sortType = 'id';
    $scope.sortReverse  = false;
    $scope.search   = '';

    $scope.getSystemDetails = function(id, callback) {
      return SystemsController.getSystemDetails(id).then(
        function(response){
          return callback(response);
        }
      );
    };

    $scope.refresh = function() {
        SystemsController.listSystems(99999).then(
            function (response) {
              // $scope[$scope._COLLECTION_NAME] = response;
              $scope[$scope._COLLECTION_NAME] = [];
              var prom = [];
              response.forEach(function (system, i) {
                  prom.push($scope.getSystemDetails(system.id, function(value){
                    $scope[$scope._COLLECTION_NAME].push(value);
                  }));
              });
              $q.all(prom).then(
                function () {
                  $scope.requesting = false;
                },
                function(){
                  var message = 'Error: Could not retrieve systems';
                  App.alert(
                    {
                      type: 'danger',
                      message: message
                    }
                  );
                }
              );

            },
            function(response){
              var message = '';
              if (response.errorResponse.message) {
                message = 'Error: Could not retrieve systems - ' + response.errorResponse.message
              } else if (response.errorResponse.fault){
                message = 'Error: Could not retrieve systems - ' + response.errorResponse.fault.message;
              } else {
                message = 'Error: Could not retrieve systems';
              }
              App.alert(
                {
                  type: 'danger',
                  message: message
                }
              );
            }
        );
    };


    $scope.editRoles = function(system) {
        RolesService.editRoles(system);
    };

    $scope.confirmAction = function(resourceType, resource, resourceAction, resourceList, resourceIndex){
        ActionsService.confirmAction(resourceType, resource, resourceAction, resourceList, resourceIndex);
    }

    $scope.refresh();

});
