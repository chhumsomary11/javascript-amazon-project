import { carts } from "../data/carts.js";
import { products } from "./data/products.js";

let productContainer = document.querySelector(".jsProducts");

// For each product inside product[], we create a card.

products.forEach((product) => {
	let card = "";
	card += `
        <div class="product-container">
					<div class="product-image-container">
						<img
							class="product-image"
							src="${product.image}"
						/>
					</div>

					<div class="product-name limit-text-to-2-lines">
                    "${product.name}"
					</div>

					<div class="product-rating-container">
						<img
							class="product-rating-stars"
							src="images/ratings/rating-${product.rating.stars * 10}.png"
						/>
						<div class="product-rating-count link-primary">${product.rating.count}</div>
					</div>

					<div class="product-price">${(product.priceCents / 100).toFixed(2) + "$"}</div>

					<div class="product-quantity-container">
						<select class= "js-quantity-selector-${product.id}">
							<option selected value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
							<option value="4">4</option>
							<option value="5">5</option>
							<option value="6">6</option>
							<option value="7">7</option>
							<option value="8">8</option>
							<option value="9">9</option>
							<option value="10">10</option>
						</select>
					</div>

					<div class="product-spacer"></div>

					<div class="added-to-cart js-added-to-cart " >
						<img src="images/icons/checkmark.png" />
						Added
					</div>

					<button class="add-to-cart-button button-primary js-addToCartBtn"  
					data-product-name =" ${product.name}
					"
					data-product-id="${product.id}">Add to Cart</button>
				</div>
			</div>
    `;

	productContainer.innerHTML += card;
});

//.querySelectorAll return nodelist
let addToCartBtn = document.querySelectorAll(".js-addToCartBtn");
//What will happen inside each button?
addToCartBtn.forEach((button) => {
	button.onclick = () => {
		const productName = button.dataset.productName;
		const productId = button.dataset.productId;

		// Get current product card in the button
		const productCard = button.closest(".product-container");

		//Added to cart showed up after the button is clicked
		const addedBtn = productCard.querySelector(".js-added-to-cart");
		addedBtn.classList.add("js-added");
		setTimeout(() => {
			addedBtn.classList.remove("js-added");
		}, 2000);
		// Selector for product quantity

		let selectorInput = document.querySelector(
			`.js-quantity-selector-${productId}`
		);
		let selector = Number(selectorInput.value);

		//Condition to prevent product duplication

		let matchingItem;
		carts.forEach((item) => {
			if (item.id === productId) {
				matchingItem = item;
			}
		});
		if (matchingItem) {
			matchingItem.quantity += selector;
		} else {
			carts.push({
				name: productName,
				id: productId,
				quantity: selector,
			});
		}

		//Calculation of the total quantity selected
		let totalQuantity = 0;

		carts.forEach((item) => {
			totalQuantity += item.quantity;
		});

		document.querySelector(".js-cart-quantity").innerHTML = totalQuantity;
	};
});
