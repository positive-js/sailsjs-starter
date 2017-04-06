const userrole = [
    { id: 1, name: 'admin', displayName: 'Administrator' },
    { id: 2, name: 'user', displayName: 'User' }
];

module.exports = function() {

    sails.models.userrole.create(userrole).exec(function (err, data) {
        sails.log.info('created', data);
    });
};
