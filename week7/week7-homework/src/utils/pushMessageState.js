import emitter from '@/utils/emitter'
export default function (response, title = '更新') {
  if (response.data.success) {
    // 成功訊息
    emitter.emit('push-message', {
      style: 'success',
      title: `${title}成功`
    })
  } else {
    // 失敗訊息
    const message =
      typeof response.data.message === 'string'
        ? [response.data.message]
        : response.data.message
    emitter.emit('push-message', {
      style: 'danger',
      title: `${title}失敗`,
      content: message.join('、')
    })
  }
}
