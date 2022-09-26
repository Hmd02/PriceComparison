const express = require('express')
const path = require('path')
const app=express()
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const port=8000

const bodyParser = require('body-parser');
const flash =require("express-flash-messages")

const orderRoute=require('./routes/order.route')
const contactRoute=require('./routes/contact.route')
// const resultRoute=require('./routes/result.route')
const myModule=require('./routes/result.route')
const resultRoute=myModule.method
const loginRoute=require('./routes/login.route')
const signUpRoute=require('./routes/signUp.route')
const logoutRoute=require('./routes/logout.route')
const cartRoute=require('./routes/cart.route')


require("./config/mongodb.config")




app.set('view engine','ejs');

app.get('https://mellifluous-marigold-9a59d5.netlify.app/',(req,res)=>
{
    res.render('home')
})

app.use(bodyParser.urlencoded({ extended: true })); 

const store = new MongoDBStore({
    uri: 'mongodb://localhost:27017/test',
    collection: 'sessions'
});


app.use(session({
    secret:'secret-key',
    saveUninitialized: false,
    resave:false,
    store: store,
    name: 'session cookie name',
    unset:'destroy',    
}));


app.use(flash())

app.use('/order',orderRoute)
app.use('/contact',contactRoute)
app.use('/results',resultRoute)
app.use('/login',loginRoute)
app.use('/logoutuser',logoutRoute)
app.use('/signup',signUpRoute)
app.use('/cart',cartRoute)


app.listen(port,()=>
{
   console.log("Server listening to port "+port)
})


