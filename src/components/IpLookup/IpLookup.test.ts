import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import IpLookup from './IpLookup.vue'
import IpList from '../IpList/IpList.vue'
import IpLookupHeader from '../IpLookupHeader/IpLookupHeader.vue'

let wrapper = mount(IpLookup)
let vm = wrapper.vm as any

beforeEach(() => {
  wrapper = mount(IpLookup)
  vm = wrapper.vm
})

describe('IpLookup', () => {
  describe('render', () => {
    it('should render ip lookup header', () => {
      expect(wrapper.findComponent(IpLookupHeader).exists()).toBe(true)
    })

    it('should render ip list', () => {
      expect(wrapper.findComponent(IpList).exists()).toBe(true)
    })
  })

  describe('refs', () => {
    describe('list', () => {
      it('should initialize with an empty list', () => {
        expect(vm.list).toHaveLength(0)
      })

      it('should add an empty object to the list when addIP is called', () => {
        vm.addIP()

        expect(vm.list).toHaveLength(1)
        expect(vm.list[0]).toEqual({})
      })

      it('should update the list with a valid IP', async () => {
        vm.addIP()

        const index = 0
        const ip = '1.1.1.1'

        await vm.lookupIP({ ip, index })

        expect(vm.list[index]).not.toEqual({})
        expect(vm.list[index].ip).toBe(ip)
        expect(vm.list[index].time).toBeDefined()
        expect(vm.list[index].loading).toBe(false)
        expect(vm.list[index].error).toBeUndefined()
      })

      it('should set the error flag in the list when the IP is invalid', async () => {
        vm.addIP()

        const ip = 'invalid-ip'
        const index = 0

        await vm.lookupIP({ ip, index })

        expect(vm.list[index].error).toBe(true)
      })

      it('should update the time for the IP object', async () => {
        vm.addIP()

        const index = 0
        const ip = '1.1.1.1'

        await vm.lookupIP({ ip, index })

        const oldTime = vm.list[index].time

        setTimeout(() => expect(vm.list[index].time).not.toBe(oldTime), 1000)
      })
    })

    describe('searching', () => {
      it('should be initially set to false', () => {
        expect(vm.searching).toBe(false)
      })

      it('should be true when lookupIP is called', () => {
        vm.addIP()
        vm.lookupIP({ ip: '1.1.1.1', index: 0 })
        expect(vm.searching).toBe(true)
      })

      it('should be false after lookupIP is completed', async () => {
        vm.addIP()
        await vm.lookupIP({ ip: '1.1.1.1', index: 0 })
        expect(vm.searching).toBe(false)
      })
    })
  })
})
