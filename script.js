const words = [
  "VASARA", "ZIEMA", "SUNS", "DATORS", "KAĶIS", "LIETUS", "VIRTUVE", "EKSĀMENS", "NEGAISS"
];

const word = words[0].split("");
const wordContainer = document.querySelector(".word-container");
const checkButton = document.getElementById("check");
const message = document.getElementById("message");

let attemptLeft = 5;

// jāizveido klucīši
function createInputFields() {
  for (let i = 0; i < word.length; i++) {
    const inputField = document.createElement("input");
    inputField.classList.add("input-field"); // mainīgais veidots dinamiski
    inputField.maxLength = 1;
    wordContainer.appendChild(inputField);
  }
}

createInputFields();

// par krāsām..
function krasas(cells, colorClass) {
  for (const cell of cells) {
    cell.classList.add(colorClass);
  }
}

// f-ija, kas pārbauda
function checkAnswer() {
  const inputFields = document.querySelectorAll(".input-field");
  let correctCount = 0;

  if (attemptLeft > 0) { // tad ir veikts pirmais mēģinājums, attiecīgi varam samazināt par vienu
    attemptLeft--;

    inputFields.forEach((inputField, index) => {
      const letter = inputField.value.toUpperCase();

      if (letter === word[index]) {
        inputField.classList.add("green");
        correctCount++;
      } else if (word.includes(letter)) {
        inputField.classList.add("yellow");
      }
    });
    if (correctCount === word.length) {
      krasas(inputFields, "green");
      message.textContent = "Pareizi!";
      checkButton.disabled = true;
    } else {
      if (attemptLeft === 0) {
        krasas(inputFields, "yellow");
        message.textContent = "Zaudējāt!";
        checkButton.disabled = true;
      } else {
        message.textContent = `Daļēji pareizi. Jums atlikuši ${attemptLeft} mēģinājumi`;
      }
    }
  }
}

//klausītāji
checkButton.addEventListener("click", checkAnswer);
