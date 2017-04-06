module.exports = function (req, username, password, next) {

    if(!email && !password){
        return next(null, false, {code:401});
    }

    sails.models.user.findOne({email: email}).populate('role')
        .then((user) => {
            if( !user) {
                return next(null, false, {code: 400});
            }

            const query = {
                protocol : 'local',
                user     : user.id
            };

            return sails.models.userpassport.findOne(query)
                .then((userPassport) => {
                    if (userPassport) {
                        userPassport.validatePassword(password, (err, valid) => {
                            if (err) {
                                return next(err);
                            }

                            if (!valid) {
                                return next(null, false, {message: 'Error.Passport.Password.Wrong', code: 400});
                            } else {
                                return next(null, user);
                            }
                        });
                    }
                    else {
                        return next(null, false, {message: 'Error.Passport.Password.NotSet', code: 400});
                    }
                });
        })
        .catch(next);
};
