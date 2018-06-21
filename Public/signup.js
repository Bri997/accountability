$(function(){

$("#signUpForum").on('submit', function(e) {
    e.preventDefault()
    let name = $(".signUpName").val()
    let email = $(".signUpEmail").val()
    let firstPassword = $(".signUpPassword").val()
    let confirmPassword = $(".signUpConfirmPassword").val()
    console.log(firstPassword + confirmPassword)
    let errorMessage = null
    if( !(firstPassword === confirmPassword)){
         errorMessage = "Passwords Must Match"

    }
    if (errorMessage){
        $(".errorMessage").html(errorMessage)
    }
    else{
        fetch ('/api/users', {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            
            },
            body: JSON.stringify({
                "name": name,
                "email": email,
                "password": confirmPassword
            })
            
            
        })
        .then(response => {
            localStorage.setItem("token", response.headers.get("x-auth-token"))
            return response
        })
        .then(response => response.json()) 
        .then(user => {
            localStorage.setItem("user", JSON.stringify(user))
            window.location = "/dashboard.html"
        
        })
    }
})


})