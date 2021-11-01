const form = document.querySelector('.form-auth')

const {
  first_name,
  last_name,
  email,
  confirmEmail,
  password,
  confirmPassword
} = form.elements

const formElements = [
  first_name,
  last_name,
  email,
  confirmEmail,
  password,
  confirmPassword
]

function validateEmailInput() {
  const isValidEmail = email.value.includes('@') && email.value.includes('.')
  const isEmailWithinLimit =
    email.value.trim().length >= 10 && email.value.trim().length <= 100

  const span = email.nextElementSibling
  span.innerText = ''

  if (!isValidEmail) {
    email.style.borderColor = 'red'
    span.innerText = 'E-mail must be valid!'
    email.insertAdjacentElement('afterend', span)
    return false
  }

  if (!isEmailWithinLimit) {
    email.style.borderColor = 'red'
    span.innerText = 'E-mail must be valid!'
    email.insertAdjacentElement('afterend', span)
    return false
  }

  email.style.borderColor = 'green'

  return true
}

email.onblur = validateEmailInput

function validateNameInput() {
  const isNameWithinLimit =
    first_name.value.trim().length >= 2 && first_name.value.trim().length <= 80

  const span = first_name.nextElementSibling
  span.innerText = ''

  if (!isNameWithinLimit) {
    first_name.style.borderColor = 'red'
    span.innerText = 'Name must contain between 2 and 80 characters!'
    first_name.insertAdjacentElement('afterend', span)
    return false
  }

  namefirst_nameInput.style.borderColor = 'green'

  return true
}

first_name.onblur = validateNameInput

form.addEventListener('submit', function (event) {
  if (!validateEmailInput() || !validateNameInput()) {
    return event.preventDefault()
  }

  event.preventDefault()
})
