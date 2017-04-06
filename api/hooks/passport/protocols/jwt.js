module.exports = function(req, jwt_payload, done) {

    sails.log.info('jwt auth protocol -> jwt_payload: ', jwt_payload);

    sails.models.user.findOne({id: jwt_payload.user}).populate('role')
        .then((entry) => {
            if (!entry)  {return done(null, false, {message: "Invalid.Token"});}

            return done(null, entry, {});
        })
        .catch(done);
};
