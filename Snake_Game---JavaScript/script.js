const canvas = document.querySelector('#screen')
const button = document.querySelector('button')
const placar = document.querySelector('p')
const ctx = canvas.getContext('2d')

let bite
let timer
let score
let speed
let keyPressed

bite = new Audio('bite.mp3')
button.addEventListener('click', startGame)

const snake = {
    tail: [],
    direction: '',
    head_color: '#008800',
    tail_color: '#00AA00',

    //Snake random starting position
    head_x: Math.round(Math.random()*(canvas.width-1)),
    head_y: Math.round(Math.random()*(canvas.height-1)),

    //Used for restart game
    resetSnake: function()
    {
        this.tail = []
        this.direction = ''
        this.head_x = Math.round(Math.random()*(canvas.width-1)),
        this.head_y = Math.round(Math.random()*(canvas.height-1))
    },

    createTail: function()
    {
        let obj = {
            x: 0,
            y: 0,
        }
        switch(keyPressed)
        {
            case 'ArrowUp':
                obj.x = this.head_x 
                obj.y = this.head_y + (this.tail.length + 1)
                break
            case 'ArrowDown':
                obj.x = this.head_x 
                obj.y = this.head_y - (this.tail.length + 1)
                break
            case 'ArrowRight':
                obj.x = this.head_x - (this.tail.length + 1) 
                obj.y = this.head_y
                break
            case 'ArrowLeft':
                obj.x = this.head_x + (this.tail.length + 1)
                obj.y = this.head_y
                break                
        }
        this.tail.push(obj)
    },

    moveTail: function()
    {
        if(this.tail.length > 0)
        {
            for(let j = (this.tail.length - 1); j > 0; j--)
            {
                this.tail[j].x = this.tail[j-1].x
                this.tail[j].y = this.tail[j-1].y 
            }
            this.tail[0].x = this.head_x
            this.tail[0].y = this.head_y
        }
    }
}

const fruit = {
    color: 'red',
    //Fruit random starting position
    x: Math.round(Math.random()*(canvas.width-1)),
    y: Math.round(Math.random()*(canvas.height-1)),

    moveFruit: function(){
        this.x = Math.round(Math.random()*(canvas.width-1))
        this.y = Math.round(Math.random()*(canvas.height-1))
    }
}

const snakeMoves = {
    ArrowUp()
    {
        snake.moveTail()
        snake.head_y--
        if(snake.head_y < 0) snake.head_y = canvas.height-1
    },

    ArrowDown()
    {
        snake.moveTail()
        snake.head_y++  
        if(snake.head_y == canvas.height) snake.head_y = 0
    },

    ArrowLeft()
    {
        snake.moveTail()
        snake.head_x--
        if(snake.head_x < 0) snake.head_x = canvas.width-1
    },

    ArrowRight()
    {
        snake.moveTail()
        snake.head_x++
        if(snake.head_x == canvas.width) snake.head_x = 0
    },

    Space()
    {
        clearInterval(timer)
    }
}

//Set initial values for a game
function startGame()
{
    clearInterval(timer)
    score = 0
    speed = 100
    keyPressed = ''
    fruit.moveFruit()
    snake.resetSnake()
    timer = setInterval(game, speed)
    document.addEventListener('keydown', ()=>keyPressed = event.code)    
}

//Game loop
function game()
{
    if(snakeMoves[keyPressed]) snakeMoves[keyPressed]()
    fruitCollision()
    placar.innerHTML = `Pontos: ${score}`
    snakeCollision()
    render()
}

//Test collision between snake head and fruit
function fruitCollision()
{
    if(snake.head_x == fruit.x && snake.head_y == fruit.y)
    {
        snake.createTail()
        fruit.moveFruit()
        bite.play()
        score++
    }
}

//Test collision between snake head and snake body
function snakeCollision()
{
    for(part of snake.tail)
    {
        if(part.x == snake.head_x && part.y == snake.head_y)
        {
            clearInterval(timer)
            placar.innerHTML = `Fim de jogo! Parabéns pelos ${score} pontos.`
        }
    }
}

//Render graphics on canvas
function render()
{
    //Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = fruit.color

    //Render fruit
    ctx.fillRect(fruit.x, fruit.y, 1, 1)
    ctx.fillStyle = snake.head_color

    //Render snake head
    ctx.fillRect(snake.head_x, snake.head_y, 1, 1)
    ctx.fillStyle = snake.tail_color

    //Render snake tail
    for(part of snake.tail) ctx.fillRect(part.x, part.y, 1, 1)
}