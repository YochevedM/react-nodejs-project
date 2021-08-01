const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");
const db = require("./app/models");
const app = express();
const products=require('./app/utils/products')
const users=require('./app/utils/users')
const productRouter=require('./app/routes/product.route')
const userRouter=require('./app/routes/user.route')
const userCartRouter=require('./app/routes/userCart.route')

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(bodyParser.json());// parse requests of content-type - application/json

app.use(bodyParser.urlencoded({ extended: true }));// parse requests of content-type - application/x-www-form-urlencoded

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
  
  //insert products to DB
  db.product.find({}).then(res=>{
    if(res.length==0){
      db.product.insertMany(products).then(()=>{
      console.log("Products inserted")  // Success
    }).catch((error)=>{
      console.log(error)      // Failure
  });
    }
  })

  //insert 2 users to DB
  db.user.find({}).then(res=>{
    if (res.length==0){
      db.user.insertMany(users).then(()=>{
        console.log('Users inserted') // Success
      }).catch((error)=>{
        console.log(error) // Failure
      })
    }
  })
});

app.use('/products',productRouter)
app.use('/userCart',userCartRouter)
app.use('/users',userRouter)


