const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    firstName: {type: String, required: [true, 'First name can not be empty']},
    lastName: {type: String, required: [true, 'Last name can not be empty']},
    email: {type: String, required: [true, 'Email can not be empty'], unique: [true, 'This email address has been used']},
    password: {type: String, required: [true, 'Password can not be empty']}
});

//replace plaintext password with hash password brfore storing into the database
//pre middleware

userSchema.pre('save', function(next){
    let user = this;
    if(!user.isModified('password'))
        return next();
    bcrypt.hash(user.password,10)
    .then(hash=>{
        user.password = hash;
        next();
    })
    .catch(err=>next(err));

});

//implement the method to compare the login password and stored hash password
userSchema.methods.comparePassword = function(loginPassword){
    let user = this;
    return bcrypt.compare(loginPassword,user.password);

};


module.exports = mongoose.model('User', userSchema);

