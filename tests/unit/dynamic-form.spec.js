import { shallowMount } from '@vue/test-utils'
import DynamicForm from '@/components/DynamicForm.vue'

describe('dynamic form', () => {
  beforeEach(() => {
    fetch.resetMocks()
  })

  it('should render the title passed to it', () => {
    fetch.mockResponseOnce(JSON.stringify([{ id: 1, name: 'Schere', price: 42 }, { id: 2, name: 'Messer', price: 13 }]))

    const title = 'This is a title!'
    const wrapper = shallowMount(DynamicForm, {
      props: { title }
    })
    expect(wrapper.text()).toMatch(title)
  })
})
