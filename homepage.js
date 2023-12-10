window.onload = () => loadProducts();

async function loadProducts() {
    const productContainer = document.getElementById("product-container");

    const products = await getProducts()
        .then((res) => res.json())
        .catch((er) => console.error(er));

    productContainer.innerHTML = "";
    products.forEach((product) => {
        productContainer.insertAdjacentHTML('beforeend', createProductCard(product));
    });
}

function createProductCard(product) {
    const { _id, name, price, brand, imageUrl } = product;
    const card = `<div class="lg:w-1/5 md:w-1/2 p-4 w-full bg-stone-500 shadow-lg rounded-lg h-fit">
            <div class=" h-48 rounded overflow-hidden">
              <img
                alt="product image"
                class=" object-center h-48 w-full block object-contain"
                src="${imageUrl}"
              />
            </div>
            <div class="mt-4">
              <h3 class=" text-xs tracking-widest title-font text-white mb-1">
                ${brand}
              </h3>
              <h2 class="text-white title-font text-lg font-medium mb-2">
                ${name}
              </h2>
              
              <a href="dettaglio.html?id=${_id}" class="text-slate-300 font-bold inline-flex items-center">Vedi dettagli <svg class="w-4 h-4 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
            </a>
              
              <p class="mt-2 text-white">${price}€</p>
              <div id="edit-group-${_id}">
                <button id="edit-btn-${_id}" class="btn mt-2 btn-sm w-44">Aggiungi al carrello</button>
                <button id="delete-btn-${_id}" class="btn mt-2 w-44 btn-sm">Aggiungi ai preferiti</button>
              </div>
            </div>
          </div>`;
    return card;
}

