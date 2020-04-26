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

export const schema = [
  {
    type: FormGeneratorInput,
    path: 'firstName',
    params: {
      label: 'First name'
    }
  },
  {
    type: FormGeneratorInput,
    path: 'lastName',
    params: {
      label: 'Last name'
    }
  },
  {
    type: FormGeneratorInput,
    path: 'email',
    params: {
      label: 'Email',
      type: 'email'
    }
  },
  {
    type: FormGeneratorDivider,
    path: '',
    params: {}
  },
  {
    type: FormGeneratorInput,
    path: 'password',
    params: {
      label: 'Password',
      type: 'password'
    }
  },
  {
    type: FormGeneratorCheckbox,
    path: 'isAgreed',
    params: {
      text: 'I agree to the Terms & Conditions, including Privacy Policy'
    }
  }
]

export const errors = {
  firstName: ['Field first name is required.'],
  lastName: ['Field last name is required.'],
  email: ['Field email is required.'],
  password: ['Field password is required.'],
  isAgreed: ['Field is agreed is required.']
}
