import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../models/User.js';

passport.use('login', new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
        },
        async (email, password, done) => {
            try {
                const user = await User.findOne({ email });
                if (!user) {
                    return done(null, false);
                }
                const correctPassword = await user.comparePassword(password);
                if (!correctPassword) {
                    return done(null, false);
                }
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    )
);

passport.use('register', new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
    },
    async (email, password, done) => {
        try {
            const existingUser = await User.findOne({ email });
            console.log(existingUser);
            if (existingUser) {
                return done(null, false);
            }
            const user = new User({ email, password });
            await user.save();
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }
)
);


passport.serializeUser((user, done) => {    
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User
            .findById(id)
            .select('-password');
        done(null, user);
    } catch (error) {
        done(error);
    }
});

export default passport;