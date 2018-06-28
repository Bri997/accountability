const token = localStorage.getItem("token")
// const user = JSON.parse(localStorage.getItem("user"))


if (!token){
    window.location = "/"
}

