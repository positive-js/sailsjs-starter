module.exports.permissions = {
    defaultRole: 'admin',

    roles: [
        {
            name: 'guest'
        },
        {
            name: 'user',
            parent: 'guest'
        },
        {
            name: 'admin',
            parent: 'user'
        }
    ],

    resources: [
        'user',
        'product',
        'friendship'
    ],

    acl: {
        guest: {
            allow: {
                user: ['create']
            }
        },
        user: {
            allow: {
                user: ['find','delete', 'update', 'patch', 'generateResetPasswordToken'],
                friendship: ['create', 'findfriends'],
                product: ['find','findmultiple','create']
            },
            deny: {
                user: ['create']
            }
        },
        admin: {
            allow: {
                product: ['delete'],
                user: ['create', 'deleteOthers', 'updateOthers', 'patchOthers']
            }
        }
    }
};
