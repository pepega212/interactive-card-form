const cardHolder = document.getElementById("cardholder-name");
const cardNumber = document.getElementById("card-number");
const expiry = Array.from(document.querySelectorAll(".expiry"));
const cvc = document.getElementById("cvc");
const sumbit = document.getElementById("submit");
const nameOnCard = document.querySelector(".cardholder-display");
const numOnCard = document.querySelector(".card-number-display");
const expMM = document.querySelector(".expiry-month-display");
const expYY = document.querySelector(".expiry-year-display");
const cvcDisplay = document.querySelector(".cvc-display");
const thankYou = document.getElementById("thank-you-header");
const thankYouSection = document.getElementById("thank-you");
const continueBtn = document.getElementById("continue");
const form = document.getElementById("myForm");
const expiryErrorMsg = document.getElementById("expiry-error");


function inputName() {
    nameOnCard.innerHTML = cardHolder.value;
    thankYou.innerHTML = `Thank You ${cardHolder.value}`;
    if (nameOnCard.innerHTML == "") {
        nameOnCard.innerHTML = cardHolder.placeholder;
    }
    cardHolder.maxLength = 35;
}

function inputCardNum() {
    let cardNumberInput = cardNumber.value;
    // Not allowing users to write invalid characters
    let formattedCardNumber = cardNumberInput.replace(/[^\d]/g, "");
    formattedCardNumber = formattedCardNumber.substring(0, 16);
    // Split the card number is groups of 4
    let cardNumberSections = formattedCardNumber.match(/\d{1,4}/g);
    if (cardNumberSections !== null) {
        formattedCardNumber = cardNumberSections.join(" ");
    }
    // if the formattedCardNumber is different to what is shown, change the value to input value
    if (cardNumberInput !== formattedCardNumber) {
        cardNumber.value = formattedCardNumber;
    }
    numOnCard.innerHTML = cardNumber.value;
    if (cardNumber.value === "") {
        numOnCard.innerHTML = "0000 0000 0000 0000";
    }
}

function inputMM() {
    let formattedMM = expiry[0].value;
    formattedMM = formattedMM.substring(0, 2);
    expiry[0].value = formattedMM;
    if(expiry[0].value === "") {
        expMM.innerHTML = "00";
    } else {
        expMM.innerHTML = expiry[0].value;
    }
}

function inputYY() {
    let formattedYY = expiry[1].value;
    formattedYY = formattedYY.substring(0, 2);
    expiry[1].value = formattedYY;
    if (expiry[1].value === "") {
        expYY.innerHTML = "00";
    } else {
        expYY.innerHTML = expiry[1].value;
    }
}

function inputCvc() {
    let formattedCvc = cvc.value;

    formattedCvc = formattedCvc.substring(0, 3);
    cvc.value - formattedCvc;
    if (cvc.value === "") {
        cvcDisplay.innerHTML = "000";
    } else {
        cvcDisplay.innerHTML = cvc.value;
    }
    cvc.maxLength = 3;
}

function massValidate() {
    function validateName() {
      let cardholderExp = /^[A-Z a-z]+$/;
      let errorMsg = document.getElementById("errorMsg");
      if (cardHolder.value.match(cardholderExp)) {
        errorMsg.textContent = "";
        cardHolder.style.borderColor = "hsla(279, 6%, 55%, 0.5)";
      } else if (cardHolder.value != cardholderExp){
        errorMsg.innerHTML = "Please input alphabet characters only";
        cardHolder.style.borderColor = "red";
      } else {
        errorMsg.innerHTML = "Please enter cardholder name!";
        cardHolder.style.borderColor = "red";
      }
    }
    function validateCard() {
      let cardNumError = document.getElementById("card-num-error");
      if (cardNumber.value.length > 0 && cardNumber.value.length < 16) {
        cardNumError.innerHTML = "Wrong format!";
        cardNumber.style.borderColor = "red";
      } else if (cardNumber.value == "") {
        cardNumError.innerHTML = "Can't be blank!";
        cardNumber.style.borderColor = "red";
      } else {
        cardNumError.innerHTML = "";
        cardNumber.style.borderColor = "hsla(279, 6%, 55%, 0.5)";
      }
    }
    function validateExpiry() {
      let expMonth = /^(0[0-9]|1[1-2]){2}$/;
      let expYear = /^[0-9][0-2]{2}$/;
  
      if (expiry[0].value.match(expMonth)) {
        expiryErrorMsg.innerHTML = "";
      } else if (
        expiry[0].value.match(expMonth) &&
        expiry[1].value.match(expYear)
      ) {
        expiryErrorMsg.innerHTML = "";
      } else if (expiry[0] == "") {
        expiryErrorMsg.innerHTML = "Can't be blank!";
      } else {
        expiryErrorMsg.innerHTML = "Wrong format!";
      }
    }
    function validateCvc() {
      let cvcErrorMsg = document.getElementById("error-cvc");
      let cvcExp = /^[0-9]{3}$/;
      if (cvc.value === "") {
        cvcErrorMsg.innerHTML = "Can't be blank";
        cvc.style.borderColor = "red";
      } else if (cvc.value.match(cvcExp)) {
        cvcErrorMsg.innerHTML = "";
        cvc.style.borderColor = "hsla(279, 6%, 55%, 0.5)";
      } else {
        cvcErrorMsg.innerHTML = "Wrong format!";
        cvc.style.borderColor = "red";
      }
    }
    validateCard();
    validateName();
    validateExpiry();
    validateCvc();
    if (
      nameOnCard.innerHTML == cardHolder.placeholder ||
      numOnCard.innerHTML == cardNumber.placeholder ||
      !cardHolder.value.match(/^[A-Z a-z]+$/) ||
      expMM.innerHTML == "00" ||
      expYY.innerHTML == "00" ||
      cvcDisplay.innerHTML == "000" ||
      cardNumber.value.length == 0 ||
      cardNumber.value.length < 16 ||
      cardHolder.value == ""
    ) {
      return false;
    } else {
      return true;
    }
  }
  // Submit Button
  
  submit.addEventListener("click", function () {
    massValidate();
    if (massValidate() == false) {
      event.preventDefault();
    } else {
      event.preventDefault();
  
      form.classList.add("hidden");
      thankYouSection.classList.remove("hidden");
    }
  });
  
  // Continue Button
  
  continueBtn.addEventListener("click", function () {
    event.preventDefault();
    thankYouSection.classList.add("hidden");
    form.classList.remove("hidden");
    nameOnCard.innerHTML = cardHolder.placeholder;
    numOnCard.innerHTML = "0000 0000 0000 0000";
    expMM.innerHTML = "00";
    expYY.innerHTML = "00";
    cvcDisplay.innerHTML = "000";
    cardHolder.value = "";
    cardNumber.value = "";
    expiry[0].value = "";
    expiry[1].value = "";
    cvc.value = "";
    expiryErrorMsg.innerHTML = "";
  });