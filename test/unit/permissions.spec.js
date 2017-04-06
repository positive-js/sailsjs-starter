const assert = require('assert');

describe('unit.services.permissions', function() {

    describe('Allowed', function() {
        it('should be allowed', function () {
            assert.equal(PermissionsService.isAllowed('guest', 'user', 'create'), true);
            assert.equal(PermissionsService.isAllowed('user', 'user', 'find'), true);
            assert.equal(PermissionsService.isAllowed('admin', 'user', 'create'), true);
        });

        it('should be allowed thanks to parents fallback', function() {
            assert.equal(PermissionsService.isAllowed('admin', 'user', 'delete'), true);
        });
    });

    describe("Forbidden", function() {
        it('should deny because these resources does\'nt exist', function(){
            // Existence of data
            assert.equal(PermissionsService.isAllowed('admin', 'r5', 'a1') , false); // resource r5 doesnt exist
        });

        it('should deny because these action does\'nt exist', function(){
            // Existence of data
            assert.equal(PermissionsService.isAllowed('admin', 'user', 'a50'), false); // action a50 doesnt exist
        });
    });
});
