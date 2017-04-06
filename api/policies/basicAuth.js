/**
 * basicAuth
 *
 * If HTTP Basic Auth credentials are present in the headers, then authenticate the
 * user for a single request.
 *
 * - Check if request is made for Basic Auth
 * - If request is not made for, then ignore it
 * - If request is made for, try to authenticate
 */
module.exports = function (req, res, next) {
    const auth = req.headers.authorization;

    // Ignore request if it's not basic
    if (!auth || auth.search('Basic ') !== 0) {
        return next();
    }

    const authString = new Buffer(auth.split(' ')[1], 'base64').toString();
    const username = authString.split(':')[0];

    sails.log.info('anyAuth -> basic authentication asked, authenticating', username, 'using basic auth:', req.url);
};
