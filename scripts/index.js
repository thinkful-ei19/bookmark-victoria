$(document).ready(function() {
  bookmark.bindEventListeners()
  api.getItems((bookmarks) => {
    bookmarks.forEach(item => store.addBookmark(item));
    bookmark.render();
  });
});
