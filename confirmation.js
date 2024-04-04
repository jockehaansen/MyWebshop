document.addEventListener('DOMContentLoaded', function () {
  // Hämta URL-parametrar
  const urlParams = new URLSearchParams(window.location.search)
  console.log(`${urlParams}`)
  const fullname = urlParams.get('name')
  const phoneNumber = urlParams.get('phoneNumber')
  const address = urlParams.get('address')
  const email = urlParams.get('email')

  function renderCustomerInfo() {
    const userInfoContainer = document.getElementById('userInfoContainer')
    const userInfoContent = `
      <div>    
          <h2>Delivery adress:</h2>
          <p>${fullname}</p>
          <p>${address}</p>
          <p>${phoneNumber}</p>
          <p>${email}</p>
          <hr>
      </div
      `

    userInfoContainer.innerHTML = userInfoContent
  }
  renderCustomerInfo()
})

fetch('https://fakestoreapi.com/products')
  .then((response) => response.json())
  .then((data) => {
    let row

    //Get the id's of the products in localstorage
    let productsInCart = []
    if (localStorage.getItem('productsInCart') !== null) {
      productsInCart = JSON.parse(localStorage.getItem('productsInCart'))
    }

    //Filter the products from the API to only render the ones that we have in localstorage
    const filteredProducts = data.filter((product) => {
      return productsInCart.some(
        (cartProduct) => Number(cartProduct.id) === product.id
      )
    })

    //Get access to set the total order value text
    const orderPriceText = document.getElementById('total-price-text')
    let orderPrice = 0

    //Get the amount of products that have the same id's into an array
    console.log('productsincart', productsInCart)
    const idCounts = {}
    productsInCart.forEach((item) => {
      const id = item.id
      idCounts[id] = (idCounts[id] || 0) + 1
      orderPrice += parseFloat(item.price)
    })

    //Iterate through the products and render them dynamically
    filteredProducts.forEach((product, index) => {
      //Rows with 4 items per row
      if (index % 4 === 0) {
        row = document.createElement('div')
        row.classList.add('row')
        row.classList.add('product-container')
        document.getElementById('productDisplay').appendChild(row)
      }

      //Render the products
      renderProducts(product, row, idCounts)
    })

    //Set the total order value text
    orderPriceText.innerHTML = `${orderPrice.toFixed(2)} $`
  })
  .catch((error) => {
    console.error('Error fetching products:', error)
  })

function renderProducts(product, row, idCounts) {
  let counts = idCounts[product.id]

  const col = document.createElement('div')

  const productInCart = document.createElement('div')

  const cardContent = `
    <div class="container cart-container-1 cart-sizing">
    <img class="cart-image conf-image"src="${product.image}" alt="${product.title}"
    <h5 class="cart-title">${product.title}</h5>
    </div>
    <div class="container cart-container-2">
    <div class="cart-price-container">
        <p class="cart-price">${product.price} $<p>
    </div>
    <div class="cart-button-container">        
        <p>${counts}</p>        
    </div>
    <hr>
    </div>`

  productInCart.innerHTML = cardContent
  col.appendChild(productInCart)
  row.appendChild(col)
}
