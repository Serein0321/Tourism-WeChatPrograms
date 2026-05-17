Page({
  data: {
    posts: [
      { title: '夜游大唐不夜城', type: '行程分享', score: '4.9', desc: '灯光、演艺和美食适合安排在第一晚。' },
      { title: '城墙骑行半日线', type: '攻略', score: '4.8', desc: '从永宁门上城墙，傍晚体验最好。' },
      { title: '钟鼓楼周边美食', type: '评价打分', score: '4.7', desc: '步行可达多家老字号，适合慢慢逛。' }
    ],
    tags: ['亲子', '夜游', '历史文化', '美食路线']
  },
  goPost() {
    wx.navigateTo({ url: '/pages/post/post' })
  },
  goRating() {
    wx.navigateTo({ url: '/pages/rating/rating' })
  },
  goShare() {
    wx.navigateTo({ url: '/pages/share/share' })
  }
})
