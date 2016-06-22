angular.module('AgaveToGo').controller('AppsResourceRunController', function($scope, $stateParams, AppsController) {

    $scope.formSchema = function(app) {
      var schema = {
        type: 'object',
        properties: {}
      };

      var params = app.parameters || [];
      var inputs = app.inputs || [];

      if (params.length > 0) {
        schema.properties.parameters = {
          type: 'object',
          properties: {}
        };
        _.each(params, function(param) {
          if (! param.value.visible) {
            return;
          }
          if (param.id.startsWith('_')) {
            return;
          }
          var field = {
            title: param.details.label,
            description: param.details.description,
            required: param.value.required
          };
          switch (param.value.type) {
            case 'bool':
            case 'flag':
              field.type = 'boolean';
              break;

            case 'enumeration':
              field.type = 'string';
              field.enum = _.map(param.value.enum_values, function(enum_val) {
                return Object.keys(enum_val)[0];
              });
              field['x-schema-form'] = {
                'titleMap': _.map(param.value.enum_values, function(enum_val) {
                  var key = Object.keys(enum_val)[0];
                  return {
                    'value': key,
                    'name': enum_val[key]
                  };
                })
              };
              break;

            case 'number':
              field.type = 'number';
              break;

            case 'string':
            default:
              field.type = 'string';
          }
          schema.properties.parameters.properties[param.id] = field;
        });
      }

      if (inputs.length > 0) {
        schema.properties.inputs = {
          type: 'object',
          properties: {}
        };
        _.each(inputs, function(input) {
          if (! input.value.visible) {
            return;
          }
          if (input.id.startsWith('_')) {
            return;
          }
          var field = {
            title: input.details.label,
            description: input.details.description
          };
          if (input.semantics.maxCardinality === 1) {
            field.type = 'string';
            field.format = 'agaveFile';
            field.required = input.value.required;
          } else {
            field.type = 'array';
            field.items = {
              type: 'string',
              format: 'agaveFile',
              'x-schema-form': {notitle: true}
            }
            if (input.semantics.maxCardinality > 1) {
              field.maxItems = input.semantics.maxCardinality;
            }
          }
          schema.properties.inputs.properties[input.id] = field;
        });
      }

      schema.properties.requestedTime = {
        title: 'Maximum job runtime',
        description: 'In HH:MM:SS format. The maximum time you expect this job to run for. After this amount of time your job will be killed by the job scheduler. Shorter run times result in shorter queue wait times. Maximum possible time is 48:00:00 (48 hours).',
        type: 'string',
        "pattern":"^(48:00:00)|([0-4][0-7]:[0-5][0-9]:[0-5][0-9])$",
        "validationMessage":"Must be in format HH:MM:SS and be less than 48 hours (48:00:00)",
        required: true,
        'x-schema-form': {placeholder: app.defaultMaxRunTime}
      };

      schema.properties.name = {
        title: 'Job name',
        description: 'A recognizable name for this job',
        type: 'string',
        required: true
      };
      schema.properties.archivePath = {
        title: 'Job output archive location (optional)',
        description: 'Specify a location where the job output should be archived. By default, job output will be archived at: <code>&lt;username&gt;/archive/jobs/${YYYY-MM-DD}/${JOB_NAME}-${JOB_ID}</code>.',
        type: 'string',
        format: 'agaveFile',
        'x-schema-form': {placeholder: '<username>/archive/jobs/${YYYY-MM-DD}/${JOB_NAME}-${JOB_ID}'}
      };

      return schema;
    };

    $scope.resetForm = function(){
      if ($stateParams.appId !== ''){
        AppsController.getAppDetails($stateParams.appId)
          .then(
            function(response){
              $scope.app = response;
              $scope.form = {model: {}};
              $scope.form.schema = $scope.formSchema($scope.app);
              $scope.form.form = [];

              /* inputs */
              var items = [];
              if ($scope.form.schema.properties.inputs) {
                items.push('inputs');
              }
              if ($scope.form.schema.properties.parameters) {
                items.push('parameters');
              }
              $scope.form.form.push({
                type: 'fieldset',
                title: 'Inputs',
                items: items
              });

              /* job details */
              $scope.form.form.push({
                type: 'fieldset',
                title: 'Job details',
                items: ['requestedTime','name', 'archivePath']
              });

              /* buttons */
              items = [];

              items.push({type: 'submit', title: 'Run', style: 'btn-primary'});
              // items.push({type: 'button', title: 'Close', style: 'btn-link', onClick: 'closeApp()'});
              $scope.form.form.push({
                type: 'actions',
                items: items
              });
            }
          )
          .catch(
            function(repsonse){
              var message = response.errorMessage ? 'Error: Could not retrieve app - ' + response.errorMessage : 'Error: Could not retrieve app';
              App.alert(
                {
                  type: 'danger',
                  message: message
                }
              );
            }
          );
      } else {
        var message = response.errorMessage ? 'Error: Could not retrieve app - ' + response.errorMessage : 'Error: Could not retrieve app';
        App.alert(
          {
            type: 'danger',
            message: message
          }
        );
      }
    };

    $scope.resetForm();

});