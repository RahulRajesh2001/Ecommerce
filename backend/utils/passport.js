import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import passport from 'passport';


passport.use(
    new GoogleStrategy(
        {
            clientID:"1059014681918-el98t0hkfjql8bk0pb1ueo0ogj8v7n92.apps.googleusercontent.com",
            clientSecret:"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",
            callbackURL:'/auth/google/callback',
            scope:["profile","email"]
        },
        function (accessToken,refreshToken,profile,callback){
            callback(null,profile);
        }
    )
)