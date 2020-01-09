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
      type: String as () => string,
      required: true
    },
    label: {
      type: String as () => string,
      required: true
    },
    required: {
      type: Boolean as () => boolean,
      default: true
    }
  }
})
</script>

<style lang="scss" scoped>
.form-generator-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.3px;
  margin-bottom: 5px;
}
</style>
