// 云函数入口文件
const cloud = require('wx-server-sdk')
const env = 'whisky-c8d7v'
cloud.init()
const db = cloud.database({ env });  //获取数据库的句柄

// 云函数入口函数
exports.main = async (event, context) => {
  const userInfo = event.userInfo

  // 先查询有无用户openId
  const checkUser = await db.collection('goodUser')
    .where({
      openId: userInfo.openId
    })
    .get()
  // 如果有用户，则更新基本用户信息
  if (checkUser.data.length > 0) {
    await db.collection('goodUser').doc(checkUser.data[0]._id)
      .update({
        data: {
          avatarUrl: event.avatarUrl,
          nickName: event.nickName,
        }
      })
  } else {
    const insertResult = await db.collection('goodUser').add({
      data: {
        avatarUrl: event.avatarUrl,
        nickName: event.nickName,
        openId: event.userInfo.openId,
        createTime: new Date()
      }
    })
  }
}