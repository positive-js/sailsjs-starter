const sails = require('sails');
const config = require('../config/env/test.js');

before(function(done) {

    // Increase the Mocha timeout so that Sails has enough time to lift.
    this.timeout(10000);

    sails.lift(config, function(err, server) {
        if (err) return done(err);
        // here you can load fixtures, etc.
        done(err, sails);
    });
});

after(function(done) {
    // here you can clear fixtures, etc.
    if(sails){
        sails.lower(done);
    } else{
        done();
    }
});
