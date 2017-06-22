  'use strict';
  var testapp = angular.module('controllers', [])
    .controller('uploadFileCtrl', function ($scope, $timeout, $sce, $http) {
      $scope.id = 'fileupload';
      $scope.wistiaPassword = '2b3accaa5d4c7086bb86fcbf9f6e3f27f5e04160e124e97ce223c3ef3aedb247'
      $scope.hashId   = '';
      $scope.progress = 0;
      $scope.status   = 'idle';
      $scope.url      = '';

      $scope.checkStatus = function() {
        $http({
          method: 'GET',
          url: 'https://api.wistia.com/v1/medias/' + $scope.hashId + '.json?api_password=' + $scope.wistiaPassword
        }).then(function (response) {
          $scope.status = response.data.status || '';

          if ($scope.status == 'ready')
            $scope.url = $sce.trustAsResourceUrl('http://fast.wistia.net/embed/iframe/' + $scope.hashId);
          else if ($scope.status != 'failed') {
            //check status again in a few seconds
            $timeout(function(){
              $scope.checkStatus();
            }, 3000);
          }
        });
      };

      $timeout(function(){
        $('#' + $scope.id + '_input').fileupload({
          dataType: 'json',
          formData: {
            api_password: $scope.wistiaPassword
          },
          add: function (e, data) {
            $scope.hashId   = '';
            $scope.progress = 0;
            $scope.status   = 'uploading';
            $scope.url      = '';

            data.submit();
          },
          done: function (e, data) {
            if (data.result.hashed_id != '') {
              $scope.hashId = data.result.hashed_id;
              $scope.checkStatus();
            }
          },
          progressall: function (e, data) {
            if (data.total > 0) {
              $scope.$apply(function(){
                $scope.progress = parseInt(data.loaded / data.total * 100, 10);
              });
            }
          }
        });
      });
    });