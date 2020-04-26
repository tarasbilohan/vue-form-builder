import { action } from '@storybook/addon-actions'
import FormGeneratorCollection from '../../components/FormGeneratorCollection.vue'
import { schema, model, errors } from '../Shared/address'

export default {
  component: FormGeneratorCollection,
  title: 'Form Generator Collection'
}

export const withAddressModel = () => ({
  components: { FormGeneratorCollection },
  data () {
    return {
      value: [model],
      schema,
      errors: []
    }
  },
  methods: {
    onUpdateValue: action('update:value'),
    onInput: action('input')
  },
  template: `
    <div>
      <form-generator-collection
        v-model="value"
        :id="'collection'"
        :errors="errors"
        :schema="schema"
        :label="'Collection'"
        :form-group-class-name="'collection'"
        :help="'This is some collection help text.'"
        :required="true"
        :is-add-allow="true"
        :add-button-label="'Add new'"
        :is-delete-allowed="true"
        :delete-button-label="'Delete'"
        @update:value="onUpdateValue"
        @input="onInput"
      />
      <pre style="padding: 10px; background: #eee; border: 1px solid #ddd; border-radius: 3px;">{{ value }}</pre>
    </div>
  `
})

export const withErrors = () => ({
  components: { FormGeneratorCollection },
  data () {
    return {
      model: [model],
      schema,
      errors: [errors]
    }
  },
  methods: {
    onUpdateValue: action('update:value'),
    onInput: action('input')
  },
  template: `
    <div>
      <form-generator-collection
        v-model="model"
        :id="'collection'"
        :errors="errors"
        :schema="schema"
        :label="'Collection'"
        :form-group-class-name="'collection'"
        :help="'This is some collection help text.'"
        :required="true"
        :is-add-allow="true"
        :add-button-label="'Add new'"
        :is-delete-allowed="true"
        :delete-button-label="'Delete'"
        @update:value="onUpdateValue"
        @input="onInput"
      />
      <pre style="padding: 10px; background: #eee; border: 1px solid #ddd; border-radius: 3px;">{{ model }}</pre>
      <pre style="padding: 10px; background: #eee; border: 1px solid #ddd; border-radius: 3px;">{{ errors }}</pre>
    </div>
  `
})
