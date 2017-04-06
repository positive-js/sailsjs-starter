/**
 * Validate a login request
 *
 * Looks up a user using the supplied identifier (email or username) and then
 * attempts to find a local Passport associated with the user. If a Passport is
 * found, its password is checked against the password supplied in the form.
 *
 * @param {Object}   req
 * @param {string}   identifier
 * @param {string}   password
 * @param {Function} next
 */
module.exports = function (req, identifier, password, next) {
    const query   = {};

    query.email = identifier;

    sails.models.user.findOne(query, (err, user) => {
        if (err) {
            return next(err);
        }

        if (!user) {
            return next(null, false, {message: "Error.Passport.Email.NotFound"});
        }

        sails.models.userpassport.findOne({
            protocol : 'local',
            user     : user.id
        }, (err, passport) => {
            if (err) {
                return next(err);
            }
            if (passport) {
                passport.validatePassword(password, (err, valid) => {
                    if (err) {
                        return next(err);
                    }

                    if (!valid) {
                        return next(null, false, {message: 'Error.Passport.Password.Wrong'});
                    } else {
                        return next(null, user);
                    }
                });
            }
            else {
                return next(null, false, {message: 'Error.Passport.Password.NotSet'});
            }
        });
    });
};
