
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
  const simpleSymbols = "!@#$%&*?";
  const complexSymbols = "_^()|{}[]<>/;:~`-=+\"',";
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
  // TAB DETECTION / TRIGGER
  //********************************************************
  var generationTab = document.querySelectorAll('button[data-bs-toggle="pill"]')
  let activated_pane;
  let deactivated_pane;
  for (i = 0; i < generationTab.length; i++) {
    generationTab[i].addEventListener('shown.bs.tab', function (event) {
      activated_pane = document.querySelector(event.target.getAttribute('data-bs-target'))
      deactivated_pane = document.querySelector(event.relatedTarget.getAttribute('data-bs-target'))

      console.log(activated_pane.id)
      // console.log(deactivated_pane.id)
    })
  }


  //********************************************************
  //CUSTOM HASH OUTPUT 
  //********************************************************


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
  // HASH TYPE RADIO BUTTONS LISTENER
  //********************************************************

  let hashRadioTrigger;
  $(".hash-radio-options div input[type='radio'] ") // select the radio by its id
    .change(() => { // bind a function to the change event
      hashRadioTrigger = $('input[name=hash-type-name]:checked').val();
    });




  //********************************************************
  //TOAST TRIGGER (GENERATE PASS, RESET PASS, ERROR STATE?)
  //********************************************************
  if (generatePasswordTrigger) {
    // characterCount.val(characterCount.attr('placehAolder'));

    // ENTRY POINT TO 
    characterCount.val(5);




    generatePasswordTrigger.click(() => {

      const successToast = bootstrap.Toast.getOrCreateInstance(generatedPassToast);


      if (activated_pane.id == "simple-tab-pane") {
        console.log("SIMPLE TAB PANEL! " + activated_pane.id);
        generateSimplePassword($("#pass-character-amount-simple").val())
      } else if (activated_pane.id == "word-tab-pane") {
        console.log("WORD TAB PANEL!" + activated_pane.id);
      } else if (activated_pane.id == "Custom-tab-pane") {
        console.log("CUSTOM TAB PANEL!" + activated_pane.id);
        if ($('input[type=checkbox]:checked').length > 0) {
          successToast.show();
          generateCustomPassword(characterCount.val());
        } else console.log("Error state --> None of the checkboxes are loaded!")
      } else if (activated_pane.id == "hash-tab-pane") {
        console.log("HASH TAB PANEL!" + activated_pane.id);
        generateHashPassword(hashRadioTrigger);

      } else {

        console.log("ERROR!" + activated_pane.id);
      }



    })
  }

  //********************************************************
  //TOAST TRIGGER (GENERATE PASS, RESET PASS, ERROR STATE?)
  //********************************************************

  function generateSimplePassword(charNumber) {
    console.log("SIMPLE PASSWORD")
    let tempPassword = [];
    let randomArray;
    let randomChar;
    for (let x = 0; x < charNumber; x++) {
      randomArray = Math.floor(Math.random() * 4);
      randomChar = Math.floor(Math.random() * combinedArrays[randomArray].length);
      tempPassword.push(combinedArrays[randomArray][randomChar]);

    }

    // console.log("temp password for simple password --> " + tempPassword.join(""));
    generatedPasswordDiv.val(tempPassword.join(""));
  }

  function generateWordPassword(charNumber) {
    console.log("WORD PASSWORD")
  }



  //********************************************************
  //GENERATE HASH PASSWORD
  //********************************************************
  function generateHashPassword(hashType, phrase = "default") {
    console.log("INSERT HASH GENERATION");
    var hash;

    switch (hashType) {
      case "SHA-1":
        hash = CryptoJS.SHA1(phrase);
        break;
      case "SHA-2(256)":
        hash = CryptoJS.SHA256(phrase);
        break;
      case "SHA-2(512)":
        hash = CryptoJS.SHA512(phrase);
        break;
      case "SHA-3(224)":
        hash = CryptoJS.SHA3(phrase, { outputLength: 224 });
        break;
      case "SHA-3(256)":
        hash = CryptoJS.SHA3(phrase, { outputLength: 256 });
        break;
      case "SHA-3(384)":
        hash = CryptoJS.SHA3(phrase, { outputLength: 384 });
        break;
      case "SHA-3(512)":
        hash = CryptoJS.SHA3(phrase, { outputLength: 512 });
        break;
      case "MD-5":
        hash = CryptoJS.MD5(phrase);
        break;
      case "RIPEMD160":
        hash = CryptoJS.RIPEMD160(phrase);
        break;
      default:
        console.log("NO HASH")
      // return hash;
    }

    generatedPasswordDiv.val("");
    generatedPasswordDiv.val(hash.toString(CryptoJS.enc.Base64));
    // return hash.toString(CryptoJS.enc.Base64);
    // console.log("HASH? --> " + hash); // THIS IS NOT THE PASSWORD ITSELF.. BUT A WORD ARRAY OBJECT
    // console.log("HASH? --> " + hash.toString(CryptoJS.enc.Base64)); // THIS WORKS!
  }


  function generateCustomPassword(charNumber) {

    let optionsStateArray = [uppercaseChk.prop('checked'), lowercaseChk.prop('checked'), numbersChk.prop('checked'), simpleSymbolsChk.prop('checked'), complexSymbolsChk.prop('checked')];

    for (var i = 0; i < optionsStateArray.length; i++) {
      if (optionsStateArray[i] === true) {
        // GRABS AT LEAST 1 CHARACTER FROM EACH CHECKED "TRUE" CHARACTER ARRAY SET
        randomNumber = Math.floor(Math.random() * combinedArrays[i].length);
        tempPassword.push(combinedArrays[i][randomNumber]);
        // CREATES A BANK OF EXTRA CHARACTERS PER CHECKED "TRUE" CHARACTER ARRAY


        for (var x = 0; x < 15; x++) {
          randomNumber = Math.floor(Math.random() * combinedArrays[i].length);
          scrambledExtraChars.push(combinedArrays[i][randomNumber]);
        }
      }
    }

    scrambledExtraChars = shuffleArray(scrambledExtraChars);
    let restPasswordLength = charNumber - tempPassword.length;
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


});

