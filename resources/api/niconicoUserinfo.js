const axios = require('axios');

/**
 * 
 * https://api.search.nicovideo.jp/api/v2/snapshot/video/contents/search?q=%E5%88%9D%E9%9F%B3%E3%83%9F%E3%82%AF&targets=title&fields=contentId,title,userId,description,genre,tags,thumbnailUrl,likeCounter,mylistCounter,viewCounter,commentCounter&filters[viewCounter][gte]=10000&_sort=-viewCounter&_offset=0&_limit=3&_context=apiguide
 * https://api.ce.nicovideo.jp/api/v1/user.info?user_id=94633610&__format=json
 */


exports.handler = async (event, context) => {
  const userId = event.queryStringParameters.userId || "1";
  const URL = `https://api.ce.nicovideo.jp/api/v1/user.info?user_id=${encodeURIComponent(userId)}&__format=json`;
  //const URL = '';

  const res = await axios.get(URL);
  
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