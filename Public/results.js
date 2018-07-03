const taskData = {
    
}

const timeDate = {
    
}




$(".getResults").on("click", function(e){
    console.log('clicked')
     
         fetch('/task', {
            method: "get",
            headers: {
                'content-type': 'application/json',
                'x-auth-token': token
            }
        })
        .then(response => response.json())
        .then(tasks => {
            taskData.tasks = tasks
             for(let task of tasks){
                 console.log(task)
             }

        })
        
    }
    
)





const fetchUser = () => {
    return fetch("/api/users/me", {
        method: "get",
        headers: {
            'content-type': 'application/json',
            'x-auth-token': token
        }
    })
    .then(response => response.json())
    .then(_user => {
        user = _user
        let firstLetter = user.name.charAt(0).toUpperCase()
        let remaining = user.name.slice(1)
        let userName = `${firstLetter}${remaining}`
        $(".welcomeMessage").html(`Hello ${userName}`)
    })
}