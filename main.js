window.onload = () => loadProducts();

async function submitProduct() {
    const inputs = document.getElementById("add-inputs-container").children;
    const name = inputs[0].value;
    const description = inputs[1].value;
    const brand = inputs[2].value;
    const price = inputs[3].value;
    const imageUrl = inputs[4].value;
    const payload = {
        name,
        description,
        brand,
        price,
        imageUrl,
    };

    await createProduct(payload)
    .then(() => onSuccess("Prodotto creato correttamente")).catch(() => onError("Errore creazione prodotto"));
    loadProducts();
}

async function loadProducts() {
    const productContainer = document.getElementById("product-container");

    const products = await getProducts()
        .then((res) => res.json())
        .catch((er) => onError("Impossibile caricare i prodotti"));

    productContainer.innerHTML = "";
    products.forEach((product) => {
        productContainer.insertAdjacentHTML(
            "beforeend",
            createProductCard(product)
        );
    });
}

function showToast(toast) {
    const toastContainer = document.getElementById("toast-container");
    if (toastContainer) {
        toastContainer.insertAdjacentHTML(
            `beforeend`,
            `<div class="alert alert-${toast.type}" role="alert"> <span>${toast.msg}</span>
    </div>`
        );
    }
    setTimeout(() => {
        toastContainer.innerHTML = "";
    }, 3000);
}
function onError(msg) {
    showToast(`<div class="alert alert-info">
                <span>${msg}</span>
                </div>`);
}

function onSuccess(msg) {
    showToast(
        `<div class="alert alert-success">
         <span>${msg}</span>
        </div>`
    );
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
                <button id="edit-btn-${_id}" class="btn mt-2 btn-sm" onclick="openEditModal(event)">Modifica</button>
                <button id="delete-btn-${_id}" class="btn mt-2 btn-sm" onclick="deleteProductById(event)">Cancella</button>
              </div>
            </div>
          </div>`;
    return card;
}

async function editProduct() {
    const { name, description, brand, price, imageUrl } = getModalInputs(
        "edit-inputs-container"
    );
    const productId = sessionStorage.getItem("edit-product-id");
    await updateProduct(productId, {
        name: name.value,
        description: description.value,
        brand: brand.value,
        price: price.value,
        imageUrl: imageUrl.value,
    }).then(() => onSuccess("Prodotto aggiornato correttamente")).catch(() => onError("Errore aggiornamento prodotto"));
    loadProducts();
}
function confirmOperation(msg) {
    return confirm(msg);
}
const openEditModal = async (e) => {
    const editDialog = document.getElementById("edit_modal");
    editDialog.open = true;

    const { name, description, brand, price, imageUrl } = getModalInputs(
        "edit-inputs-container"
    );

    const id = e.target.id.split("-").pop();
    const pd = await getProductById(id)
        .then((res) => res.json())
        .catch((er) => console.error(er));

    sessionStorage.setItem("edit-product-id", id);

    name.value = pd.name;
    description.value = pd.description;
    brand.value = pd.brand;
    price.value = pd.price;
    imageUrl.value = pd.imageUrl;
};

function getModalInputs(id) {
    const inputs = document.getElementById(id).children;

    let name = inputs[0];
    let description = inputs[1];
    let brand = inputs[2];

    let price = inputs[3];
    let imageUrl = inputs[4];
    return { name, description, brand, price, imageUrl };
}
async function deleteProductById(e) {
    const btn = e.target;
    const id = btn.id.split("-").pop();
    if (confirmOperation(`Confermi l'eliminazione?`)) {
        await deleteProduct(id)
            .then(() => onSuccess("Prodotto eliminato correttamente"))
            .catch(() => onError("Errore cancellazione prodotto"));
        loadProducts();
    }
}
function resetDialog() {
    const form = document.getElementById("create-product-form");
    if (form && confirmOperation("Confermi la modifica?")) {
        form.reset();
    }
}
