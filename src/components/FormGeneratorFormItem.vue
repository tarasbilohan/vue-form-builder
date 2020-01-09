<template>
  <div
    :class="className"
    class="form-generator-form-item"
  >
    <slot name="label" />
    <slot />
    <slot name="help" />
    <slot name="error" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'FormGeneratorFormItem',
  props: {
    className: {
      type: String as () => string,
      default: ''
    }
  }
})
</script>

<style lang="scss" scoped>
.form-generator-form-item {
  margin-bottom: 15px;
}
</style>
