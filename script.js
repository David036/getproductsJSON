let main = document.querySelector(".main-5-section");
let cartIcon = document.querySelector(".icon-1");
let cartBlock = document.querySelector(".product-cart-block");
let cartCloseBtn = document.querySelector(".cart-close-btn");
let cartSection = document.querySelector(".product-cart-section");
let sortArr = [];
let sortBtn = document.querySelector(".sort");
let request = "https://fakestoreapi.com/products";
const xhr = new XMLHttpRequest();
xhr.open("GET", request);
xhr.onload = () => {
  console.log(xhr.response);
  let product = JSON.parse(xhr.response);
  product.forEach((element) => {
    let productBlock = document.createElement("div");
    productBlock.classList.add("product-block");
    main.append(productBlock);
    productBlock.innerHTML = `
    <div class="product-block">
            <img class="product-image" src="${element.image}">           
                <h5 class="product-title">${element.title}</h5>
                <div class="product-price-section">
                    <h4 class="product-price">${element.price}$</h4>
                <p class="product-rating">Rated ${element.rating.rate} out of 5</p>
                </div>     
                <button class="add-btn">Add</button>
        </div>
    `;
    let addBtn = productBlock.querySelector(".add-btn");
    addBtn.addEventListener("click", () => {
      sortArr.push(element);
      console.log(sortArr);
      cartIcon.style.display = "none";
      let newCart = document.createElement("img");
      document.body.append(newCart);
      newCart.classList.add("cart-icon");
      newCart.setAttribute("src", "./Images/Icon1.png");
      let productCart = document.createElement("div");
      cartSection.append(productCart);
      productCart.classList.add("product-cart");
      productCart.innerHTML = `     
              <img src="${element.image}" class="product-cart-image">
              <p class="product-cart-price">${element.price}$</p>
              <button class="remove">Delete</button>
        `;
      let removeBtn = productCart.querySelector(".remove");
      removeBtn.addEventListener("click", () => {
        productCart.remove();
      });

      newCart.addEventListener("click", () => {
        cartBlock.style.transform = "translateY(0)";
      });
    });
    cartCloseBtn.addEventListener("click", () => {
      cartBlock.style.transform = "translateY(-100%)";
    });
    
  });
};


sortBtn.addEventListener("click", () => {
    let oldProd = cartSection.querySelectorAll('.product-cart')
    oldProd.forEach(elem => {
        elem.remove()
    })
    
    let newSortArr = sortArr.sort((a, b) => {
      return b.price - a.price;
    });

    newSortArr.forEach((element) => {
      let productCart = document.createElement("div");
      cartSection.append(productCart)
      productCart.classList.add('product-cart')
      productCart.innerHTML = `     
<img src="${element.image}" class="product-cart-image">
<p class="product-cart-price">${element.price}$</p>
<button class="remove">Delete</button>
`;
      let removeBtn = productCart.querySelector(".remove");
      removeBtn.addEventListener("click", () => {
        productCart.remove();
        newSortArr.splice( newSortArr.indexOf(element),1 )

        
      });
    });
  });

xhr.send();
