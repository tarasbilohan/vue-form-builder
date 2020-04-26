import { withKnobs, text, boolean, array, object } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import FormGeneratorRadio from '../../components/FormGeneratorRadio.vue'

export default {
  component: FormGeneratorRadio,
  title: 'Form Generator Radio',
  decorators: [withKnobs]
}

export const withDynamicProps = () => ({
  components: { FormGeneratorRadio },
  props: {
    id: {
      default: text('Id', 'input')
    },
    value: {
      default: text('Value', 'foo')
    },
    errors: {
      default: array('Errors', ['This field is required.'], '|')
    },
    label: {
      default: text('Label', 'Label')
    },
    options: {
      default: object('Options', { foo: 'Foo', bar: 'Bar' })
    },
    formGroupClassName: {
      default: text('Form group class name', '')
    },
    help: {
      default: text('Help', 'This is some help text.')
    },
    required: {
      default: boolean('Required', true)
    },
    disabled: {
      default: boolean('Disabled', false)
    }
  },
  data () {
    return {
      inputValue: ''
    }
  },
  computed: {
    formattedOptions () {
      return Object.entries(this.options).map(([value, label]) => ({ value, label }))
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
      <form-generator-radio
        :id="id"
        v-model="inputValue"
        :errors="errors"
        :label="label"
        :options="formattedOptions"
        :form-group-class-name="formGroupClassName"
        :help="help"
        :required="required"
        :disabled="disabled"
        @update:value="onUpdateValue"
        @input="onInput"
      />
      <p>
        <strong>Radio value:</strong> {{ inputValue }}
      </p>
    </div>
  `
})
