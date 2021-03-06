var mongoose		= require('mongoose');
var Schema			= mongoose.Schema;
var bcrypt          = require('bcrypt-nodejs');
var activitySchema  = require('./activity');
var feedSchema      = require('./feed');

var userSchema		= new Schema();
userSchema.add({
	local            : {
        email        : String,
        password     : String,
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    firstname: String,
    lastname: String,
	activities: [ activitySchema.schema ],
    friends: [ userSchema ],
    feed: [ feedSchema.schema ],
    socketId: String
});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);