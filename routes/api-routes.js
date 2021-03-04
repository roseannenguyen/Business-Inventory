// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
const { QueryTypes } = require('sequelize');


module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  // app.post("/api/login", passport.authenticate("local"), function(req, res) {
  //   res.json(req.user);
  // });
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        console.log(err);
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  app.get("/api/items", async function(req, res) {
    await db.sequelize.query(`SELECT item.id, item.name, item.quantity, item.price, item.body
    FROM item
    INNER JOIN inventory
    ON item.id = inventory.ItemId
    INNER JOIN user
    ON user.id = inventory.UserId
    WHERE user.id = ${req.user.id}`, { type: QueryTypes.SELECT }).then((results) => {
      res.json(results)
    }).catch(err => {
      console.log(err)
    })
  });
    
   
  
  app.post("/api/items", async (req, res) => {
    db.Item.create({
      name: req.body.name,
      quantity: req.body.quantity,
      price: req.body.price,
      body: req.body.body,
    }) .then((data) => {
      db.Inventory.create({
        UserId: req.user.id,
        ItemId: data.id
      }).then(() => {
        res.send();
      });
      console.log(data.id);
      console.log(req.user.id);
     console.log("Item added!")
    })
    .catch(err => {
      console.log(err);
      res.status(401).json(err);
    });
    
    // const { name, quantity, price, body, UserId } = req.body

    // try{
    //   const item = await db.Item.create({ name, quantity, price, body, UserId })
    //   return res.json(item) 
    // }catch(err){
    //   console.log(err)
    // }
  });

  app.put("/api/items", function(req, res) {
    db.Item.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(data) {
      res.json(data);
    });
  });

  app.delete("/api/items/:id", function(req, res) {
    db.Item.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(data) {
      res.json(data);
    });
  });
};



