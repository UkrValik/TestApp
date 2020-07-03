'use strict';

const fetch = require('node-fetch');

const photosByPage = async(page) => {
  const response = await fetch('https://api.unsplash.com/photos/?client_id=ab3411e4ac868c2646c0ed488dfd919ef612b04c264f3374c97fff98ed253dc9&page=' + page);
  return response.json();
}

module.exports = photosByPage;
