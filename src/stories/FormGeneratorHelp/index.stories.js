import FormGeneratorHelp from '../../components/FormGeneratorHelp.vue'
import { text } from '@storybook/addon-knobs'

export default {
  component: FormGeneratorHelp,
  title: 'Form Generator Help'
}

export const withDynamicProps = () => ({
  components: { FormGeneratorHelp },
  props: {
    help: {
      default: text('Help', 'This is some help text.')
    }
  },
  template: `
    <form-generator-help :help="help" />
  `
})
