document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div')
    const scoreDisplay = document.querySelector('span')
    const startButton = document.querySelector('.start')

    const width = 10
    //first div in the grid = where to start
    let currentIndex = 0
    let appleIndex = 0
    //all divs with value of 2 will be the head, 0 will be the tail, 1's will be the body parts
    let currentSnake = [2,1,0]
    let direction = 1 //means snake moves 1 div at a time
    let score = 0
    let speed = 0.9
    let intervalTime = 0
    let interval = 0

    //function to start/restart the game
    function startGame() {
        currentSnake.forEach(index => squares[index].classList.remove('snake'))
        squares[appleIndex].classList.remove('apple')
        clearInterval(interval)
        score = 0
        randomApple()
        direction = 1
        scoreDisplay.innerText = score
        intervalTime = 1000
        currentSnake = [2,1,0]
        currentIndex = 0
        currentSnake.forEach(index => squares[index].classList.add('snake'))
        interval = setInterval(moveOutcomes, intervalTime)
    }


//function to deal with ALL move outcomes of the snake - collisions, score, etc

    function moveOutcomes() {
    //if snake hits border or itself
        if (
            (currentSnake[0] + width >= (width * width) && direction === width) || //if snake hits bottom
            (currentSnake[0] % width === width -1 && direction === 1) || //if snake hits right wall
            (currentSnake[0] % width === 0 && direction === -1) || //if snake hits left wall
            (currentSnake[0] - width < 0 && direction === -width) || //if snake hits top
            squares[currentSnake[0] + direction].classList.contains('snake') //if snake hits itself
        ) {
            return clearInterval(interval) //clears interval if any of the above happens
        }

        const tail = currentSnake.pop() //removes last item of the array and shows it 
        squares[tail].classList.remove('snake') //removes class name from tail
        currentSnake.unshift(currentSnake[0] + direction) //gives direction to the head of the snake

    //if snake gets the apple
        if(squares[currentSnake[0]].classList.contains('apple')) {
            squares[currentSnake[0]].classList.remove('apple')
            squares[tail].classList.add('snake')
            currentSnake.push(tail)
            randomApple()
            score++
            scoreDisplay.textContent = score
            clearInterval(interval)
            intervalTime = intervalTime * speed
            interval = setInterval(moveOutcomes, intervalTime)
        }
        squares[currentSnake[0]].classList.add('snake')
    }

    // generate new apple once apple is eaten
    function randomApple() {
        do{
            appleIndex = Math.floor(Math.random() * squares.length)
        } while(squares[appleIndex].classList.contains('snake'))
        squares[appleIndex].classList.add('apple')
    }


    //FUNCTIONS FOR KEYCODES
    function control(e) {
      squares[currentIndex].classList.remove('snake') //we are removing the class of snake from ALL the squares.
  
      if(e.keyCode === 39) {
        direction = 1 //if we press the right arrow on our keyboard, the snake will go right one
      } else if (e.keyCode === 38) {
        direction = -width // if we press the up arrow, the snake will go back ten divs, appearing to go up
      } else if (e.keyCode === 37) {
        direction = -1 // if we press left, the snake will go left one div
      } else if (e.keyCode === 40) {
        direction = +width //if we press down, the snake head will instantly appear in the div ten divs from where you are now
      }
    }

    document.addEventListener('keyup', control)
    startButton.addEventListener('click', startGame)
})