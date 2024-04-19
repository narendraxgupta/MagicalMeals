const User = require("../models/authModel");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const hashkey = "3lj53lkjlkdsnls#535lkdjfkdlf";

const logincookietoken = "lsjflkdsj787";

const ownerlogintoken = "magicalmeals100";

passport.use(
  new GoogleStrategy(
    {
      clientID: "1005031994918-rj8slrlm49jcao2k65vgf3t5o3rh1664.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "/auth/google/callback",
    },
    async function(accessToken, refreshToken, profile, cb) {
      try {
        let existingUser = await User.findOne({ googleId: profile.id });
        if (existingUser) {
          return cb(null, existingUser);
        } else {
          const newUser = new User({
            name: profile.displayName,
            collegeId: profile.emails[0].value,
            googleId: profile.id,
            role: 'student'
          });
          let user = await newUser.save();
          return cb(null, user);
        }
      } catch (err) {
        if(err.name == 'ValidationError'){
          const errors = {};
          for (const field in err.errors) {
            errors[field] = err.errors[field].message;
          }
          if(errors['googleId']){
            err.message = errors['googleId'];
          }
          else if(errors['collegeId']){
            err.message = errors['collegeId']
          }
          else{
            err.message = 'user login failed'
          }
        }
        else{
          err.message = 'user login failed'
        }
        return cb(err);
      }
    }
  )
);


module.exports.googleSignInCallback = function(req, res, next) {
  passport.authenticate('google', function(err, user, info) {
    if (err) {
      return res.redirect('/?error=' + encodeURIComponent(err.message));
    }
    if (!user) {
      return res.redirect('/?error=User%20login%20failed');
    }
    const mycookie = {
      user: user,
      login: true,
    };

    let token = jwt.sign(mycookie, hashkey);

    res.cookie(logincookietoken, token, { httpOnly: true });
    req.userid = user._id;
    res.redirect('/');
  })(req, res, next);
};

module.exports.googlesignIn = passport.authenticate('google', { scope: ['profile', 'email'] });

module.exports.postCreateAccount = async (req, res) => {
  try {
    const { name, email, password, role, confirmPassword } =
      req.body;
    const newUser = new User({
      name,
      email,
      password,
      confirmPassword,
      role,
    });

    let userdata = await newUser.save();

    const mycookie = {
      user: userdata,
      login: true,
    };

    const token = jwt.sign(mycookie, hashkey);

    res.cookie(logincookietoken, token, { httpOnly: true });
    req.userid = userdata._id;

    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = {};
      for (const field in error.errors) {
        errors[field] = error.errors[field].message;
      }
      return res.status(400).json({ message: "Validation Error", errors });
    }

    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({email: email})

    if (!user) {
      return res
        .status(400)
        .json({
          message: "Validation Error",
          errors: { login: "Invalid emailId" },
        });
    }

    let check = await user.verifyPassword(password)
    if (!check) {
      return res
      .status(400)
      .json({
          message: "Validation Error",
          errors: { login: "Incorrect password" },
        });
    }

    const mycookie = {
      user: user,
      login: true,
    };

    let token = jwt.sign(mycookie, hashkey);

    res.cookie(logincookietoken, token, { httpOnly: true });
    req.userid = user._id;

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.ownerlogin = async function (req, res) {
  try {
    const { token } = req.body;

    if (token != ownerlogintoken) {
      return res.status(400).json({ message: "invalid token" });
    }

    const mycookie = {
      owner: true,
      login: true,
    };

    const cookietoken = jwt.sign(mycookie, hashkey);

    res.cookie(logincookietoken, cookietoken, { httpOnly: true });

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.logoutUser = (req, res) => {
  try {
    req.userid = null;
    res.clearCookie(logincookietoken);
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.checkuserlogin = async function (req, res){
  try {
    let token = req.cookies[logincookietoken];
    if (!token) {
      req.userid = null;
      return res.status(400).json({'login':false})
    }
    jwt.verify(token, hashkey, (err, decoded) => {
      if (err) {
        req.userid = null;
       return res.status(400).json({'login':false})
      }
      const userid = decoded.user._id;
      req.userid = userid;
      if(decoded.user.role === 'staff'){
        return res.status(400).json({'login':false})
      }
      res.status(200).json({'login':true})
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({'error':'internal server error'});
  }
}

module.exports.checkstafflogin = async function (req, res){
  try {
    let token = req.cookies[logincookietoken];
    if (!token) {
      req.userid = null;
      return res.status(400).json({'login':false})
    }
    jwt.verify(token, hashkey, (err, decoded) => {
      if (err) {
        req.userid = null;
       return res.status(400).json({'login':false})
      }
      const userid = decoded.user._id;
      req.userid = userid;
      if(decoded.user.role === 'staff'){
        return res.status(200).json({'login':true})
      }
      res.status(400).json({'login':false})
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({'error':'internal server error'});
  }
}

module.exports.fetchstaff = async function (req, res) {
  try {
    const staff = await User.find({ role: 'staff' });
    res.status(200).json({ staff:staff });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports.addstaff = async function (req, res) {
  try {
    const { name, email, password, confirmPassword } = req.body;
    const newStaff = new User({
      name,
      email,
      password,
      confirmPassword,
      role: 'staff' 
    });

    await newStaff.save();

    res.status(200).json({ message: "Staff added successfully" });
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = {};
      for (const field in error.errors) {
        errors[field] = error.errors[field].message;
      }
      return res.status(400).json({ message: "Validation Error", errors });
    }

    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports.removestaff = async function (req, res) {
  try {
    const { staffId } = req.body;
    const deletedStaff = await User.findByIdAndDelete(staffId);
    if (!deletedStaff) {
      return res.status(404).json({ message: "Staff member not found" });
    }
    res.status(200).json({ message: "Staff removed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}


module.exports.protectRoute = async function (req, res, next) {
  try {
    let token = req.cookies[logincookietoken];
    if (!token) {
      req.userid = null;
      return next();
    }
    jwt.verify(token, hashkey, (err, decoded) => {
      if (err) {
        console.log(err);
        req.userid = null;
        return next();
      }
      if(decoded.owner){
        return next()
      }
      const userid = decoded.user._id;
      req.userid = userid;
      next();
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("<h1>Internal Server error</h1>");
  }
};

module.exports.StaffProtectRoute = async function (req, res, next) {
  try {
    let token = req.cookies[logincookietoken];
    if (!token) {
      req.userid = null;
      return res.redirect("/");
    }
    jwt.verify(token, hashkey, (err, decoded) => {
      if (err) {
        console.log(err);
        req.userid = null;
        return res.redirect("/");
      }
      if(decoded.owner){
        return next()
      }
      const userid = decoded.user._id;
      req.userid = userid;
      const role = decoded.user.role;
      if (role != "staff") {
        return res
          .status(401)
          .send("<h1> Error 401: You are not allowed to view this page</h1>");
      }
      next();
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("<h1>Internal Server error</h1>");
  }
};

module.exports.OwnerProtectRoute = async function (req, res, next) {
  try {
    let token = req.cookies[logincookietoken];
    if (!token) {
      return res
        .status(401)
        .send("<h1> Error 401: You are not allowed to view this page</h1>");
    }
    jwt.verify(token, hashkey, (err, decoded) => {
      if (err) {
        console.log(err);
        return res
          .status(401)
          .send("<h1> Error 401: You are not allowed to view this page</h1>");
      }
      const isowner = decoded.owner;
      if (!isowner) {
        return res
          .status(401)
          .send("<h1> Error 401: You are not allowed to view this page</h1>");
      }
      next();
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("<h1>Internal Server error</h1>");
  }
};
