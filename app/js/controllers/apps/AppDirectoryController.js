angular.module('AgaveToGo').controller('AppDirectoryController', function ($injector, $timeout, $rootScope, $scope, $state, $stateParams, $q, $uibModal, $http, Commons, AppsController, SystemsController, ActionsService, PermissionsService) {

    $scope.offset = $scope.offset || 0;
    $scope.limit = $scope.limit || 25;
    $scope.systems = [];

    $scope._COLLECTION_NAME = $scope._COLLECTION_NAME || 'apps';

    $scope._RESOURCE_NAME = $scope._RESOURCE_NAME || 'app';

    $scope.limit = 10;
    $scope.available = true;
    $scope.publicOnly = null;
    $scope.privateOnly = null;
    $scope.sortType = 'lastModified';
    $scope.sortReverse  = true;


    $scope.appsList = [];
    $scope.appsDetailsList = [];

    $scope.getAppDetails = function(id, callback) {
      return AppsController.getAppDetails(id).then(
        function(response){
          return callback(response.result);
        }
      );
    };

    $scope.refresh = function() {
        $scope.appsList = [];
        $scope.appsDetailsList = [];
        $scope.requesting = true;

        $scope.available = $scope.available === '' ? null : $scope.available;
        $scope.checkpointable = $scope.checkpointable === '' ? null : $scope.checkpointable;
        $scope.checksum = $scope.checksum === '' ? null : $scope.checksum;
        $scope.created = $scope.created === '' ? null : $scope.created;
        $scope.defaultmaxruntime = $scope.defaultmaxruntime === '' ? null : $scope.defaultmaxruntime;
        $scope.defaultmemorypernode = $scope.defaultmemorypernode === '' ? null : $scope.defaultmemorypernode;
        $scope.defaultnodes = $scope.defaultnodes === '' ? null : $scope.defaultnodes;
        $scope.defaultprocessorspernode = $scope.defaultprocessorspernode === '' ? null : $scope.defaultprocessorspernode;
        $scope.defaultqueue = $scope.defaultqueue === '' ? null : $scope.defaultqueue;
        $scope.deploymentpath = $scope.deploymentpath === '' ? null : $scope.deploymentpath;
        $scope.executionsystem = $scope.executionsystem === '' ? null : $scope.executionsystem;
        $scope.executiontype = $scope.executiontype === '' ? null : $scope.executiontype;
        $scope.helpuri = $scope.helpuri === '' ? null : $scope.helpuri;
        $scope.icon = $scope.icon === '' ? null : $scope.icon;
        $scope.id = $scope.id === '' ? null : $scope.id;
        $scope.inputsId = $scope.inputsId === '' ? null : $scope.inputsId;
        $scope.label = $scope.label === '' ? null : $scope.label;
        $scope.lastupdated = $scope.lastupdated === '' ? null : $scope.lastupdated;
        // $scope.limit = $scope.limit === '' ? null : $scope.limit;
        $scope.longdescription = $scope.longdescription === '' ? null : $scope.longdescription;
        $scope.modules = $scope.modules === '' ? null : $scope.modules;
        $scope.name = $scope.name === '' ? null : $scope.name;
        // $scope.offset = $scope.offset === '' ? null : $scope.offset;
        $scope.ontology = $scope.ontology === '' ? null : $scope.ontology;
        $scope.outputsId = $scope.outputsId === '' ? null : $scope.outputsId;
        $scope.owner = $scope.owner === '' ? null : $scope.owner;
        $scope.parallelism = $scope.parallelism === '' ? null : $scope.parallelism;
        $scope.parametersId = $scope.parametersId === '' ? null : $scope.parametersId;
        $scope.parametersType = $scope.parametersType === '' ? null : $scope.parametersType;
        if ($scope.privateOnly) {
          $scope.public = false;
        } else if ($scope.publicOnly){
          $scope.public = true;
        } else {
          $scope.public = null;
        }
        $scope.revision = $scope.revision === '' ? null : $scope.revision;
        $scope.shortdescription = $scope.shortDescription === '' ? null :   $scope.shortdescription;
        $scope.storagesystem = $scope.storagesystem === '' ? null : $scope.storagesystem;
        $scope.tags = $scope.tags === '' ? null : $scope.tags;
        $scope.templatepath = $scope.templatepath === '' ? null : $scope.templatepath;
        $scope.testpath = $scope.testpath === '' ? null : $scope.testpath;
        $scope.uuid = $scope.uuid === '' ? null : $scope.uuid;
        $scope.version = $scope.version === '' ? null : $scope.version;

        SystemsController.listSystems(99999).then(
            function (response) {
              $scope.systems = response;

              AppsController.searchApps(
                $scope.available,
                $scope.checkpointable,
                $scope.checksum,
                $scope.created,
                $scope.defaultmaxruntime,
                $scope.defaultmemorypernode,
                $scope.defaultnodes,
                $scope.defaultprocessorspernode,
                $scope.defaultqueue,
                $scope.deploymentpath,
                $scope.executionsystem,
                $scope.executiontype,
                $scope.helpuri,
                $scope.icon,
                $scope.id,
                $scope.inputsId,
                $scope.label,
                $scope.lastupdated,
                null, // limit
                $scope.longdescription,
                $scope.modules,
                $scope.name,
                $scope.offset,
                $scope.ontology,
                $scope.outputsId,
                $scope.owner,
                $scope.parallelism,
                $scope.parametersId,
                $scope.parametersType,
                $scope.public,
                $scope.revision,
                $scope.shortdescription,
                $scope.storagesystem,
                $scope.tags,
                $scope.templatepath,
                $scope.testpath,
                $scope.uuid,
                $scope.version
              )
                .then(
                  function(response){
                    $scope.totalItems = response.result.length;
                    $scope.pagesTotal = Math.ceil(response.result.length / $scope.limit);
                    $scope[$scope._COLLECTION_NAME] = [];
                    var prom = [];
                    response.result.forEach(function (app, i) {
                        prom.push($scope.getAppDetails(app.id, function(value){
                          $scope[$scope._COLLECTION_NAME].push(value);
                        }));
                    });
                    $q.all(prom).then(
                      function () {
                        $scope.requesting = false;
                      },
                      function(){
                        var message = 'Error: Could not retrieve apps';
                        App.alert(
                          {
                            type: 'danger',
                            message: message
                          }
                        );
                      }
                    );

                    // $scope.requesting = false;
                  }, function(response){
                    var message = '';
                    if (response.errorResponse.message) {
                      message = 'Error: Could not retrieve apps - ' + response.errorResponse.message
                    } else if (response.errorResponse.fault){
                      message = 'Error: Could not retrieve apps - ' + response.errorResponse.fault.message;
                    } else {
                      message = 'Error: Could not retrieve apps';
                    }
                    App.alert(
                      {
                        type: 'danger',
                        message: message
                      }
                    );
                    $scope.requesting = false;
                  }
                );
            },
            function(response){
              var message = '';
              if (response.errorResponse.message) {
                message = 'Error: Could not retrieve apps - ' + response.errorResponse.message
              } else if (response.errorResponse.fault){
                message = 'Error: Could not retrieve apps - ' + response.errorResponse.fault.message;
              } else {
                message = 'Error: Could not retrieve apps';
              }
              App.alert(
                {
                  type: 'danger',
                  message: message
                }
              );
              $scope.requesting = false;
            }
        );
    };

    $scope.refresh();

    $scope.search = function(){
      $scope.offset = 0;
      $scope.refresh();
    }

    $scope.getPage = function(newPageNumber, oldPageNumber, resourceType){
      $scope.requesting = true;
      $scope.offset = (newPageNumber - 1) * $scope.limit;

      if ($scope.privateOnly) {
        $scope.public = true;
      } else if ($scope.publicOnly){
        $scope.public = false;
      } else {
        $scope.public = null;
      }

      AppsController.searchApps(
        $scope.available,
        $scope.checkpointable,
        $scope.checksum,
        $scope.created,
        $scope.defaultmaxruntime,
        $scope.defaultmemorypernode,
        $scope.defaultnodes,
        $scope.defaultprocessorspernode,
        $scope.defaultqueue,
        $scope.deploymentpath,
        $scope.executionsystem,
        $scope.executiontype,
        $scope.helpuri,
        $scope.icon,
        $scope.id,
        $scope.inputsId,
        $scope.label,
        $scope.lastupdated,
        $scope.limit,
        $scope.longdescription,
        $scope.modules,
        $scope.name,
        $scope.offset,
        $scope.ontology,
        $scope.outputsId,
        $scope.owner,
        $scope.parallelism,
        $scope.parametersId,
        $scope.parametersType,
        $scope.public,
        $scope.revision,
        $scope.shortdescription,
        $scope.storagesystem,
        $scope.tags,
        $scope.templatepath,
        $scope.testpath,
        $scope.uuid,
        $scope.version
      )
        .then(
          function(response){
            $scope.pagesTotal = Math.ceil(response.result.length / $scope.limit);
            $scope[$scope._COLLECTION_NAME] = [];
            var prom = [];
            response.result.forEach(function (app, i) {
                prom.push($scope.getAppDetails(app.id, function(value){
                  $scope[$scope._COLLECTION_NAME].push(value);
                }));
            });
            $q.all(prom).then(
              function () {
                $scope.requesting = false;
              },
              function(){
                var message = 'Error: Could not retrieve apps';
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
              message = 'Error: Could not retrieve apps - ' + response.errorResponse.message
            } else if (response.errorResponse.fault){
              message = 'Error: Could not retrieve apps - ' + response.errorResponse.fault.message;
            } else {
              message = 'Error: Could not retrieve apps';
            }
            App.alert(
              {
                type: 'danger',
                message: message
              }
            );
            $scope.requesting = false;
          }
        );


    }

    $scope.confirmAction = function(resourceType, resource, resourceAction, resourceList, resourceIndex){
        ActionsService.confirmAction(resourceType, resource, resourceAction, resourceList, resourceIndex);
    }

    $scope.edit = function(resourceType, resource){
      ActionsService.edit(resourceType, resource);
    };

    $scope.editPermissions = function(resource) {
        PermissionsService.editPermissions(resource);
    }

    $scope.getSystemName = function(id) {
      if (id) {
          for(var i=0; i<$scope.systems.length; i++) {
              if ($scope.systems[i].id === id) {
                  return $scope.systems[i].name;
              }
          }
      }
      return id;
    };

});
