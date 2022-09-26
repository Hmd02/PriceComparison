const axios=require('axios')
const cheerio=require('cheerio')
// const request=require('request-promise')
// const fetch=require('node-fetch')
// const got=require("got")
async function f3(medicine)
{
      let names=[],prices=[],images=[];
      const response =await axios.get(`https://www.apollopharmacy.in/search-medicines/${medicine}`)                              
      const $=cheerio.load(response.data,null,false)
      const res_names = $(".ProductCard_productName__2LhTY")
      res_names.each((idx,el)=>
      {
        names.push($(el).text())
      })
      const res_prices = $(".ProductCard_priceGroup__Xriou")
      res_prices.each((idx,el)=>
      {
        // prices.push($(el).text())
        i=$(el).text().lastIndexOf("₹")
        prices.push(Number($(el).text().substring(i+1,)))
      })
      const res_images = $(".ProductCard_bigAvatar__2D8AB")
      res_images.map((idx,el)=>
      { 
        images.push($(el).find('img').attr('src'))
         
      })
      return [names,prices,images];
}

module.exports=f3;

