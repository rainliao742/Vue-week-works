import emitter from '@/utils/emitter'
export default function (res = true, title = '更新', content) {
  if (res) {
    // 成功訊息
    emitter.emit('push-message', {
      style: 'success',
      title: `${title}成功`,
      content: content
    })
  } else {
    // 失敗訊息
    // const message =
    //   typeof res.data.message === 'string'
    //     ? [res.data.message]
    //     : res.data.message
    emitter.emit('push-message', {
      style: 'danger',
      title: `${title}失敗`,
      content: content
    })
  }
}
