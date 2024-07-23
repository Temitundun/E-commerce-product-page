// ## COUNTER FUNCTIONALITY ##
// Handles incrementing and decrementing the product quantity counter.
let counter = 0; // Initialize counter to 0
const counterValue = document.getElementById('counter-value'); // Select the counter display element
const incrementBtn = document.getElementById('increment-btn'); // Select the increment button
const decrementBtn = document.getElementById('decrement-btn'); // Select the decrement button
const errorMessage = document.getElementById('error-message'); // Select the error message element

// Event listener for increment button
incrementBtn.addEventListener('click', function() {
  counter++; // Increment the counter
  counterValue.textContent = counter; // Update the counter display
  errorMessage.textContent = ''; // Clear any error message
});

// Event listener for decrement button
decrementBtn.addEventListener('click', function() {
  if (counter > 0) {
    counter--; // Decrement the counter if it's greater than 0
    counterValue.textContent = counter; // Update the counter display
    errorMessage.textContent = ''; // Clear any error message
  } else {
    errorMessage.textContent = "You can't go below 0!"; // Show error message if counter is 0
  }
});

// ## TOGGLE MENU ON MOBILE SCREEN ##
// Toggles the navigation menu visibility and overlay on mobile screens.
function toggleMenu() {
  var menu = document.getElementById("list"); // Select the menu element
  var menuicon = document.getElementById("menu-icon"); // Select the menu icon element
  var overlay = document.querySelector('.overlay'); // Select the overlay element


  // Check if the menu is currently hidden
  var isNavHidden = window.getComputedStyle(menu, null).getPropertyValue("display") === "none";
  if (isNavHidden) {
    // If menu is hidden, show it and change the icon to close
    menu.classList.remove("d-none");
    menu.classList.add("d-flex", "menu-display");
    menuicon.innerHTML = '<img src="images/icon-close.svg" alt="Close icon">';
    menuicon.classList.add('rotate-icon1');
    menuicon.classList.remove('rotate-icon2');
  } else {
    // If menu is visible, hide it and change the icon to menu
    menu.classList.remove("d-flex", "menu-display");
    menu.classList.add("d-none");
    menuicon.innerHTML = '<img src="images/icon-menu.svg" alt="Menu icon">';
    menuicon.classList.remove('rotate-icon1');
    menuicon.classList.add('rotate-icon2');
  }
}

// ## TOGGLE CART VISIBILITY ##
// Toggles the visibility of the shopping cart.
function togglecart() {
  var cart = document.getElementById("cart"); // Select the cart element
  var iscarthidden = window.getComputedStyle(cart, null).getPropertyValue("display") === "none" || cart.style.display === "none";
  cart.style.display = iscarthidden ? "block" : "none"; // Toggle the display between block and none
}

// ## ADD ITEMS TO CART ##
// Adds items to the cart and calculates the subtotal.
var itemName = document.getElementById("heading1"); // Select the item name element
var itemPrice = document.getElementById("price"); // Select the item price element
var quantity = document.getElementById("counter-value"); // Select the quantity element
let items = document.querySelector(".cart-items"); // Select the cart items container
var totaldiv = document.getElementById("subtotal"); // Select the subtotal display element
var paragraphCounter = 1; // Initialize paragraph counter for unique IDs
var subtotal = 0; // Initialize subtotal to 0
var totals = []; // Array to store individual item totals

// Function to add items to the cart
function addToCart() {
  if (quantity.textContent == 0) {
    alert("Can't add empty quantity to cart."); // Alert if quantity is 0
  } else {
    // Calculate the total price for the current item
    var itemPriceValue = parseFloat(itemPrice.textContent.substring(1)); // Convert price to number
    var totalprice = itemPriceValue * parseFloat(quantity.textContent); // Calculate total price
    var formattedTotalPrice = totalprice.toFixed(2); // Format total price to 2 decimal places
    subtotal = parseFloat(formattedTotalPrice) + parseFloat(subtotal); // Update subtotal
    totals.push(formattedTotalPrice); // Store the individual item total
    totaldiv.style.display = "block"; // Show the subtotal display
    totaldiv.innerHTML = `<strong> SUBTOTAL : $${subtotal}</strong>`; // Update subtotal display

    // Create and append a new item element in the cart
    var newparagraph = document.createElement("p");
    var newicon = document.createElement("div");
    var newitem = document.createElement("div");
    newitem.style.display = "flex";
    newitem.style.justifyContent = "space-between";
    newitem.id = String(paragraphCounter++);
    var activeImageElement = getActiveCarouselItem(); // Get the active carousel item image
    newparagraph.innerHTML = `<img src="${activeImageElement.src}" alt="Active Item Image" width="50" height="50" style="float: left; margin-right: 10px; border-radius: 5px;"> ${itemName.textContent} <br> <span style="margin-right: 3px;">${itemPrice.textContent}</span> <span style="margin-right: 3px;">x</span><span style="margin-right: 3px;">${quantity.textContent}</span> <strong style="color: black;">$${formattedTotalPrice}</strong>`;
    newicon.innerHTML = `<img src="images/icon-delete.svg" onclick="removeItem('${newitem.id}')" style="cursor: pointer;">`;
    newitem.appendChild(newparagraph);
    newitem.appendChild(newicon);
    items.appendChild(newitem); // Add the new item to the cart

    notification(); // Update notification
  }
  Checkcartempty(); // Check if the cart is empty
  checkoutbuttondisplay(); // Display or hide the checkout button
}

// ## NOTIFICATION AND CART MANAGEMENT ##
// Manages notifications and cart item removal.
var notf = document.getElementById("notification"); // Select the notification element

// Function to update the cart item count notification
function notification() {
  if (items.childElementCount === 0) {
    notf.style.display = 'none'; // Hide notification if cart is empty
  } else {
    notf.style.display = 'block'; // Show notification if cart has items
    notf.textContent = items.childElementCount; // Update notification count
  }
}

// Function to remove an item from the cart
function removeItem(ItemID) {
  var itemToRemove = document.getElementById(ItemID); // Select the item to remove
  itemToRemove.remove(); // Remove the item from the cart

  Checkcartempty(); // Check if the cart is empty
  checkoutbuttondisplay(); // Display or hide the checkout button
  notification(); // Update notification

  // Update the subtotal after removing an item
  subtotal = parseFloat(subtotal) - parseFloat(totals[ItemID - 1]);
  if (subtotal > 0) {
    totaldiv.innerHTML = `<strong> SUBTOTAL : $${subtotal}</strong>`; // Update subtotal display
  } else {
    totaldiv.style.display = "none"; // Hide subtotal display if 0
  }
}

// Check if the cart is empty and update the message
let cartemptymsg = document.getElementById("cartemptymsg");
function Checkcartempty() {
  if (items.childElementCount === 0) {
    cartemptymsg.textContent = 'Your cart is empty'; // Show empty cart message
    return true;
  } else {
    cartemptymsg.textContent = ''; // Clear empty cart message
    return false;
  }
}
Checkcartempty(); // Initial check on page load

// Show or hide the checkout button based on cart status
let checkoutbtn = document.getElementById("checkoutbtn");
function checkoutbuttondisplay() {
  checkoutbtn.style.display = Checkcartempty() ? "none" : "block"; // Toggle checkout button
}
checkoutbuttondisplay(); // Initial display on page load

// ## CAROUSEL AND MODAL MANAGEMENT ##
// Manages carousel and modal functionality based on screen size.

// Function to get the active carousel item
function getActiveCarouselItem() {
  return document.querySelector('.carousel-indicators img.active'); // Return active carousel image
}

// Function to conditionally toggle modal functionality on small screens
function toggleModal() {
  var modalToggleBtns = document.querySelectorAll('.modal-toggle-btn'); // Select all modal toggle buttons

  modalToggleBtns.forEach(function(btn) {
    if (window.innerWidth <= 767.98) {
      btn.removeAttribute('data-bs-toggle'); // Remove modal toggle on small screens
    } else {
      btn.setAttribute('data-bs-toggle', 'modal'); // Add modal toggle on larger screens
    }
  });
}

// Call the function on window load and resize
window.addEventListener('load', toggleModal); // On page load
window.addEventListener('resize', toggleModal); // On window resize
