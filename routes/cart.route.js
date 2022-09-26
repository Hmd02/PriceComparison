const router=require('express').Router();
const myModule=require('./result.route')
const axios=require('axios');
const cheerio=require('cheerio')
const f1 = require('../controllers/fetch/fetch_pharm');

var cart={}


var results=myModule.dict
var items=[]
var  gapollo_total=0, gapollo_total=0, gapollo_total=0, gapollo_total=0;
router.post("/",(req,res)=>
{
 let item=req.body.name,total=[]
 async function f(item)
    {
      let price_apollo=[],price_pharm=[],price_practo=[],price_netmeds=[]
    //  let item=req.body.name,total=[]
     if(cart.hasOwnProperty(item)) 
    {
       cart[item]+=1;
    }
    else{
      cart[item]=1;
      items.push(item)
    }
     const response_netmeds= await axios
     .post('https://0z9q3se3dl-dsn.algolia.net/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20JavaScript%20(3.33.0)%3B%20Browser%3B%20instantsearch.js%20(4.40.2)%3B%20JS%20Helper%20(3.7.4)&x-algolia-application-id=0Z9Q3SE3DL&x-algolia-api-key=daff858f97cc3361e1a3f722e3729753',{
     "requests":[{"indexName":"prod_meds","params":`clickAnalytics=true&highlightPreTag=__ais-highlight__&highlightPostTag=__%2Fais-highlight__&page=0&query=${item}&hitsPerPage=10&facets=%5B%5D&tagFilters=`}]
   })
     price_netmeds.push(response_netmeds.data.results[0].hits[0].best_price)

     ////APOLLO
     const response_apollo =await axios.get(`https://www.apollopharmacy.in/search-medicines/${item}`)                              
     const $=cheerio.load(response_apollo.data,null,false)
     const apollo_prices = $(".ProductCard_priceGroup__Xriou")
     apollo_prices.each((idx,el)=>
     {
       i=$(el).text().lastIndexOf("₹")
      //  prices.push(Number($(el).text().substring(i+1,)))
      price_apollo.push(Number($(el).text().substring(i+1,)))
     })
     console.log(price_apollo[0])
       
     //PHARMEASY

     const response_pharm = await axios
    .post(`https://pharmeasy.in/api/search/search/?page=1&q=${item}`)
     response_pharm.data.data.products.forEach(item => {
     price_pharm.push(Number(item.salePriceDecimal))
    //  images.push(item.image)
  });
     console.log(price_pharm[0])

    //  PRACTO
    
    const response_practo=await axios.get(`https://www.practo.com/practopedia/api/v1/search?query=${item}&pincode=560076`)
    response_practo.data.forEach(item => {
              if (item.drug.hasOwnProperty('images')==true)
              {
                mrp=item.drug.mrp.toFixed(2)
                disc=Number(item.drug.discount)
                // price_practo.push((Number(item.drug.mrp.toFixed(2))))
                price_practo.push((100-disc)*mrp/100)
              }
              // else{
              //     images.push('https://www.practostatic.com/ecommerce-assets/static/media/placeholder_product.39dd65c8.png');
              // }

              // prices.push(item.drug.mrp)

    });
    //  console.log(price_practo[0])
     gapollo_total=price_apollo[0]*cart[item]
     gpharm_total=price_pharm[0]*cart[item]
     gpracto_total=price_practo[0]*cart[item]
     gnetmeds_total=price_netmeds[0]*cart[item]
     res.render('cart_view',{cart:cart,items:items,gapollo_total:gapollo_total,gpharm_total:gpharm_total,gnetmeds_total:gnetmeds_total,gpracto_total:gpracto_total})
 }
 f(item)
    // console.log(total)
   //  res.render('cart_view',{cart:cart,items:items,apollo_total:apollo_total,pharm_total:pharm_total,practo_total:practo_total,netmeds_total:apollo_total})
    // res.render('cart_view',{cart:cart,items:items})
})
module.exports=router;