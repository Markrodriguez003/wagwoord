Neutralino.init();
 

// TOAST PASSWORD GENERATION ALERT
const toastTrigger = document.getElementById('liveToastBtn')
const toastLiveExample = document.getElementById('liveToast')
const toastText = document.getElementById('toastText')
const copyBtn = document.getElementById('copyBtn')


if (toastTrigger) {
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
  toastTrigger.addEventListener('click', () => {
    toastBootstrap.show()
  })
  toastText.innerText = "Password Generated!"
 
}

// ADD EVENT LISTENER
if (copyBtn) {
  // const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
  // toastTrigger.addEventListener('click', () => {
  //   toastBootstrap.show()
  // })
  toastText.innerText = "Password Copied!"
 
}


