$(function(){

    $(".loginSubmit").on('click', function(e) {
        e.preventDefault()
        
        let email = $(".logInEmail").val()
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
        
        .then(response => response.text()) 
        .then(token => {
            localStorage.setItem("token", (token))
            window.location = "/dashboard.html"
        
        })
                     
             
        
        
    })
   
    
    
})