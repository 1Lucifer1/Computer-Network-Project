// 云函数入口文件
const cloud = require('wx-server-sdk')
const env = 'whisky-c8d7v'
cloud.init()
const db = cloud.database({ env });  //获取数据库的句柄

// 云函数入口函数
exports.main = async (event, context) => {
  // const openId = cloud.getWXContext().OPENID;  
  let releaseList = await db.collection('user-release')
    .where({
      deleted: false
    })
    .get()
  const currentPage = event.currentPage
  const releaseSize = 1000
  const sliceRelease = releaseSize * currentPage
  const newReleaseList = releaseList.data.slice(-sliceRelease)
  let returnResult = []
  for (let item of newReleaseList) {
    const oneRelease = await db.collection(event.tabbarText)
      .where({
        _id: item.releaseId,
        deleted: false
      })
      .get()

    // returnResult.push(oneRelease.data)
    if (oneRelease.data.length > 0) {
      const userInfo = await db.collection('goodUser')
        .where({
          openId: oneRelease.data[0].createBy
        })
        .get()
      oneRelease.data[0].createBy = userInfo.data[0];
      returnResult.unshift(oneRelease.data[0])
    }
  }
  return returnResult
}
