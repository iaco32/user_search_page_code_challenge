import { shallowMount } from '@vue/test-utils'
import UserList from '@/components/UserList.vue'
jest.mock('axios')

describe('UserList.vue', () => {
  it('expect to match with a snapshot when passed', () => {
    const wrapper = shallowMount(UserList, {
    })
    expect(wrapper.text()).toMatchSnapshot()
  })
});