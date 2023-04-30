const cardContainer = document.querySelector(".cards-container")
let isLoadig = true // to prevent multiple requests

let paginationObject = {
  currentPage: 1,
  limit: 10,
  total: 100,
  skip: 0,
}

const totalPages = Math.ceil(paginationObject.total / paginationObject.limit)

document.addEventListener("DOMContentLoaded", () => {
  generatePaginationButtons(totalPages, paginationObject.currentPage)
  getPaginationParams(paginationObject.currentPage)
})

const createCard = product => {
  console.log(product)
  console.log("paginnationObject", paginationObject)
  cardContainer.innerHTML = ""
  product.forEach(product => {
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
  })
}

const getPaginationParams = async cuurentPage => {
  // loading Wait until the information is loaded to the DOM
  cardContainer.innerHTML = ""
  isLoadig = true
  ceateLoadingSpinner(isLoadig)
  // get the data
  let url = `https://dummyjson.com/products?limit=${
    paginationObject.limit
  }&skip=${paginationObject.limit * (cuurentPage - 1)}`
  const response = await fetch(url)
  const data = await response.json()
  const products = await data.products
  const onLoaded = await createCard(products)
  // remove the loading spinner
  isLoadig = false
  ceateLoadingSpinner(isLoadig)
}

const ceateLoadingSpinner = loading => {
  if (loading) {
    const spinnerContainer = document.createElement("div")
    spinnerContainer.classList.add("spinner-container")
    const spinner = document.createElement("div")
    spinner.classList.add("loader")
    spinnerContainer.appendChild(spinner)
    cardContainer.appendChild(spinnerContainer)
  } else {
    const spinnerContainer = document.querySelector(".spinner-container")
    if (spinnerContainer) {
      spinnerContainer.remove()
    }
  }
}

// generate the pagination buttons and add the event listeners
const generatePaginationButtons = (totalPages, currentPage) => {
  const paginationContainer = document.querySelector(".pagination-center")
  paginationContainer.innerHTML = ""

  if (totalPages <= 1) {
    return
  }

  const prevButton = document.createElement("button")
  prevButton.classList.add("btn-pagination", "btn-prev")
  prevButton.innerText = "Prev"

  prevButton.addEventListener("click", () => {
    console.log("currentPage prev", currentPage)
    if (currentPage > 1) {
      currentPage--
      // update the pagination object
      paginationObject.currentPage = currentPage
      prevButton.disabled = currentPage === 1
      // remove the active class from all the buttons
      for (const child of paginationContainer.children) {
        child.classList.remove("active")
      }
      // add the active class to the current button
      paginationContainer.children[currentPage].classList.add("active")
      getPaginationParams(currentPage)
    }
  })
  // add the prev button to the pagination container
  paginationContainer.appendChild(prevButton)

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement("span")
    pageButton.classList.add("btn-pagination")
    pageButton.innerText = i
    pageButton.classList.toggle("active", i === currentPage)

    console.log("i", i)
    console.log("currentPage", currentPage)
    pageButton.addEventListener("click", () => {
      if (i !== currentPage) {
        currentPage = i
        paginationObject.currentPage = currentPage
        for (const child of paginationContainer.children) {
          child.classList.remove("active")
        }
        paginationContainer.children[currentPage].classList.add("active")
        getPaginationParams(currentPage)
      }
    })
    paginationContainer.appendChild(pageButton)
  }

  const nextButton = document.createElement("button")
  nextButton.classList.add("btn-pagination", "btn-next")
  nextButton.innerText = "Next"
  nextButton.disabled = currentPage === totalPages
  nextButton.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++
      paginationObject.currentPage = currentPage
      for (const child of paginationContainer.children) {
        child.classList.remove("active")
      }
      paginationContainer.children[currentPage].classList.add("active")
      getPaginationParams(currentPage)
    }
  })

  paginationContainer.appendChild(nextButton)
}
