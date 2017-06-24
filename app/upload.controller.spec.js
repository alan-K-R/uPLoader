describe('controllers', function(){
  beforeEach(module('controllers'));

  var ctrl, scope;
  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    ctrl = $controller('uploadFileCtrl', {
      $scope: scope
    });
  }));

  it('should have defined uploadController', function() {
    expect(ctrl).toBeDefined();
  });
  
  beforeEach(inject(function($controller, _$httpBackend_) {
    $scope = {};
    var controller = $controller('uploadFileCtrl', { $scope: $scope });
    var URL = 'https://api.wistia.com/v1/medias/.json?api_password=2b3accaa5d4c7086bb86fcbf9f6e3f27f5e04160e124e97ce223c3ef3aedb247'
    $httpBackend = _$httpBackend_;

    //Tell the $httpBackend to respond with our mockLangularList array. Or whatever the api actually returns.Array used for example.
    var mockMedia = [{key: ''},{key: ''},{key: ''}];
    $httpBackend.whenGET(URL).respond(200, mockMedia);

 }));

  it('should load default media', function()
  {
      $scope.checkStatus(); // <-- Make call
      $httpBackend.flush();
      expect($scope.checkStatus).not.toEqual(undefined);
  });
});
