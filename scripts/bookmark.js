const bookmark = (function() {

  function generateBookmarksItemString(item) {
    let itemTitle = `<span class="bookmark-item-list">${item.name}</span>`
    return   `
    <li class="js-bookmark-element" data-item-id="${item.id}">
      <div class="bookmark-item">
        <p class="bookmark-item-title">Jo Rogan podcast</p>
        <p class="bookmark-item-rating">Rating: <span class="rating-stars">2</span></p>
        <p class="bookmark-item-description">Jo chatting Tim Minchin</p>
        <a href="#" class="bookmark-item-link">joroganpodcast.com</a>
      </div>
      <div class="item-controls">
        <button class="bookmark-item-toggle js-item-toggle">
          <span class="button-label">Show details</button>
        </button>
        <button class="bookmark-item-delete js-item-delete">
          <span class="button-label">delete</span>
        </button>
      </div>
    </li>
    `
    }

  function render(item) {
    console.log('render run')
    const bookmarksItemString = generateBookmarksItemString(item);
    $('.bookmark-list').html(bookmarksItemString)
  }

  // function handleDelete() {
  //
  // }

  function bindEventListeners() {
    generateBookmarksItemString: generateBookmarksItemString
    // handleDelete: handleDelete
  };

  return{
    render: render,
    bindEventListeners: bindEventListeners
  };
})();
bookmark;
