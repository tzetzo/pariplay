<!DOCTYPE html>
<html>
    <head>
        <title>pariplay snake</title>
        <style>
            * {padding: 0; margin: 0}
			body {overflow: hidden; }
			html {
				background: #1e1f21;
			}
			#game, #gameover {
				margin: 0 auto;
				background: #252729;
				width:960px;
				height:950px;
			}
            #gameover{
                display:none;
            }
			.intro {
				position:absolute;
				left:50%;
				top:50%;
				transform:translate(-50%,-50%);
				background-color: #424651;
				width:800px;
				height:450px;
				border: 12px solid #333;
				border-radius: 15px;
				z-index: 1331;
			}
			#start, #stop {
				position:absolute;
				left:50%;
				top:50%;
				transform:translate(-50%,-50%);
				background-color: #9AAC82;
				color:white;
				cursor: pointer;
				width:350px;
				height:65px;
				font-size: 32px;
				text-align:center;
				line-height:100%;
				border-radius: 5px;
			}
            #stop {
                background:red;
                cursor:default;
            }
			#start>span, #stop>span {
				position:absolute;
				left:50%;
				top:50%;
				transform:translate(-50%,-50%);
			}
		</style>
    </head>
    <body>
        <div id="game"><div class="intro"><div id="start"><span>Start Game</span></div></div></div>
        <div id="gameover"><div class="intro"><div id="stop"><span>Game Over</span></div></div></div>
        
        <script src="./js/pixi.min.js"></script>
        <script src="./js/config.js?<?php echo time(); ?>"></script>
        <script src="./js/snake.js?<?php echo time(); ?>"></script>
        <script src="./js/app.js?<?php echo time(); ?>"></script>    
    </body>
</html>