/**
 *agave.sdk
 *
 * This file was automatically generated by APIMATIC BETA v2.0 on 10/07/2015
 */

'use strict';
angular.module('agave.sdk').factory('MonitorsController', ['$q', 'Configuration', 'HttpClient', 'APIHelper', function ($q, Configuration, HttpClient, APIHelper) {
    return {
        /**
         * Add a new monitoring task
         * @param {MonitoringTaskSummary} body    Required parameter: The description of the monitoring task to run
         *
         * @return {promise<MonitoringTaskDetails>}
         */
        addMonitoringTasks: function (body) {

            //prepare query string for API call
            var baseUri = Configuration.BASEURI;
            var queryBuilder = baseUri + '/monitors/v2/';

            //validate and preprocess url
            var queryUrl = APIHelper.cleanUrl(queryBuilder);

            //prepare headers
            var headers = {
                'accept': 'application/json',
                'content-type': 'application/json; charset=utf-8',
                'Authorization': 'Bearer ' + Configuration.oAuthAccessToken
            };

            //Remove null values
            APIHelper.cleanObject(body);

            //prepare and invoke the API call request to fetch the response
            var config = {
                method: 'POST',
                queryUrl: queryUrl,
                headers: headers,
                body: body
            };

            var response = new HttpClient(config);

            //Create promise to return
            var deferred = $q.defer();

            //process response
            response.then(function (result) {
                deferred.resolve(result.body);
            }, function (result) {
                deferred.reject(APIHelper.appendContext({
                    errorMessage: 'HTTP Response Not OK',
                    errorCode: result.code,
                    errorResponse: result.message
                }, result.getContext()));
            });

            return deferred.promise;
        },
        /**
         * Retrieve a specific monitor.
         * @param {string} monitorId    Required parameter: The id of the monitor
         *
         * @return {promise<MonitoringTaskDetails>}
         */
        getMonitoringTask: function (monitorId) {

            //prepare query string for API call
            var baseUri = Configuration.BASEURI;
            var queryBuilder = baseUri + '/monitors/v2/{monitorId}';

            //Process template parameters
            queryBuilder = APIHelper.appendUrlWithTemplateParameters(queryBuilder, {
                'monitorId': monitorId
            });

            //validate and preprocess url
            var queryUrl = APIHelper.cleanUrl(queryBuilder);

            //prepare headers
            var headers = {
                'accept': 'application/json',
                'Authorization': 'Bearer ' + Configuration.oAuthAccessToken
            };

            //prepare and invoke the API call request to fetch the response
            var config = {
                method: 'GET',
                queryUrl: queryUrl,
                headers: headers,
            };

            var response = new HttpClient(config);

            //Create promise to return
            var deferred = $q.defer();

            //process response
            response.then(function (result) {
                deferred.resolve(result.body);
            }, function (result) {
                deferred.reject(APIHelper.appendContext({
                    errorMessage: 'HTTP Response Not OK',
                    errorCode: result.code,
                    errorResponse: result.message
                }, result.getContext()));
            });

            return deferred.promise;
        },
        /**
         * Updates an existing monitor.
         * @param {MonitoringTaskSummary} body    Required parameter: The description of the app to add or update. This can be either a file upload or json posted to the request body.
         * @param {string} monitorId    Required parameter: The id of the monitor to update
         *
         * @return {promise<MonitoringTaskDetails>}
         */
        updateMonitoringTask: function (body, monitorId) {

            //prepare query string for API call
            var baseUri = Configuration.BASEURI;
            var queryBuilder = baseUri + '/monitors/v2/{monitorId}';

            //Process template parameters
            queryBuilder = APIHelper.appendUrlWithTemplateParameters(queryBuilder, {
                'monitorId': monitorId
            });

            //validate and preprocess url
            var queryUrl = APIHelper.cleanUrl(queryBuilder);

            //prepare headers
            var headers = {
                'accept': 'application/json',
                'content-type': 'application/json; charset=utf-8',
                'Authorization': 'Bearer ' + Configuration.oAuthAccessToken
            };

            //Remove null values
            APIHelper.cleanObject(body);

            //prepare and invoke the API call request to fetch the response
            var config = {
                method: 'POST',
                queryUrl: queryUrl,
                headers: headers,
                body: body
            };

            var response = new HttpClient(config);

            //Create promise to return
            var deferred = $q.defer();

            //process response
            response.then(function (result) {
                deferred.resolve(result.body);
            }, function (result) {
                deferred.reject(APIHelper.appendContext({
                    errorMessage: 'HTTP Response Not OK',
                    errorCode: result.code,
                    errorResponse: result.message
                }, result.getContext()));
            });

            return deferred.promise;
        },
        /**
         * Deletes a monitor.
         * @param {string} monitorId    Required parameter: The id of the monitor to delete
         *
         * @return {promise<void>}
         */
        deleteMonitoringTask: function (monitorId) {

            //prepare query string for API call
            var baseUri = Configuration.BASEURI;
            var queryBuilder = baseUri + '/monitors/v2/{monitorId}';

            //Process template parameters
            queryBuilder = APIHelper.appendUrlWithTemplateParameters(queryBuilder, {
                'monitorId': monitorId
            });

            //validate and preprocess url
            var queryUrl = APIHelper.cleanUrl(queryBuilder);

            //prepare headers
            var headers = {
                'Authorization': 'Bearer ' + Configuration.oAuthAccessToken
            };

            //prepare and invoke the API call request to fetch the response
            var config = {
                method: 'DELETE',
                queryUrl: queryUrl,
                headers: headers,
            };

            var response = new HttpClient(config);

            //Create promise to return
            var deferred = $q.defer();

            //process response
            response.then(function (result) {
                deferred.resolve(result.body);
            }, function (result) {
                deferred.reject(APIHelper.appendContext({
                    errorMessage: 'HTTP Response Not OK',
                    errorCode: result.code,
                    errorResponse: result.message
                }, result.getContext()));
            });

            return deferred.promise;
        },
        /**
         * Retrieve checks for a specific monitor
         * @param {string} monitorId    Required parameter: The id of the monitor
         * @param {string|null} endDate    Optional parameter: A timestamp indicating the latest time of the first monitor check in ISO 8601 format
         * @param {int|null} limit    Optional parameter: The max number of results.
         * @param {int|null} offset    Optional parameter: The number of records to when returning the results. When paginating results, the page number = ceil(offset/limit)
         * @param {MonitorCheckResultTypeEnum|null} result    Optional parameter: A timestamp indicating the latest time of the first monitor check in ISO 8601 format
         * @param {string|null} startDate    Optional parameter: A timestamp indicating the earliest time of the first monitor check in ISO 8601 format
         *
         * @return {promise<array>}
         */
        listMonitoringTaskChecks: function (monitorId, endDate, limit, offset, result, startDate) {
            //Assign default values
            limit = limit || 250;
            offset = offset || 0;

            //prepare query string for API call
            var baseUri = Configuration.BASEURI;
            var queryBuilder = baseUri + '/monitors/v2/{monitorId}/checks';

            //Process template parameters
            queryBuilder = APIHelper.appendUrlWithTemplateParameters(queryBuilder, {
                'monitorId': monitorId
            });

            //Process query parameters
            queryBuilder = APIHelper.appendUrlWithQueryParameters(queryBuilder, {
                'naked': true,
                'endDate': endDate,
                'limit': (null !== limit) ? limit : 250,
                'offset': (null !== offset) ? offset : 0,
                'result': (result !== null) ? result : null,
                'startDate': startDate
            });

            //validate and preprocess url
            var queryUrl = APIHelper.cleanUrl(queryBuilder);

            //prepare headers
            var headers = {
                'accept': 'application/json',
                'Authorization': 'Bearer ' + Configuration.oAuthAccessToken
            };

            //prepare and invoke the API call request to fetch the response
            var config = {
                method: 'GET',
                queryUrl: queryUrl,
                headers: headers,
            };

            var response = new HttpClient(config);

            //Create promise to return
            var deferred = $q.defer();

            //process response
            response.then(function (result) {
                deferred.resolve(result.body);
            }, function (result) {
                deferred.reject(APIHelper.appendContext({
                    errorMessage: 'HTTP Response Not OK',
                    errorCode: result.code,
                    errorResponse: result.message
                }, result.getContext()));
            });

            return deferred.promise;
        },
        /**
         * Search checks for a specific monitor
         * @param {string} monitorId    Required parameter: The id of the monitor
         * @param {string|null} query   Required parameter: The query to be appended to the url.
         *
         * @return {promise<array>}
         */
        searchMonitoringTaskChecks: function (monitorId, query) {
            var baseUri = Configuration.BASEURI;
            var queryBuilder = query ? baseUri + '/monitors/v2/{monitorId}/checks?' + query : baseUri + '/monitors/v2/{monitorId}/checks';

            //Process template parameters
            queryBuilder = APIHelper.appendUrlWithTemplateParameters(queryBuilder, {
                'monitorId': monitorId
            });

            //validate and preprocess url
            var queryUrl = APIHelper.cleanUrl(queryBuilder);

            //prepare headers
            var headers = {
                'accept': 'application/json',
                'Authorization': 'Bearer ' + Configuration.oAuthAccessToken
            };

            //prepare and invoke the API call request to fetch the response
            var config = {
                method: 'GET',
                queryUrl: queryUrl,
                headers: headers,
                cache: false
            };

            var response = new HttpClient(config);

            //Create promise to return
            var deferred = $q.defer();

            //process response
            response.then(function (result) {
                deferred.resolve(result.body);
            }, function (result) {
                deferred.reject(APIHelper.appendContext({
                    errorMessage: 'HTTP Response Not OK',
                    errorCode: result.code,
                    errorResponse: result.message
                }, result.getContext()));
            });

            return deferred.promise;
        },
        /**
         * Forces a monitor check to run.
         * @param {string} monitorId    Required parameter: The id of the monitor
         *
         * @return {promise<MonitoringTaskDetails>}
         */
        createForceMonitoringTaskCheck: function (monitorId) {

            //prepare query string for API call
            var baseUri = Configuration.BASEURI;
            var queryBuilder = baseUri + '/monitors/v2/{monitorId}/checks';

            //Process template parameters
            queryBuilder = APIHelper.appendUrlWithTemplateParameters(queryBuilder, {
                'monitorId': monitorId
            });

            //validate and preprocess url
            var queryUrl = APIHelper.cleanUrl(queryBuilder);

            //prepare headers
            var headers = {
                'accept': 'application/json',
                'Authorization': 'Bearer ' + Configuration.oAuthAccessToken
            };

            //prepare and invoke the API call request to fetch the response
            var config = {
                method: 'POST',
                queryUrl: queryUrl,
                headers: headers,
            };

            var response = new HttpClient(config);

            //Create promise to return
            var deferred = $q.defer();

            //process response
            response.then(function (result) {
                deferred.resolve(result.body);
            }, function (result) {
                deferred.reject(APIHelper.appendContext({
                    errorMessage: 'HTTP Response Not OK',
                    errorCode: result.code,
                    errorResponse: result.message
                }, result.getContext()));
            });

            return deferred.promise;
        },
        /**
         * Retrieve a specific monitor check
         * @param {string} checkId    Required parameter: The id of the monitor check
         * @param {string} monitorId    Required parameter: The id of the monitor
         *
         * @return {promise<MonitoringTaskCheck>}
         */
        getMonitoringTaskCheck: function (checkId, monitorId) {

            //prepare query string for API call
            var baseUri = Configuration.BASEURI;
            var queryBuilder = baseUri + '/monitors/v2/{monitorId}/checks/{checkId}';

            //Process template parameters
            queryBuilder = APIHelper.appendUrlWithTemplateParameters(queryBuilder, {
                'checkId': checkId,
                'monitorId': monitorId
            });

            //Process query parameters
            queryBuilder = APIHelper.appendUrlWithQueryParameters(queryBuilder, {
                'naked': true
            });

            //validate and preprocess url
            var queryUrl = APIHelper.cleanUrl(queryBuilder);

            //prepare headers
            var headers = {
                'accept': 'application/json',
                'Authorization': 'Bearer ' + Configuration.oAuthAccessToken
            };

            //prepare and invoke the API call request to fetch the response
            var config = {
                method: 'GET',
                queryUrl: queryUrl,
                headers: headers,
            };

            var response = new HttpClient(config);

            //Create promise to return
            var deferred = $q.defer();

            //process response
            response.then(function (result) {
                deferred.resolve(result.body);
            }, function (result) {
                deferred.reject(APIHelper.appendContext({
                    errorMessage: 'HTTP Response Not OK',
                    errorCode: result.code,
                    errorResponse: result.message
                }, result.getContext()));
            });

            return deferred.promise;
        },
        /**
         * Retrieve Monitor for a specific resource.
         * @param {string|null} active    Optional parameter: Filter by monitors that are active or inactive.
         * @param {int|null} limit    Optional parameter: The maximum number of results returned from this query
         * @param {int|null} offset    Optional parameter: The number of results skipped in the result set returned from this query
         * @param {string|null} target    Optional parameter: The target system to search for.
         *
         * @return {promise<array>}
         */
        listMonitoringTasks: function (active, limit, offset, target) {
            //Assign default values
            active = active || 'true';
            limit = limit || 100;
            offset = offset || 0;

            //prepare query string for API call
            var baseUri = Configuration.BASEURI;
            var queryBuilder = baseUri + '/monitors/v2/';

            //Process query parameters
            queryBuilder = APIHelper.appendUrlWithQueryParameters(queryBuilder, {
                'naked': true,
                'active': (null !== active) ? active : 'true',
                'limit': (null !== limit) ? limit : 100,
                'offset': (null !== offset) ? offset : 0,
                'target': target
            });

            //validate and preprocess url
            var queryUrl = APIHelper.cleanUrl(queryBuilder);

            //prepare headers
            var headers = {
                'accept': 'application/json',
                'Authorization': 'Bearer ' + Configuration.oAuthAccessToken
            };

            //prepare and invoke the API call request to fetch the response
            var config = {
                method: 'GET',
                queryUrl: queryUrl,
                headers: headers,
            };

            var response = new HttpClient(config);

            //Create promise to return
            var deferred = $q.defer();

            //process response
            response.then(function (result) {
                deferred.resolve(result.body);
            }, function (result) {
                deferred.reject(APIHelper.appendContext({
                    errorMessage: 'HTTP Response Not OK',
                    errorCode: result.code,
                    errorResponse: result.message
                }, result.getContext()));
            });

            return deferred.promise;
        },
        /**
         * Search Monitor for a specific resource.
         * @param {string|null} query Required parameter: The query to be appended to the url.
         *
         * @return {promise<array>}
         */
        searchMonitors: function (query) {
            var baseUri = Configuration.BASEURI;
            var queryBuilder = query ? baseUri + '/monitors/v2/?' + query : baseUri + '/monitors/v2/';

            //validate and preprocess url
            var queryUrl = APIHelper.cleanUrl(queryBuilder);

            //prepare headers
            var headers = {
                'accept': 'application/json',
                'Authorization': 'Bearer ' + Configuration.oAuthAccessToken
            };

            //prepare and invoke the API call request to fetch the response
            var config = {
                method: 'GET',
                queryUrl: queryUrl,
                headers: headers,
            };

            var response = new HttpClient(config);

            //Create promise to return
            var deferred = $q.defer();

            //process response
            response.then(function (result) {
                deferred.resolve(result.body);
            }, function (result) {
                deferred.reject(APIHelper.appendContext({
                    errorMessage: 'HTTP Response Not OK',
                    errorCode: result.code,
                    errorResponse: result.message
                }, result.getContext()));
            });

            return deferred.promise;
        }
    };
}]);
