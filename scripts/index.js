$(document).ready(function() {
  bookmark.bindEventListeners()
  api.getItems((items) => {
    console.log(items);
    items.forEach(item => {
      store.addItem(item)
    });
    bookmark.render();
  });
});
