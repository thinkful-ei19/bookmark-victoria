const store = (function(){

  const addBookmark = function(item) {
    item.expand = false;
    this.bookmarks.push(item);
    console.log(this.bookmarks, 'bookmarks')
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

  return{
    bookmarks: [],
    addBookmark: addBookmark,
    findAndDelete: findAndDelete,
    filterRating: filterRating
  };
})();
store;
