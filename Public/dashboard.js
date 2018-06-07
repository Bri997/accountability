$('.startButton').click(e => {
e.preventDefault();
console.log('clicked')
let currentDate = Date.now()
console.log(currentDate);

let timeElapsed = currentDate - Date.now();



})



$('.commitButton').click(e => {
    e.preventDefault();
    let taskName = $('#taskName').val()
    let hours = $('#hours').val()
   fetch ("http://localhost:8080/task/", {
       body: JSON.stringify({
        "taskName": taskName,
        "timeCommit": hours
       }),
       method: "post",
       headers: {
               'content-type': 'application/json'
      },
       

       
   })
   .then(response => response.json())
   .then(task => {
      $('.displayData').append(`<div> ${task.name}</div><div> ${task.timeCommit} <button class = "deleteButton" type="button">Remove</button> </div>`)
   })

    })
    

$('.getMyTasks').click(e => {
    e.preventDefault();
    

    fetch ('/task', {
        method: "get",
        headers: {
            'content-type': 'application/json'
        }
      
    })
    .then(response => response.json())
    .then(tasks => {
      console.log(tasks)
      for(i = 0; i < tasks.length; i++){
        $('.displayData').append(`
        <div> ${tasks[i].name}</div>
            <div> ${tasks[i].timeCommit} 
            <button data-id = "${tasks[i]._id}"class = "deleteButton" type="button">Remove</button> 
            </div>`)
      }
      
    })

})
    
$('.displayData').on("click", ".deleteButton", e => {
    e.preventDefault();
    const id = $(e.target).data("id")
    console.log(id);

    fetch (`/task/${id}`, {
        method: "delete",
        headers: {
            'content-type': 'application/json'
        }
      
    })
    .then(res => {})
  
})