const square = document.querySelectorAll('.square')
const henry = document.querySelectorAll('.henry')
const timeLeft = document.querySelector('#time-left')
let score = document.querySelector('#score')

let result = 0
let currentTime = timeLeft.textContent

function randomSquare() {
    square.forEach(className => {
        className.classList.remove('henry');
    })

    let randomPosition = square[Math.floor(Math.random() * 9)]
    randomPosition.classList.add('henry')

    //assigns id of randomPosition to hitPosition for later
    hitPosition = randomPosition.id 
}

square.forEach(id => {
    id.addEventListener('mouseup', () => {
        if (id.id === hitPosition) {
            result = result + 1
            score.textContent = result

            //clears square after point
            square.forEach(className => {
                className.classList.remove('henry');
            })
        }
    })
})

function moveHenry () {
    let timerId = null
    timerId = setInterval(randomSquare, 1000)
}
moveHenry()
 
function countDown () {
    currentTime--
    timeLeft.textContent = currentTime
    if (currentTime === 0) {
        clearInterval(timerId)
        alert('GAME OVER! Your final score is: ' + result)
    }    
}

let timerId = setInterval(countDown, 1000)