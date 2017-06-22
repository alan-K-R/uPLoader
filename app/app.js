  'use strict';

  var app = angular.module('uploader', [
    'ngRoute',
    'controllers'
  ]);
  app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'main.view.html',
            controller: 'uploadFileCtrl'
        })  
    .otherwise("/");
  });
