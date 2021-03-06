const data = {};
let user = {};




const fetchTask = () => {
    return fetch('/task', {
        method: "get",
        headers: {
            'content-type': 'application/json',
            'x-auth-token': token
        }
    })
    .then(response => response.json())
    .then(tasks => {
        data.tasks = tasks;
    })
}

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

const render = () => {
    $('.displayData').empty();
    if (data.tasks) {
    const tasks = data.tasks;

        
    tasks.forEach(task => {

        let firstLetter = task.name.charAt(0).toUpperCase()
        let remaining = task.name.slice(1)
        let displayTask = `${firstLetter}${remaining}`



        const totalTime = task.timeSessions.reduce((acc, curr) => {
            let start = moment(curr.timeStart);
            let end = moment(curr.timeStop);
            let duration = moment.duration(end.diff(start));
            let milliseconds = duration.asMilliseconds();
            return acc + milliseconds;
        }, 0);
        
        const openSessions = task.timeSessions.filter(session => !session.timeStop) 
        let buttons = ""
        let timers = [];
        if(openSessions.length > 0){
            buttons = openSessions
            .map(session => {
              let seconds = moment.duration(moment().diff(moment(session.timeStart))).asSeconds();
              timers.push({
                id: "timer_" + session._id,
                seconds: seconds
              });
              return `<div>
                  <div id="timer_${session._id}"></div>
<button data-id = "${session._id}" data-taskid = "${task._id}" class = "stopButton" type = "button"> Stop </button>

</div>`
            }).join('')}
        else {buttons = `<button data-id = "${task._id}" class = "startButton" type = "button"> Start </button>`}

        $('.displayData').append(`
        <div class = "task">
        <h1> ${displayTask}</h1>
        <h2> ${task.timeCommit} Hours</h2>
        <button data-id = "${task._id}" class = "deleteButton" type = "button">Remove </button>
        ${buttons}
        
        <h3>Total Time: ${moment.utc(totalTime).format("HH: mm: ss")}</h3>
            </div>`);

        //start the timers
      timers.forEach(timer => {
        $(`#${timer.id}`).timer({
          seconds: timer.seconds,
          format: "%h:%M:%S"
        });
      });
    })
 }   
}




$(function (){
    fetchTask()
    .then(()=> {
        render();
    })
    fetchUser()
})

$('.startButton').click(e => {
e.preventDefault();

let currentDate = Date.now()


let timeElapsed = currentDate - Date.now();

})



$('.commitButton').click(e => {
    e.preventDefault();
    let taskName = $('#taskName').val()
    
    let hours = $('#hours').val()
    
    if(!taskName || !hours){
        $('.errorMessage').html("Please input a task and hours")
    }
    else{
        fetch ("/task", {
        body: JSON.stringify({
            "taskName": taskName,
            "timeCommit": hours
        }),
        method: "post",
        headers: {
                'content-type': 'application/json',
                'x-auth-token': token

        },
       

       
    })
   
   .then(response => response.json())
   .then(task => {
       data.tasks.push(task)
   })
   .then(() => {
       render()
       $('#taskName').val("")
       $('#hours').val("")
       $('.errorMessage').html('')
        })
    }

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
    const taskId = $(e.target).data("taskid")
    


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


$(".logOut").on('click', function(e) {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    window.location = "/"
})



