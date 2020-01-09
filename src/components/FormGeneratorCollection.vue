<template>
  <form-generator-form-item
    :class-name="formGroupClassName"
    class="form-generator-collection"
  >
    <form-generator-label
      slot="label"
      :for-input="id"
      :label="label"
      :required="false"
      class="form-generator-collection__label"
    />
    <form-generator-help
      :help="help"
    />
    <div class="form-generator-collection__items">
      <div
        v-for="(item, index) in value"
        :key="index"
        class="form-generator-collection__item collection-item"
      >
        <form-generator
          :id="getFormGeneratorId(index)"
          :model="item"
          :schema="schema"
          :errors="getFormGeneratorErrors(index)"
          @update:model="onItemModelUpdate(index, $event)"
        />
        <div
          v-if="allowDelete"
          class="collection-item__actions"
        >
          <button
            type="button"
            class="form-generator-collection__btn btn-delete"
            @click.prevent="onDelete(index)"
          >
            {{ deleteButtonLabel }}
          </button>
        </div>
      </div>
      <button
        v-if="allowAdd"
        type="button"
        class="form-generator-collection__btn btn-add"
        @click.prevent="onAdd"
      >
        {{ addButtonLabel }}
      </button>
    </div>
  </form-generator-form-item>
</template>

<script lang="ts">
import Vue from 'vue'
import get from 'lodash/get'
import set from 'lodash/set'
import cloneDeep from 'lodash/cloneDeep'

import { Schema, Errors, Model } from '../types'

import FormGenerator from './FormGenerator.vue'
import FormGeneratorFormItem from './FormGeneratorFormItem.vue'
import FormGeneratorLabel from './FormGeneratorLabel.vue'
import FormGeneratorHelp from './FormGeneratorHelp.vue'

export default Vue.extend({
  name: 'FormGeneratorCollection',
  components: {
    FormGenerator,
    FormGeneratorFormItem,
    FormGeneratorLabel,
    FormGeneratorHelp
  },
  props: {
    id: {
      type: String as () => string,
      required: true
    },
    value: {
      type: Array as () => any[],
      required: true
    },
    errors: {
      type: Array as () => { [key: number]: Errors },
      default: () => {}
    },
    schema: {
      type: Array as () => Schema,
      required: true
    },
    label: {
      type: String as () => string,
      default: ''
    },
    formGroupClassName: {
      type: String as () => string,
      default: ''
    },
    help: {
      type: String as () => string,
      default: ''
    },
    required: {
      type: Boolean as () => boolean,
      default: true
    },
    allowAdd: {
      type: Boolean as () => boolean,
      default: false
    },
    addButtonLabel: {
      type: String as () => string,
      default: 'Add new'
    },
    allowDelete: {
      type: Boolean as () => boolean,
      default: false
    },
    deleteButtonLabel: {
      type: String as () => string,
      default: 'Delete'
    }
  },
  methods: {
    getFormGeneratorId (index: number): string {
      return `${this.id}-${index}`
    },
    getFormGeneratorErrors (index: number): Errors {
      return get(this.errors, index, {})
    },
    updateValue (value: Model) {
      this.$emit(`update:value`, value)
    },
    onItemModelUpdate (index: number, value: Model) {
      const clonedValue = cloneDeep(this.value)

      set(clonedValue, index, value)

      this.updateValue(clonedValue)
    },
    onDelete (index: number) {
      const clonedValue = cloneDeep(this.value)

      clonedValue.splice(index, 1)

      this.updateValue(clonedValue)
    },
    onAdd () {
      const clonedValue = cloneDeep(this.value)

      // TODO check this code
      const defaultItem = {}
      Object.values(this.schema).forEach((field) => {
        set(defaultItem, field.path, field.params.default || '')
      })

      clonedValue.push(defaultItem)

      this.updateValue(clonedValue)
    }
  }
})
</script>

<style lang="scss" scoped>
.form-generator-collection {
  &__label {
    margin-bottom: 15px;
  }

  &__btn {
    border-radius: 4px;
    background-image: linear-gradient(to left, #9e9e9e, #b5b5b5);
    font-size: 14px;
    font-weight: bold;
    letter-spacing: 0.88px;
    color: #fff;
    text-align: center;
    border: none;
    padding: 5px 10px;
  }

  .btn-add {
    background-image: linear-gradient(to left, #329235, #41a544);
  }

  .btn-delete {
    background-image: linear-gradient(to left, #d84727, #de5638);
  }

  .collection-item {
    &__actions {
      text-align: right;
    }

    &::v-deep {
      .form-generator-form-item {
        padding: 0;
      }
    }
  }
}
</style>
