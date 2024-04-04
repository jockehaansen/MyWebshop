const urlParams = new URLSearchParams(window.location.search)
const productId = urlParams.get('productId')

function validateForm() {
  let formNamn = document.getElementById('name').value
  let formTelefonNummer = document.getElementById('phoneNumber').value
  let formAdress = document.getElementById('address').value
  let formEmail = document.getElementById('email').value
  let formButton = document.getElementById('submitButton')

  let namn_error = document.getElementById('namn_error')
  let telefonnr_error = document.getElementById('telefonnr_error')
  let adress_error = document.getElementById('adress_error')
  let email_error = document.getElementById('email_error')

  // Denna ifsats låser beställ knappen tills alla fält är korrekt
  if (formNamn.length < 2) {
    formButton.disabled = true
    namn_error.style.display = 'block'
    namn_error.innerHTML = 'Name is too short'
    namn_error.style.color = 'red'
  } else if (formNamn.length > 50) {
    formButton.disabled = true
    namn_error.style.display = 'block'
    namn_error.innerHTML = 'Name is too long'
  } else if (formTelefonNummer.length > 20) {
    formButton.disabled = true
    telefonnr_error.style.display = 'block'
    telefonnr_error.innerHTML = 'Phonenumber is too long'
  } else if (formAdress.length < 2) {
    formButton.disabled = true
    adress_error.style.display = 'block'
    adress_error.innerHTML = 'Address too short'
  } else if (formAdress.length > 50) {
    formButton.disabled = true
    adress_error.style.display = 'block'
    adress_error.innerHTML = 'Address too long'
  } else if (formEmail.indexOf('@') == -1 || formEmail.length > 50) {
    formButton.disabled = true
    email_error.style.display = 'block'
    email_error.innerHTML = 'Invalid email'
  } else {
    formButton.disabled = false
    namn_error.style.display = 'none'
    telefonnr_error.style.display = 'none'
    adress_error.style.display = 'none'
    email_error.style.display = 'none'
  }

  //Vi validerar varje fält och ser till att det är ifylld korrekt.
  if (formNamn.length > 2 && formNamn.length < 50) {
    namn_error.innerHTML = 'Giltig'
    namn_error.style.color = 'green'
  }
  if (formTelefonNummer.length > 0 && formTelefonNummer.length < 20) {
    telefonnr_error.innerHTML = 'Giltig'
    telefonnr_error.style.color = 'green'
  }
  if (formAdress.length > 2 && formAdress.length < 50) {
    adress_error.innerHTML = 'Giltig'
    adress_error.style.color = 'green'
  }
  if (formEmail.indexOf('@') != -1 && formEmail.length < 50) {
    email_error.innerHTML = 'Giltig'
    email_error.style.color = 'green'
  }
}
