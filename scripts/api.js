const api = (function () {
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/victoria';

  function getItems(callback) {
    $.getJSON(`${BASE_URL}/bookmarks`, callback);
  }

  function deleteBookmark(id, callback) {
    const deletePayload = {
      url: `${BASE_URL}/bookmarks/${id}`,
      method: 'DELETE',
      success: callback
    };
    $.ajax(deletePayload);
  }

  return {
    getItems: getItems,
    deleteBookmark: deleteBookmark
  };
})();
api;
