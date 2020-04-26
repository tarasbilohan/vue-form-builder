import { array, withKnobs } from '@storybook/addon-knobs'
import FormGeneratorError from '../../components/FormGeneratorError.vue'

export default {
  component: FormGeneratorError,
  title: 'Form Generator Error',
  decorators: [withKnobs]
}

export const withDynamicProps = () => ({
  components: { FormGeneratorError },
  props: {
    errors: {
      default: array('Errors', ['This field is required.'], '|')
    }
  },
  template: `
    <form-generator-error :errors="errors" />
  `
})
