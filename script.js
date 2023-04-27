const cardContainer = document.querySelector(".cards-container")

const paginationObject = {
  currentPage: 1,
  limit: 10,
  total: 100,
  skip: 0,
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded")
  getPaginationParams(paginationObject)
})

const createCard = product => {
  console.log("product car", product)
  const card = document.createElement("div")
  card.classList.add("card")
  card.innerHTML = `
        <div class="card-img">
            <img src="${product.images[0]}" alt="${product.title}" />
        </div>
        <div class="card-body">
            <h3 class="card-title">${product.title}</h3>
            <p class="card-price">$${product.price}</p>
            <p class="card-description">${product.description}</p>
        </div>
    `
  cardContainer.appendChild(card)
}

const getProducts = async () => {
  const response = await fetch(url)
  const data = await response.json()
  console.log(data)
}

const getPaginationParams = async res => {
  let url = `https://dummyjson.com/products?limit=${res.limit}&skip=${res.skip}`
  const response = await fetch(url)
  const data = await response.json()
  const products = await data.products
  await products.forEach(product => {
    createCard(product)
  })
}
