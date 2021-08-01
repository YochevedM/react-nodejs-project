const API_URL = "http://localhost:8080"
const API_HEADERS={
    "Content-Type":"application/json",
    Accept:"application/json"
}

export function getAllProducts() {/**retuurn all products from json */
    return fetch(`${API_URL}/products`).then((res) => res.json()).catch(e=>alert(e))
}

export function getProductsByCategory(category) {
    return fetch(`${API_URL}/products?category=${category}`).then((res) => res.json()).catch(e=>alert(e))
}

export function getSingleProduct(productId) {
    return fetch(`${API_URL}/products?_id=${productId}`).then((res) => res.json()).then(
        res=>res.length>0?res.shift():null
    ).catch(e=>alert(e))
}

export function updateProductQuantity(productId,count){
    return getSingleProduct(productId).then(res=>{
        if(res){
            let updatedProduct=res;
            updatedProduct.quantity+=count;
            return fetch(`${API_URL}/products/${productId}`,
            {headers:API_HEADERS,
            method:"PUT",
            body:JSON.stringify(updatedProduct)})
        }
        else{
            return {};
        }
    }).then(res=>res.json()).catch(e=>alert(e))
}