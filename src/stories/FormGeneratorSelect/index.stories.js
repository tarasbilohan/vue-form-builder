import { withKnobs, text, boolean, array, object } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import FormGeneratorSelect from '../../components/FormGeneratorSelect.vue'

export default {
  component: FormGeneratorSelect,
  title: 'Form Generator Select',
  decorators: [withKnobs]
}

export const withDynamicProps = () => ({
  components: { FormGeneratorSelect },
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
    placeholder: {
      default: text('Placeholder', 'Please select')
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
      selectValue: ''
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
        this.selectValue = value
      },
      immediate: true
    }
  },
  methods: {
    onInput: action('input'),
    onUpdateValue: action('update:value')
  },
  template: `
    <div>
      <form-generator-select
        :id="id"
        v-model="selectValue"
        :errors="errors"
        :label="label"
        :options="formattedOptions"
        :form-group-class-name="formGroupClassName"
        :help="help"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        @input="onInput"
        @update:value="onUpdateValue"
      />
      <p>
        <strong>Select value:</strong> {{ selectValue }}
      </p>
    </div>
  `
})

export const withAsyncOptions = () => ({
  components: { FormGeneratorSelect },
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
    formGroupClassName: {
      default: text('Form group class name', '')
    },
    placeholder: {
      default: text('Placeholder', 'Please select')
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
  computed: {
    options () {
      return () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            return resolve([
              { value: 'foo', label: 'Foo' },
              { value: 'bar', label: 'Bar' }
            ])
          }, 1000)
        })
      }
    }
  },
  data () {
    return {
      selectValue: ''
    }
  },
  watch: {
    value: {
      handler (value) {
        this.selectValue = value
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
      <form-generator-select
        :id="id"
        v-model="selectValue"
        :errors="errors"
        :label="label"
        :options="options"
        :form-group-class-name="formGroupClassName"
        :help="help"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        @update:value="onUpdateValue"
        @input="onInput"
      />
      <p>
        <strong>Select value:</strong> {{ selectValue }}
      </p>
    </div>
  `
})
