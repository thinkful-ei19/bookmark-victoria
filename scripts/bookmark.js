const bookmark = (function() {

  function generateBookmarksLongString(item) {
    let itemTitle = `<span class="bookmark-item-list">${item.name}</span>`
    return   `
    <li class="js-bookmark-element bookmark" data-item-id="${item.id}">
      <div class="bookmark-item">
        <p class="bookmark-item-title">Joe Rogan podcast</p>
        <p class="bookmark-item-rating">Rating: <span class="rating-stars">2</span></p>
        <p class="bookmark-item-description">Joe chatting with Tim Minchin</p>
        <a href="#" class="bookmark-item-link">joroganpodcast.com</a>
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
        <p class="bookmark-item-title">Joe Rogan podcast</p>
        <p class="bookmark-item-rating">Rating: <span class="rating-stars">2</span></p>
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
    const items = bookmarkList.map((bookmark) => {
      if (bookmark.expand === true) {
        return generateBookmarksLongString(bookmark);
      } else {
        return generateBookmarksShortString(bookmark);
      }
    })
    return items.join('');
  }

  function render() {
    const bookmarksItemString = generateShoppingItemsString(store.items);
    $('.bookmark-list').html(bookmarksItemString)
  }

  function getBookmarkId(item) {
    return $(item)
      .closest('.js-bookmark-element')
      .data('item-id')
  }

  function handleShowDetails() {
    $('.bookmark-list').on('click', '.js-bookmark-toggle', event => {
      const id = getBookmarkId(event.currentTarget);
      store.items.forEach((item, idx) => {
        if (item.id === id) {
          store.items[idx].expand = !store.items[idx].expand;
          console.log('STORE ITEM', store.items[idx])
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

//   function handleFilterClick() {
//   $('.js-filter-checked').click(() => {
//     store.toggleCheckedFilter();
//     render();
//   });
// }

  function bindEventListeners() {
    handleShowDetails();
    handleDelete();
    handleCancelOnAdd();
    handleAddBookmark();
    handleSubmitBookmark();

  };

  return{
    render: render,
    bindEventListeners: bindEventListeners
  };
})();
bookmark;
