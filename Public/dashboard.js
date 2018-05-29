$('.startButton').click(e => {
e.preventDefault();
console.log('clicked')
let currentDate = Date.now()
console.log(currentDate);

let timeElapsed = currentDate - Date.now();



})



$('.commitButton').click(e => {
    e.preventDefault();
    console.log('clicked 2')
    })
    
    