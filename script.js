const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreContainer = document.getElementById("score");
const messageContainer = document.getElementById("message-log");
const restartButton = document.getElementById("restart-button");

const gridSize = 20;
const canvasSize = 460;
canvas.width = canvasSize;
canvas.height = canvasSize;

let snake = [{ x: 200, y: 200 }];
let direction = { x: 0, y: 0 };
let food = getRandomFoodPosition();
let score = 0;

const messages = [
  "É atribuição da EFAPE qualificar os profissionais da educação da rede pública estadual de São Paulo e das redes municipais de educação do estado de São Paulo, por meio do desenvolvimento de programas de formação continuada.",
  "Missão: Promover o desenvolvimento para que possam desempenhar suas atividades com maior eficiência, eficácia e efetividade.",
  "Excelência:  Construir e realizar atividades de formação continuada que possibilitem o desenvolvimento dos saberes científicos, filosóficos, sociológicos, antropológicos, históricos, entre outros.",
  "O Programa visa estimular práticas reflexivas, colaborativas e investigativas.",
  "Inovação e proatividade: Atuar com criatividade e flexibilidade, estar aberto ao novo, propor diferentes caminhos e estratégias, por meio de novas ideias, visando à melhoria dos processos de trabalho e da oferta de ações formativas.Bônus (Você compreendeu algumas missões e valores do programa).",
  "Programa Multiplica SP #Professores se dará entre Formadores EFAPE, PEC Multiplica, Professores Multiplicadores e Professores Cursistas.",
  "São pilares do Programa Multiplica SP #Professores: Saberes Docentes, Prática Pedagógica e Trabalho Colaborativo.",
  "Os roteiros formativos por componente curricular e etapa de ensino contemplam conteúdos, eixos formativos, temas e estratégias que aprimoram a prática docente no processo do ensino e aprendizagem.",
  "Nos roteiros formativos  há orientações para o formador se preparar como: materiais de apoio, textos, apresentações e dicas para uso e adaptação das atividades, de modo que elas possam ser aplicadas em diferentes contextos escolares.",
  "A observação, a escuta, o diálogo e a devolutiva estão relacionadas às três dimensões: CONHECIMENTO PROFISSIONAL, PRÁTICA PROFISSIONAL E ENGAJAMENTO PROFISSIONAL.Bônus (Você compreendeu algumas missões e valores do programa).",
];

const snakeImages = [new Image(), new Image()];
snakeImages[0].src =
  "https://img.icons8.com/?size=100&id=o8HxTgl8zRsu&format=png&color=000000";
snakeImages[1].src =
  "https://img.icons8.com/?size=100&id=TuTvGSWONOXA&format=png&color=000000";

const foodImage = new Image();
foodImage.src =
  "https://img.icons8.com/?size=100&id=16369&format=png&color=000000";

function getRandomFoodPosition() {
  return {
    x: Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize,
    y: Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize,
  };
}

function drawSnake() {
  snake.forEach((part, index) => {
    const img = snakeImages[Math.floor(Math.random() * snakeImages.length)];
    ctx.drawImage(img, part.x, part.y, gridSize, gridSize);
  });
}

function drawFood() {
  ctx.drawImage(foodImage, food.x, food.y, gridSize, gridSize);
}

function updateSnake() {
  const newHead = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

  if (newHead.x === food.x && newHead.y === food.y) {
    score += 10;
    updateScore();
    food = getRandomFoodPosition();
  } else {
    snake.pop();
  }

  snake.unshift(newHead);
}

function checkCollision() {
  const head = snake[0];

  if (
    head.x < 0 ||
    head.y < 0 ||
    head.x >= canvasSize ||
    head.y >= canvasSize
  ) {
    return true;
  }

  for (let i = 4; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return true;
    }
  }

  return false;
}

function updateScore() {
  scoreContainer.textContent = `Pontuação: ${score}`;
  if (score > 0 && score % 20 === 0) {
    const randomIndex = Math.floor(Math.random() * messages.length);
    const message = messages[randomIndex];
    const messageElement = document.createElement("div");
    messageElement.textContent = message;
    messageContainer.appendChild(messageElement);
    messageContainer.scrollTop = messageContainer.scrollHeight;
  }
}

function gameLoop() {
  if (checkCollision()) {
    alert(
      `Parabéns, não esqueça de tirar o print dos conhecimentos que você adquiriu, compartilhe conosco!!! Sua pontuação: ${score}`
    );
    clearInterval(gameInterval); // Para o jogo
  } else {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFood();
    updateSnake();
    drawSnake();
  }
}

let gameInterval = setInterval(gameLoop, 100);

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      if (direction.y === 0) direction = { x: 0, y: -gridSize };
      break;
    case "ArrowDown":
      if (direction.y === 0) direction = { x: 0, y: gridSize };
      break;
    case "ArrowLeft":
      if (direction.x === 0) direction = { x: -gridSize, y: 0 };
      break;
    case "ArrowRight":
      if (direction.x === 0) direction = { x: gridSize, y: 0 };
      break;
  }
});

restartButton.addEventListener("click", () => {
  snake = [{ x: 200, y: 200 }];
  direction = { x: 0, y: 0 };
  score = 0;
  food = getRandomFoodPosition();
  messageContainer.innerHTML = ""; // Limpa as mensagens ao reiniciar o jogo
  updateScore();
  clearInterval(gameInterval);
  gameInterval = setInterval(gameLoop, 100);
});
