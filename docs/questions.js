// Generalized True/False checking function
function checkTrueFalse(questionId, correctAnswer, correctMessage, incorrectMessage) {
    const options = document.getElementsByName(questionId);
    let selectedValue = null;
  
    for (let i = 0; i < options.length; i++) {
      if (options[i].checked) {
        selectedValue = options[i].value;
        break;
      }
    }
  
    const feedback = document.getElementById(questionId + '-feedback');
  
    if (!selectedValue) {
      feedback.textContent = "Please select an option.";
      feedback.style.color = "red";
      return;
    }
  
    if (selectedValue === correctAnswer) {
      feedback.textContent = correctMessage;
      feedback.style.color = "green";
    } else {
      feedback.textContent = incorrectMessage;
      feedback.style.color = "red";
    }
  }


// Generalized MCQ checking function
function checkMCQ(questionId, correctAnswer, correctMessage, incorrectMessage) {
    const options = document.getElementsByName(questionId);
    let selectedValue = null;
  
    for (let i = 0; i < options.length; i++) {
      if (options[i].checked) {
        selectedValue = options[i].value;
        break;
      }
    }
  
    const feedback = document.getElementById(questionId + '-feedback');
  
    if (!selectedValue) {
      feedback.textContent = "Please select an option.";
      feedback.style.color = "red";
      return;
    }
  
    if (selectedValue === correctAnswer) {
      feedback.textContent = correctMessage;
      feedback.style.color = "green";
    } else {
      feedback.textContent = incorrectMessage;
      feedback.style.color = "red";
    }
  }
  