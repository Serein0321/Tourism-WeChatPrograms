Page({
  data: {
    primaryItems: [
      { title: '订单', desc: '待出行 2 · 已完成 8', url: '/pages/orders/orders' },
      { title: '最近浏览', desc: '继续查看钟楼夜游路线', url: '/pages/history/history' },
      { title: '我的收藏', desc: '景点 12 · 美食 9 · 路线 4', url: '/pages/favorites/favorites' },
      { title: '我的行程', desc: '西安两日轻松游', url: '/pages/trips/trips' }
    ],
    services: ['客服中心', '出行提醒', '发票助手', '设置']
  },
  goPage(e) {
    wx.navigateTo({ url: e.currentTarget.dataset.url })
  }
})
