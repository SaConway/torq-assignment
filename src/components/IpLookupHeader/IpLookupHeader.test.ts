import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import IpLookupHeader from './IpLookupHeader.vue'

const wrapper = mount(IpLookupHeader)

describe('IpLookup', () => {
  describe('render', () => {
    it('should render title', () => {
      expect(wrapper.find('[data-testid="ip-lookup-title"]').exists()).toBe(true)
    })

    it('should render instructions', () => {
      expect(wrapper.find('[data-testid="ip-lookup-instructions"]').exists()).toBe(true)
    })

    it('should render add ip button', () => {
      expect(wrapper.find('[data-testid="btn-add-ip"]').exists()).toBe(true)
    })
  })

  describe('props', () => {
    it('should receive disabled', async () => {
      await wrapper.setProps({ disabled: true })
      expect(wrapper.props().disabled).toBe(true)
      await wrapper.setProps({ disabled: undefined })
    })
  })

  describe('emits', () => {
    it('should emit add event', async () => {
      const btn = wrapper.find('[data-testid="btn-add-ip"]')
      await btn.trigger('click')
      expect(wrapper.emitted('add')).toBeTruthy()
    })
  })
})
