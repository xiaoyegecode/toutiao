<template>
  <div>
    <van-picker
      title="更新性别"
      show-toolbar
      :columns="columns"
      :default-index="value"
      @confirm="onConfirm"
      @cancel="onCancel"
    ></van-picker>
  </div>
</template>

<script>
import { updateUserProfileAPI } from '@/api'
import { Toast } from 'vant'
export default {
  name: 'UpdateGender',
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      columns: ['男', '女'],
      defaultIndex: 1
    }
  },
  methods: {
    async onConfirm(value, index) {
      try {
        await updateUserProfileAPI({ gender: index })
        Toast.success('更新成功')
        this.$parent.$parent.isShowGenders = false
        this.$emit('input', index)
      } catch (error) {
        Toast.fail('更新失败')
      }
    },
    onCancel() {
      this.$parent.$parent.isShowGenders = false
    }
  }
}
</script>

<style></style>
