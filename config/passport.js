
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const connection = require('./database');
const User = connection.models.User;
const validPassword = require('../lib/passwordUtils').validPassword;

const customFields = {
    usernameField: 'uname',
    passwordField: 'pw',
    
};

const verifyCallback = (username, password,  done) => {
   
    User.findOne({ username: username })
        .then((user) => {

            if (!user) { 
              console.log("NOT a user");
              return done(null, false) ;
            }
            
            const isValid = validPassword(password, user.hash, user.salt);
            //const ispValid= validPhone(phone,user.phash,user.psalt);
           //const ispValid=true;
            if (isValid) {
                console.log("VAlID");
                return done(null, user);
            } else {
                console.log("invalid");
                return done(null, false);
            }
        })
        .catch((err) => {   
            return(err);
        });

}

const strategy  = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((userId, done) => {
    User.findById(userId)
        .then((user) => {
            done(null, user);
        })
        .catch(err => done(err))
});
