<script setup lang="ts">
defineProps<{
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'add'): void
}>()
</script>

<template>
  <div class="ip-lookup-header">
    <h1 class="title" data-testid="ip-lookup-title">IP Lookup</h1>

    <p data-testid="ip-lookup-instructions">Enter one or more IP addresses and get their country</p>

    <button class="btn-add" :disabled="disabled" data-testid="btn-add-ip" @click="emit('add')">
      <img src="../../assets/icon-plus.svg" alt="" width="15" height="15" />
      <span>Add</span>
    </button>
  </div>
</template>

<style scoped>
.ip-lookup-header {
  display: grid;
  gap: 2rem;
  padding-block: 2rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid var(--clr-tertiary);
}

.title {
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--clr-tertiary);
  font-size: 1.6rem;
}

.btn-add {
  justify-self: start;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: var(--clr-accent);
  color: var(--clr-secondary);
  border: none;
  line-height: 1.2;

  &:hover {
    opacity: 0.8;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
</style>
