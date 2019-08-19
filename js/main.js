//заглушки (имитация базы данных)
const image = 'https://placehold.it/200x150';
const cartImage = 'https://placehold.it/100x80';
const items = ['Notebook', 'Display', 'Keyboard', 'Mouse', 'Phones', 'Router', 'USB-camera', 'Gamepad'];
const prices = [1000, 200, 20, 10, 25, 30, 18, 24];
const ids = [1, 2, 3, 4, 5, 6, 7, 8];
const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';


//глобальные сущности корзины и каталога (ИМИТАЦИЯ! НЕЛЬЗЯ ТАК ДЕЛАТЬ!)
var userCart = [];

//кнопка скрытия и показа корзины
document.querySelector('.btn-cart').addEventListener('click', () => {
    document.querySelector('.cart-block').classList.toggle('invisible');
});

document.querySelector('.products').addEventListener ('click', (evt) => {
    if (evt.target.classList.contains ('buy-btn')) {
        cartBlock.addProduct(evt.target.dataset.name, evt.target.dataset.price);
    }
});

function makeGETRequest(url, callback) {
    var xhr;
  
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
  
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        callback(xhr.responseText);
      }
    };
  
    xhr.open('GET', url, true);
    xhr.send();
}

class ProductsList {
    constructor() {
        this.products = [];
    }
    fetchProducts(cb) {
        makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
            this.products = JSON.parse(goods);
        });
        cb();
    }
    render() {
        let listHtml = '';
        this.products.forEach(good => {
          const goodItem = new Product(good);
          listHtml += goodItem.render();
        });
        document.querySelector('.products').innerHTML = listHtml;
    }
}

class Product {
    constructor (product) {
        this.product_name = product.product_name;
        this.price = product.price;
    }
    render() {
        return `<div class="goods-item"><h3>${this.product_name}</h3><p>${this.price}</p></div>`;
    }
}

const catalog = new ProductsList();
catalog.fetchProducts(() => {
    catalog.render();
});

class Cart {
    constructor() {
        this.num = 0;
    }
    addProduct(name, price) {
        let newCartItem = new CartItem(name, price);
        this.render(newCartItem.render());
    }
    render(item) {
        const cart = document.querySelector('.cart-block');
        cart.appendChild(item);
        this.num++;
    }
}

let cartBlock = new Cart(); 

class CartItem {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
    render() {
        const block = document.createElement('div');
        block.textContent = `${this.name}, ${this.price}`;
        return block;
    }
}
