(function () {
    'use strict';

    angular
        .module('app.repository')
        .controller('RepositoryController', RepositoryController);

    RepositoryController.$inject = ['logger',
        '$stateParams',
        '$location',
        'Repository',
        'TableSettings',
        'RepositoryForm',
        'repositories'];
    /* @ngInject */
    function RepositoryController(logger,
        $stateParams,
        $location,
        Repository,
        TableSettings,
        RepositoryForm,
        repositories) {

        var vm = this;
        vm.tableParams = TableSettings.getParams(Repository);
        vm.repository = {};
        vm.repositories = repositories;
        
        vm.loadAll = function() {
        	repositories = Repository.query();
        }

        vm.setFormFields = function(disabled) {
            vm.formFields = RepositoryForm.getFormFields(disabled);
        };

        vm.create = function() {
            // Create new Repository object
            var repository = new Repository(vm.repository);

            // Redirect after save
            repository.$save(function(response) {
                logger.success('Repository created');
                $location.path('repository/' + response.id);
            }, function(errorResponse) {
                vm.error = errorResponse.data.summary;
            });
        };

        // Remove existing Repository
        vm.remove = function(repository) {

            if (repository) {
                repository = Repository.get({repositoryId:repository.id}, function() {
                    repository.$remove(function() {
                        logger.success('Repository deleted');
                        vm.tableParams.reload();
                    });
                });
            } else {
                vm.repository.$remove(function() {
                    logger.success('Repository deleted');
                    $location.path('/repository');
                });
            }

        };

        // Update existing Repository
        vm.update = function() {
            var repository = vm.repository;

            repository.$update(function() {
                logger.success('Repository updated');
                $location.path('repository/' + repository.id);
            }, function(errorResponse) {
                vm.error = errorResponse.data.summary;
            });
        };

        vm.toViewRepository = function() {
            vm.repository = Repository.get({repositoryId: $stateParams.repositoryId});
            vm.setFormFields(true);
        };

        vm.toEditRepository = function() {
            vm.repository = Repository.get({repositoryId: $stateParams.repositoryId});
            vm.setFormFields(false);
        };

        activate();

        function activate() {
            //logger.info('Activated Repository View');
        }
    }

})();
