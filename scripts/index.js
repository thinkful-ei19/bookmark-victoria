$(document).ready(function() {
  api.getItems((items) => {
    console.log(items);
    items.forEach(item => {
      store.addItem(item)
      bookmark.render(item);
    });
  });
});
