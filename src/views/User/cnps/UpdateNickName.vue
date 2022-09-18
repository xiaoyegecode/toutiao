<template>
  <div>
    <van-nav-bar
      title="更新昵称"
      left-text="取消"
      right-text="保存"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <van-field
      :border="false"
      v-model.trim="text"
      maxlength="7"
      show-word-limit
      placeholder="请输入新昵称"
    />
  </div>
</template>

<script>
import { updateUserProfileAPI } from '@/api'
import { Toast } from 'vant'
export default {
  name: 'UpdateNickName',
  data() {
    return {
      text: ''
    }
  },
  props: {
    value: {
      type: String,
      required: true
    }
  },
  created() {
    this.text = this.value
  },
  methods: {
    onClickLeft() {
      this.$parent.$parent.isShowNickName = false
    },
    async onClickRight() {
      if (this.text === '') return Toast('请填写昵称')
      try {
        await updateUserProfileAPI({ name: this.text })
        Toast.success('更新成功')
        this.$parent.$parent.isShowNickName = false
        this.$emit('input', this.text)
      } catch (error) {
        if (error.response && error.response.status === 409) {
          Toast.fail('昵称已存在')
          return
        }
        Toast.fail('更新失败')
      }
    }
  }
}
</script>

<style></style>
