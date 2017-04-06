/**
 * Implement a policy based on jwt authentication
 * @param req
 * @param res
 * @param next
 */
function jwtAuth(req, res, next) {

    const auth = req.headers.authorization;

    // Ignore request if it's not basic
    if (!auth || auth.search('JWT ') !== 0) {
        return next();
    }

    sails.log.info('jwtAuth -> authentication asked');
}

module.exports = jwtAuth;
