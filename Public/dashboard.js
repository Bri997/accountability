const data = {};


const fetchTask = () => {
    return fetch('/task', {
        method: "get",
        headers: {
            'content-type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(tasks => {
        data.tasks = tasks;
    })
}


const render = () => {
    $('.displayData').empty();
    const tasks = data.tasks;
    tasks.forEach(task => {
        const openSessions = task.timeSessions.filter(session => !session.timeStop) 
        let buttons = ""
        if(openSessions.length > 0){
            buttons = openSessions
            .map(session => 
                `<button data-id = "${session._id}" data-taskId = "${task._id}" class = "stopButton" type = "button"> Stop </button>`
            ).join('')}
        else {buttons = `<button data-id = "${task._id}" class = "startButton" type = "button"> Start </button>`}
        $('.displayData').append(`
        <div class = "task">
        <h1> ${task.name}</h1>
        <h2> ${task.timeCommit}</h2>
        <button data-id = "${task._id}" class = "deleteButton" type = "button">Remove </button>
        ${buttons}
            </div>`)
    })
    
}

//when page loads

$(function (){
    fetchTask()
    .then(()=> {
        render();
    })
})

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
       data.tasks.push(task)
   })
   .then(() => {
       render()
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
    .then(res => {
        let index; // = data.tasks.findIndex(task => task._id === id);
        for(let i = 0; i < data.tasks.length; i++) {
          if(data.tasks[i]._id === id) {
            index = i;
          }
        }
        data.tasks.splice(index, 1);
      })
      .then(() => {
        render();
      })
    
  })
    



$('.displayData').on("click", ".startButton", e => {
    e.preventDefault();
    const id = $(e.target).data("id")
    console.log(id + " startbutton id")

    fetch (`/timesession/${id}`, {
        method: "post",
        headers: {
            'content-type': 'application/json'
        } 
    })
    .then(response => response.json())
    .then((timeSession) => {
        const task = data.tasks.find(task => {
            return task._id == id 
        })
        task.timeSessions.push(timeSession)
        render()
    })
      
})

$('.displayData').on('click', '.stopButton', e => {
    e.preventDefault();
    const id = $(e.target).data("id")
    const taskId = $(e.target).data("taskId")
    console.log(taskId + " stopButton id")


        fetch(`/timesession/${id}`, {
            method: "put",
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(response => response.json())
        .then((timeSession) => {
            const task = data.tasks.find(task => {
                return task._id == taskId
            
            })
        const currentTimeSession = task.timeSessions.find(currentSession => {
            return currentSession._id == id
        })
           currentTimeSession.timeStop = Date.now()
            render()
        })
})