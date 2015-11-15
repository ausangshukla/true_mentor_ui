(function () {
    'use strict';

    angular
        .module('app.repository')
        .controller('RepositoryController', RepositoryController);

    RepositoryController.$inject = ['logger',
        '$stateParams',
        '$state',
        'Repository',
        'TableSettings',
        'RepositoryForm'];
    /* @ngInject */
    function RepositoryController(logger,
        $stateParams,
        $state,
        Repository,
        TableSettings,
        RepositoryForm) {

        var vm = this;
        vm.tableParams = TableSettings.getParams(Repository);
        vm.repository = {};
        vm.repositories = {};
        
        vm.loadAll = function() {
        	vm.repositories = Repository.query();
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
                $state.go("viewRepository", {"repositoryId" : response.id});
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
                    $state.go('listRepository');
                });
            }

        };

        // Update existing Repository
        vm.update = function() {
            var repository = vm.repository;

            repository.$update(function() {
                logger.success('Repository updated');
                $state.go("viewRepository", {"repositoryId" : repository.id});
            }, function(errorResponse) {
                vm.error = errorResponse.data.summary;
            });
        };

        vm.toViewRepository = function() {
            Repository.get({repositoryId: $stateParams.repositoryId}, function(response){
            	vm.repository = response;
                vm.setFormFields(true);
            });
            
        };
        
        vm.showDetails = function(repositoryId) {
        	$state.go("viewRepository", {"repositoryId" : repositoryId});
        }

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
