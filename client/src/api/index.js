//API call for Signing up new user
export const signUp = user => {
    //Post request for the form
    console.log("Front end Signup API ", user)
    return fetch(`${process.env.REACT_APP_API_URL}/signup`, {
    method: "POST",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
    
    })    
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}


//API call to Signin user
export const signin = user => {
    //Post request for the form
    console.log("Front end Signin API ", user)
    return fetch(`${process.env.REACT_APP_API_URL}/signin`, {
    method: "POST",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
    
    })    
    .then(response => {
        console.log("response")
        return response.json();
    })
    .catch(err => console.log(err));
}


//API call to signout
export const signout = () => {
    if(typeof window !== "undefined") localStorage.removeItem("jwt")
    
    return fetch(`${process.env.REACT_APP_API_URL}/signout`, {
        method: "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

//To create or update profile of the user
export const create = (userId, token, post) => {
    return fetch(`${process.env.REACT_APP_API_URL}/profile/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            //"Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: post
    })
    .then(response => {
        //console.log(response)
        return response.json();
    })
    .catch(err => console.log(err));
}


//JWT setting
export const authenticate = (jwt, next) => {
    if(typeof window !== "undefined") {
        localStorage.setItem("jwt" , JSON.stringify(jwt))
    }
    next()
}

//To check whether the user is logged in
export const isAuthenticated = () => {
    if(typeof window == "undefined")
    {return false}

    if(localStorage.getItem("jwt")){
        return JSON.parse(localStorage.getItem("jwt"))
    }
    else {
        return false
    }
}

//To get authenticated user details 
export const getUser = (userId, token) => {
    console.log("Token User ", userId, token)
    return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${isAuthenticated().token}`
        }
    })
    .then(response => {
        //console.log(response)
        return response.json();
    })
}

