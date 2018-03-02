$(document).ready(function() {
  bookmark.bindEventListeners()
  api.getItems((items) => {
    console.log(items);
    items.forEach(item => {
      store.addBookmark(item)
    });
    bookmark.render();
  });
});
