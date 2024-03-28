fetch('https://fakestoreapi.com/products')
  .then((response) => response.json())
  .then((data) => {
    let row
    console.log(typeof data[0].id);
    //get the ids
    let productsInCart = []
    if (localStorage.getItem('productsInCart') !== null) {
      productsInCart = JSON.parse(localStorage.getItem('productsInCart'))
    }

    console.log(typeof productsInCart[0].id);
    const filteredProducts = data.filter((product) => {
      return productsInCart.some((cartProduct) => Number(cartProduct.id) === product.id)
    })

    console.log(filteredProducts);

    // Iterate through the products and create cards
    filteredProducts.forEach((product, index) => {
      console.log(product);
      if (index % 4 === 0) {
        row = document.createElement('div')
        row.classList.add('row')
        row.classList.add('product-container')
        //row.classList.add('mb-4')
        document.getElementById('productDisplay').appendChild(row)
      }

      renderProducts(product, row)
    })
  })
  .catch((error) => {
    console.error('Error fetching products:', error)
  })

function renderProducts(product, row) {
  const col = document.createElement('div')
  col.classList.add('col-sm-6')
  col.classList.add('col-md-3')
  col.classList.add('col-lg-3')

  const card = document.createElement('div')
  card.classList.add('card')

  const cardContent = `
      <img src="${product.image}" class="card-image-top" alt="${product.title}">
          <div class="card-body">
              <h6 class="card-title">${product.title}</h6>
              <p class="card-text">${product.description}</p>
              <div class="card-button">
                  <h6 class="item-price">${product.price} $</h6>                
                  <button onClick="addToCart(${product.id})"class="addToCartBtn" >Add To Cart</button><a/>                
              </div>
          </div>`

  card.innerHTML = cardContent
  col.appendChild(card)
  row.appendChild(col)
}

//grab the item ID
/*
    const addToCartBtn = card.querySelector('.addToCartBtn')
    addToCartBtn.addEventListener('click', function (event) {
      //kanske inte behövs här
      event.preventDefault()
  
      //set this as the id of the product that we want to carry through purchase and
      //confirmation screen
      const productId = event.target.id
      console.log('ProductID to be sent over: ' + productId)
      buyNowProductId = productId
    })

/*
document.getElementById('myForm').addEventListener('submit', saveBookmark)

function saveBookmark(e) {
  const siteName = document.getElementById('siteName').value
  const siteUrl = document.getElementById('siteUrl').value

  const bookmark = {
    name: siteName,
    url: siteUrl,
  }

  e.preventDefault()

  if (localStorage.getItem('bookmarks') === null) {
    const bookmarks = []
    bookmarks.push(bookmark)
    localStorage.setItem('bookmarks', JSON.stringify(bookmark))
  } else {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
    bookmarks.push(bookmark)
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
  }
}

function fetchBookmarks() {
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
  console.log(bookmarks)

  const bookmarksResults = document.getElementById('bookmarksResults')

  bookmarksResults.innerHTML = ''

  for (let i = 0; i < bookmarks.length; i++) {
    const name = bookmarks[i].name
    const url = bookmarks[i].url

    bookmarksResults.innerHTML +=
      '<div class="well">' +
      '<h3>' +
      name +
      ' <a class="btn btn-default" target = "_blank" href="' +
      url +
      '">Visit</a>'
    '</h3>' + '</div>'
  }
}
*/
