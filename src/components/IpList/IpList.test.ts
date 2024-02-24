import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import IpList from './IpList.vue'
import IpItem from '../IpItem/IpItem.vue'

const list = [
  {
    country: 'US',
    time: '15:12:41',
    loading: false,
    error: false
  }
]

let wrapper = mount(IpList)

beforeEach(() => {
  wrapper = mount(IpList, {
    props: { list }
  })
})

describe('IpItem', () => {
  describe('render', () => {
    describe('default', () => {
      it('should render list', () => {
        expect(wrapper.find('[data-testid="ip-list"]').exists()).toBe(true)
      })

      it('should render list item', () => {
        expect(wrapper.find('[data-testid="ip-list-item"]').exists()).toBe(true)
      })

      it('should render ip item', () => {
        expect(wrapper.findComponent(IpItem).exists()).toBe(true)
      })
    })

    describe('empty', () => {
      beforeEach(async () => {
        await wrapper.setProps({ list: [] })
      })

      it('should not render list', () => {
        expect(wrapper.find('[data-testid="ip-list"]').exists()).toBe(false)
      })

      it('should not render list item', () => {
        expect(wrapper.find('[data-testid="ip-list-item"]').exists()).toBe(false)
      })

      it('should not render ip item', () => {
        expect(wrapper.findComponent(IpItem).exists()).toBe(false)
      })
    })
  })

  describe('props', () => {
    it('should receive list', () => {
      expect(wrapper.props().list).toEqual(list)
    })
  })

  describe('emits', () => {
    it('should emit lookup event', async () => {
      const ip = '1.1.1.1'
      wrapper.findComponent(IpItem).vm.$emit('lookup', ip)

      const emit = wrapper.emitted('lookup')
      expect(emit).toBeTruthy()
      expect(emit?.at(0)).toEqual([{ ip, index: 0 }])
    })
  })
})
