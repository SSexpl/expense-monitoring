const router = require('express').Router();
const { application } = require('express');
const passport = require('passport');
const genPassword = require('../lib/passwordUtils').genPassword;
const connection = require('../config/database');
const User = connection.models.User;//change in 



 // TODO
 router.post('/login', passport.authenticate('local', { failureRedirect: '/login-failure', successRedirect: '/login-success' }));

 // TODO
 router.post('/register', (req, res, next) => {
    const saltHash = genPassword(req.body.pw);
    
    const salt = saltHash.salt;
    const hash = saltHash.hash;
    const psaltHash=genPassword(req.body.phone);
    const dHash=genPassword(req.body.DOB);
    const newUser = new User({
        username: req.body.uname,
        email:req.body.email,
        hash: hash,
        salt: salt,
        phash:psaltHash.hash,
        psalt:psaltHash.salt,
        email:req.body.email,
        pet:req.body.pet,
        nationality:req.body.nationality,
        city:req.body.city,
        bank:req.body.bank,
        DOBhash:dHash.hash,
        DOBsalt:dHash.salt
    });

    newUser.save()
        .then((user) => {
            console.log(user);
        });

    res.redirect('/login');
 });


 /**
 * -------------- GET ROUTES ----------------
 */

router.get('/', (req, res, next) => {
   res.render('home');
});

// When you visit http://localhost:3000/login, you will see "Login Page"
router.get('/login', (req, res, next) => {
   
 
    res.render('login');

});

// When you visit http://localhost:3000/register, you will see "Register Page"
router.get('/register', (req, res, next) => {

   res.render('register');

});

/**
 * Lookup how to authenticate users on routes with Local Strategy
 * Google Search: "How to use Express Passport Local Strategy"
 * 
 * Also, look up what behaviour express session has without a maxage set
 */
router.get('/protected-route', (req, res, next) => {
    
    // This is how you check if a user is authenticated and protect a route.  You could turn this into a custom middleware to make it less redundant
    if (req.isAuthenticated()) {
        res.redirect('/item/admin');
    } else {
        res.send('<h1>You are not authenticated</h1><p><a href="/login">Login</a></p>');
    }
});

// Visiting this route logs the user out
router.get('/logout', (req, res, next) => {//logout route fixed.
    req.logout(function(err)
    {
        if (err) { return next(err); }
        res.redirect('/');
    });
    res.redirect('/protected-route');
});

router.get('/login-success', (req, res, next) => {
    res.send('<p>You successfully logged in. --> <a href="/protected-route">Go to protected route</a></p>');
});

router.get('/login-failure', (req, res, next) => {
    res.send('You entered the wrong password.');
});

module.exports = router;