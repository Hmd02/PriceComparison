const router = require("express").Router()
const netmeds=require("../controllers/fetch/fetch_netmeds.js")
const pharm=require("../controllers/fetch/fetch_pharm")
const apollo=require("../controllers/fetch/fetch_appolo")
const practo=require("../controllers/fetch/fetch_practo")
const mg=require("../controllers/fetch/fetch_mg")

var results={}

router.post('/',(req,res)=>
{
   async function names_()
   {
    let result_mg=[],mg_names=[],mg_prices=[],mg_images=[]
    let result_netmeds=[],netmeds_prices=[],netmeds_names,netmeds_images=[] //netmeds
    let result_pharm=[],pharm_names=[],pharm_prices,pharm_images=[]  //pharmeasy
    let result_practo=[],practo_names=[],practo_prices,practo_images=[]
  

    let medicine=req.body.search

    result_netmeds= await netmeds(medicine)
    
    netmeds_names=result_netmeds[0]     //netmeds starts

    netmeds_prices=result_netmeds[1]

    results[0] =  Object.assign.apply({}, netmeds_names.map( (v, i) => ( {[v]: netmeds_prices[i]} ) ) );//Assigning for comparison

    netmeds_images=result_netmeds[2]      //netmeds ends

    result_pharm=await pharm(medicine);             //pharmeasy starts

    pharm_names=result_pharm[0]

    pharm_prices=result_pharm[1]

    results[1] =  Object.assign.apply({}, pharm_names.map( (v, i) => ( {[v]: pharm_prices[i]} ) ) );//Assigning for comparison

    pharm_images=result_pharm[2]                  //pharmeasy ends


    result_apollo=await apollo(medicine);    //apollo starts

    apollo_names=result_apollo[0]

    apollo_prices=result_apollo[1]

    results[2] =  Object.assign.apply({}, apollo_names.map( (v, i) => ( {[v]: apollo_prices[i]} ) ) );//Assigning for comparison

    apollo_images=result_apollo[2]       //apollo ends

    result_practo=await practo(medicine);  //practo starts 
    
    practo_names=result_practo[0]

    practo_prices=result_practo[1]

    practo_images=result_practo[2]        //practo ends
   
    // result_mg=await mg(medicine);       //mg starts
   
    // mg_names=result_mg[0]

    // mg_prices=result_mg[1]

    console.log(results)
    res.render("results",{apollo_names:apollo_names,apollo_prices:apollo_prices,apollo_images:apollo_images,
      pharm_names:pharm_names,pharm_prices:pharm_prices,pharm_images:pharm_images,
      practo_names:practo_names,practo_prices:practo_prices,practo_images:practo_images,
      netmeds_names:netmeds_names,netmeds_prices:netmeds_prices,netmeds_images:netmeds_images})
    
  }
  names_();
});



// module.exports= router;
exports.method=router;
exports.dict=results;