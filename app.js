const menu = [
  // CHICKEN
  {
    name: "Chicken Wings",
    price: 59,
    category: "chicken",
    icon: "🍗",
    description: "Choose your favorite flavor.",
    flavors: ["Buffalo", "Honey Butter", "Cheesy", "Creamy"]
  },
  {
    name: "Boneless Chicken",
    price: 75,
    category: "chicken",
    icon: "🍗",
    description: "Boneless chicken with your choice of flavor.",
    flavors: ["Buffalo", "Honey Butter", "Cheesy", "Creamy"]
  },
  {
    name: "Chicken Poppers",
    price: 69,
    category: "chicken",
    icon: "🍟",
    description: "Choose your favorite dip or flavor.",
    flavors: ["Cheesy", "Creamy", "Gravy"]
  },
  {
    name: "Chicken Skin - Whole",
    price: 155,
    category: "chicken",
    icon: "🍗"
  },
  {
    name: "Chicken Skin - Half",
    price: 79,
    category: "chicken",
    icon: "🍗"
  },
  {
    name: "Chicken Isaw - Whole",
    price: 155,
    category: "chicken",
    icon: "🍢"
  },
  {
    name: "Chicken Isaw - Half",
    price: 79,
    category: "chicken",
    icon: "🍢"
  },
  {
    name: "Chicken Neck - Whole",
    price: 155,
    category: "chicken",
    icon: "🍗"
  },
  {
    name: "Chicken Neck - Half",
    price: 79,
    category: "chicken",
    icon: "🍗"
  },
  {
    name: "Boneless Chicken - Half",
    price: 189,
    category: "chicken",
    icon: "🍗"
  },
  {
    name: "Boneless Chicken - Whole",
    price: 365,
    category: "chicken",
    icon: "🍗"
  },
  {
    name: "Chicken Tenders (Breast) - Half",
    price: 95,
    category: "chicken",
    icon: "🍗"
  },
  {
    name: "Chicken Tenders (Breast) - Whole",
    price: 190,
    category: "chicken",
    icon: "🍗"
  },

  // MEALS
  {
    name: "2pcs Boneless Chicken with Rice",
    price: 79,
    category: "meals",
    icon: "🍱"
  },
  {
    name: "2pcs Boneless Chicken with Rice and Fries",
    price: 119,
    category: "meals",
    icon: "🍱"
  },
  {
    name: "Chick N' Fries",
    price: 139,
    category: "meals",
    icon: "🍟"
  },
  {
    name: "8pcs Nuggets with Gravy",
    price: 60,
    category: "meals",
    icon: "🍗"
  },
  {
    name: "8pcs Nuggets with Fries",
    price: 98,
    category: "meals",
    icon: "🍟"
  },

  // SNACKS
  {
    name: "Cheesy Fries",
    price: 49,
    category: "snacks",
    icon: "🍟"
  },
  {
    name: "3pcs Siomai",
    price: 35,
    category: "snacks",
    icon: "🥟"
  },
  {
    name: "3pcs Nuggets",
    price: 35,
    category: "snacks",
    icon: "🍗"
  },
  {
    name: "Fun Shots - Half",
    price: 99,
    category: "snacks",
    icon: "🍢"
  },
  {
    name: "Fun Shots - Whole",
    price: 188,
    category: "snacks",
    icon: "🍢"
  },
  {
    name: "Proven - Half",
    price: 89,
    category: "snacks",
    icon: "🍗"
  },
  {
    name: "Proven - Whole",
    price: 175,
    category: "snacks",
    icon: "🍗"
  },
  {
    name: "Calamares - Half",
    price: 89,
    category: "snacks",
    icon: "🦑"
  },
  {
    name: "Calamares - Whole",
    price: 175,
    category: "snacks",
    icon: "🦑"
  },

  // DRINKS
  {
    name: "Red Iced Tea",
    price: 25,
    category: "drinks",
    icon: "🥤"
  },
  {
    name: "Coke",
    price: 18,
    category: "drinks",
    icon: "🥤"
  },
  {
    name: "Royal",
    price: 18,
    category: "drinks",
    icon: "🥤"
  },
  {
    name: "Sprite",
    price: 18,
    category: "drinks",
    icon: "🥤"
  },
  {
    name: "Water",
    price: 15,
    category: "drinks",
    icon: "💧"
  }
];

let cart = [];

const menuGrid = document.getElementById("menuGrid");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const orderForm = document.getElementById("orderForm");

function peso(amount) {
  return "₱" + amount.toFixed(2);
}

function renderMenu(category = "all") {
  menuGrid.innerHTML = "";

  const filteredMenu = menu.filter(item =>
    category === "all" || item.category === category
  );

  filteredMenu.forEach((item, index) => {
    const originalIndex = menu.indexOf(item);
    const card = document.createElement("article");
    card.className = "menu-card";

    const flavorSelect = item.flavors
      ? `
        <label class="flavor-label" for="flavor-${originalIndex}">
          Choose flavor
        </label>
        <select id="flavor-${originalIndex}" class="flavor-select">
          ${item.flavors.map(flavor =>
            `<option value="${flavor}">${flavor}</option>`
          ).join("")}
        </select>
      `
      : "";

    card.innerHTML = `
      <div class="menu-icon">${item.icon}</div>
      <h3>${item.name}</h3>
      <p class="menu-price">${peso(item.price)}</p>
      <p class="menu-description">
        ${item.description || "A delicious Friedays favorite."}
      </p>
      ${flavorSelect}
      <button class="add-button" type="button" data-index="${originalIndex}">
        + Add to Cart
      </button>
    `;

    menuGrid.appendChild(card);
  });

  menuGrid.querySelectorAll(".add-button").forEach(button => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.index);
      const item = menu[index];

      const flavorElement = document.getElementById(`flavor-${index}`);
      const flavor = flavorElement ? flavorElement.value : "";

      addToCart(item, flavor);
    });
  });
}

function addToCart(item, flavor = "") {
  const cartName = flavor
    ? `${item.name} (${flavor})`
    : item.name;

  const existingItem = cart.find(entry => entry.name === cartName);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({
      name: cartName,
      price: item.price,
      quantity: 1
    });
  }

  renderCart();
}

function changeQuantity(index, amount) {
  cart[index].quantity += amount;

  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }

  renderCart();
}

function renderCart() {
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML =
      '<p class="empty-cart">Your cart is currently empty.</p>';
  }

  cart.forEach((item, index) => {
    const row = document.createElement("div");
    row.className = "cart-item";

    const details = document.createElement("div");
    const itemName = document.createElement("div");
    const itemPrice = document.createElement("small");

    itemName.className = "cart-item-name";
    itemName.textContent = item.name;
    itemPrice.textContent =
      `${peso(item.price)} each • ${peso(item.price * item.quantity)} total`;

    details.append(itemName, itemPrice);

    const controls = document.createElement("div");
    controls.className = "quantity-controls";

    const minus = document.createElement("button");
    minus.type = "button";
    minus.textContent = "−";
    minus.setAttribute("aria-label", `Remove one ${item.name}`);
    minus.addEventListener("click", () => changeQuantity(index, -1));

    const quantity = document.createElement("span");
    quantity.textContent = item.quantity;

    const plus = document.createElement("button");
    plus.type = "button";
    plus.textContent = "+";
    plus.setAttribute("aria-label", `Add one ${item.name}`);
    plus.addEventListener("click", () => changeQuantity(index, 1));

    controls.append(minus, quantity, plus);
    row.append(details, controls);
    cartItems.appendChild(row);
  });

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  cartTotal.textContent = peso(total);
}

document.getElementById("filters").addEventListener("click", event => {
  const button = event.target.closest(".filter");

  if (!button) return;

  document.querySelectorAll(".filter").forEach(filter => {
    filter.classList.remove("active");
  });

  button.classList.add("active");
  renderMenu(button.dataset.category);
});

orderForm.addEventListener("submit", event => {
  event.preventDefault();

  if (cart.length === 0) {
    alert("Please add at least one item to your cart.");
    document.getElementById("menu").scrollIntoView();
    return;
  }

  const name = document.getElementById("customerName").value.trim();
  const phone = document.getElementById("customerPhone").value.trim();
  const orderType = document.getElementById("orderType").value;
  const notes = document.getElementById("orderNotes").value.trim();

  if (!name || !phone || !orderType) {
    alert("Please complete all required order details.");
    return;
  }

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const itemLines = cart.map(item =>
    `${item.quantity} x ${item.name} - ${peso(item.price * item.quantity)}`
  );

  const message = [
    "🍗 FRIEDAYS TALAVERA ORDER",
    "",
    `Customer Name: ${name}`,
    `Contact Number: ${phone}`,
    `Order Type: ${orderType}`,
    "",
    "ORDER DETAILS:",
    ...itemLines,
    "",
    `TOTAL: ${peso(total)}`,
    "",
    `Additional Instructions: ${notes || "None"}`,
    "",
    "Please confirm my order and let me know the available pickup or service arrangements. Thank you!"
  ].join("\n");

  document.getElementById("orderMessage").textContent = message;
  document.getElementById("orderResult").hidden = false;
  document.getElementById("orderResult").scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
});

document.getElementById("copyOrder").addEventListener("click", async () => {
  const message = document.getElementById("orderMessage").textContent;
  const button = document.getElementById("copyOrder");

  try {
    await navigator.clipboard.writeText(message);
    button.textContent = "Copied!";
  } catch (error) {
    const textArea = document.createElement("textarea");
    textArea.value = message;
    document.body.appendChild(textArea);
    textArea.select();

    const copied = document.execCommand("copy");
    textArea.remove();

    button.textContent = copied
      ? "Copied!"
      : "Please select and copy the message";

  }

  setTimeout(() => {
    button.textContent = "Copy Order Message";
  }, 2500);
});

renderMenu();
renderCart();
// COPY FRIEDAYS ADDRESS

const copyAddressButton = document.getElementById("copyAddress");

if (copyAddressButton) {
  copyAddressButton.addEventListener("click", async () => {
    const address =
      "Friedays Talavera, Near Talavera National High School, Diaz St., Brgy. Pag-asa, Talavera, Nueva Ecija.";

    const buttonText = document.getElementById("copyAddressText");

    try {
      await navigator.clipboard.writeText(address);
      buttonText.textContent = "ADDRESS COPIED!";
    } catch (error) {
      buttonText.textContent = "COPY NOT AVAILABLE";
    }

    setTimeout(() => {
      buttonText.textContent = "COPY ADDRESS";
    }, 2500);
  });
}
