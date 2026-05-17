Page({
  data: {
    activeQuickEntry: '景区',
    quickEntries: [
      { label: '景区', icon: '景' },
      { label: '美食', icon: '食' },
      { label: '交通', icon: '行' },
      { label: '住宿', icon: '住' }
    ],
    roamCardsByType: {
      景区: [
        { title: '大唐不夜城', tag: '夜游推荐', desc: '沉浸式街区、演艺与美食动线。', imageStyle: 'gradient-night' },
        { title: '陕西历史博物馆', tag: '文化必看', desc: '用半天时间读懂千年长安。', imageStyle: 'gradient-xian' },
        { title: '华清宫', tag: '近郊路线', desc: '温泉、历史与骊山风景组合游。', imageStyle: 'gradient-mountain' },
        { title: '西安城墙', tag: '城市地标', desc: '骑行看古都中轴线，体验城墙四季风景。', imageStyle: 'gradient-xian' }
      ],
      美食: [
        { title: '回民街', tag: '烟火美食', desc: '从小吃到伴手礼的一站式体验。', imageStyle: 'gradient-food' },
        { title: '永兴坊', tag: '本地风味', desc: '集中品尝陕西各地特色小吃。', imageStyle: 'gradient-food' },
        { title: '洒金桥', tag: '夜宵路线', desc: '本地人常去的深夜美食街区。', imageStyle: 'gradient-night' },
        { title: '长安大排档', tag: '陕菜体验', desc: '适合多人聚餐的经典陕味餐厅。', imageStyle: 'gradient-xian' }
      ],
      交通: [
        { title: '地铁景点联程', tag: '出行效率', desc: '串联钟楼、城墙与大唐不夜城的快捷线路。', imageStyle: 'gradient-night' },
        { title: '机场快线攻略', tag: '到达城市', desc: '咸阳机场到市区地铁与大巴换乘建议。', imageStyle: 'gradient-mountain' },
        { title: '高铁到站接驳', tag: '车站出发', desc: '西安北站到热门片区的最优换乘方案。', imageStyle: 'gradient-xian' },
        { title: '夜间返程建议', tag: '安心返程', desc: '夜游后打车点位与末班地铁时间参考。', imageStyle: 'gradient-food' }
      ],
      住宿: [
        { title: '钟楼商圈酒店', tag: '交通便利', desc: '适合首次来西安，景点与餐饮密集。', imageStyle: 'gradient-night' },
        { title: '大雁塔亲子住区', tag: '亲子出行', desc: '周边景区丰富，夜景与休闲体验更好。', imageStyle: 'gradient-mountain' },
        { title: '城墙内精品民宿', tag: '文化氛围', desc: '在古城街巷里体验长安慢生活。', imageStyle: 'gradient-xian' },
        { title: '曲江度假酒店', tag: '高品质', desc: '适合放松度假的安静住区选择。', imageStyle: 'gradient-food' }
      ]
    },
    roamCards: []
  },
  onLoad() {
    this.updateRoamCards(this.data.activeQuickEntry)
  },
  updateRoamCards(entry) {
    const cards = this.data.roamCardsByType[entry] || []
    this.setData({
      roamCards: cards
    })
  },
  onQuickEntryTap(e) {
    const selectedEntry = e.currentTarget.dataset.entry
    this.setData({
      activeQuickEntry: selectedEntry
    })
    this.updateRoamCards(selectedEntry)
  }
})
