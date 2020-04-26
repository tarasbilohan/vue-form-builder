import FormGeneratorInput from '../../components/FormGeneratorInput.vue'

export const model = {
  street: '',
  country: {
    name: ''
  }
}

export const schema = [
  {
    type: FormGeneratorInput,
    path: 'street',
    params: {
      label: 'Street'
    }
  },
  {
    type: FormGeneratorInput,
    path: 'country.name',
    params: {
      label: 'Country Name'
    }
  }
]

export const errors = {
  street: ['Field street is required.'],
  country: {
    name: ['Field country name is required.']
  }
}
