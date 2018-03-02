const store = (function(){

  const addBookmark = function(item) {
    item.expand = false;
    this.items.push(item);
    console.log(this.items, 'items')
  };

  const findById = function(id) {
    return this.items.find(item => item.id === id);
  };

  const findAndDelete = function(id) {
    this.items = this.items.filter(item => item.id !== id);
  };

  return{
    items: [],
    addBookmark: addBookmark,
    findAndDelete: findAndDelete
  };
})();
store;
