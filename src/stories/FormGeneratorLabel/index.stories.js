import FormGeneratorLabel from '../../components/FormGeneratorLabel.vue'
import { boolean, text } from '@storybook/addon-knobs'

export default {
  component: FormGeneratorLabel,
  title: 'Form Generator Label'
}

export const withDynamicProps = () => ({
  components: { FormGeneratorLabel },
  props: {
    forInput: {
      default: text('For Input', 'input-id')
    },
    label: {
      default: text('Label', 'Label')
    },
    required: {
      default: boolean('required', true)
    }
  },
  template: `
    <form-generator-label
      :for-input="forInput"
      :label="label"
      :required="required"
    />
  `
})
