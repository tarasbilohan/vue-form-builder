<template>
  <div
    :class="className"
    class="form-generator-form-field"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'FormGeneratorFormField',
  props: {
    className: {
      type: String,
      default: ''
    }
  }
})
</script>

<style lang="scss" scoped>
.form-generator-form-field {
  margin-bottom: 15px;
}
</style>
