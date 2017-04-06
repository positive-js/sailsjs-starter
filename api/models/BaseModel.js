module.exports = {

    attributes: {

        /**
         * This method protect sensitive data before sending to customers
         * - overwrite this method in child model
         */
        toJSON: function() {
            const model = this.toObject();
            return model;
        },

    },

    beforeValidation: function(event, next){
        next();
    },

    beforeCreate: function(event, next){
        next();
    },

    afterCreate: function(newlyInsertedEvent, next){
        next();
    },

    beforeUpdate: function(event, next){
        next();
    },

    afterUpdate: function(newlyUpdatedEvent, next){
        next();
    },

    /**
     * Call .toJSON() to all model inside the given array and return it
     */
    toJSON: function( models ) {
        const customerModels = [];
        for(const i in models){
            customerModels.push( models[i].toJSON() );
        }
        return customerModels;
    }

};
