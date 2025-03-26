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

  function checkMultipleAnswers(questionId, correctAnswers, correctMessage, incorrectMessage) {
  const options = document.getElementsByName(questionId);
  let selectedValues = [];

  for (let i = 0; i < options.length; i++) {
    if (options[i].checked) {
      selectedValues.push(options[i].value);
    }
  }

  const feedback = document.getElementById(questionId + '-feedback');

  if (selectedValues.length === 0) {
    feedback.textContent = "Please select at least one option.";
    feedback.style.color = "red";
    return;
  }

  // Check if the selected options match exactly the correct answers
  if (
    selectedValues.length === correctAnswers.length &&
    selectedValues.every(value => correctAnswers.includes(value))
  ) {
    feedback.textContent = correctMessage;
    feedback.style.color = "green";
  } else {
    feedback.textContent = incorrectMessage;
    feedback.style.color = "red";
  }
}

function checkMultipleAnswers(questionId, correctAnswers, correctMessage, incorrectMessage) {
  const options = document.getElementsByName(questionId);
  let selectedValues = [];

  for (let i = 0; i < options.length; i++) {
    if (options[i].checked) {
      selectedValues.push(options[i].value);
    }
  }

  const feedback = document.getElementById(questionId + '-feedback');

  if (selectedValues.length === 0) {
    feedback.innerHTML = "Please select at least one option.";
    feedback.style.color = "red";
    return;
  }

  // Check if selected options exactly match the correct answers
  if (
    selectedValues.length === correctAnswers.length &&
    selectedValues.every(value => correctAnswers.includes(value))
  ) {
    feedback.innerHTML = correctMessage; // <-- use innerHTML here
    feedback.style.color = "green";
  } else {
    feedback.innerHTML = incorrectMessage; // <-- and here as well
    feedback.style.color = "red";
  }
}





  