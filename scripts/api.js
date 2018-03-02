const api = (function () {
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/victoria';

  function getItems(callback) {
    $.getJSON(`${BASE_URL}/bookmarks`, callback);
  }
  return {
    getItems: getItems
  };
})();
api;
