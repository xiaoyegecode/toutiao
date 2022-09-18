<template>
  <div>
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @confirm="onConfirm"
      @cancel="onCancel"
    />
  </div>
</template>

<script>
import dayJs from 'dayjs'
import { updateUserProfileAPI } from '@/api'
import { Toast } from 'vant'

export default {
  name: 'UpdateBirthday',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: null
    }
  },
  created() {
    this.currentDate = new Date(this.value)
  },

  methods: {
    async onConfirm(value) {
      const formatTime = dayJs(value).format('YYYY-MM-DD')
      try {
        await updateUserProfileAPI({ birthday: formatTime })
        Toast.success('更新成功')
        this.$parent.$parent.isShowBirthday = false
        this.$emit('input', formatTime)
      } catch (error) {
        Toast.fail('更新失败')
      }
    },
    onCancel() {
      this.$parent.$parent.isShowBirthday = false
    }
  }
}
</script>

<style></style>
