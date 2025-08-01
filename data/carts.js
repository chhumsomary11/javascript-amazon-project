export const carts = [];

export function addCart(productId) {
	let selectorInput = document.querySelector(
		`.js-quantity-selector-${productId}`
	);
	let selector = Number(selectorInput.value);
	let matchingItem;
	carts.forEach((cartItem) => {
		if (cartItem.id === productId) {
			matchingItem = cartItem;
		}
	});
	if (matchingItem) {
		matchingItem.quantity += selector;
	} else {
		carts.push({
			id: productId,
			quantity: selector,
		});
	}
}
