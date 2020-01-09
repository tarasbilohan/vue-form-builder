<template>
  <div
    v-if="firstError"
    class="form-generator-error"
  >
    {{ firstError }}
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { ErrorMessages } from '../types'

export default Vue.extend({
  name: 'FormGeneratorError',
  props: {
    errors: {
      type: Array as () => ErrorMessages,
      default: () => []
    }
  },
  computed: {
    firstError (): string | null {
      return this.errors[0] || null
    }
  }
})
</script>

<style lang="scss" scoped>
.form-generator-error {
  font-size: 14px;
  letter-spacing: 0.24px;
  margin-top: 5px;
  color: #b13232;
}
</style>
