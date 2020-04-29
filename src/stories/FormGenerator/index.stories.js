import '../Shared/styles.css'
import { action } from '@storybook/addon-actions'
import FormGenerator from '../../components/FormGenerator.vue'
import { model, schema, errors } from '../Shared/user'

export default {
  component: FormGenerator,
  title: 'Form Generator'
}

export const withUserModel = () => ({
  components: { FormGenerator },
  data () {
    return {
      id: 'form-generator',
      model,
      schema,
      errors: {}
    }
  },
  methods: {
    onUpdateModel (model) {
      action('update:model')(model)
      this.$set(this, 'model', model)
    }
  },
  template: `
    <div>
      <form-generator
        :id="id"
        :model="model"
        :schema="schema"
        :errors="errors"
        @update:model="onUpdateModel"
      />
      <pre class="vue-result-block">{{ model }}</pre>
    </div>
  `
})

export const withErrors = () => ({
  components: { FormGenerator },
  data () {
    return {
      id: 'form-generator',
      model,
      schema,
      errors
    }
  },
  methods: {
    onUpdateModel (model) {
      action('update:model')(model)
      this.$set(this, 'model', model)
    }
  },
  template: `
    <div>
      <form-generator
        :id="id"
        :model="model"
        :schema="schema"
        :errors="errors"
        @update:model="onUpdateModel"
      />
      <pre class="vue-result-block">{{ model }}</pre>
      <pre class="vue-result-block">{{ errors }}</pre>
    </div>
  `
})
