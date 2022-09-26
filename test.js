const axios=require('axios')
const cheerio=require('cheerio')
const res = require('express/lib/response')
async function f()
{
    let names=[]
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
     return names;
}
f()