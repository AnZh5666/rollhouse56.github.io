

cart = [];
let totalPrice = 0;
let arrObj = [];


/*   Функция получения из базы данных всего товара*/
async function getData() {
    let response = await fetch(
      "db/goods.json",
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/x-www-form-urlencoded",
          "Permissions-Policy": "Origin",
        },
      }
    );
    let result = await response.json(); 
    arrObj = Object.keys(result).map((key) => result[key]);    
   console.log(arrObj);
     
   fillCardBox(arrObj)
    }
getData().catch(alert);


function fillCardBox (element) {
    const cardBox = document.querySelector('.card-box')
    cardBox.innerHTML = ''
    
    element.forEach((item) => {
       
        cardBox.innerHTML += `
        <div class="product-card">
                <div class="card__front">
                    <img src="${item.img}" alt="${item.name}" width="380" height="250">
                    <h3>${item.name} - <span>${item.price} руб.</span></h3>
                </div>
                <div class="product-details card__back">
                    <img src="${item.img}" alt="${item.name}" width="160" height="120">
                    <h3>${item.name}</h3>
                    <p>Описание: ${item.contain}</p>
                    <p>Вес: ${item.weight} гр.</p>
                    <p>Цена: ${item.price} руб.</p>
                    <div class="quantity">
                        <input class="quantity-inp" type="number" id="quantity${item.id}" value="1" min="1">
                        <button onclick="addToCart('${item.name}', ${item.price}, '${item.img}')">Добавить в корзину</button>
                    </div>
                </div>
        </div>`
    })
    let cards = document.querySelectorAll('.product-card')
    cards.forEach((el) => {
    el.addEventListener('click', function () {        
    el.classList.toggle('flip')
})
})
}


function addToCart(name, price, img) {
    const quantity = parseInt(document.getElementById(`quantity${cart.length + 1}`).value);
    const item = { name, price, quantity, img };
    cart.push(item);
    updateCart();
    addCartCount(cart)
}

function addCartCount (arrayName) {
    let cartCircle = document.querySelector('.cart-circle')
    let cartCount = document.querySelector('.cart-count')
    if(cart.length > 0) {
        cartCircle.style.display = 'block'
        cartCount.innerHTML = ""
        cartCount.innerHTML = cart.length
    }
    return
}

function updateCart() {
    const cartItemsDiv = document.getElementById('cart-items');
       cartItemsDiv.innerHTML = '';
    totalPrice = 0;
    cart.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
        <img src="${item.img}" alt="${item.name}" width="80" height="80">
        <p>${item.name} x ${item.quantity} - ${item.price * item.quantity} руб.</p>`;
        cartItemsDiv.appendChild(itemDiv);
        totalPrice += item.price * item.quantity;
         
    });
    if (cart.length === 0) {
        addCartCount(cart)
        document.getElementById('total-price').textContent = "Корзина пока пуста!";
        document.querySelector('.order-form').style.display = 'none'
    }
    else {
         document.getElementById('total-price').textContent = `Итого: ${totalPrice} руб.`;
         document.querySelector('.order-form').style.display = 'block'
    }
   
    
}


const cartBtn = document.querySelector('.cart-header')
cartBtn.addEventListener("click", () => {
     document.querySelector('.cart').classList.toggle('visible-cart')
     updateCart(cart)   
})
const closeCart = document.querySelector('.cart_btn-close')
closeCart.addEventListener('click', () => {
    document.querySelector('.cart').classList.toggle('visible-cart') 
})

const btnClearCart = document.querySelector('.btn-clear_cart')
btnClearCart.addEventListener('click', () => {
    cart=[]
    updateCart(cart)
    document.querySelector('.cart-circle').style.display = 'none'
    document.querySelector('.cart-count').innerHTML = ''
})

document.querySelector('.btn-buy').addEventListener('click', (e) => {
    e.preventDefault(),
    cart=[]
    updateCart(cart)
    document.querySelector('.cart-circle').style.display = 'none'
    document.querySelector('.cart-count').innerHTML = ''
    document.querySelector('.cart').classList.toggle('visible-cart') 
    alert('Успешно. Спасибо за заказ!!!')
})

/* function sendOrder() {
    
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const orderDetails = cart.map(item => `${item.name} x ${item.quantity}`).join(', ');
    const message = `Имя: ${name}\nEmail: ${phone}\nАдрес: ${address}\nЗаказ: ${orderDetails}\nИтого: ${totalPrice} руб.`;
    window.location.href = `mailto:advokat_zhilyaev@bk.ru?subject=Заказ&body=${encodeURIComponent(message)}`;

} */

/* function addReview() {
    const reviewName = document.getElementById('review-name').value;
    const reviewText = document.getElementById('review-text').value;
    if (reviewName && reviewText) {
        const reviewList = document.getElementById('review-list');
        const reviewDiv = document.createElement('div');
        reviewDiv.className = 'review';
        reviewDiv.innerHTML = `<p><strong>${reviewName}:</strong> ${reviewText}</p>`;
        reviewList.appendChild(reviewDiv);
        document.getElementById('review-name').value = '';
        document.getElementById('review-text').value = '';
    }
} */