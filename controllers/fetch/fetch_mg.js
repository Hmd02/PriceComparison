const axios=require('axios')
const cheerio=require('cheerio')
const res = require('express/lib/response')
async function f5()
{
    let names=[],prices=[],images=[]
    const response =await axios.get('https://www.1mg.com/search/all?name=dolo'
    ,{
        headers:
        {
            'Origin':'https://www.1mg.com',
            'Referer':"https://www.1mg.com/search/all?name=dolo",
            'User-Agent':"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:98.0) Gecko/20100101 Firefox/98.0"
        }}
    )
    const $= cheerio.load(response.data)
    const res_names=$(".style__pro-title___3zxNC")
    
    res_names.each((idx,el)=>
    {
       names.push($(el).text())
    })
    const res_prices=$(".style__price-tag___B2csA")
    res_prices.each((idx,el)=>
    {
    //    prices.push($(el).text())
       i=$(el).text().lastIndexOf("₹")
       prices.push(Number($(el).text().substring(i+1,)))
    })

    const res_images=$("script")
    console.log(res_images)
    res_images.map((idx,el)=>
    {
    //   prices.push($(el).text())
        //  console.log($(el).find('img').attr('src'))
        // console.log($(el).find('img'))
       console.log($(el).data)
    })

     return [names,prices];
}

module.exports=f5