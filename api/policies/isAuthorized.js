/**
 * isAuthorized policy.
 *
 * This policy just check if the request has enough permission to perform an action.
 * It use the permission service which use ACL like permissions.
 *
 * At this point sails has extracted the controller and the method from the request routes,
 * we can easily perform a check on these two resources.
 */
function isAuthorized(req, res, next) {

    // Sails automatically extract the controller and the method from the request routes
    const resource = req.options.controller;
    const action = req.options.action;

    if(_.isNull(resource) || _.isUndefined(resource) || _.isNull(action) || _.isUndefined(action)){
        sails.log.info('isAuthorized -> check -> Unable to get a valid controller / action from the request, automatically rejected');
        return res.forbidden();
    }
    else{
        const role = (req.user) ? req.user.role.name : 'guest';

        sails.log.info('isAuthorized -> check ', resource, action);

        // We now use the permission service
        const isAuthorized = PermissionsService.isAllowed( role, resource, action );
        if(isAuthorized){
            return next();
        }
        else{
            return res.forbidden();
        }
    }
}

module.exports = isAuthorized;
