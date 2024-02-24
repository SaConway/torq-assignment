<script setup lang="ts">
defineProps<{
  country?: string
  time?: string
  loading?: boolean
  error?: boolean
}>()

const emit = defineEmits<{
  (e: 'lookup', ip: string): void
}>()

function onInputBlur(event: FocusEvent) {
  const input = event.target as HTMLInputElement
  emit('lookup', input.value.trim())
}
</script>

<template>
  <div class="ip-item-container">
    <input type="text" :class="['input', error ? 'input-error' : '']" :disabled="loading" name="ip" autocomplete="off" aria-label="ip address" data-testid="ip-input" @blur="onInputBlur" />

    <img v-if="loading" class="loading" src="../../assets/icon-loading.svg" alt="" width="20" height="20" data-testid="loading" />

    <template v-if="!loading && !error">
      <span v-if="country" class="country" data-testid="country">{{ country }}</span>

      <span v-if="time" class="time" data-testid="time">{{ time }}</span>
    </template>

    <p v-if="!loading && error" class="error-msg" data-testid="error">Invalid IP, please try again</p>
  </div>
</template>

<style scoped>
.ip-item-container {
  display: inline-flex;
  gap: 0.5rem 1rem;
  align-items: center;
  flex-wrap: wrap;
}

.input {
  width: 25rem;
  padding: 0.5rem 1rem;
  background-color: var(--clr-secondary);
  border: 1px solid var(--clr-tertiary);

  &:disabled {
    opacity: 0.5;
  }

  &.input-error {
    outline: 2px solid var(--clr-error);
  }
}

.error-msg {
  flex-basis: 100%;
  font-size: 1.3rem;
  color: var(--clr-error);
}

.loading {
  animation: rotate 1.5s linear infinite;
}

@keyframes rotate {
  to {
    transform: rotate(360deg);
  }
}
</style>
