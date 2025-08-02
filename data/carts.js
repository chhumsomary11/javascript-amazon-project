export let carts = JSON.parse(localStorage.getItem("cart"));
if (!carts) {
	carts = [
		{
			cartId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
			quantity: 1,
		},
		{
			cartId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
			quantity: 1,
		},
	];
}

export function addCart(productId) {
	let selectorInput = document.querySelector(
		`.js-quantity-selector-${productId}`
	);
	let selector = Number(selectorInput.value);
	let matchingItem;
	carts.forEach((cartItem) => {
		if (cartItem.cartId === productId) {
			matchingItem = cartItem;
		}
	});
	if (matchingItem) {
		matchingItem.quantity += selector;
	} else {
		carts.push({
			cartId: productId,
			quantity: selector,
		});
	}
	saveToLocalstorage();

	console.log(carts);
}

export function saveToLocalstorage() {
	localStorage.setItem("cart", JSON.stringify(carts));
}

export function removerProduct(productId) {
	const newCart = [];

	carts.forEach((item) => {
		if (item.cartId !== productId) {
			newCart.push(item);
		}
	});

	carts = newCart;
	saveToLocalstorage();
}
