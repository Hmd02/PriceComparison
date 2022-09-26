const router=require('express').Router();
const myModule=require('./result.route')
const axios=require('axios')

var cart={}


var results=myModule.dict
// var cart={}
var items=[]
router.post("/",(req,res)=>
{
   let item=req.body.name,total=[]
   if(cart.hasOwnProperty(item)) 
    {
       cart[item]+=1;
    }
    else{
      cart[item]=1;
      items.push(item)
    }
   // for(i=0;i<4;i++)
   // {
      // total=cart[item]*results[`${i}`].item
      // pharm_total=
      // practo_total=
      // apollo_total-
   // }
//    async function f()
//    {
//      const response = await axios
//      .post('https://0z9q3se3dl-dsn.algolia.net/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20JavaScript%20(3.33.0)%3B%20Browser%3B%20instantsearch.js%20(4.40.2)%3B%20JS%20Helper%20(3.7.4)&x-algolia-application-id=0Z9Q3SE3DL&x-algolia-api-key=daff858f97cc3361e1a3f722e3729753',{
//      "requests":[{"indexName":"prod_meds","params":`clickAnalytics=true&highlightPreTag=__ais-highlight__&highlightPostTag=__%2Fais-highlight__&page=0&query=${item}&hitsPerPage=10&facets=%5B%5D&tagFilters=`}]
//    })
//  }
// }
    console.log(total)
   //  res.render('cart_view',{cart:cart,items:items,apollo_total:apollo_total,pharm_total:pharm_total,practo_total:practo_total,netmeds_total:apollo_total})
    res.render('cart_view',{cart:cart,items:items})
})
module.exports=router;