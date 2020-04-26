<template>
  <label
    v-if="label"
    :for="forInput"
    class="form-generator-label"
  >
    {{ label }} <span v-if="required">*</span>
  </label>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'FormGeneratorLabel',
  props: {
    forInput: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    required: {
      type: Boolean,
      default: true
    }
  }
})
</script>

<style lang="scss">
.form-generator-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.3px;
  margin-bottom: 5px;
}
</style>
