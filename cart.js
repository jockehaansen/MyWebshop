const fetchAll = () => {
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
      orderPriceText.innerHTML = `Att betala: ${orderPrice.toFixed(2)} $`
    })
    .catch((error) => {
      console.error('Error fetching products:', error)
    })
}

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
        <btn class="add-item fa-solid fa-circle-plus" type="button" id="addOneBtn" data-id="${product.id}" data-price="${product.price}"></btn>
        <p>${counts}</p>
        <btn class="remove-item fa-solid fa-circle-minus" type="button" id="removeOneBtn" data-id="${product.id}" data-price="${product.price}"></btn>
      </div>
      <hr>
    </div>`

  productInCart.innerHTML = cardContent
  col.appendChild(productInCart)
  row.appendChild(col)

  const addOneBtn = col.querySelector('.add-item')
  const removeOneBtn = col.querySelector('.remove-item')
  addOneBtn.addEventListener('click', addOneProduct)
  removeOneBtn.addEventListener('click', removeOneProduct)
}

//Add another one of the same item into localstorage
const addOneProduct = (event) => {
  event.preventDefault()
  const productId = event.target.getAttribute('data-id')
  const productPrice = event.target.getAttribute('data-price')
  const countElement = event.target.nextElementSibling

  let currentCount = parseInt(countElement.textContent)
  console.log('current before', currentCount)
  currentCount++
  countElement.textContent = currentCount
  console.log('current after', currentCount)

  const productInCart = {
    id: productId,
    price: productPrice,
  }
  //Get the id's of the products in localstorage
  let productsInCart = []
  if (localStorage.getItem('productsInCart') !== null) {
    productsInCart = JSON.parse(localStorage.getItem('productsInCart'))
  }

  productsInCart.push(productInCart)
  localStorage.setItem('productsInCart', JSON.stringify(productsInCart))

  console.log(productsInCart)
  location.reload()
}

//Remove one of the same item from localstorage
const removeOneProduct = (event) => {
  event.preventDefault()
  const targetId = event.target.getAttribute('data-id')
  console.log('click')

  let productsInCart = []
  if (localStorage.getItem('productsInCart') !== null) {
    productsInCart = JSON.parse(localStorage.getItem('productsInCart'))
  }

  console.log('prod b4', productsInCart)
  productsInCart = removeFirstOccurrence(productsInCart, targetId)
  console.log('prod after', productsInCart)
  localStorage.setItem('productsInCart', JSON.stringify(productsInCart))

  const countElement = event.target.previousElementSibling

  let currentCount = parseInt(countElement.textContent)
  console.log('current before', currentCount)
  currentCount = currentCount - 1
  countElement.textContent = currentCount

  location.reload()
}

const removeFirstOccurrence = (array, idToRemove) => {
  const index = array.findIndex((item) => item.id === idToRemove)
  if (index !== -1) {
    array.splice(index, 1)
  }
  return array
}

//TODO fix ordervalue to calculate for more than 1 of the same item
