<script setup lang="ts">
import { onUnmounted, ref } from 'vue'
import { getTimeFromTimezone, isValidIP } from '../../utils'
import { IPInfo } from '../../types'
import ipService from '../../services/ipService'
import IpLookupHeader from '../IpLookupHeader/IpLookupHeader.vue'
import IpList from '../IpList/IpList.vue'

let liveTimeIntervalId: NodeJS.Timeout | number = 0

const list = ref<IPInfo[]>([])
const searching = ref(false)

function addIP() {
  list.value.push({})
}

async function lookupIP({ ip, index }: { ip: string; index: number }) {
  if (ip === list.value[index].ip) return

  if (!isValidIP(ip)) {
    list.value[index] = { error: true }
    clearLiveTimeInterval()
    return
  }

  searching.value = true
  list.value[index] = { loading: true }

  try {
    const ipInfo = await ipService.lookupIP(ip)
    list.value[index] = ipInfo

    setLiveTimeInterval()
  } catch {
    list.value[index].error = true

    clearLiveTimeInterval()
  } finally {
    searching.value = false
    list.value[index].loading = false
  }
}

function setLiveTimeInterval() {
  if (liveTimeIntervalId) return
  liveTimeIntervalId = setInterval(updateLiveTime, 1000)
}

function clearLiveTimeInterval() {
  if (!liveTimeIntervalId) return
  // If there are still items with time, don't clear the interval
  if (list.value.some(item => item.time)) return

  clearInterval(liveTimeIntervalId)
  liveTimeIntervalId = 0
}

function updateLiveTime() {
  list.value.forEach(item => {
    if (!item.timezone) return
    item.time = getTimeFromTimezone(item.timezone)
  })
}

onUnmounted(() => clearInterval(liveTimeIntervalId))
</script>

<template>
  <IpLookupHeader :disabled="searching" @add="addIP" />

  <IpList :list="list" @lookup="lookupIP" />
</template>
