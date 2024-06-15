import { useEffect, useRef } from "react";

export default function Adamtuto() {
    const canvasRef = useRef(null);

    let player = {
        x: 50,
        y: 50,
        widthAndHeight: 10,
        velocity: 5,
        color: 'red'
    };

    let controller = {
        index: 0,
        up: false,
        down: false,
        left: false,
        right: false
    };


    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        function setupCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            player.widthAndHeight = (player.widthAndHeight * canvas.width) / 100;
            player.velocity = (player.velocity * canvas.width) / 100;

            player.x = canvas.width / 2 - player.widthAndHeight / 2;
            player.y = canvas.height / 2 - player.widthAndHeight / 2;
        }

        setupCanvas();

        window.addEventListener('resize', () => {
            setupCanvas();
        });

        window.addEventListener('gamepadconnected', (event) => {
            controller.index = event.gamepad.index;
            console.log('Gamepad connected: ', controller.index);
        });

        window.addEventListener('gamepaddisconnected', (event) => {
            controller.index = null;
            console.log('Gamepad disconnected: ', controller.index);
        });


        function clearScreen() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }

        function drawPlayer() {
            ctx.fillStyle = player.color;
            ctx.fillRect(player.x, player.y, player.widthAndHeight, player.widthAndHeight);
        }

        function movePlayer() {
            if (controller.up) player.y -= player.velocity;
            if (controller.down) player.y += player.velocity;
            if (controller.left) player.x -= player.velocity;
            if (controller.right) player.x += player.velocity;
            if (player.x < 0) player.x = 0;
            if (player.x > canvas.width - player.widthAndHeight) player.x = canvas.width - player.widthAndHeight;
            if (player.y < 0) player.y = 0;
            if (player.y > canvas.height - player.widthAndHeight) player.y = canvas.height - player.widthAndHeight;
        }

        function controllerInput() {
            const gamepad = navigator.getGamepads()[controller.index];
            if (gamepad) {

                controller.up = gamepad.buttons[12].pressed;
                controller.down = gamepad.buttons[13].pressed;
                controller.left = gamepad.buttons[14].pressed;
                controller.right = gamepad.buttons[15].pressed;


                const stickDeadZone = 0.15;
                const leftRightValue = gamepad.axes[0];
                const upDownValue = gamepad.axes[1];
                if (leftRightValue >= stickDeadZone) {
                    controller.right = true;
                }
                else if (leftRightValue <= -stickDeadZone) {
                    controller.left = true;
                }

                if (upDownValue >= stickDeadZone) {
                    controller.down = true;
                }
                else if (upDownValue <= -stickDeadZone) {
                    controller.up = true;
                }
            }
        }

        function gameLoop() {
            clearScreen();
            drawPlayer();
            movePlayer();
            controllerInput();
            requestAnimationFrame(gameLoop);
        }

        gameLoop();

        return () => {
            window.removeEventListener('resize', setupCanvas);
        };
    }, []);

    return (

        <div className="App">

            <canvas ref={canvasRef}>

            </canvas>
        </div>
    );
}