(function() {
    'use strict';

    angular
        .module('app.repository')
        .factory('Repository', Repository);

    Repository.$inject = ['$resource', 'API_BASE_URL'];
    /* @ngInject */
    function Repository($resource, API_BASE_URL) {

        var params = {
            repositoryId: '@id',
            format: 'json'
        };

        var actions = {
            update: {
                method: 'PUT'
            }
        };

        var API_URL = API_BASE_URL + '/repositories/:repositoryId';

        return $resource(API_URL, params, actions);

    }

})();
