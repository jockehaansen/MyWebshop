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
    console.log(orderPrice)

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
    orderPriceText.innerHTML = `Att betala: ${orderPrice.toFixed(2)} $`
  })
  .catch((error) => {
    console.error('Error fetching products:', error)
  })

function renderProducts(product, row, idCounts) {
  let counts = idCounts[product.id]

  const col = document.createElement('div')

  const productInCart = document.createElement('div')

  const cardContent = `
    <div class="container cart-container-1">
      <img class="cart-image"src="${product.image}" alt="${product.title}"
      <h5 class="cart-title">${product.title}</h5>
    </div>
    <div class="container cart-container-2">
      <div class="cart-price-container">
        <p class="cart-price">${product.price} $<p>
      </div>
      <div class="cart-button-container">
        <btn class="add-item fa-solid fa-circle-plus" type="button" id="${product.id}"></btn>
        <p>${counts}</p>
        <btn class="remove-item fa-solid fa-circle-minus" type="button" id="${product.id}"></btn>
      </div>
      <hr>
    </div>`

  productInCart.innerHTML = cardContent
  col.appendChild(productInCart)
  row.appendChild(col)
}

//Add another one of the same item into localstorage
const addOneProduct = (event) => {}

//Remove one of the same item from localstorage
const removeOneProduct = (event) => {}

//TODO fix ordervalue to calculate for more than 1 of the same item
