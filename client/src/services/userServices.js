const API_URL = "http://localhost:8080"
const API_HEADERS={
    "Content-Type":"application/json",
    Accept:"application/json"
}

export  function getUser(email){
    return fetch(`${API_URL}/users?email=${email}`).then((res) => res.json()).then(
        res=>res.length>0?res.shift():null).catch(e=>alert(e))
}

export function addUser(user){
    return fetch(`${API_URL}/users`,{
        headers:API_HEADERS,
        method:"POST",
        body:JSON.stringify(user)
    }).then(res=>res.json())
}

export function updateUser(user){
    return fetch(`${API_URL}/users/${user._id}`,{
        headers:API_HEADERS,
        method:"PUT",
        body:JSON.stringify(user)
    }).then(res=>res.json()).catch(e=>alert(e))
}