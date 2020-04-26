import { withKnobs, text, boolean, array } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import FormGeneratorCheckbox from '../../components/FormGeneratorCheckbox.vue'

export default {
  component: FormGeneratorCheckbox,
  title: 'Form Generator Checkbox',
  decorators: [withKnobs]
}

export const withDynamicProps = () => ({
  components: { FormGeneratorCheckbox },
  props: {
    id: {
      default: text('Id', 'input')
    },
    value: {
      default: boolean('Value', false)
    },
    errors: {
      default: array('Errors', ['This field is required.'], '|')
    },
    label: {
      default: text('Label', 'Label')
    },
    text: {
      default: text('Text', 'Enabled')
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
    disabled: {
      default: boolean('Disabled', false)
    }
  },
  data () {
    return {
      checked: false
    }
  },
  watch: {
    value: {
      handler (value) {
        this.checked = value
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
      <form-generator-checkbox
        :id="id"
        v-model="checked"
        :errors="errors"
        :label="label"
        :text="text"
        :form-group-class-name="formGroupClassName"
        :placeholder="placeholder"
        :help="help"
        :required="required"
        :disabled="disabled"
        @update:value="onUpdateValue"
        @input="onInput"
      />
      <p>
        <strong>Checkbox value:</strong> {{ checked }}
      </p>
    </div>
  `
})
