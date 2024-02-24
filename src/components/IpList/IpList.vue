<script setup lang="ts">
import IpItem from '../IpItem/IpItem.vue'

defineProps<{
  list?: Array<{
    country?: string
    time?: string
    loading?: boolean
    error?: boolean
  }>
}>()

const emit = defineEmits<{
  (e: 'lookup', payload: { ip: string; index: number }): void
}>()

function onLookup(ip: string, index: number) {
  const payload = { ip, index }
  emit('lookup', payload)
}
</script>

<template>
  <ol v-if="list?.length" class="ip-list" data-testid="ip-list">
    <li v-for="(item, index) in list" :key="index" class="ip-item" data-testid="ip-list-item">
      <IpItem v-bind="item" @lookup="onLookup($event, index)" />
    </li>
  </ol>
</template>

<style scoped>
.ip-list {
  display: grid;
  gap: 2rem;
  list-style: none;
  counter-reset: ip-counter;
}

.ip-item {
  display: flex;
  counter-increment: ip-counter;

  &::before {
    flex-shrink: 0;
    content: counter(ip-counter);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
    margin-right: 1rem;
    background-color: var(--clr-tertiary);
    border-radius: 50%;
    font-size: 1.4rem;
  }
}
</style>
