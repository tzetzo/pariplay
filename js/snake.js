Game = (function() { 
    
    var game ={};
    
        var app;
        var snake;
        var food;
        var previous_segments = [];
        var previous_nut = [];
        var score_message;
        var level_message;
    
        var w;
        var h;
        var score;
        var level;
        var snakeSize;
        var direction;
        var speed;
        var initialLength;
    
    game.setVars = function(){
        w = config.w;
        h = config.h;
        score = config.score;
        level = config.level;
        snakeSize = config.snakeSize;
        direction = config.direction;
        speed = config.speed;
        initialLength = config.initialLength;
    }
    
    function createSnakeArray() { 
        snake = [];
        for (var i = initialLength; i>=0; i--) {
            snake.push({x:i, y:0});
        }  
    }
    function drawSnake(x, y) {
        let rectangle = new PIXI.Graphics();
        rectangle.lineStyle(1, 0x0099ff, 1);
        rectangle.beginFill(0x0099ff);
        rectangle.drawRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
        rectangle.endFill();
        rectangle.x = 20;  //sets how much from upper left corner to offset when counting
        rectangle.y = 20;  
        app.stage.addChild(rectangle);
        previous_segments.push(rectangle);
    }
    
    function createNutObj() { 
        food = {
            x: Math.floor((Math.random() * 60) + 1),
            y: Math.floor((Math.random() * 60) + 1)
        }
    }
    function drawNut(x, y) {
        let nut = new PIXI.Graphics();
        nut.beginFill(0xff9933);
        nut.drawCircle(x*snakeSize, y*snakeSize, snakeSize/2);
        nut.endFill();
        nut.x = 20;    
        nut.y = 20;    
        app.stage.addChild(nut);
        previous_nut.push(nut);
    }

    function scoreText() { 
        let style = new PIXI.TextStyle({
            fontFamily: "Arial",
            fontSize: 36,
            fill: "white",
            stroke: '#ff3300',
            strokeThickness: 4,
            dropShadow: true,
            dropShadowColor: "#000000",
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6,
        });
        score_message = new PIXI.Text("Score: " + score, style);
        score_message.position.set(20, h-60);
        app.stage.addChild(score_message);
    }

    function scoreLevel() { 
        let style = new PIXI.TextStyle({
            fontFamily: "Arial",
            fontSize: 36,
            fill: "white",
            stroke: '#ff3300',
            strokeThickness: 4,
            dropShadow: true,
            dropShadowColor: "#000000",
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6,
        });
        level_message = new PIXI.Text("Level: " + level, style);
        level_message.position.set(w - 170, h-60);
        app.stage.addChild(level_message);
    }

    function checkCollision(x, y, array) { 
        for(var i = 0; i < array.length; i++) {
            if(array[i].x < x + 0.01 && array[i].x > x - 0.01 && array[i].y < y + 0.01 && array[i].y > y - 0.01){   
                return true;
            }
        } 
        return false;
    }

    function recreateSnake(){
            //remove the previously created segments
            for(var i=0; i < previous_segments.length; i++){
                app.stage.removeChild(previous_segments[i]);
            }
            previous_segments.length = snake.length;

            //create snake
            for(var i = 0; i < snake.length; i++) {
                drawSnake(snake[i].x, snake[i].y);
            }
    }
    
    game.init = function(){

        app = new PIXI.Application({ width: w, height: h });
       
        document.body.appendChild(app.view);
        
        //draw the border
        let border = new PIXI.Graphics();
        border.lineStyle(5, 0xFF3333, 1);
        border.drawRect(0, 0, w - 20, h - 20);
        border.endFill();
        border.x = 10;
        border.y = 10;
        app.stage.addChild(border);
        
        createSnakeArray();
        //create snake
        for (var i = 0; i < snake.length; i++) {
            drawSnake(snake[i].x, snake[i].y);
        }
        
        //create food
        createNutObj();
        drawNut(food.x, food.y);
        
        scoreText();
        scoreLevel();
        
        app.ticker.add(function(){

            var snakeX = snake[0].x;
            var snakeY = snake[0].y;

            if (direction == 'right') {
                snakeX=snakeX + speed;
            } else if (direction == 'left') {
                snakeX=snakeX - speed;
            } else if (direction == 'up') {
                snakeY=snakeY - speed;
            } else if (direction == 'down') {
                snakeY=snakeY + speed;
            }

            //check if snake touches the borders or itself and end game
            if (snakeX < -1 || snakeX > w/snakeSize-4 || snakeY < -1 || snakeY > h/snakeSize-4 || checkCollision(snakeX, snakeY, snake)) {
                document.getElementById("gameover").style.display = "block";
                return;
            }

            //check if snake touched the food and add additional segment to its tail; otherwise move the last segment and put it first
            if (snakeX < food.x + 1.5 && snakeX > food.x - 1.5 && snakeY < food.y + 1.5 && snakeY > food.y - 1.5 ) {
                //new piece for the tail
                var tail = {
                    x: snakeX,
                    y: snakeY
                };
                score++;
                if(score===5){
                    score=0;
                    level++;
                    level_message.text = "Level: " + level;
                    //increase the speed for next level
                    speed = speed + 0.1;
                }
                score_message.text = "Score: " + score;

                //delete the eaten nut;make sure none is left
                for(var i=0,j=previous_nut.length;i<j;i++){
                    app.stage.removeChild(previous_nut[i]);
                }
                previous_nut.length=0;

                //create new nut
                createNutObj();
                //create new nut
                setTimeout(function(){
                    drawNut(food.x,food.y);
                },1000);
            } else { 
                //pop out the last cell
                var tail = snake.pop();
                tail.x = snakeX;
                tail.y = snakeY;
            }

            //pu the tail as the first cell
            snake.unshift(tail);

            recreateSnake();

        });
    }
    
    document.onkeydown = function (event) {

        keyCode = window.event.keyCode;
        keyCode = event.keyCode;

        switch (keyCode) {

        case 37:
            if (direction != 'right') {
                direction = 'left';
            }
            break;

        case 39:
            if (direction != 'left') {
                direction = 'right';
            }
            break;

        case 38:
            if (direction != 'down') {
                direction = 'up';
            }
            break;

        case 40:
            if (direction != 'up') {
                direction = 'down';
            }
            break;
        }
    }

    return game;
      
}());