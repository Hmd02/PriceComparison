const router =require("express").Router();
const user =require("../models/user.model")


router.get('/',(req,res)=>
{
    res.render("signup")
})

router.post('/',(req,res)=>
{  
    let username= req.body.username
    let mobile= req.body.mobile
    let password= req.body.password
    user.create({username:username,phone:mobile,password:password},(err,data)=>
    {
        console.log("created")
        res.render("login")
    })
})

module.exports=router;