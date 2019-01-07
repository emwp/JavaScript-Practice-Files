// Storage Controller
const StorageCtrl = (function() {
  // Public Methods
  return {
    storeItem: function(item) {
      let items;
      // Check if there is any items in local storage
      if (localStorage.getItem('items') === null) {
        items = [];
        // Push the new item
        items.push(item);
        // Set Local storage
        localStorage.setItem('items', JSON.stringify(items));
      } else {
        // Get items already in LS
        items = JSON.parse(localStorage.getItem('items'));
        // Push the new Item
        items.push(item);
        // Re Set local storage
        localStorage.setItem('items', JSON.stringify(items));
      }
    },
    getItemsFromStorage: function() {
      let items;
      if (localStorage.getItem('items') === null) {
        items = [];
      } else {
        items = JSON.parse(localStorage.getItem('items'));
      }
      return items;
    },
  };
})();

// --------------------------------------------------------------------------------------------------------------------------------------

// Item Controller
const ItemCtrl = (function() {
  // Item Constructor
  const Item = function(id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };
  // Data Structure / State
  const data = {
    items: StorageCtrl.getItemsFromStorage(),
    // items: [
    //   // { id: 0, name: 'Steak Dinner', calories: 1200 },
    //   // { id: 1, name: 'Cookie', calories: 400 },
    //   // { id: 2, name: 'Eggs', calories: 300 },
    // ]
    currentItem: null,
    totalCalories: 0,
  };
  // Public Methods
  return {
    getItems: function() {
      return data.items;
    },
    addItem: function(name, calories) {
      let ID;
      // Create ID
      if (data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }

      // Calories to number
      calories = parseInt(calories);

      // Create New Item
      newItem = new Item(ID, name, calories);

      // Add to items array
      data.items.push(newItem);

      return newItem;
    },

    getItemById: function(id) {
      let found = null;
      // Loop through the items
      data.items.forEach(function(item) {
        if (item.id === id) {
          found = item;
        }
      });

      return found;
    },

    updateItem: function(name, calories) {
      // Calories to number
      calories = parseInt(calories);
      let found = null;

      data.items.forEach(function(item) {
        if (item.id === data.currentItem.id) {
          item.name = name;
          item.calories = calories;
          found = item;
        }
      });

      return found;
    },

    deleteItem: function(id) {
      // Get the ids
      const ids = data.items.map(function(item) {
        return item.id;
      });

      // Get the index
      const index = ids.indexOf(id);

      // Remove Item
      data.items.splice(index, 1);
    },

    clearAllItems: function() {
      data.items = [];
    },

    setCurrentItem: function(item) {
      data.currentItem = item;
    },

    getCurrentItem: function() {
      return data.currentItem;
    },

    getTotalCalories: function() {
      let total = 0;
      // Loop through items and add cals
      data.items.forEach(function(item) {
        total += item.calories;
      });
      // Set new total
      data.totalCalories = total;
      return data.totalCalories;
    },

    logData: function() {
      return data;
    },
  };
})();

// ---------------------------------------------------------------------------------------------------------------------------------------

// UI Controller
const UICtrl = (function() {
  const UISelectors = {
    itemList: '#item-list',
    addBtn: '.add-btn',
    updateBtn: '.update-btn',
    deleteBtn: '.delete-btn',
    backBtn: '.back-btn',
    clearBtn: '.clear-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories',
    totalCalories: '.total-calories',
    listItems: '#item-list li',
  };

  // Public Methods
  return {
    populateItemList: function(items) {
      let html = '';
      items.forEach(item => {
        html += `<li class="collection-item" id="item-${item.id}">
        <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content"> <i class="edit-item fa fa-pencil"></i> </a>
      </li>`;
      });

      // Insert list items
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },

    getItemInput: function() {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value,
      };
    },

    addListItem: function(item) {
      // Show the list
      document.querySelector(UISelectors.itemList).style.display = 'block';
      // Create li element
      const li = document.createElement('li');
      // Add class
      li.className = 'collection-item';
      li.id = `item-${item.id}`;
      // Add HTML
      li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
      <a href="#" class="secondary-content"> <i class="edit-item fa fa-pencil"></i> </a>`;

      // Insert Item
      document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
    },

    updateListItem: function(item) {
      let listItems = document.querySelectorAll(UISelectors.listItems);
      // Turn node list into array
      listItems = Array.from(listItems);

      listItems.forEach(function(listItem) {
        const itemID = listItem.getAttribute('id');

        if (itemID === `item-${item.id}`) {
          document.querySelector(`#${itemID}`).innerHTML = `<strong>${item.name}: </strong> <em>${
            item.calories
          } Calories</em>
          <a href="#" class="secondary-content"> <i class="edit-item fa fa-pencil"></i> </a>`;
        }
      });
    },

    deleteListItem: function(id) {
      const itemID = `#item-${id}`;
      const item = document.querySelector(itemID);
      item.remove();
    },

    clearInput: function() {
      document.querySelector(UISelectors.itemNameInput).value = '';
      document.querySelector(UISelectors.itemCaloriesInput).value = '';
    },

    addItemToForm: function() {
      document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
      document.querySelector(
        UISelectors.itemCaloriesInput,
      ).value = ItemCtrl.getCurrentItem().calories;
      UICtrl.showEditState();
    },

    removeItems: function() {
      let listItems = document.querySelectorAll(UISelectors.listItems);
      // Turn node list into array
      listItems = Array.from(listItems);
      listItems.forEach(function(item) {
        item.remove();
      });
    },

    hideList: function() {
      document.querySelector(UISelectors.itemList).style.display = 'none';
    },

    showTotalCalories: function(totalCalories) {
      document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
    },

    clearEditState: function() {
      UICtrl.clearInput();
      document.querySelector(UISelectors.updateBtn).style.display = 'none';
      document.querySelector(UISelectors.deleteBtn).style.display = 'none';
      document.querySelector(UISelectors.backBtn).style.display = 'none';
      document.querySelector(UISelectors.addBtn).style.display = 'inline';
    },

    showEditState: function() {
      document.querySelector(UISelectors.updateBtn).style.display = 'inline';
      document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
      document.querySelector(UISelectors.backBtn).style.display = 'inline';
      document.querySelector(UISelectors.addBtn).style.display = 'none';
    },

    getSelectors: function() {
      return UISelectors;
    },
  };
})();

// ---------------------------------------------------------------------------------------------------------------------------------------

// APP Controller
const App = (function(ItemCtrl, StorageCtrl, UICtrl) {
  // Load event listeners
  const loadEventListeners = () => {
    // Get UI selectors
    const UISelectors = UICtrl.getSelectors();

    // Add Item Event
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

    // Disable submit on enter
    document.addEventListener('keypress', function(e) {
      if (e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        return false;
      }
    });

    // Edit icon click Event
    document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);

    // Update Item event
    document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);

    // Back Button event
    document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState);

    // Delete Button event
    document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);

    // Clear all button
    document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsClick);
  };

  // Add item submit
  const itemAddSubmit = function(e) {
    // Get form input from UI controller
    const input = UICtrl.getItemInput();

    // Check for fields
    if (input.name !== '' && input.calories !== '') {
      // Add Item
      const newItem = ItemCtrl.addItem(input.name, input.calories);
      // Add item to UI list
      UICtrl.addListItem(newItem);

      // Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();
      // Add total calories to UI
      UICtrl.showTotalCalories(totalCalories);

      // Store in Local Storage
      StorageCtrl.storeItem(newItem);

      // Clear fields
      UICtrl.clearInput();
    }

    e.preventDefault();
  };

  // Click Edit Item
  const itemEditClick = function(e) {
    if (e.target.classList.contains('edit-item')) {
      // Get list item ID
      const listId = e.target.parentNode.parentNode.id;

      // Break into an array
      const listIdArr = listId.split('-');

      // Get the actual ID number
      const id = parseInt(listIdArr[1]);

      // Get Item
      const itemToEdit = ItemCtrl.getItemById(id);

      // Set as current item
      ItemCtrl.setCurrentItem(itemToEdit);

      // Add item to form
      UICtrl.addItemToForm();
    }
    e.preventDefault();
  };

  // Update Item Submit
  const itemUpdateSubmit = function(e) {
    // Get item input
    const input = UICtrl.getItemInput();
    // Update item
    const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

    // Update UI
    UICtrl.updateListItem(updatedItem);

    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories();
    // Add total calories to UI
    UICtrl.showTotalCalories(totalCalories);

    UICtrl.clearEditState();

    e.preventDefault();
  };

  // Item delete Submit
  const itemDeleteSubmit = function(e) {
    //Get Current Item
    const currentItem = ItemCtrl.getCurrentItem();

    //Delete from data structure
    ItemCtrl.deleteItem(currentItem.id);

    // Delete from UI
    UICtrl.deleteListItem(currentItem.id);

    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories();
    // Add total calories to UI
    UICtrl.showTotalCalories(totalCalories);

    UICtrl.clearEditState();

    e.preventDefault();
  };

  // Clear all items event
  const clearAllItemsClick = function() {
    // Delete all items from data structure
    ItemCtrl.clearAllItems();

    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories();
    // Add total calories to UI
    UICtrl.showTotalCalories(totalCalories);

    // Remove from UI
    UICtrl.removeItems();

    // Hide UL
    UICtrl.hideList();
  };

  // Public Methods
  return {
    init: function() {
      //Clear edit state / set init state
      UICtrl.clearEditState();

      // Fetch items from data structure
      const items = ItemCtrl.getItems();

      // Check if any items
      if (items.length === 0) {
        UICtrl.hideList();
      } else {
        // Populate list with items
        UICtrl.populateItemList(items);
      }

      // Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();
      // Add total calories to UI
      UICtrl.showTotalCalories(totalCalories);

      // Load Event listeners
      loadEventListeners();
    },
  };
})(ItemCtrl, StorageCtrl, UICtrl);

App.init();
