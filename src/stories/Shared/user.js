import get from 'lodash/get'
import set from 'lodash/set'
import defaultTo from 'lodash/defaultTo'
import FormGeneratorInput from '../../components/FormGeneratorInput.vue'
import FormGeneratorCheckbox from '../../components/FormGeneratorCheckbox.vue'
import FormGeneratorDivider from '../../components/FormGeneratorDivider'

export const model = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  isAgreed: false
}

export const firstNameField = {
  type: FormGeneratorInput,
  path: 'firstName',
  params: {
    label: 'First name'
  }
}

export const lastNameField = {
  type: FormGeneratorInput,
  path: 'lastName',
  params: {
    label: 'Last name'
  }
}

export const emailField = {
  type: FormGeneratorInput,
  path: 'email',
  params: {
    label: 'Email',
    type: 'email'
  }
}

export const passwordField = {
  type: FormGeneratorInput,
  path: 'password',
  params: {
    label: 'Password',
    type: 'password'
  }
}

export const isAgreedField = {
  type: FormGeneratorCheckbox,
  path: 'isAgreed',
  params: {
    text: 'I agree to the Terms & Conditions, including Privacy Policy'
  }
}

export const schema = [
  firstNameField,
  lastNameField,
  emailField,
  passwordField,
  {
    type: FormGeneratorDivider,
    path: '',
    params: {}
  },
  isAgreedField
]

export const errors = {
  firstName: ['Field first name is required.'],
  lastName: ['Field last name is required.'],
  email: ['Field email is required.'],
  password: ['Field password is required.'],
  isAgreed: ['Field is agreed is required.']
}

export function validateUser () {
  const errors = {}

  if (defaultTo(get(this.model, 'firstName'), '').trim().length === 0) {
    set(errors, 'firstName', ['Field first name is required.'])
  }

  if (defaultTo(get(this.model, 'lastName'), '').trim().length === 0) {
    set(errors, 'lastName', ['Field last name is required.'])
  }

  if (defaultTo(get(this.model, 'email'), '').trim().length === 0) {
    set(errors, 'email', ['Field email is required.'])
  }

  if (defaultTo(get(this.model, 'password'), '').trim().length === 0) {
    set(errors, 'password', ['Field password is required.'])
  }

  if (defaultTo(get(this.model, 'isAgreed'), false) === false) {
    set(errors, 'isAgreed', ['Field is agreed is required.'])
  }

  return errors
}
