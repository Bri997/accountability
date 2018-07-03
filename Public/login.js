$(function(){

    $(".loginSubmit").on('click', function(e) {
        e.preventDefault()
        
        let email = $(".logInEmail").val().toLowerCase()
        let clientPassword = $(".logInPassword").val()
        fetch ('/api/auth', {
            method: "post",
            body: JSON.stringify({
                "email": email,
                "password": clientPassword
            }),

            headers: {
                'Content-Type': 'application/json'
            }
        
        })
        .then(response => {
            if(!response.ok){
                throw Error (response.statusText)
            }
            return response
        })
        .then(response => response.text()) 
        .then(token => {
            localStorage.setItem("token", (token))
            window.location = "/dashboard.html"
        
        })
        .catch(error => {
            ($(".loginErrorMessage").append(`<div class = 'errorMessage'> <h3>Invalid Email or Password Please Try Again</h3> </div>`))
        }) 
                     
             
        
        
    })
   
    
    
})