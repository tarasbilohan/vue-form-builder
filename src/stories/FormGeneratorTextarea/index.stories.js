import { withKnobs, text, boolean, array, number } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import FormGeneratorTextarea from '../../components/FormGeneratorTextarea.vue'

export default {
  component: FormGeneratorTextarea,
  title: 'Form Generator Textarea',
  decorators: [withKnobs]
}

export const withDynamicProps = () => ({
  components: { FormGeneratorTextarea },
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
    rows: {
      default: number('Rows', 2)
    },
    cols: {
      default: number('Cols', 20)
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
      <form-generator-textarea
        :id="id"
        v-model="inputValue"
        :errors="errors"
        :label="label"
        :form-group-class-name="formGroupClassName"
        :placeholder="placeholder"
        :help="help"
        :required="required"
        :readonly="readonly"
        :disabled="disabled"
        :rows="rows"
        :cols="cols"
        @update:value="onUpdateValue"
        @input="onInput"
      />
      <p>
        <strong>Input value:</strong> {{ inputValue }}
      </p>
    </div>
  `
})
