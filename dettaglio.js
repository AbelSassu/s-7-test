window.onload = async () => {
    const oldTitle = document.title;
    const container = document.getElementById('product-detail-container');

    document.title = 'loading details...'
    const product = await loadProductDetails();
    document.title = oldTitle;

    if(container){
        container.innerHTML = createProductCard(product)
    }
};

function createProductCard(product){
    const {name, description, price, imageUrl, brand} = product;
    
    return `<section class="text-gray-400 body-font overflow-hidden">
  <div class="container px-5 py-24 mx-auto">
    <div class="lg:w-4/5 flex flex-wrap">
        <div class="h-48 rounded overflow-hidden">
              <img
                alt="product image"
                class=" object-center h-48 w-full block object-contain"
                src="${imageUrl}"
              />
        </div>
        <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
        <h2 class="text-sm title-font text-gray-500 tracking-widest">${brand}</h2>
        <h1 class="text-white text-3xl title-font font-medium mb-1">${name}</h1>
        <p class="leading-relaxed break-words mb-5">${description}</p>
        <div class="flex justify-evenly">
          <div>
          <span class="title-font font-medium text-2xl text-white">${price}€</span>
          </div>
          <div>
          <button class="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Aggiungi al carrello</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>`;
}
async function loadProductDetails() {

    // Ottieni l'ID del prodotto dalla query string
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");

    // Carica i dettagli del prodotto utilizzando l'ID
    return await getProductById(productId).then((res) => res.json()).catch(err => console.err(err))

}
