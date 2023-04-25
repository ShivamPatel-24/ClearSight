require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
passport = require("passport");
MicrosoftStrategy = require("passport-microsoft").Strategy;
morgan = require("morgan");
methodOverride = require("method-override");
session = require("express-session");
const User = require("./models/user");
const Payment = require("./models/payment")
const cartItems = require("./mock_data/cartItems")

var MICROSOFT_GRAPH_CLIENT_ID = process.env.CLIENT_ID;
var MICROSOFT_GRAPH_CLIENT_SECRET = process.env.CLIENT_SECRET;

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing. However, since this example does not
//   have a database of user records, the complete Microsoft graph profile is
//   serialized and deserialized.
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

passport.use(
    new MicrosoftStrategy(
        {
            clientID: MICROSOFT_GRAPH_CLIENT_ID,
            clientSecret: MICROSOFT_GRAPH_CLIENT_SECRET,
            callbackURL: "http://localhost:3000/auth/microsoft/callback",
            scope: ["user.read"],
        },
        function (accessToken, refreshToken, profile, done) {
            // asynchronous verification, for effect...
            process.nextTick(() => {
                // To keep the example simple, the user's Microsoft Graph profile is returned to
                // represent the logged-in user. In a typical application, you would want
                // to associate the Microsoft account with a user record in your database,
                // and return that user instead.
                return done(null, profile);
            });
        }
    )
);


const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
mongoose.set("strictQuery", true);
app.use(morgan("dev"));
// app.use(bodyParser.json());
app.use(methodOverride());
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
    })
);

// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.DB_URL).then(() => {
    console.log("DB connection established");
});

app.get("/", async (req, res) => {
    res.render("account");
});

// // Get total item count in the cart
// const getTotalItems = (cartItems) => {
//     let totalCount = 0;
//     cartItems.forEach((item) => {
//       totalCount += item.count;
//     });
//     return totalCount;
//   };
  
//   // Get total amount of items in the cart
//   const getTotalAmount = (cartItems) => {
//     let totalAmount = 0;
//     cartItems.forEach((item) => {
//       const price = parseFloat(item.price.replace('$', ''));
//       totalAmount += price * item.count;
//     });
//     return `$${totalAmount.toFixed(2)}`;
//   };

//   function getTotalAmount(cartItems) { 
//     let total=0; 
//     let count=0; 

//     cartItems.forEach(function (item) {
//     const amount = parseFloat(item.amount.slice(1)); 
//     const quantity = parseInt(item.count); 
//     total += amount * quantity; 
//     count += quantity; 
//     }); 
//     return `$${total.toFixed(2)}`; 
// }

// Route for cart page
app.get('/cart', (req, res) => {
    res.render('cart', {
      cartItems: cartItems,
    });
});
  
// Increment quantity of cart item
app.get('/cart/increment/:id', (req, res) => {
const id = parseInt(req.params.id);
cartItems.forEach((item) => {
    if (item.id === id) {
    item.count++;
    }
});
res.redirect('/cart');
});

// Decrement quantity of cart item
app.get('/cart/decrement/:id', (req, res) => {
const id = parseInt(req.params.id);
cartItems.forEach((item) => {
    if (item.id === id) {
    item.count--;
    if (item.count < 1) {
        const index = cartItems.indexOf(item);
        cartItems.splice(index, 1);
    }
    }
});
res.redirect('/cart');
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/register", (req, res) => {
    res.render("register");
});

app.post("/login", async (req, res) => {
    try {
        console.log(req.body);
        const { email, password } = req.body;
        const user = await User.findOne({ email: email.toLowerCase() });

        // console.log(password, user.password);
        if (user && password === user.password) {

        /*
            res.status(201).json({
                userDetails: {
                    username: user.username,
                    email: user.email,
                },
            });
        */
            res.redirect("/");
        } else {
            return res
                .status(400)
                .send("Invalid creditials, please try again.");
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send("Something went wrong. Please try again.");
    }
});

app.post("/register", async (req, res) => {
    try {
        console.log(req.body);
        const { username, password, email } = req.body;

        // check if email is already registered
        const userExists = await User.findOne({ email: email.toLowerCase() });
        if (userExists) {
            return res.status(409).send("Email already in use.");
        }

        // Create user to the database
        const user = await User.create({
            username: username,
            email: email.toLowerCase(),
            password: password,
        });

    /*
        // sending success response status
    
        return res.status(201).send({
            userDetails: {
                username: user.username,
                email: user.email,
            },
        });
    */

        res.redirect('/')
    } catch (err) {
        // Catching, logging, and sending error response status
        console.log(err);
        return res.status(500).send("Error Occured, Please Try Again!");
    }
});

app.get("/payment", (req, res) => {
    res.render("payment");
});

app.post("/payment", async (req, res) => {
    try {
        console.log(req.body);
        const { card_type, cc_no, ex_date, sec_code, street, city, state } = req.body;

        // check if card is already registered
        var cardExists = null
        if (cc_no != null){
            cardExists = await Payment.findOne({ 
                creditCardNumber: cc_no.toLowerCase()        
            });
        }
        
        if (cardExists) {
            return res.status(409).send("Email already in use.");
        }

        // Create user to the database
        const payment = await Payment.create({
            cardType: card_type.toLowerCase(), 
            creditCardNumber: cc_no.toLowerCase(), 
            expiryDate: ex_date, 
            securityCode: sec_code, 
            street: street, 
            city: city, 
            state: state,
        });

        console.log(payment)
        res.redirect('/cart')
        // sending success response status
    /*
        return res.status(201).send({
            paymentDetails: {
                cardType: card_type.toLowerCase(), 
                creditCardNumber: cc_no.toLowerCase(), 
                expiryDate: ex_date, 
                securityCode: sec_code, 
                street: street, 
                city: city, 
                state: state,
            },
        });
    */

    } catch (err) {
        // Catching, logging, and sending error response status
        console.log(err);
        return res.status(500).send("Error Occured, Please Try Again!");
    }
})

// GET /auth/microsoft
//   Use passport.authenticate() as route middleware to authenticate the
//   request. The first step in Microsoft Graph authentication will involve
//   redirecting the user to the common Microsoft login endpoint. After authorization, Microsoft
//   will redirect the user back to this application at /auth/microsoft/callback
app.get(
    "/auth/microsoft",
    passport.authenticate("microsoft", {
        // Optionally add any authentication params here
        // prompt: 'select_account'
    }),
    // eslint-disable-next-line no-unused-vars
    (req, res) => {
        // The request will be redirected to Microsoft for authentication, so this
        // function will not be called.
    }
);

// GET /auth/microsoft/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get(
    "/auth/microsoft/callback",
    passport.authenticate("microsoft", { failureRedirect: "/login" }),
    (req, res) => {
        res.redirect("/");
    }
);

app.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/login");
    });
});

let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}

app.listen(port, () => {
    console.log("Server started on port successfully");
});

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    else res.redirect("/login");
}