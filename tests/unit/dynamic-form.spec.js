import { shallowMount, flushPromises } from '@vue/test-utils'
import DynamicForm from '@/components/DynamicForm.vue'

describe('dynamic form', () => {
  const emptyResponse = []
  const twoItemResponse = [
    { id: 1, name: 'Schere', price: 42 },
    { id: 2, name: 'Messer', price: 13 }
  ]

  beforeEach(() => {
    fetch.resetMocks()
  })

  it('should render the title passed to it', () => {
    fetch.mockResponseOnce(JSON.stringify(emptyResponse))

    const title = 'This is a title!'
    const wrapper = shallowMount(DynamicForm, {
      props: { title }
    })
    expect(wrapper.text()).toMatch(title)
  })

  it('should render the items from the backend', async () => {
    fetch.mockResponseOnce(JSON.stringify(twoItemResponse))

    const item = twoItemResponse[0].name
    const wrapper = shallowMount(DynamicForm)

    await flushPromises()

    expect(wrapper.text()).toContain(item)
  })

  it('should render message when no items received from backend', async () => {
    fetch.mockResponseOnce(JSON.stringify(emptyResponse))

    const msg = 'No products yet'
    const wrapper = shallowMount(DynamicForm)

    await flushPromises()

    expect(wrapper.text()).toContain(msg)
  })
})
