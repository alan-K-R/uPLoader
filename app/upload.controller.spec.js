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
});
