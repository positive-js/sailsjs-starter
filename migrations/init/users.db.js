const users = [
    { id: 1, name: 'Bobcat', email: 'mail@mail.ru', role: 1 }
];

module.exports = function() {

    sails.models.user.create(users).exec(function (err, user) {
        sails.log.info('created', user);
    });
};
