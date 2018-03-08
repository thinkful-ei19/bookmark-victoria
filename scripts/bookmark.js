const bookmark = (function() {

  function generateBookmarksLongString(item) {
    let itemTitle = `<span class="bookmark-item-list">${item.name}</span>`
    return   `
    <li class="js-bookmark-element bookmark" data-item-id="${item.id}">
      <div class="bookmark-item">
        <h2 class="bookmark-item-title">${item.title}</h2>
        <p class="bookmark-item-rating">Rating: <span class="rating-stars">${item.rating}</span></p>
        <h3 class="bookmark-item-description">${item.desc}</h3>
        <a href="#" class="bookmark-item-link">${item.url}</a>
      </div>
      <div class="item-controls">
        <button type="button" class="btnLong bookmark-item-toggle js-bookmark-toggle">
          <i class="rating fa fa-angle-double-up" aria-hidden="true"></i>
        </button>

        <button type="button" class="btnLong bookmark-item-delete js-bookmark-delete">
          <i class="far fa-trash-alt"></i>
        </button>
        <button class="btnLong bookmark-item-edit js-bookmark-edit">
          <i class="far fa-edit"></i>
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
        <h2 class="bookmark-item-title">${item.title}</h2>
        <p class="bookmark-item-rating">Rating: <span class="rating-stars">${item.rating}</span></p>
      </div>
      <div class="item-controls">
      <button type="button" class="btn bookmark-item-toggle js-bookmark-toggle">
        <i class="fa fa-angle-double-down" aria-hidden="true"></i>
      </button>
      <button type="button" class="btn bookmark-item-delete js-bookmark-delete">
        <i class="far fa-trash-alt"></i>
      </button>
      </div>
    </li>
    `
    }

  function generateBookmarksFromString(bookmark) {
    return   `
    <form class="js-bookmark-form js-bookmark-element" data-item-id="${bookmark.id}">
        Title: <input type="text" class="bookmark-item-title-edit" value="${bookmark.title}">
        Description: <input type="text" class="bookmark-item-description-edit" value="${bookmark.desc}">
        URL: <input type="text" class="bookmark-item-link-edit" value="${bookmark.url}">
        <select class="bookmark-item-rating-edit">
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
      if (bookmark.edit)        return generateBookmarksFromString(bookmark);
      else if (bookmark.expand) return generateBookmarksLongString(bookmark);
      else                      return generateBookmarksShortString(bookmark);
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

    const isTitleValid = function(title) {
      if (title) {
        return title
      } else {
        $('.title-add').after('<p>Name your bookmark before adding</p>');
      }
    };
    const isUrlValid = function(url) {
      if (url.match(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g)) {
        return url
      } else {
        $('.url-add').after('<p>Add bookmark URL</p>');
      }
    };

    const isRatingValid = function(rating) {
      if (rating >= 1) {
        return rating
      } else {
        $('.rating-add').after('<p>Rate your bookmark</p>');
      }
    };

    function handleSubmitBookmark() {
      $('.js-bookmark-template').on('click', '.js-submit-bookmark', (event) => {
        event.preventDefault();
        const newTitle = $('.title-add').val();
        const newUrl = $('.url-add').val();
        const newDesc = $('.description-add').val();
        const newRating = $('.rating-add').val();
        if (isTitleValid(newTitle) && isUrlValid(newUrl) && isRatingValid(newRating)){
          api.createBookmark(newDesc, newRating, newTitle, newUrl, (newBookmark) => {
            store.addBookmark(newBookmark);
            render();
          })
        } else {
          return
        }
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
      const editTitle = $('.bookmark-item-title-edit').val();
      const editDesc = $('.bookmark-item-description-edit').val();
      const editUrl = $('.bookmark-item-link-edit').val();
      const editRating = $('.bookmark-item-rating-edit').val();
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
