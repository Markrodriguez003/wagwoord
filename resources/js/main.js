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
        generatePassword();

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
        

      } else console.log("Error state --> None of the checkboxes are loaded!")
    })
  }

// Array of character arrays
  const combinedArrays = [alphaUpper, alphaLower, numbers, simpleSymbols, complexSymbols];

  // GENERATES PASSWORD
  function generatePassword(){
    
  /* USER CHECKBOX CHOICE ARRAY */
    var optionsStateArray = [uppercaseChk.prop('checked'), lowercaseChk.prop('checked'), numbersChk.prop('checked'), simpleSymbolsChk.prop('checked'), complexSymbolsChk.prop('checked')];
    var passwordOne = [];
    /* WILL CYCLE THROUGH OPTIONS AND CALL FUNCTION TO PUSH RANDOM VALUE INTO FINAL PASS */
    // CHANGE TO HIGH ORDER ARRAY METHOD
    for (var i = 0; i < optionsStateArray.length; i++) {
      if (optionsStateArray[i] === true)  {
        console.log("This checkbox is true: " + optionsStateArray[i] + " --> So that means that is belongs to this const array: " + combinedArrays[i])
        let randomNumber = Math.floor(Math.random() * combinedArrays[i].length);
        passwordOne.push(combinedArrays[i][randomNumber]);
        // console.log("This is the random # " + randomNumber + " and this is the random character: " + combinedArrays[i][randomNumber]); 


      }
      

 
console.log("THIS IS PASWORD: " + passwordOne);
        
    }

  }


  var randomizer = (arr) => {

    randoNum = Math.floor(Math.random() * arr.length);
    
    finalizedPass.push(arr[randoNum]);
 

    /* CREATES AN ARRAY OF RANDOMLY SELECTED CHARACTERS FROM THE ABOVE "TRUE" CHECKED ARRAY TYPES */
    // AND SAVES IT TO ANOTHER SEPARATE ARRAY
    for (var x = 0; x < 10; x++) {
      randoNum = Math.floor(Math.random() * 10);
      scrambledBank.push(arr[randoNum]);
    }
    passScrambler(characterCount.val());
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
    // console.clear();

    /* GENERATED PASSWORD VARS */
 
    // console.log("Password prefix --> " + prefix.val())
    // console.log("Password postfix --> " + postfix.val())
    // console.log("Password character # --> " + characterCount.val());
    // console.log("Upper checkbox checked? # --> " + uppercaseChk.prop('checked'));
    // console.log("Lower checkbox checked? # --> " + lowercaseChk.prop('checked'));
    // console.log("Numbers checkbox checked? # --> " + numbersChk.prop('checked'));
    // console.log("Simple Symbols checkbox checked? # --> " + simpleSymbolsChk.prop('checked'));
    // console.log("Complex Symbols checkbox checked? # --> " + complexSymbolsChk.prop('checked'));
  })


  //********************************************************
  // PASSWORD GENERATING FUNCTIONS
  //********************************************************


});


// UPDATED CODE <--- INSERT
/*

const alphaLower = 'abcdefghijklmnopqrstuvwxyz';
const alphaUpper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbers = '0123456789';
const simpleSymbols = '_!@#$%^&*?';
const complexSymbols = '^()|{}[]<>/;:~`-=+"\',';
var passwordOne = [];
var scrambledExtraChars = [];
const combinedArrays = [
  alphaUpper,
  alphaLower,
  numbers,
  simpleSymbols,
  complexSymbols,
];
let randomNumber;
let finalPassword;
const passwordCharLength = 5;

function generatePassword() {
  var optionsStateArray = [true, true, true, true, true];

  for (var i = 0; i < optionsStateArray.length; i++) {
    if (optionsStateArray[i] === true) {it -m
      //console.log("This checkbox is true: " + optionsStateArray[i] + " --> So that means that is belongs to this const array: " + combinedArrays[i])
      // GRABS AT LEAST 1 CHARACTER FROM EACH CHECKED "TRUE" CHARACTER ARRAY SET
      randomNumber = Math.floor(Math.random() * combinedArrays[i].length);
      passwordOne.push(combinedArrays[i][randomNumber]);

      // CREATES A BANK OF EXTRA CHARACTERS PER CHECKED "TRUE" CHARACTER ARRAY
      for (var x = 0; x < 10; x++) {
        randomNumber = Math.floor(Math.random() * combinedArrays[i].length);
        scrambledExtraChars.push(combinedArrays[i][randomNumber]);
      }
    }
  }
  console.log('This is the scrambled array: ' + scrambledExtraChars.join(''));
  scrambledExtraChars = shuffleArray(scrambledExtraChars);
  console.log(
    'This is the scrambled, SHUFFLED array: ' + scrambledExtraChars.join('')
  );

  let restPasswordLength = passwordCharLength- passwordOne.length;
  for (let x = 0; x < restPasswordLength; x++) {
    randomNumber = Math.floor(Math.random() * scrambledExtraChars.length);
    passwordOne.push(scrambledExtraChars[randomNumber]);
    finalPassword = passwordOne.join('');
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

generatePassword();
console.log('THIS IS PASSWORD: ' + passwordOne.join(''));

*/
 