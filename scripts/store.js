const store = (function(){

  const addBookmark = function(item) {
    item.expand = false;
    item.edit = false;
    this.bookmarks.push(item);
  };

  const findById = function(id) {
    return this.bookmarks.find(item => item.id === id);
  };

  const findAndDelete = function(id) {
    this.bookmarks = this.bookmarks.filter(item => item.id !== id);
  };

  const filterRating = function(setRating) {
    return this.bookmarks.filter(item => item.rating >= setRating)
  };

  const findAndToggleEdit = function(id) {
    store.bookmarks.forEach((item, idx) => {
      if (item.id === id) {
        store.bookmarks[idx].edit = !store.bookmarks[idx].edit;
      }
    });
  };

  const findAndToggleExpand = function(id) {
    store.bookmarks.forEach((item, idx) => {
      if (item.id === id) store.bookmarks[idx].expand = !store.bookmarks[idx].expand;
    });
  }

  const findAndEdit = function(editDesc, editRating, editTitle, editUrl, id) {
    store.bookmarks.forEach((item, idx) => {
      if (item.id === id) {
        store.bookmarks[idx].desc = editDesc;
        store.bookmarks[idx].title = editTitle;
        store.bookmarks[idx].rating = editRating;
        store.bookmarks[idx].url = editUrl;
      }
    });
  }

  return{
    bookmarks: [],
    addBookmark: addBookmark,
    findAndDelete: findAndDelete,
    filterRating: filterRating,
    findAndToggleEdit: findAndToggleEdit,
    findAndToggleExpand: findAndToggleExpand,
    findAndEdit: findAndEdit
  };
})();
store;
