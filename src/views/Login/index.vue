<template>
  <div class="login-container">
    <van-nav-bar
      class="nav-bar"
      title="登录"
      left-arrow
    />
    <van-form @submit="onSubmit" class="form" ref="form">
      <van-field
        name="mobile"
        placeholder="请输入手机号"
        v-model="mobile"
        :rules="mobileRules"

      >
        <template #label>
          <span class="toutiao toutiao-shouji"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        type="number"
        name="code"
        placeholder="请输入验证码"
        :rules="codeRules"

      >
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <template #button>
          <van-button v-if="isShowBtn"
          class="btn"
          size="small"
          round type="default"
          native-type="button"
          @click="sendCode">获取验证码</van-button>
          <van-count-down v-else :time="5*1000" format="ss秒" @finish="isShowBtn=true" />
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit"> 登录 </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { mobileRules, codeRules } from './rule.js'
import { loginAPI, sendCodeAPI } from '@/api'
import { mapMutations } from 'vuex'

export default {
  name: 'LoginPage',
  data() {
    return {
      mobile: '',
      code: '',
      mobileRules,
      codeRules,
      isShowBtn: true
    }
  },
  methods: {
    ...mapMutations(['SET_TOKEN']),

    async onSubmit() {
      // 登陆前加载中
      this.loading()

      try {
        const res = await loginAPI(this.mobile, this.code)
        this.SET_TOKEN(res.data.data)
        this.$router.push('/profile')
        this.$toast.success('登录成功')
      } catch (error) {
        // 细分一下失败提示
        if (error.response && error.response.status === 400) {
          this.$toast.fail(error.response.data.message)
        } else {
          this.$toast.clear()
        }
      }
    },
    loading() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
    },

    // 发送验证码
    async sendCode() {
      await this.$refs.form.validate('mobile')
      this.isShowBtn = false
      this.loading()
      try {
        await sendCodeAPI(this.mobile)
        this.$toast.success('发送验证码成功')
      } catch (error) {
        if (error.response && (error.response.status === 429 || error.response.status === 404)) {
          this.$toast.fail(error.response.data.message)
        } else {
          this.$toast.clear()
          throw error
        }
      }
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
.btn {
  width: 2.1rem;
  height: 0.64rem;
  background: #ededed;
  color: #666;
}
</style>
