const bookmark = (function() {

  function generateBookmarksLongString(item) {
    let itemTitle = `<span class="bookmark-item-list">${item.name}</span>`
    return   `
    <li class="js-bookmark-element bookmark" data-item-id="${item.id}">
      <div class="bookmark-item">
        <p class="bookmark-item-title">${item.title}</p>
        <p class="bookmark-item-rating">Rating: <span class="rating-stars">${item.rating}</span></p>
        <p class="bookmark-item-description">${item.desc}</p>
        <a href="#" class="bookmark-item-link">${item.url}</a>
      </div>
      <div class="item-controls">
        <button class="bookmark-item-toggle js-bookmark-toggle">
          <span class="button-label">Show details</button>
        </button>
        <button class="bookmark-item-delete js-bookmark-delete">
          <span class="button-label">Delete</span>
        </button>
        <button class="bookmark-item-edit js-bookmark-edit">
          <span class="button-label">Edit</button>
        </button>
      </div>
    </li>
    `
    }

  function generateBookmarksShortString(item) {
    let itemTitle = `<span class="bookmark-item-list">${item.name}</span>`
    return   `
    <li class="js-bookmark-element bookmark" data-item-id="${item.id}">
      <div class="bookmark-item">
        <p class="bookmark-item-title">${item.title}</p>
        <p class="bookmark-item-rating">Rating: <span class="rating-stars">${item.rating}</span></p>
      </div>
      <div class="item-controls">
        <button class="bookmark-item-toggle js-bookmark-toggle">
          <span class="button-label">Show details</button>
        </button>
        <button class="bookmark-item-delete js-bookmark-delete">
          <span class="button-label">delete</span>
        </button>
      </div>
    </li>
    `
    }

  function generateBookmarksFromString(bookmark) {
    return   `
    <form class="js-bookmark-form bookmark js-bookmark-element" data-item-id="${bookmark.id}">
        <input type="text" class="bookmark-item-title" value="${bookmark.title}">
        <input type="text" class="bookmark-item-description" value="${bookmark.desc}">
        <input type="text" class="bookmark-item-link" value="${bookmark.url}">
        <select class="bookmark-item-rating" name="rating-entry">
          <option value="null">All</option>
          <option value="1">1 star</option>
          <option value="2">2 stars</option>
          <option value="3">3 stars</option>
          <option value="4">4 stars</option>
          <option value="5">5 stars</option>
        </select>
        <button class="js-save-bookmark-edit" type="submit">Save</button>
        <button class="js-cancel-bookmark-edit" type="cancel">Cancel</button>
    </form>
    `
  }

  function generateBookmarkItemsString(bookmarkList) {
    const bookmarks = bookmarkList.map((bookmark) => {
      if (bookmark.edit === true) {
        return generateBookmarksFromString(bookmark);
      } else if (bookmark.expand === true) {
        return generateBookmarksLongString(bookmark);
      } else {
        return generateBookmarksShortString(bookmark);
      }
    });
    return bookmarks.join('');
  }

  function render(bookmarks = store.bookmarks) { //default value
    const bookmarksItemString = generateBookmarkItemsString(bookmarks);
    $('.bookmark-list').html(bookmarksItemString);
  }

  function getBookmarkId(item) {
    return $(item)
      .closest('.js-bookmark-element')
      .data('item-id')
  }

  function handleShowDetails() {
    $('.bookmark-list').on('click', '.js-bookmark-toggle', event => {
      const id = getBookmarkId(event.currentTarget);
      store.findAndToggleExpand(id);
      render();
    });
  }

  function handleDelete() {
    $('.bookmark-list').on('click', '.js-bookmark-delete', event => {
      const id = getBookmarkId(event.currentTarget);
      api.deleteBookmark(id, () => {
        store.findAndDelete(id);
        render();
      });
    });
  }

  function handleCancelOnAdd() {
    $('.js-bookmark-template').on('click', '.js-cancel-bookmark', () => {
      $('.js-bookmark-template').css('display', 'none');
    });
    $('.js-bookmark-template').off('focusout', () => {
      $('.js-bookmark-template').css('display', 'none');
    });
  }

  function handleAddBookmark() {
    $('.row').on('click', '.js-add-item', () => {
      $('.js-bookmark-template').css('display', 'block');
    })
  }

  function handleSubmitBookmark() {
    $('.js-bookmark-template').on('click', '.js-submit-bookmark', (event) => {
      event.preventDefault();
      const newTitle = $('.title-add').val();
      const newUrl = $('.url-add').val();
      const newDesc = $('.description-add').val();
      const newRating = $('.rating-add').val();
      api.createBookmark(newDesc, newRating, newTitle, newUrl, (newBookmark) => {
        store.addBookmark(newBookmark);
        render();
      })
    });
  }

  function handleFilterRating() {
    $('.header-rating').on('change', '.rating-filter', () => {
      const setRating = $('.rating-filter').val()
      const filtered = store.filterRating(setRating);
      render(filtered);
    });
  }


  function handleEdit() {
    $('.bookmark-list').on('click', '.js-bookmark-edit', (event) => {
      event.preventDefault();
      const id = getBookmarkId(event.currentTarget);
      store.findAndToggleEdit(id);
      render();
    })
  }

  function handleSaveEdit() {
    $('.bookmark-list').on('click', '.js-save-bookmark-edit', (event) => {
      event.preventDefault();
      const editTitle = $('.bookmark-item-title').val();
      const editDesc = $('.bookmark-item-description').val();
      const editUrl = $('.bookmark-item-link').val();
      const editRating = $('.bookmark-item-rating').val();
      const id = getBookmarkId(event.currentTarget);
      api.editBookmark(editDesc, editRating, editTitle, editUrl, id, (editBookmark) => {
        store.findAndEdit(editDesc, editRating, editTitle, editUrl, id);
        store.findAndToggleEdit(id)
        render();
      })
    });
  }

  function bindEventListeners() {
    handleShowDetails();
    handleDelete();
    handleCancelOnAdd();
    handleAddBookmark();
    handleSubmitBookmark();
    handleFilterRating();
    handleEdit();
    handleSaveEdit()
  };

  return{
    render: render,
    bindEventListeners: bindEventListeners
  };
})();
bookmark;
