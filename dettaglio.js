window.onload = () => loadProductDetails();

function loadProductDetails() {
    const productDetailsContainer = document.getElementById(
        "product-details-container"
    );

    // Ottieni l'ID del prodotto dalla query string
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");

    // Carica i dettagli del prodotto utilizzando l'ID
    getProductById(productId)
        .then((res) => res.json())
        .then((currentProduct) => {
            productDetailsContainer.innerHTML = `
                <h2>${currentProduct.name}</h2>
                <p>${currentProduct.description}</p>
                <!-- Altri dettagli del prodotto, se necessario -->
            `;
        })
        .catch((error) => {
            console.error(error);
            // Gestisci l'errore, ad esempio reindirizzando l'utente a una pagina di errore
        });
}
