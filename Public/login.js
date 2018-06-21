$(function(){

    $(".logIn").on('click', function(e) {
        e.preventDefault()
        
        let email = $(".logInEmail").val()
        let clientPassword = $(".logInPassword").val()
       
                     
             
        console.log(email, clientPassword) 
        
    })
    
    
})