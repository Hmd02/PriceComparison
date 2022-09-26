const axios=require('axios');


async function f4(medicine)
{
          let names=[],images=[],prices=[]

          const response=await axios.get(`https://www.practo.com/practopedia/api/v1/search?query=${medicine}&pincode=560076`)
          response.data.forEach(item => {
                     names.push(item.display_text)
                    if (item.drug.hasOwnProperty('images')==true)
                    {
                      images.push(item.drug.images[0]['res-150'])
                      prices.push((Number(item.drug.mrp.toFixed(2))))
                    }
                    else{
                        images.push('https://www.practostatic.com/ecommerce-assets/static/media/placeholder_product.39dd65c8.png');
                    }

                    prices.push(item.drug.mrp)

          });
           return [names,prices,images];
}

module.exports=f4;