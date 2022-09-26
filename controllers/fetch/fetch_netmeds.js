const axios=require('axios')

async function f2(medicine)
{
 let names=[],prices=[],images=[]
 let main="https://www.netmeds.com/"
//  let prices=[]
//  let images=[]
 const response = await axios
  .post('https://0z9q3se3dl-dsn.algolia.net/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20JavaScript%20(3.33.0)%3B%20Browser%3B%20instantsearch.js%20(4.40.2)%3B%20JS%20Helper%20(3.7.4)&x-algolia-application-id=0Z9Q3SE3DL&x-algolia-api-key=daff858f97cc3361e1a3f722e3729753',{
    "requests":[{"indexName":"prod_meds","params":`clickAnalytics=true&highlightPreTag=__ais-highlight__&highlightPostTag=__%2Fais-highlight__&page=0&query=${medicine}&hitsPerPage=10&facets=%5B%5D&tagFilters=`}]
  })
  let res=response.data.results[0].hits
  res.forEach(item => {
             
                names.push(item.display_name)
                prices.push(item.best_price)
                images.push(main.concat(item.thumbnail_url))
  });         
  return [names,prices,images];
}
module.exports=f2