$(document).ready(function() {
  bookmark.bindEventListeners()
  api.getItems((bookmarks) => {
    console.log(bookmarks);
    bookmarks.forEach(item => {
      store.addBookmark(item)
    });
    bookmark.render();
  });
});
