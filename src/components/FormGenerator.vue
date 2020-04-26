<template>
  <div class="form-generator">
    <component
      :is="field.type"
      v-for="(field, index) in schema"
      :key="index"
      :value="getFieldValue(field)"
      :errors="getFieldErrors(field)"
      v-bind="getFieldProps(field)"
      class="form-generator__field"
      @update:value="onFieldUpdate(field, $event)"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import get from 'lodash/get'
import set from 'lodash/set'
import cloneDeep from 'lodash/cloneDeep'
import kebabCase from 'lodash/kebabCase'

import { Schema, Errors, Model, SchemaField, SchemaFieldParams, ErrorMessages } from '../types'

export default Vue.extend({
  name: 'FormGenerator',
  props: {
    id: {
      type: String,
      required: true
    },
    model: {
      type: Object as () => Model,
      required: true
    },
    schema: {
      type: Array as () => Schema,
      required: true
    },
    errors: {
      type: Object as () => Errors,
      default: () => ({})
    }
  },
  methods: {
    getFieldValue (field: SchemaField): unknown {
      return get(this.model, field.path)
    },
    getFieldErrors (field: SchemaField): ErrorMessages | Errors {
      return get(this.errors, field.path)
    },
    getFieldProps (field: SchemaField): SchemaFieldParams {
      const fieldParams = cloneDeep(field.params)

      // Merge form id with field id
      const fieldId = fieldParams.id || kebabCase(field.path)
      fieldParams.id = `${this.id}-${fieldId}`

      return fieldParams
    },
    onFieldUpdate (field: SchemaField, value: unknown) {
      const model = cloneDeep(this.model)

      set(model, field.path, value)

      this.$emit('update:model', model)
    }
  }
})
</script>

<style lang="scss" scoped>
.form-generator {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  &__field {
    flex-basis: 100%;

    &.half {
      flex-basis: calc(50% - 8px);
    }
  }
}
</style>
