
Neutralino.init(); // STARTS UP NEUTRALINO

$(document).ready(function () {

  // NOTES
  // "LEET" SPEAK VARIANTS
  //https://www.ionos.com/digitalguide/online-marketing/social-media/what-is-leetspeak/

  // OTHER WORD OPTIONS 
  // https://www.robertecker.com/hp/research/leet-converter.php?lang=en

  /* PASSWORD CHAR PIECES */
  const alphaLower = "abcdefghijklmnopqrstuvwxyz";
  const alphaUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const simpleSymbols = "_!@#$%^&*?";
  const complexSymbols = "^()|{}[]<>/;:~`-=+\"',";
  // "LEET or 1337 speak variant"

  // COPY PASSWORD BUTTON
  const copyBtn = $('#copy-button')

  // GENERATE PASSWORD BUTTON
  const generatePasswordTrigger = $('#generate-password-btn')

  // GENERATED PASSWORD TOAST CONTAINER
  const generatedPassToast = $('#generated-pass-alert-div')

  // GENERATED PASSWORD TOAST TEXT
  const generatedPassText = $('#generated-pass-text')

  // RESET FORM TOAST CONTAINER
  const resetFormToast = $('#reset-form-alert-div')

  // RESET FORM BUTTON
  const resetFormTrigger = $('#reset-form-btn')

  // RESET FORM TOAST TEXT
  const resetFormText = $('#reset-form-text')

  // GENERATED PASSWORD FIELD
  const generatedPasswordDiv = $('#generated-password-field')

  // PASSWORD CHARACTER # INPUT
  let tempPassword = [];
  let finalPassword = [];
  const combinedArrays = [alphaUpper, alphaLower, numbers, simpleSymbols, complexSymbols];
  const prefix = $('#prefix');
  const infix = $('#infix');
  const postfix = $('#postfix');
  // const characterCountField = $('#pass-character-amount');
  const characterCount = $('#pass-character-amount');
  const uppercaseChk = $('#upper');
  const lowercaseChk = $('#lower');
  const numbersChk = $('#numbers');
  const simpleSymbolsChk = $('#simple-symbols');
  const complexSymbolsChk = $('#complex-symbols');

  const characterCountSimple = $('#pass-character-amount-simple');
  let scrambledExtraChars = [];
  let randomNumber;


  //********************************************************
  //CUSTOM HASH OUTPUT 
  //********************************************************
  async function sha256(str) {
    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder("utf-8").encode(str));
    return Array.prototype.map.call(new Uint8Array(buf), x=>(('00'+x.toString(16)).slice(-2))).join('');
  }
  sha256("TESTING THIS STRING!");
console.log(`hash sha-256 = ${sha256("TESTING THIS STRING!".buf)}`)

  //********************************************************
  //CUSTOM NUMBER INPUT 
  //********************************************************

  // CUSTOM NUMBER INPUT
  const maxPasswordCharVal = 15
  const minPasswordCharVal = 5
  const minusChar = $("#minus");
  const addChar = $("#add");
  // const numInputCustom = $('#password-char-amount-custom')

  minusChar.click(() => {
    if (Number(characterCount.val()) > minPasswordCharVal) {
      characterCount.val(Number(characterCount.val()) - 1);
    }
  })

  addChar.click(() => {
    if (Number(characterCount.val()) < maxPasswordCharVal) {
      characterCount.val(Number(characterCount.val()) + 1);
    }
  })


  //********************************************************
  //TOAST TRIGGER (GENERATE PASS, RESET PASS, ERROR STATE?)
  //********************************************************
  if (generatePasswordTrigger) {
    // characterCount.val(characterCount.attr('placehAolder'));

    // ENTRY POINT TO 



    characterCount.val(5);
    generatePasswordTrigger.click(() => {
      const successToast = bootstrap.Toast.getOrCreateInstance(generatedPassToast);
      if ($('input[type=checkbox]:checked').length > 0) {
        successToast.show();
        generatePassword(characterCount.val());
      } else console.log("Error state --> None of the checkboxes are loaded!")
    })
  }

  //********************************************************
  //TOAST TRIGGER (GENERATE PASS, RESET PASS, ERROR STATE?)
  //********************************************************

  function generatePassword(charNumber) {

    let optionsStateArray = [uppercaseChk.prop('checked'), lowercaseChk.prop('checked'), numbersChk.prop('checked'), simpleSymbolsChk.prop('checked'), complexSymbolsChk.prop('checked')];

    for (var i = 0; i < optionsStateArray.length; i++) {
      if (optionsStateArray[i] === true) {
        // GRABS AT LEAST 1 CHARACTER FROM EACH CHECKED "TRUE" CHARACTER ARRAY SET
        randomNumber = Math.floor(Math.random() * combinedArrays[i].length);
        tempPassword.push(combinedArrays[i][randomNumber]);
        // CREATES A BANK OF EXTRA CHARACTERS PER CHECKED "TRUE" CHARACTER ARRAY
        // console.log("This is the temporary password: " + tempPassword.join("") )
        for (var x = 0; x < 10; x++) {
          randomNumber = Math.floor(Math.random() * combinedArrays[i].length);
          scrambledExtraChars.push(combinedArrays[i][randomNumber]);
        }
      }
    }

    scrambledExtraChars = shuffleArray(scrambledExtraChars);
    let restPasswordLength = charNumber - tempPassword.length;
    console.log("set password length? --> " + charNumber);
    console.log("resetPasswordLength --> " + restPasswordLength);
    console.log("tempPassword --> " + tempPassword.length);
    if (restPasswordLength === 0) {
      finalPassword = shuffleArray(tempPassword);

    } else {
      for (let x = 0; x < restPasswordLength; x++) {
        randomNumber = Math.floor(Math.random() * scrambledExtraChars.length);
        tempPassword.push(scrambledExtraChars[randomNumber]);
        finalPassword = shuffleArray(tempPassword);
      }
    }

    if (!infix.val()) {
      generatedPasswordDiv.val((prefix.val() + finalPassword.join("") + postfix.val()).replace(/\s/g, ''));
      tempPassword = [];
      finalPassword = [];
    } else {
      //INFIX
      let middleInt = Math.floor(finalPassword.length / 2);
      console.log("Final password --> " + finalPassword.join(""));
      console.log("No inffix! --> " + middleInt);
      finalPassword.splice(middleInt, 0, infix.val());
      generatedPasswordDiv.val((prefix.val() + finalPassword.join("") + postfix.val()).replace(/\s/g, ''));
      tempPassword = [];
      finalPassword = [];

      // EVEN & ODD INFIX PASSWORD PLACEMENT (NOT NECESSARY FLUFF )
      // if(finalPassword.length % 2 == 0 ){
      //   console.log("even --> " + middleInt);
      //   finalPassword.splice(middleInt, 1, infix.val());
      //   console.log("New inffix password ---> " + finalPassword.join(""));

      // } else {
      //   console.log("odd --> " + middleInt )
      //   finalPassword.splice(middleInt, 0, infix.val());
      //   console.log("New inffix password ---> " + finalPassword.join(""));
      // }
    }
  }


  // TAKES ANY ARRAY AND SHUFFLES IT
  function shuffleArray(array) {
    let shuffled = array
      .map(value => ({
        value,
        sort: Math.random(),
      }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

    return shuffled;
  }

  copyBtn.click(() => {
    console.log("COPIED!")
    generatedPasswordDiv.select();
    // generatedPasswordDiv.setSelectionRange(0, 99999); // For mobile devices
    navigator.clipboard.writeText(generatedPasswordDiv.val());
    // alert("Copied the text: " + generatedPasswordDiv.value);
  });





  //********************************************************
  // RESET FORM BUTTON
  //********************************************************
  if (resetFormTrigger) {
    const resetToast = bootstrap.Toast.getOrCreateInstance(resetFormToast);

    resetFormTrigger.click(() => {
      resetFormToast.text("Cleared Form!");
      resetToast.show();
    })
  }
  resetFormTrigger.click(() => {
    console.log("*****************************************")
    console.log("Reset form button clicked!");
    console.log("*****************************************")
    characterCount.val(5);
    $('input[type=checkbox]').prop('checked', false);
    $('input[type=text]').val("");
    console.clear();

  })


  // TAB DETECTION / TRIGGER
  var tabEl = document.querySelectorAll('button[data-bs-toggle="pill"]')
  //console.log(tabEl)
  for (i = 0; i < tabEl.length; i++) {
    tabEl[i].addEventListener('shown.bs.tab', function (event) {
      const activated_pane = document.querySelector(event.target.getAttribute('data-bs-target'))
      const deactivated_pane = document.querySelector(event.relatedTarget.getAttribute('data-bs-target'))

      console.log(activated_pane.id)
      // console.log(deactivated_pane.id)
    })
  }




});

