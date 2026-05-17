Page({
  data: {
    trips: [
      { title: '西安两日轻松游', date: '05月18日 - 05月19日', stops: '钟楼 · 城墙 · 大唐不夜城' },
      { title: '亲子文化一日游', date: '06月02日', stops: '陕历博 · 大雁塔 · 曲江池' }
    ]
  },
  goPost() { wx.navigateTo({ url: '/pages/post/post' }) },
  goRating() { wx.navigateTo({ url: '/pages/rating/rating' }) },
  goShare() { wx.navigateTo({ url: '/pages/share/share' }) }
})
