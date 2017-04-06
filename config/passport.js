/**
 * Passport configuration
 *
 * This is the configuration for your Passport.js setup and it where you'd
 * define the authentication strategies you want your application to employ.
 *
 * Authentication scopes can be set through the `scope` property.
 *
 * For more information on the available providers, check out:
 * http://passportjs.org/guide/providers/
 */

module.exports.passport = {

    strategies: {
        local: {
            strategy: require('passport-local').Strategy
        },

        basic: {
            strategy: require('passport-http').BasicStrategy,
            protocol: 'basic'
        }
    }
};
