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
          <span class="button-label">delete</span>
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

  function generateShoppingItemsString(bookmarkList) {
    const bookmarks = bookmarkList.map((bookmark) => {
      if (bookmark.expand === true) {
        return generateBookmarksLongString(bookmark);
      } else {
        return generateBookmarksShortString(bookmark);
      }
    })
    return bookmarks.join('');
  }

  function render(bookmarks = store.bookmarks) { //default value
    const bookmarksItemString = generateShoppingItemsString(bookmarks);
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
      store.bookmarks.forEach((item, idx) => {
        if (item.id === id) {
          store.bookmarks[idx].expand = !store.bookmarks[idx].expand;
          console.log('STORE ITEM', store.bookmarks[idx])
          console.log('ITEM RENDER', item)
        }
      });
      render();
    });
  }

  function handleDelete() {
    $('.bookmark-list').on('click', '.js-bookmark-delete', event => {
      const id = getBookmarkId(event.currentTarget);
      api.deleteBookmark(id, () => {
        console.log(id, 'delete run')
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
      console.log(setRating, 'RATING');
      const filtered = store.filterRating(setRating);
      console.log(filtered);
      render(filtered);
    });
  }

  function bindEventListeners() {
    handleShowDetails();
    handleDelete();
    handleCancelOnAdd();
    handleAddBookmark();
    handleSubmitBookmark();
    handleFilterRating();
  };

  return{
    render: render,
    bindEventListeners: bindEventListeners
  };
})();
bookmark;
