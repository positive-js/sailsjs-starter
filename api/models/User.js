/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
const Promise = require('bluebird');

module.exports = _.merge( _.cloneDeep( require('./BaseModel') ), {

    tableName: 'user',
    autoPK: true,
    autoCreatedAt: true,
    autoUpdatedAt: true,
    identity: 'user',

    attributes: {
        id: {
            type: 'integer',
            autoIncrement: true,
            unique: true,
            index: true,
            primaryKey: true,
            columnName: 'userID'
        },

        email: {
            type: 'email',
            required: true,
            unique: true,
            columnName: "userMail"
        },

        firstName: {
            type: 'string',
            required: false,
            columnName: 'userFirstName'
        },

        lastName: {
            type: 'string',
            required: false,
            columnName: 'userLastName'
        },

        phone: {
            type: 'int',
            required: false,
            defaultTo: null,
            columnName: 'userPhone'
        },

        createdAt: {
            type: 'datetime',
            defaultsTo: function (){ return new Date(); },
            columnName: 'createdAt'
        },

        updatedAt: {
            type: 'datetime',
            defaultsTo: function (){ return new Date(); },
            columnName: 'updatedAt'
        },

        /**
         * Get user's full name
         */
        fullName: function() {
            return _.compact([this.firstName, this.lastName]).join(' ');
        },

        /**
         * This method protect sensitive data before sending to customers
         * Return everything for development
         */
        toJSON: function() {
            const user = this.toObject();

            return user;
        }
    },

    beforeCreate: setDefaultRoleIfUndefined,

    beforeUpdate: [ ],

    beforeDestroy: function(criteria, cb){
        cb();
    },

    afterDestroy: function(destroyedRecords, cb){
        const requests = [];
        destroyedRecords.forEach((record) => {
            requests.push(sails.models.userpassport.destroy({user: record.userID}));
        });
        Promise.all(requests)
            .then(cb.bind(this, null))
            .catch(cb);
    }
});

/**
 * Set the default user role if undefined during creation
 * @param values
 * @param cb
 * @returns {*}
 */
function setDefaultRoleIfUndefined(values, cb) {
    if (values.role) {
        return cb();
    }

    sails.log.debug('User -> setDefaultRoleIfUndefined -> default is set (default=' + sails.config.permissions.defaultRole + ')');
    sails.models.userrole.findDefault((err, role) => {
        sails.log.debug(role);
        if (err) {
            return cb(err);
        }
        if (!role) {
            return cb(new Error("Unable to load the role"));
        }

        values.role = role.id;
        return cb();
    });
}
