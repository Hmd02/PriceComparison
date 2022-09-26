// import fetch from 'node-fetch';
// async function f1()
// {
// const response = await fetch("https://pharmeasy.in/api/search/search/?page=1&q=aspirin")

// const json=await response.json();

// console.log(json.data.products[0].name)
// }

const axios=require('axios');
const path = require('path');


async function f1(medicine)
{
 let names=[],prices=[],images=[]
//  let prices=[]
 const response = await axios
  .post(`https://pharmeasy.in/api/search/search/?page=1&q=${medicine}`)
  response.data.data.products.forEach(item => {
     names.push(item.name)
     prices.push(Number(item.salePriceDecimal))
     images.push(item.image)
  });
  return [names,prices,images];
}

module.exports=f1;