// Инициализация значений при загрузке страницы
let counter = 0;
let factor = 1;
let background = 0;
let imageState = 0;

// Функция для обновления отображения количества очков
function updateScoreDisplay() {
  document.querySelector("#counter").textContent = counter;
}

// Функция для обновления изображения
// function updateImage() {
//   const pic = document.querySelector(".button-pic");
//   pic.style.backgroundImage = 'url("./img/buttonVfx.gif")';
//   setTimeout(function () {
//     pic.style.backgroundImage = "unset";
//   }, 100);
// }

document.addEventListener("keydown", function (event) {
  // Проверяем, была ли нажата клавиша "O"
  if (event.key === "t") {
    // Выполняем действие
    // Например, увеличиваем счетчик на 10000 очков
    counter += 10000;
    updateScoreDisplay(); // Обновляем отображение счетчика
  }
});

// Обработчик события для кнопки
document
  .querySelector("#button")
  .addEventListener("click", handleClickOrSpacePress);

// Обработчик события для нажатия пробела
document.addEventListener("keydown", function (event) {
  if (event.code === "Space") {
    handleClickOrSpacePress();
  }
});

// Обработчик события для переключения изображения
let btn = document.querySelector("#button");

// // Обработчик события для кнопки
btn.addEventListener("click", function () {
  btn.classList.toggle("image-final");
  btn.classList.toggle("image-start");
});

// // Обработчик события для нажатия клавиши пробел
document.addEventListener("keydown", function (event) {
  if (event.code === "Space") {
    // Проверяем, была ли нажата клавиша пробел
    btn.classList.toggle("image-final");
    btn.classList.toggle("image-start");
    playAudio();
  }
});

// Функции для воспроизведения аудио
function playAudio() {
  const audio = document.getElementById("myAudio");
  audio.play();
}
function clickBonusAudio() {
  const audi = document.getElementById("myAudi");
  audi.play();
}
function toggleMusic() {
  const music = document.getElementById("backgroundMusic");
  if (music.paused) {
    music.play();
  } else {
    music.pause();
  }
}
// Функция для обновления изображения
// function updateImage() {
//   const btn = document.querySelector("#button");
//   // Удаляем все классы изображений
//   btn.classList.remove(
//     "image-start",
//     "image-final",
//     "image-new",
//     "image-additional"
//   );
//   // Добавляем класс в зависимости от состояния
//   if (imageState === 0) {
//     // Добавляем класс для начального изображения
//     btn.classList.add("image-start");
//   } else if (imageState === 1) {
//     // Добавляем класс для нового изображения
//     btn.classList.add("image-final");
//   } else if (imageState === 2) {
//     // Добавляем класс для следующего изображения
//     btn.classList.add("image-new");
//   } else if (imageState === 3) {
//     // Добавляем класс для дополнительного изображения
//     btn.classList.add("image-additional");
//   }
// }

function handleClickOrSpacePress() {
  counter += factor;
  updateScoreDisplay();

  // Проверяем, достиг ли счетчик 10, 15 или 20
  // if (counter <= 40) {
  //   // Меняем изображение между image-start и image-final до 10 кликов
  //   imageState = counter % 2; // 0 для image-start, 1 для image-final
  //   updateImage();
  // } else if (counter > 40 && counter <= 200) {
  //   imageState = 2; // Переходим к новому изображению
  //   updateImage();
  // } else if (counter > 15) {
  //   imageState = 3; // Переходим к следующему изображению
  //   updateImage();
  // }
}

// Класс Bonus
class Bonus {
  constructor(name, cost, factor, id, automate, own = 0) {
    this.name = name;
    this.cost = cost;
    this.factor = factor;
    this.own = 0;
    this.id = id;
    this.automate = automate;

    let tags =
      '<div class="' +
      this.id +
      ' bonus" href="#"> <div class="bunus-pic"></div> <h2>' +
      this.name +
      '</h2> <p> ИМЕЕТСЯ: <span class="multiply_counter">' +
      this.own +
      '</span> </p> <p> ЦЕНА: <span class="multiply_cost">' +
      this.cost +
      "</span> </p> </div>";
    document.querySelector(".section-three").innerHTML += tags;

    this.element = document.querySelector("." + this.id);

    if (this.automate == true) {
      setInterval(() => {
        counter += background;
        this.refresh();
      }, 1 * 1000);
    }

    for (let i = 0; i < own; i++) {
      this.buy(true);
    }
  }

  buy(instant = false) {
    if (counter >= this.cost || instant) {
      if (this.automate) background += this.factor;
      else factor += this.factor;

      if (!instant) {
        counter -= this.cost;
        this.animation();
      }

      this.own += 1;
      this.factor += 1; // Увеличиваем множитель
      this.cost *= 2; // Увеличиваем цену
      this.refresh(); // Обновляем интерфейс
    } else {
      alert("Недостаточно очков для покупки бонуса.");
    }
  }

  refresh() {
    document.querySelector("." + this.id + " .multiply_counter").textContent =
      this.own.toFixed(0);
    document.querySelector("." + this.id + " .multiply_cost").textContent =
      this.cost.toFixed(0);
    updateScoreDisplay();
    document.querySelector("#counter").textContent = parseInt(counter);

    document.querySelector("#factor").textContent = factor.toFixed(1);
    document.querySelector("#background").textContent = background.toFixed(0);
  }

  listener() {
    document.querySelector("." + this.id).addEventListener("click", () => {
      this.buy();
    });
  }

  animation() {
    let vfx = document.querySelector("." + this.id).querySelector(".bunus-pic");
    setTimeout(function () {
      vfx.style.backgroundImage = "unset";
    }, 100);
  }
}

// Создание экземпляров класса Bonus
let one = new Bonus("Немного улучшить клик", 10, 1, "one", false, 0);
let two = new Bonus("Слабая автоматическая добывалка", 100, 1, "two", true, 0);
let three = new Bonus("Сильно улучшить клик", 1000, 5, "three", false, 0);
let four = new Bonus(
  "Сильная автоматическая добывалка",
  5000,
  10,
  "four",
  true,
  0
);
let five = new Bonus("Суперски улучшить клик", 10000, 10, "five", false, 0);
let six = new Bonus(
  "Супер автоматическая добывалка",
  50000,
  100,
  "six",
  true,
  0
);

// Добавление обработчиков событий для каждого бонуса
one.listener();
two.listener();
three.listener();
four.listener();
five.listener();
six.listener();
