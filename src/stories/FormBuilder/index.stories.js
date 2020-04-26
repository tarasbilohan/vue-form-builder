import { action } from '@storybook/addon-actions'
import get from 'lodash/get'
import set from 'lodash/set'
import defaultTo from 'lodash/defaultTo'
import FormBuilder from '../../components/FormBuilder.vue'
import { model, schema } from '../Shared/user'

export default {
  component: FormBuilder,
  title: 'Form Builder'
}

export const withUserModel = () => ({
  components: { FormBuilder },
  data () {
    return {
      id: 'form-builder',
      model,
      schema,
      errors: {}
    }
  },
  methods: {
    onUpdateModel (model) {
      action('update:model')(model)
      this.$set(this, 'model', model)
    },
    onSubmit (event) {
      action('submit')(event)

      if (this.validate()) {
        action('success')(this.model)
      }
    },
    validate () {
      const errors = {}

      if (defaultTo(get(this.model, 'firstName'), '').trim().length === 0) {
        set(errors, 'firstName', ['Field first name is required.'])
      }

      if (defaultTo(get(this.model, 'lastName'), '').trim().length === 0) {
        set(errors, 'lastName', ['Field last name is required.'])
      }

      if (defaultTo(get(this.model, 'email'), '').trim().length === 0) {
        set(errors, 'email', ['Field email is required.'])
      }

      if (defaultTo(get(this.model, 'password'), '').trim().length === 0) {
        set(errors, 'password', ['Field password is required.'])
      }

      if (defaultTo(get(this.model, 'isAgreed'), false) === false) {
        set(errors, 'isAgreed', ['Field is agreed is required.'])
      }

      this.$set(this, 'errors', errors)

      return !Object.keys(this.errors).length
    }
  },
  template: `
    <div>
      <form-builder
        :id="id"
        :model="model"
        :schema="schema"
        :errors="errors"
        @update:model="onUpdateModel"
        @submit="onSubmit"
      />
      <pre style="padding: 10px; background: #eee; border: 1px solid #ddd; border-radius: 3px;">{{ model }}</pre>
      <pre style="padding: 10px; background: #eee; border: 1px solid #ddd; border-radius: 3px;">{{ errors }}</pre>
    </div>
  `
})
