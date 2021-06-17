const axios = require('axios');

exports.handler = async (event, context) => {
  const keyWord = event.queryStringParameters.q || ".";
  const URL = `https://api.search.nicovideo.jp/api/v2/snapshot/video/contents/search?q=${encodeURIComponent(keyWord)}&targets=title&fields=contentId,title,viewCounter&filters[viewCounter][gte]=10000&_sort=-viewCounter&_offset=0&_limit=21&_context=apiguide`;
  //const URL = '';

  const res = await axios.get(URL)
  console.log(res.data)
  console.log(JSON.stringify(res.data))
  
  return {
    headers: {
        "Access-Control-Allow-Headers" : "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
    },
    statusCode: 200,
    body: JSON.stringify(res.data),
  };
};