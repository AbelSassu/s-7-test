const URL = "https://striveschool-api.herokuapp.com/api/product";
const AUTH_TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTczNGM3YWZlMDMxZTAwMTliYTE5MmEiLCJpYXQiOjE3MDIwNTUwMzQsImV4cCI6MTcwMzI2NDYzNH0.vzn_R-kQl1iy3UpLR-zoouiWF1EtzjUaogmXrHRxBKo";

const auth_headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${AUTH_TOKEN}`,
};

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

    await createProduct(payload);
    loadProducts();
}

async function loadProducts() {
    const productContainer = document.getElementById("product-container");

    const products = await getProducts()
        .then((res) => res.json())
        .catch((er) => console.error(er));
    console.log(products);

    function renderProducts() {
        productContainer.innerHTML = "";
        products.forEach((product) => {
            const id = product._id;
            productContainer.innerHTML += createProductCard(product);
        });
    }
    renderProducts();
}

function createProductCard(product) {
    const { _id, name, price, description, brand, imageUrl } = product;
    const card = `<div class="lg:w-1/4 md:w-1/2 p-4 w-full bg-stone-500 shadow-lg rounded-lg h-fit">
            <a class="block relative h-48 rounded overflow-hidden">
              <img
                alt="product image"
                class=" object-center h-48 w-full block object-contain"
                src="${imageUrl}"
              />
            </a>
            <div class="mt-4">
              <h3 class=" text-xs tracking-widest title-font text-white mb-1">
                ${brand}
              </h3>
              <h2 class="text-white title-font text-lg font-medium">
                ${name}
              </h2>
              <div class="collapse mt-1 w-full border-0 rounded-none">
                <input type="checkbox" class=" h-6"/> 
                <div class="collapse-title font-medium p-0">
                  Descrizione
                </div>
                <div class="collapse-content p-0"> 
                <p class="text-white">${description}</p>
                </div>
              </div>
              <p class="mt-1 text-white" onclick="viewProductDetails('${_id}')">${price}€</p>
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
    });
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
        await deleteProduct(id);
        loadProducts();
    }
}
function resetDialog() {
    const form = document.getElementById("create-product-form");
    if (form && confirmOperation("Confermi la modifica?")) {
        form.reset();
    }
}
//prove
async function viewProductDetails(id) {
    const product = await getProductById(id)
        .then((res) => res.json())
        .catch((er) => console.error(er));

    // Salva il prodotto corrente in sessionStorage
    sessionStorage.setItem("currentProduct", JSON.stringify(product));

    // Reindirizza alla pagina di dettaglio del prodotto
    window.location.href = "dettaglio.html";
}

function viewProductDetails(id) {
    window.location.href = `dettaglio.html?id=${id}`;
}
// ------------------- CRUD OPERATIONS ------------------- //
async function getProducts() {
    return fetch(URL, {
        method: "GET",
        headers: auth_headers,
    });
}
async function getProductById(id) {
    return fetch(`${URL}/${id}`, {
        method: "GET",
        headers: auth_headers,
    });
}
async function createProduct(data) {
    return fetch(URL, {
        method: "POST",
        body: JSON.stringify(data),
        headers: auth_headers,
    });
}

async function updateProduct(id, data) {
    return fetch(`${URL}/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: auth_headers,
    });
}
async function deleteProduct(id) {
    return fetch(`${URL}/${id}`, {
        method: "DELETE",
        headers: auth_headers,
    });
}
