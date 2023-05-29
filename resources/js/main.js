Neutralino.init(); // STARTS UP NEUTRALINO


$(document).ready(function () {

  // NOTES
  // "LEET" SPEAK VARIANTS
  //https://www.ionos.com/digitalguide/online-marketing/social-media/what-is-leetspeak/

  // OTHER WORD OPTIONS 
  // https://www.robertecker.com/hp/research/leet-converter.php?lang=en

  /* PASSWORD PIECES */
  /// CHANGE VAR TO LET? 

  const alphaLower = "abcdefghijklmnopqrstuvwxyz";
  const alphaUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const simpleSymbols = "_!@#$%^&*?";
  const complexSymbols = "^()|{}[]<>/;:~`-=+\"',";
  // "LEET or 1337 speak variant"
  const leetSpeak = {
    "a": "4",
    "b": "13",
    "c": "(",
    "d": "[)",
    "e": "3",
    "f": "|=",
    "g": "6",
    "h": "|-|",
    "i": "|",
    "j": ".]",
    "k": "|<",
    "l": "1",
    "M": "|Y|",
    "n": "/V",
    "o": "0",
    "p": "|>",
    "Q": "0,",
    "R": "|2",
    "S": "5",
    "t": "7",
    "u": "[_]",
    "v": "\/",
    "w": "\v/",
    "x": "}{",
    "y": "`/",
    "z": "`2",
  };



  const megaArr = [alphaUpper, alphaLower, numbers, simpleSymbols, complexSymbols];

  /* RANDOM NUMBER */
  var randoNum;

  var scrambledBank = [];

  /* GENERATED PASSWORD VAR */
  var finalizedPass = [];
  var finalPassword;

  /* NUMBER OF CHARACTERS USER WOULD LIKE */
  var userOptionNum = 4; //DEFAULT

  // COPY PASSWORD BUTTON
  const copyBtn = $('#copyBtn')

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

  // FORM CONTROLS
  // PASSWORD CHARACTER # INPUT
  const prefix = $('#prefix');
  const postfix = $('#postfix');
  const characterCount = $('#pass-character-amount');
  const uppercaseChk = $('#upper');
  const lowercaseChk = $('#lower');
  const numbersChk = $('#numbers');
  const simpleSymbolsChk = $('#simple-symbols');
  const complexSymbolsChk = $('#complex-symbols');





  //********************************************************
  //TOAST TRIGGER (GENERATE PASS, RESET PASS, ERROR STATE?)
  // GENERATE PASSWORD 
  //********************************************************
  if (generatePasswordTrigger) {
    const successToast = bootstrap.Toast.getOrCreateInstance(generatedPassToast);

    // const checkboxesLength = $('input[type=checkbox]:checked').length;

    generatePasswordTrigger.click(() => {
      const checkboxesLength = $('input[type=checkbox]:checked').length;
      if ($('input[type=checkbox]:checked').length > 0) {
        console.log("*****************************************")
        console.log("Password generated!")
        console.log("*****************************************")

        generatedPassText.text("Password Generated!");
        successToast.show();
        // console.log("Password prefix --> " + prefix.val())
        // console.log("Password postfix --> " + postfix.val())
        // console.log("Password character # --> " + characterCount.val());
        // console.log("Upper checkbox checked? --> " + uppercaseChk.prop('checked'));
        // console.log("Lower checkbox checked? --> " + lowercaseChk.prop('checked'));
        // console.log("Numbers checkbox checked? --> " + numbersChk.prop('checked'));
        // console.log("Simple Symbols checkbox checked? --> " + simpleSymbolsChk.prop('checked'));
        // console.log("Complex Symbols checkbox checked? --> " + complexSymbolsChk.prop('checked'));
        // console.log("*****************************************")
        // console.log("Checkbox are all checked? --> " + checkboxesLength);
        // console.log("*****************************************")
        togValuesArr()

      } else console.log("Error state --> None of the checkboxes are loaded!")
    })
  }

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
    characterCount.val(4)
    $('input[type=checkbox]').prop('checked', false);
    $('input[type=text]').val("");

    /* GENERATED PASSWORD VARS */
    scrambledBank = [];
    finalizedPass = [];
    finalPassword;

    console.log("Password prefix --> " + prefix.val())
    console.log("Password postfix --> " + postfix.val())
    console.log("Password character # --> " + characterCount.val());
    console.log("Upper checkbox checked? # --> " + uppercaseChk.prop('checked'));
    console.log("Lower checkbox checked? # --> " + lowercaseChk.prop('checked'));
    console.log("Numbers checkbox checked? # --> " + numbersChk.prop('checked'));
    console.log("Simple Symbols checkbox checked? # --> " + simpleSymbolsChk.prop('checked'));
    console.log("Complex Symbols checkbox checked? # --> " + complexSymbolsChk.prop('checked'));
  })


  //********************************************************
  // PASSWORD GENERATING FUNCTIONS
  //********************************************************
  function togValuesArr() {
    /* USER CHECKBOX CHOICE ARRAY */
    var chkOptions = [uppercaseChk.prop('checked'), lowercaseChk.prop('checked'), numbersChk.prop('checked'), simpleSymbolsChk.prop('checked'), complexSymbolsChk.prop('checked')];

    /* WILL CYCLE THROUGH OPTIONS AND CALL FUNCTION TO PUSH RANDOM VALUE INTO FINAL PASS */
    // CHANGE TO HIGH ORDER ARRAY METHOD
    for (var i = 0; i < chkOptions.length; i++) {
      if (chkOptions[i] === true) {
        console.log("This checkbox is true: " + chkOptions[i] + " --> So that means that is belongs to this const array: " + megaArr[i]);
        randomizer(megaArr[i]);
      } else;
      // pushPassToField();
      // console.log("Pushing to password?")
      console.log(`# final password --> ${finalizedPass}`);

    }

  }

  var randomizer = (arr) => {

    randoNum = Math.floor(Math.random() * arr.length);
    console.log(`Random # choosen --> ${randoNum}`);
    finalizedPass.push(arr[randoNum]);
    console.log(`# This is the current password at the moment --> ${finalizedPass}`);

    /* CREATES AN ARRAY OF RANDOMLY SELECTED CHARACTERS FROM THE ABOVE "TRUE" CHECKED ARRAY TYPES */
    // AND SAVES IT TO ANOTHER SEPARATE ARRAY
    for (var x = 0; x < 10; x++) {
      randoNum = Math.floor(Math.random() * 10);
      scrambledBank.push(arr[randoNum]);
    }
    passScrambler(characterCount.val());
  }



  function passScrambler(userOpNum) {
 
    for (var y = finalizedPass.length; y < userOpNum; y++) {
      var r = Math.floor(Math.random() * userOpNum);
      finalizedPass.push(scrambledBank[r]);
    }

      console.log("Password --> " + scrambledBank);

    var currentIndex = finalizedPass.length
 
    var tmpVal;
    var randoIndex;
    while (0 !== currentIndex) {

      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = finalizedPass[currentIndex];
      finalizedPass[currentIndex] = finalizedPass[randomIndex];
      finalizedPass[randomIndex] = temporaryValue;
    }
    console.log(`Scrambled Password: ${finalizedPass}`);
    console.log(`Scrambled Password length: ${finalizedPass.length}`);


    if (finalizedPass.length !== userOpNum) {
      finalizedPass.pop();
    } else return console.log("DONE!")

    console.log(`Scrambled Password: ${finalizedPass}`);
    pushPassToField();
  }

  function pushPassToField() {

    finalPassword = finalizedPass.join("");

    generatedPasswordDiv.val(finalPassword);


  }

});


