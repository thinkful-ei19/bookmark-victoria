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

  function createBookmark(desc, rating, title, url, callback) {
    const newBookmark = JSON.stringify({
      desc: desc,
      rating: rating,
      title: title,
      url: url
    });
    const createPayload = {
      url: `${BASE_URL}/bookmarks`,
      method: 'POST',
      contentType: 'application/json',
      data: newBookmark,
      success: callback
    }
    $.ajax(createPayload);
  }

  function editBookmark(desc, rating, title, url, id, callback) {
    const newBookmark = JSON.stringify({
      desc: desc,
      rating: rating,
      title: title,
      url: url
    });
    const editPayload = {
      url: `${BASE_URL}/bookmarks/${id}`,
      method: 'PATCH',
      contentType: 'application/json',
      data: newBookmark,
      success: callback
    }
    $.ajax(editPayload);
  }

  return {
    getItems: getItems,
    deleteBookmark: deleteBookmark,
    createBookmark: createBookmark,
    editBookmark: editBookmark
  };
})();
api;
