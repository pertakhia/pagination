
const paginationObject = {
    currentPage: 1,
    limit: 10,
    total: 100,
    skip: 0,
}



document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded')
    }
)

// const createPagInationBtns = (paginationObject) => {
//     const paginationContainer = document.querySelector('.pagination-container')
//     const paginationBtns = document.createElement('div')
//     paginationBtns.classList.add('pagination-btns')
//     paginationContainer.appendChild(paginationBtns)
//     paginationBtns.innerHTML = `
//         <button class="pagination-btn" id="first-page-btn">First</button>
//         <button class="pagination-btn" id="prev-page-btn">Prev</button>
//         <button class="pagination-btn" id="next-page-btn">Next</button>
//         <button class="pagination-btn" id="last-page-btn">Last</button>
//     `
//     const firstPageBtn = document.querySelector('#first-page-btn')
//     const prevPageBtn = document.querySelector('#prev-page-btn')
//     const nextPageBtn = document.querySelector('#next-page-btn')
//     const lastPageBtn = document.querySelector('#last-page-btn')

//     firstPageBtn.addEventListener('click', () => {
//         paginationObject.currentPage = 1
//         paginationObject.skip = 0
//         getPaginationParams(paginationObject)
//     })
// }

const getProducts = async () => {
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
}

const getPaginationParams = async ( data ) => {
    let url = `https://dummyjson.com/products?limit=${data.limit}&skip=${data.skip}`
    
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
}






