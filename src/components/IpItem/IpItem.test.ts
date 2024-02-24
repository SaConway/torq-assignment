import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import IpItem from './IpItem.vue'

const country = 'US'
const time = '15:12:41'

let wrapper = mount(IpItem)

beforeEach(() => {
  wrapper = mount(IpItem, {
    props: {
      country,
      time,
      loading: false,
      error: false
    }
  })
})

describe('IpItem', () => {
  describe('render', async () => {
    describe('default', () => {
      it('should render input', () => {
        expect(wrapper.find('[data-testid="ip-input"]').exists()).toBe(true)
      })

      it('should render country', () => {
        expect(wrapper.find('[data-testid="country"]').exists()).toBe(true)
      })

      it('should render time', () => {
        expect(wrapper.find('[data-testid="time"]').exists()).toBe(true)
      })

      it('should not render loading', () => {
        expect(wrapper.find('[data-testid="loading"]').exists()).toBe(false)
      })

      it('should not render error', () => {
        expect(wrapper.find('.input-error').exists()).toBe(false)
        expect(wrapper.find('[data-testid="error"]').exists()).toBe(false)
      })
    })

    describe('loading', async () => {
      beforeEach(async () => {
        await wrapper.setProps({ loading: true })
      })

      it('should render input', () => {
        expect(wrapper.find('[data-testid="ip-input"]').exists()).toBe(true)
      })

      it('should render loading', async () => {
        expect(wrapper.find('[data-testid="loading"]').exists()).toBe(true)
      })

      it('should not render country', async () => {
        expect(wrapper.find('[data-testid="country"]').exists()).toBe(false)
      })

      it('should not render time', () => {
        expect(wrapper.find('[data-testid="time"]').exists()).toBe(false)
      })

      it('should not render error', () => {
        expect(wrapper.find('.input-error').exists()).toBe(false)
        expect(wrapper.find('[data-testid="error"]').exists()).toBe(false)
      })
    })

    describe('error', async () => {
      beforeEach(async () => {
        await wrapper.setProps({ error: true })
      })

      it('should render input', () => {
        expect(wrapper.find('[data-testid="ip-input"]').exists()).toBe(true)
      })

      it('should render error', async () => {
        expect(wrapper.find('.input-error').exists()).toBe(true)
        expect(wrapper.find('[data-testid="error"]').exists()).toBe(true)
      })

      it('should not render country', () => {
        expect(wrapper.find('[data-testid="country"]').exists()).toBe(false)
      })

      it('should not render time', () => {
        expect(wrapper.find('[data-testid="time"]').exists()).toBe(false)
      })

      it('should not render loading', () => {
        expect(wrapper.find('[data-testid="loading"]').exists()).toBe(false)
      })
    })
  })

  describe('props', () => {
    it('should receive country', () => {
      expect(wrapper.props().country).toBe(country)
    })

    it('should receive time', () => {
      expect(wrapper.props().time).toBe(time)
    })

    it('should receive loading', async () => {
      await wrapper.setProps({ loading: true })
      expect(wrapper.props().loading).toBe(true)
      await wrapper.setProps({ loading: false })
      expect(wrapper.props().loading).toBe(false)
    })

    it('should receive error', async () => {
      await wrapper.setProps({ error: false })
      expect(wrapper.props().error).toBe(false)
      await wrapper.setProps({ error: true })
      expect(wrapper.props().error).toBe(true)
    })
  })

  describe('emits', () => {
    it('should emit lookup event', async () => {
      const input = wrapper.find('[data-testid="ip-input"]')
      const ip = '1.1.1.1'
      await input.setValue(ip)
      await input.trigger('blur')

      const emit = wrapper.emitted('lookup')
      expect(emit).toBeTruthy()
      expect(emit?.at(0)).toEqual([ip])
    })
  })
})
