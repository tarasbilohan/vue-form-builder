import '../Shared/styles.css'
import defaultsDeep from 'lodash/defaultsDeep'
import { action } from '@storybook/addon-actions'
import FormBuilder from '../../components/FormBuilder.vue'
import {
  model,
  schema,
  validateUser,
  firstNameField,
  lastNameField,
  emailField,
  passwordField,
  isAgreedField
} from '../Shared/user'

export default {
  component: FormBuilder,
  title: 'Form Builder'
}

const methods = {
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
    const errors = validateUser(this.model)

    this.$set(this, 'errors', errors)

    return !Object.keys(this.errors).length
  }
}

export const userForm = () => ({
  components: { FormBuilder },
  data () {
    return {
      id: 'user-form',
      model,
      schema,
      errors: {}
    }
  },
  methods,
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
      <pre class="vue-result-block">{{ model }}</pre>
      <pre class="vue-result-block">{{ errors }}</pre>
    </div>
  `
})

export const loginForm = () => ({
  components: { FormBuilder },
  data () {
    return {
      id: 'login-form',
      model,
      schema: [
        emailField,
        defaultsDeep({
          params: {
            autocomplete: 'on'
          }
        }, passwordField)
      ],
      errors: {}
    }
  },
  methods,
  template: `
    <div>
      <form-builder
        :id="id"
        :model="model"
        :schema="schema"
        :errors="errors"
        :autocomplete="'off'"
        @update:model="onUpdateModel"
        @submit="onSubmit"
      />
      <pre class="vue-result-block">{{ model }}</pre>
      <pre class="vue-result-block">{{ errors }}</pre>
    </div>
  `
})

export const registerForm = () => ({
  components: { FormBuilder },
  data () {
    return {
      id: 'register-form',
      model,
      schema: [
        firstNameField,
        lastNameField,
        emailField,
        defaultsDeep({
          params: {
            autocomplete: 'new-password'
          }
        }, passwordField),
        isAgreedField
      ],
      errors: {}
    }
  },
  methods,
  template: `
    <div>
      <form-builder
        :id="id"
        :model="model"
        :schema="schema"
        :errors="errors"
        :autocomplete="'off'"
        @update:model="onUpdateModel"
        @submit="onSubmit"
      />
      <pre class="vue-result-block">{{ model }}</pre>
      <pre class="vue-result-block">{{ errors }}</pre>
    </div>
  `
})
