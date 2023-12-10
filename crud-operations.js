const URL = "https://striveschool-api.herokuapp.com/api/product";
const AUTH_TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTczNGM3YWZlMDMxZTAwMTliYTE5MmEiLCJpYXQiOjE3MDIwNTUwMzQsImV4cCI6MTcwMzI2NDYzNH0.vzn_R-kQl1iy3UpLR-zoouiWF1EtzjUaogmXrHRxBKo";

const auth_headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${AUTH_TOKEN}`,
};

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
