// 云函数入口文件
const cloud = require('wx-server-sdk')
const env = 'whisky-c8d7v'
cloud.init()
const db = cloud.database({ env });  //获取数据库的句柄

const getTime = function () {
  return new Promise((resolve, reject) => {
    var now = new Date();
    var month = now.getMonth() + 1;     //月
    var day = now.getDate();            //日
    var hour = now.getHours();            //时
    var minute = now.getMinutes();          //分
    // var time = `${month}${day}${hour}${minute}`
    var time = ''
    if (month < 10) time += "0";
    time += month + "-";

    if (day < 10) time += "0";
    time += day + " ";

    if (hour < 10) time += "0";
    time += hour + ":";

    if (minute < 10) time += '0';
    time += minute;
    resolve(time)
  })
}
// 云函数入口函数
exports.main = async (event, context) => {
  const userInfo = event.userInfo
  const createTime = await getTime()
  return await db.collection(event.releaseType).add({
    data: {
      releaseType: event.releaseType,
      releaseImg: event.releaseImg,
      releaseText: event.releaseText,
      thingsType: event.thingsType,
      releaseCall: event.releaseCall,
      releaseRemind: event.releaseRemind,

      createBy: userInfo.openId,
      createTime: createTime,
      deleted: false
    }
  })
    .then(res => {
      return db.collection('user-release').add({
        data: {
          releaseId: res._id,
          userId: userInfo.openId,
          deleted: false,
        }
      })
    })
}