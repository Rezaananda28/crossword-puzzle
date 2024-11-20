var currentTextInput;
var puzzelArrayData;

// Loads the Crossword
function initializeScreen() {
  var puzzelTable = document.getElementById("puzzel");
  puzzelArrayData = preparePuzzelArray();
  for (var i = 0; i < puzzelArrayData.length; i++) {
    var row = puzzelTable.insertRow(-1);
    var rowData = puzzelArrayData[i];
    for (var j = 0; j < rowData.length; j++) {
      var cell = row.insertCell(-1);
      if (rowData[j] != 0) {
        var txtID = String("txt" + "_" + i + "_" + j);
        cell.innerHTML =
          '<input type="text" class="inputBox" maxlength="1" style="text-transform: lowercase" ' +
          'id="' +
          txtID +
          '" onfocus="textInputFocus(\'' +
          txtID +
          '\')" oninput="checkAnswers()">';
      } else {
      }
    }
  }
  addHint();
  document.getElementById("lanjutkanBtn").disabled = true; // Initially disabled
}

function addHint() {
  document.getElementById("txt_0_10").placeholder = "1";
  document.getElementById("txt_1_0").placeholder = "2";
  document.getElementById("txt_1_3").placeholder = "3";
  document.getElementById("txt_3_7").placeholder = "4";
  document.getElementById("txt_6_0").placeholder = "5";
  document.getElementById("txt_4_5").placeholder = "6";
}

function textInputFocus(txtID123) {
  currentTextInput = txtID123;
}

function preparePuzzelArray() {
  return [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "J", 0, 0],
    ["P", "H", "Y", "S", "I", "C", "A", "L", "T", "O", "U", "C", "H"],
    [0, 0, 0, "C", 0, 0, 0, 0, 0, 0, "M", 0, 0],
    [0, 0, 0, "O", 0, 0, 0, "B", "E", "G", "A", "W", "A", "N"],
    [0, 0, 0, "R", 0, "C", 0, 0, 0, 0, "T", 0, 0],
    [0, 0, 0, "P", 0, "A", 0, 0, 0, 0, 0, 0, 0],
    ["D", "U", "R", "I", "A", "N", 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, "O", 0, "T", 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, "I", 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, "K", 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
}

// Clear All Button
function clearAllClicked() {
  currentTextInput = "";
  var puzzelTable = document.getElementById("puzzel");
  puzzelTable.innerHTML = "";
  initializeScreen();
}

// Check if all answers are correct
function checkAnswers() {
  var allCorrect = true;
  for (var i = 0; i < puzzelArrayData.length; i++) {
    var rowData = puzzelArrayData[i];
    for (var j = 0; j < rowData.length; j++) {
      if (rowData[j] != 0) {
        var inputElement = document.getElementById("txt_" + i + "_" + j);
        var correctAnswer = puzzelArrayData[i][j].toLowerCase();
        var userAnswer = inputElement.value.toLowerCase();

        if (userAnswer !== correctAnswer) {
          // Jika jawaban salah, kosongkan input dan ubah warna latar belakang
          inputElement.value = "";
          inputElement.style.backgroundColor = "#FFCCCC"; // Warna latar belakang merah muda untuk salah
        } else {
          // Jika jawaban benar, beri latar belakang biru
          inputElement.style.backgroundColor = "#ADD8E6"; // Warna latar belakang biru untuk benar
        }
      }
    }
  }

  // Menonaktifkan atau mengaktifkan tombol lanjutkan
  var allCorrect = true;
  for (var i = 0; i < puzzelArrayData.length; i++) {
    for (var j = 0; j < puzzelArrayData[i].length; j++) {
      if (puzzelArrayData[i][j] != 0) {
        var inputElement = document.getElementById("txt_" + i + "_" + j);
        var correctAnswer = puzzelArrayData[i][j].toLowerCase();
        if (inputElement.value.toLowerCase() !== correctAnswer) {
          allCorrect = false;
          break;
        }
      }
    }
  }
  document.getElementById("lanjutkanBtn").disabled = !allCorrect; // Enable/disable "Lanjutkan" button
}
