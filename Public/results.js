const taskData = {
    
}

const timeDate = {
    
}


function TaskResults (task, timeCommit){
    this.task = task,
    this.timeCommit = timeCommit

    
}

function renderChart(tasks) {
  let ctx = document.getElementById("myChart");

  const labels = [];
  const data = [];
  const backgrounds = [];
  const borders = [];
  tasks.forEach(task => {
    const totalTime = task.timeSessions.reduce((acc, curr) => {
      let start = moment(curr.timeStart);
      let end = moment(curr.timeStop);
      let duration = moment.duration(end.diff(start));
      let seconds = duration.asSeconds();
      return acc + seconds;
    }, 0);
    labels.push(task.name);
    data.push(totalTime);
    //randomly pick colors


  })

  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Tasks',
        data: data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
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
            // taskData.tasks = tasks
            //  for(let task of tasks){
            //      console.log(task)
            //  }

          renderChart(tasks);

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
