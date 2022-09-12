import { shallowMount } from '@vue/test-utils';
// import Vue from 'vue';
import LoginForm from './LoginForm.vue';

describe('LoginForm.vue', () => {
  test('ID는 이메일 형식이 아니면 경고 메세지가 출력된다.', () => {
    // isntance === wrapper
    // const instance = new Vue(LoginForm).$mount();
    // const wrapper = shallowMount(LoginForm);
    const wrapper = shallowMount(LoginForm, {
      data() {
        return {
          username: 'test@test.co',
        };
      },
    });
    // const idInput = wrapper.find('#username');
    // console.log(idInput.element.value);
    // console.log(wrapper.vm.isUsernameValid);

    const wran = wrapper.find('.warning');
    expect(wran.exists()).toBeTruthy();
  });

  test('ID와 PW가 입력되지 않으면 로그인 버튼이 비활성화 된다.', () => {
    const wrapper = shallowMount(LoginForm, {
      data() {
        return {
          username: '',
          password: '',
        };
      },
    });
    const loginBtn = wrapper.find('button');
    expect(loginBtn.element.disabled).toBeTruthy();
  });
});
