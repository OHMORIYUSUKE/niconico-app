const axios = require('axios');

exports.handler = async (event, context) => {
  const keyWord = event.queryStringParameters.q || ".";
  const URL = `https://api.search.nicovideo.jp/api/v2/snapshot/video/contents/search?q=${encodeURIComponent(keyWord)}&targets=title&fields=contentId,title,viewCounter&filters[viewCounter][gte]=10000&_sort=-viewCounter&_offset=0&_limit=18&_context=apiguide`;
  //const URL = '';

  const res = await axios.get(URL)
  console.log(res.data)
  console.log(JSON.stringify(res.data))
  
  return {
    statusCode: 200,
    body: JSON.stringify(res.data),
  };
};