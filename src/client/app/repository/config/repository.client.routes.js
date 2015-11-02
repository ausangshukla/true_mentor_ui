(function() {
    'use strict';

    angular
        .module('app.repository')
        .run(appRun);

    appRun.$inject = ['routerHelper', 'Repository'];
    /* @ngInject */
    function appRun(routerHelper, Repository) {
        routerHelper.configureStates(getStates(Repository));
    }

    function getStates(Repository) {
        return [
            {
                state: 'listRepository',
                config: {
                    url: '/repository',
                    templateUrl: 'app/repository/views/list.html',
                    controller: 'RepositoryController',
                    controllerAs: 'vm',
                    title: 'List Repositories',
                    resolve: {
                       repositories: function(){ return Repository.query(); }
                    }
                }
            },
            {
                state: 'createRepository',
                config: {
                    url: '/repository/create',
                    templateUrl: 'app/repository/views/create.html',
                    controller: 'RepositoryController',
                    controllerAs: 'vm',
                    title: 'Create Repository'
                }
            },
            {
                state: 'viewRepository',
                config: {
                    url: '/repository/:repositoryId',
                    templateUrl: 'app/repository/views/view.html',
                    controller: 'RepositoryController',
                    controllerAs: 'vm',
                    title: 'View Repository'
                }
            },
            {
                state: 'editRepository',
                config: {
                    url: '/repository/:repositoryId/edit',
                    templateUrl: 'app/repository/views/edit.html',
                    controller: 'RepositoryController',
                    controllerAs: 'vm',
                    title: 'Edit Repository'
                }
            }
        ];
    }
})();
