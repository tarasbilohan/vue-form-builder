import { withKnobs, text, boolean, array, select } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import FormGeneratorInput from '../../components/FormGeneratorInput.vue'

export default {
  component: FormGeneratorInput,
  title: 'Form Generator Input',
  decorators: [withKnobs]
}

export const withDynamicProps = () => ({
  components: { FormGeneratorInput },
  props: {
    id: {
      default: text('Id', 'input')
    },
    value: {
      default: text('Value', '')
    },
    errors: {
      default: array('Errors', ['This field is required.'], '|')
    },
    type: {
      default: select('Type', {
        Text: 'text',
        Email: 'email',
        Number: 'number',
        Password: 'password'
      }, 'text')
    },
    label: {
      default: text('Label', 'Label')
    },
    formGroupClassName: {
      default: text('Form group class name', '')
    },
    placeholder: {
      default: text('Placeholder', '')
    },
    help: {
      default: text('Help', 'This is some help text.')
    },
    required: {
      default: boolean('Required', true)
    },
    readonly: {
      default: boolean('Readonly', false)
    },
    disabled: {
      default: boolean('Disabled', false)
    },
    autocomplete: {
      default: text('Autocomplete', '')
    }
  },
  data () {
    return {
      inputValue: ''
    }
  },
  watch: {
    value: {
      handler (value) {
        this.inputValue = value
      },
      immediate: true
    }
  },
  methods: {
    onUpdateValue: action('update:value'),
    onInput: action('input')
  },
  template: `
    <div>
      <form-generator-input
        :id="id"
        v-model="inputValue"
        :errors="errors"
        :type="type"
        :label="label"
        :form-group-class-name="formGroupClassName"
        :placeholder="placeholder"
        :help="help"
        :required="required"
        :readonly="readonly"
        :disabled="disabled"
        :autocomplete="autocomplete"
        @update:value="onUpdateValue"
        @input="onInput"
      />
      <p>
        <strong>Input value:</strong> {{ inputValue }}
      </p>
    </div>
  `
})
