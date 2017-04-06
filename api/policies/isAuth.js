/**
 * Simply check if user is authenticated
 * if not revoke access.
 */
module.exports = function (req, res, next) {

    if( req.user && req.user.authenticated){
        return next();
    }

    return res.forbidden('You are not permitted to perform this action.');
};
