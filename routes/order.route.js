const router=require("express").Router();
const path=require("path")



router.get('/',(req,res)=>
{
    res.render("order")
});




module.exports= router;