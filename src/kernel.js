import image from "../assets/img/player.png";
/**
 *
 * @param {HTMLCanvasElement} canvas
 */
export const render = (canvas) => {
  const ctx = canvas.getContext("2d");
  const playerImage = new Image();
  playerImage.src = image;

  canvas.width = window.innerWidth - 20;
  canvas.height = window.innerHeight - 20;
  const state = {
    pos: {
      x: 0,
      y: 0
    },
    velocity: 0,
    acceleration: 0,
    direction: 0,
    keysPressed: {}
  };

  window.getState = () => state;

  document.addEventListener("keyup", (e) => {
    state.keysPressed[e.key] = false;
  });

  document.addEventListener("keydown", (e) => {
    state.keysPressed[e.key] = true;
  });

  const drawCar = (degrees) => {
    const { x, y } = state.pos;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((degrees * Math.PI) / 180);

    ctx.drawImage(
      playerImage,
      -playerImage.width / 2 + x / 1000,
      -playerImage.height / 2 + y / 1000
    );

    ctx.restore();
  };

  const tick = () => {
    state.acceleration = decrease(state.acceleration, 4);
    state.velocity = decrease(state.velocity, 50);

    if (state.keysPressed.ArrowLeft) {
      state.direction -= 3;
    }
    if (state.keysPressed.ArrowRight) {
      state.direction += 3;
    }
    if (state.keysPressed.ArrowUp) {
      state.acceleration -= 5;
    }
    if (state.keysPressed.ArrowDown) {
      state.acceleration += 5;
    }

    state.velocity += state.acceleration * 5;
    state.pos.y += state.velocity;

    const { x, y } = state.pos;
    drawCar(state.direction);
    window.requestAnimationFrame(tick);
  };

  window.requestAnimationFrame(tick);
};

const decrease = (number, unit = 1) => {
  const numberAbs = Math.abs(number);
  if (!number || numberAbs < unit) {
    return 0;
  }

  const result = numberAbs - unit;
  return number > 0 ? result : -result;
};
