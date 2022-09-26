const router =require("express").Router();
const user =require("../models/user.model")
const flash =require("express-flash-messages");
const { request } = require("express");

router.get('/',(req,res)=>
{
    res.render('login')
})

router.post('/',async (req,res)=>
{
    let username=req.body.username
    let password=req.body.password
    let user_auth=await user.findOne({username:username,password:password})
    // ,(err,data)=>
    // {       
    //     // if(err)
    //     // {
    //     //     console.log(err)
    //     // }
    //     else if(data.length!=0){
    //     req.flash(('message', 'Logged-In Successfully'))
    //     res.render('home')
    //     }
    //     else
    //     {
    //         localStorage.setItem('username',username)
    //         localStorage.setItem('password',password)
    //         req.flash(('notify', 'Invalid Credentials'))
    //         res.render('login')
    //     }
    // })
    if(user_auth!==null)
    {
        req.session.user={
            username:username,
            password:password
        }
      res.render('home')
    }
    else
    {
        res.redirect("/login")
    }
})

module.exports=router;