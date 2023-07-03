class Cart {
    cartItems = []; // Массив с товарами, добавленными в корзину пользователем
    container = null; // Свойство, которое будет хранить родительский контейнер для отрисовки внутри него товаров корзины
    cartItemsCost = 0; // Свойство, внутри которого будет находится суммарная стоимость всех товаров в корзине


    constructor (selectorForContainer, selectorForBuyButtons, selectorForCart) {
        this.container = document.querySelector(selectorForContainer);
        this._clickHandlerOnBuyButton(selectorForBuyButtons, selectorForCart);
    }

    _showOrHideCart(event) {
        if (cart.container.classList.contains('showCartItems')) {
            cart.container.classList.remove('showCartItems');
        }   else {
            cart.container.classList.add('showCartItems');
        }
    }

    _countCartItemsCost() {
        this.cartItemsCost = 0;
        for (let product of this.cartItems) {
            this.cartItemsCost += product.price * product.quantity;
        }
    }

    _render(productID) {
        for (let cartItem of this.cartItems) {
            if (productID === cartItem.id) {
                this.container.insertAdjacentHTML('beforeend', cartItem.render());
            }
        }
        this._renderTotalCost();
    }

    _renderTotalCost() {
        if (this.container.querySelector('.total-cost') !== null) {
            this.container.querySelector('.total-cost').remove();
        }
        this.container.insertAdjacentHTML('beforeend', `<div class="total-cost">Total cost: ${this.cartItemsCost}</div>`);
    }

    _findProductFromProducts(productId) {
        for (let product of list.products) {
            if (productId === product.id) {
                return product;
            }
        }
    }

    _findProductFromCartItems(productId) {
        for (let product of this.cartItems) {
            if (productId === product.id) {
                return product;
            }
        }
    }

    _getCartItems(event) {
        let productId = +event.target.id;
        let isExistInCartItems = cart._findProductFromCartItems(productId);
        if (isExistInCartItems !== undefined) {
            for (let product of cart.cartItems) {
                if (productId === product.id) {
                    product.quantity = product.quantity + 1;
                    cart._countCartItemsCost();
                    cart._editHTMLQuantityOfProduct(productId);
                    cart._renderTotalCost();
                }
            }
        }   else {
            let product = cart._findProductFromProducts(productId);
            cart.cartItems.push(new CartItem(product));
            cart._countCartItemsCost();
            cart._render(productId);
        }
        cart._clickHandlerOnButtonsInCart();
    }

    _clickHandlerOnBuyButton(selector, selectorForCart) {
        let allBuyButtons = document.querySelectorAll(selector);
        allBuyButtons.forEach((buyButton) => {
            buyButton.addEventListener('click', this._getCartItems);
        });
        let cart = document.querySelector(selectorForCart);
        cart.addEventListener('click', this._showOrHideCart);
    }

    _clickHandlerOnButtonsInCart() {
        let addItemButtonsInCart = document.querySelectorAll('.add-item');
        addItemButtonsInCart.forEach(button => {
            button.addEventListener('click', this._addOneMoreProduct);
        });
        let deleteItemButtonsInCart = document.querySelectorAll('.delete-item');
        deleteItemButtonsInCart.forEach(button => {
            button.addEventListener('click', this._deleteOneProduct);
        });
    }

    _addOneMoreProduct(event) {
        console.log(event);
        let productId = +event.target.id;
        for (let product of cart.cartItems) {
            if (productId === product.id) {
                product.quantity = product.quantity + 1;
                cart._countCartItemsCost();
                cart._editHTMLQuantityOfProduct(productId);
                cart._renderTotalCost();
            }
        }
    }

    _deleteOneProduct(event) {
        console.log(event);
        let productId = +event.target.id;
        for (let product of cart.cartItems) {
            if (productId === product.id) {
                product.quantity = product.quantity - 1;
                cart._countCartItemsCost();
                cart._editHTMLQuantityOfProduct(productId);
                cart._renderTotalCost();
            }
            if (product.quantity === 0) {
                cart._deleteProductInAll(productId);
            }
        }
    }

    _deleteProductInAll(productID) {
        this.cartItems = this.cartItems.filter(product => {
            if (product.quantity !== 0) {
                return product;
            }
        });
        this.container.querySelector(`[id="${productID}"]`).parentNode.parentNode.parentNode.remove();
    }

    _editHTMLQuantityOfProduct(productID) {
        let deskOfProduct = this.container.querySelector(`[id="${productID}"]`).parentNode.parentNode;
        let product = this._findProductFromCartItems(productID);
        deskOfProduct.querySelector('.cart-item-quantity').innerText = `Quantity of this item: ${product.quantity}`;
    }
}

class CartItem {
    title = ''; // Название товара
    price = 0; // Цена товара за штуку
    id = 0; // Идентификатор товара
    img = ''; // Изображение товара
    quantity = 0; // Кол-во товара

    constructor (product) {
        this.title = product.title;
        this.img = product.img;
        this.id = product.id;
        this.price = product.price;
        this.quantity++;
    }

    
    render() {
        return `
            <div class="cart-item">
                <img src="${this.img}" alt="${this.title}">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>Cost for this item: ${this.price}</p>
                    <span class="cart-item-quantity">Quantity of this item: ${this.quantity}</span>
                    <div class="cart-item-btns">
                        <button class="add-item" id="${this.id}">+</button>
                        <button class="delete-item" id="${this.id}">-</button>
                    </div>
                </div>
            </div>
        `
    }

    
}

const cart = new Cart('.cartItems', '.buy-btn', '.btn-cart');