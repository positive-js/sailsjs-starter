'use strict';

const passport        = require('passport');

module.exports = function (sails) {

    return {

        // Configuration here will be available inside sails.config.passport
        // But if the file exist in /config/passport it will override default configuration
        defaults: {
            passport: { }
        },

        configure: function() {

        },

        initialize: function (cb) {
            require('./passport').extend(sails, passport);

            loadStrategies(sails, sails.config.passport.strategies);

            return cb();
        }
    };
};

/**
 * Load all strategies defined in the Passport configuration
 *
 * Will use the passport.use( new Strategy ... ) for all registered strategies.
 *
 * For more information about each strategy refer to their website
 *
 * For more information on the providers supported by Passport.js, check out:
 * http://passportjs.org/guide/providers/
 *
 */
function loadStrategies(sails, strategies) {

    Object.keys(strategies).forEach((key) => {
        const options = {
            passReqToCallback: true
        };
        let Strategy;

        if (key === 'local') {
            _.extend(options, strategies[key].options);

            Strategy = strategies[key].strategy;

            passport.use(new Strategy(options, passport.protocols.local));
        }

    });
}
