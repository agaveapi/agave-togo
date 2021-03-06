/**
 *agave.sdk
 *
 * This file was automatically generated by APIMATIC BETA v2.0 on 10/07/2015
 */

'use strict';
angular.module('agave.sdk').factory('ProfilesController', ['$q', 'Configuration', 'HttpClient', 'APIHelper', function ($q, Configuration, HttpClient, APIHelper) {
    return {
        /**
         * Find api user profile by their api username
         * @param {string} username    Required parameter: The username of a valid api user
         *
         * @return {promise<Profile>}
         */
        getProfile: function (username) {
            //Assign default values
            username = username || 'me';

            //prepare query string for API call
            var baseUri = Configuration.BASEURI;
            var queryBuilder = baseUri + '/profiles/v2/{username}';

            //Process template parameters
            queryBuilder = APIHelper.appendUrlWithTemplateParameters(queryBuilder, {
                'username': username
            });

            //Process query parameters
            // queryBuilder = APIHelper.appendUrlWithQueryParameters(queryBuilder, {
            //     'naked': true
            // });

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
                if (result.body.result) {
                    deferred.resolve(result.body.result);
                } else {
                    deferred.resolve(result.body);
                }
            }, function (result) {
                //Error handling for custom HTTP status codes
                deferred.reject(APIHelper.appendContext({
                    errorMessage: 'HTTP Response Not OK',
                    errorCode: result.code,
                    errorResponse: result.message
                }, result.getContext()));
            });

            return deferred.promise;
        },
        /**
         * Delete all internal users created by the authenticated user.
         * @param {string} apiUsername    Required parameter: The username of a valid api user
         *
         * @return {promise<void>}
         */
        deleteClearInternalUsers: function (apiUsername) {

            //prepare query string for API call
            var baseUri = Configuration.BASEURI;
            var queryBuilder = baseUri + '/profiles/v2/{apiUsername}/users';

            //Process template parameters
            queryBuilder = APIHelper.appendUrlWithTemplateParameters(queryBuilder, {
                'apiUsername': apiUsername
            });

            //Process query parameters
            queryBuilder = APIHelper.appendUrlWithQueryParameters(queryBuilder, {
                'naked': true
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
         * Create or update an internal user.
         * @param {string} apiUsername    Required parameter: The username of a valid api user
         * @param {ProfileRequest} body    Required parameter: The internal user to create.
         *
         * @return {promise<InternalUser>}
         */
        addInternalUser: function (apiUsername, body) {

            //prepare query string for API call
            var baseUri = Configuration.BASEURI;
            var queryBuilder = baseUri + '/profiles/v2/{apiUsername}/users';

            //Process template parameters
            queryBuilder = APIHelper.appendUrlWithTemplateParameters(queryBuilder, {
                'apiUsername': apiUsername
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
         * Create or update the given internal user.
         * @param {string} apiUsername    Required parameter: The username of a valid api user
         * @param {ProfileRequest} body    Required parameter: A JSON description of the internal user to update
         * @param {string} internalUsername    Required parameter: The username of a valid internal user
         *
         * @return {promise<InternalUser>}
         */
        updateInternalUser: function (apiUsername, body, internalUsername) {

            //prepare query string for API call
            var baseUri = Configuration.BASEURI;
            var queryBuilder = baseUri + '/profiles/v2/{apiUsername}/users/{internalUsername}';

            //Process template parameters
            queryBuilder = APIHelper.appendUrlWithTemplateParameters(queryBuilder, {
                'apiUsername': apiUsername,
                'internalUsername': internalUsername
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
         * Delete all internal users created by the authenticated user.
         * @param {string} apiUsername    Required parameter: The username of a valid api user
         * @param {string} internalUsername    Required parameter: The username of a valid internal user
         *
         * @return {promise<InternalUser>}
         */
        deleteInternalUser: function (apiUsername, internalUsername) {

            //prepare query string for API call
            var baseUri = Configuration.BASEURI;
            var queryBuilder = baseUri + '/profiles/v2/{apiUsername}/users/{internalUsername}';

            //Process template parameters
            queryBuilder = APIHelper.appendUrlWithTemplateParameters(queryBuilder, {
                'apiUsername': apiUsername,
                'internalUsername': internalUsername
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
         * Find authenticated user profile
         * @param {string|null} email    Optional parameter: The user email address
         * @param {string|null} name    Optional parameter: The user full name
         * @param {string|null} username    Optional parameter: The username to search for
         * @param {string|null} first_name    Optional parameter: The user's last name to search for
         * @param {string|null} last_name    Optional parameter: The user's first name to search for
         *
         * @return {promise<array>}
         */
         listProfiles: function (email, name, username, first_name, last_name ) {

             //prepare query string for API call
             var baseUri = Configuration.BASEURI;
             var queryBuilder = baseUri + '/profiles/v2/';

             //Process query parameters
             queryBuilder = APIHelper.appendUrlWithQueryParameters(queryBuilder, {
                 'naked': true,
                 'email': email,
                 'name': name,
                 'first_name': first_name,
                 'last_name': last_name,
                 'username': username
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
         * List all internal users created by the authenticated user
         * @param {string} apiUsername    Required parameter: The username of a valid api user
         * @param {string|null} email    Optional parameter: The email address of the internal user
         * @param {string|null} name    Optional parameter: The full name of the internal user
         * @param {string|null} username    Optional parameter: The username of the internal user
         *
         * @return {promise<array>}
         */
        listInternalUsers: function (apiUsername, email, name, username) {

            //prepare query string for API call
            var baseUri = Configuration.BASEURI;
            var queryBuilder = baseUri + '/profiles/v2/{apiUsername}/users';

            //Process template parameters
            queryBuilder = APIHelper.appendUrlWithTemplateParameters(queryBuilder, {
                'apiUsername': apiUsername
            });

            //Process query parameters
            queryBuilder = APIHelper.appendUrlWithQueryParameters(queryBuilder, {
                'naked': true,
                'email': email,
                'name': name,
                'username': username
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
         * Find api user profile by their api username
         * @param {string} apiUsername    Required parameter: The username of a valid api user
         * @param {string} internalUsername    Required parameter: The username of a valid internal user
         *
         * @return {promise<InternalUser>}
         */
        getInternalUser: function (apiUsername, internalUsername) {

            //prepare query string for API call
            var baseUri = Configuration.BASEURI;
            var queryBuilder = baseUri + '/profiles/v2/{apiUsername}/users/{internalUsername}';

            //Process template parameters
            queryBuilder = APIHelper.appendUrlWithTemplateParameters(queryBuilder, {
                'apiUsername': apiUsername,
                'internalUsername': internalUsername
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
         * Add a new user profile
         * @param {Profile} body    Required parameter: The user profile to add
         *
         * @return {promise<Profile>}
         */
        addProfile: function (body) {

            //prepare query string for API call
            var baseUri = Configuration.BASEURI;
            var queryBuilder = baseUri + '/profiles/v2';

            //Process query parameters
            queryBuilder = APIHelper.appendUrlWithQueryParameters(queryBuilder, {
                'naked': true
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
         * Update an existing user profile
         * @param {string} apiUsername    Required parameter: The username of the profile to update
         * @param {ProfileRequest} body    Required parameter: The updated profile
         *
         * @return {promise<Profile>}
         */
        updateProfile: function (apiUsername, body) {

            //prepare query string for API call
            var baseUri = Configuration.BASEURI;
            var queryBuilder = baseUri + '/profiles/v2/{apiUsername}';

            //Process template parameters
            queryBuilder = APIHelper.appendUrlWithTemplateParameters(queryBuilder, {
                'apiUsername': apiUsername
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
        }
    };
}]);
