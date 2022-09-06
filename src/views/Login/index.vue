<template>
  <div class="login-container">
    <van-nav-bar
      class="nav-bar"
      title="登录"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-form @submit="onSubmit" class="form">
      <van-field
        name="mobie"
        placeholder="请输入手机号"
        v-model="mobile"
        :rules="[
          { required: true, message: '请填写手机号' },
          { pattern: /^1[3|4|5|7|8|9]\d{9}$/, message: '手机号格式错误' }
        ]"
      >
        <template #label>
          <span class="toutiao toutiao-shouji"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        type="number"
        name="密码"
        placeholder="请输入验证码"
        :rules="[
          { required: true, message: '请输入验证码' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]"
      >
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <template #button>
          <van-button size="small" type="primary">发送验证码</van-button>
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit"> 登录 </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { Toast } from 'vant'
export default {
  name: 'LoginPage',
  data() {
    return {
      mobile: '',
      code: ''
    }
  },
  methods: {
    onClickLeft() {
      Toast('返回')
    },
    onSubmit(values) {
      console.log('submit', values)
    }
  }
}
</script>

<style scoped lang="less">
.nav-bar {
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
}
:deep(.form) {
  .van-field__label {
    flex:1;
  }
  .van-field__value {
    flex: 19;
  }
  .toutiao {
    font-size: 40px;
  }

}
</style>
