import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import Usuario from "../models/daos/UsuariosDao.js";

// Use passport-local strategy for login and register actions
passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      const users = await Usuario.getAll();
      try {
        // Find user by email
        const user = users.find((user) => user.email === email);
        if (!user) {
          // Return false if user doesn't exist
          return done(null, false);
        }
        // Compare password
        const correctPassword = await user.comparePassword(password);
        if (!correctPassword) {
          // Return false if password is incorrect
          return done(null, false);
        }
        // Return user if login is successful
        return done(null, user);
      } catch (error) {
        // Return error if there's an issue with the request
        return done(error);
      }
    }
  )
);

passport.use(
  "register",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (
      { email, fullName, address, phoneNumber, profilePicture },
      password,
      done
    ) => {
      const users = await Usuario.getAll();
      try {
        // Check if user with provided email already exists
        const existingUser = users.find((user) => user.email === email);

        if (existingUser) {
          // Return false if user already exists
          return done(null, false);
        }

        // Create new user
        const newUser = {
          id: users.length + 1,
          email,
          password,
          fullName,
          address,
          phoneNumber,
          profilePicture, //TODO: UPLOAD PROFILE PIC AND GET URL,
        };

        await Usuario.add(newUser);

        // Return new user
        return done(null, newUser);
      } catch (error) {
        // Return error if there's an issue with the request
        return done(error);
      }
    }
  )
);

// Serialize user
passport.serializeUser((user, done) => {
  // Store user ID in session
  done(null, user._id);
});

// Deserialize user
passport.deserializeUser(async (id, done) => {
  try {
    // Find user by ID and exclude password
    const user = await Usuario.findById(id).select("-password");
    // Return user
    done(null, user);
  } catch (error) {
    // Return error if there's an issue with the request
    done(error);
  }
});

export default passport;
