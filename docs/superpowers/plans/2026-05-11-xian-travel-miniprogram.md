# 西安文旅微信小程序 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a runnable WeChat Mini Program static UI prototype for Xi'an travel with four tabs and static secondary pages.

**Architecture:** Use native Mini Program pages only: WXML for structure, WXSS for styling, JS for static data and navigation, JSON for page configuration. Replace the default template with focused tab pages and shared visual patterns; secondary pages are standalone static pages reached by `wx.navigateTo`.

**Tech Stack:** WeChat Mini Program native WXML/WXSS/JS/JSON, existing `project.config.json`, no backend, no map SDK, no external images.

---

## File Structure

Create or modify these files:

- Modify `app.json`: register all pages, configure window style, configure tabBar.
- Modify `app.js`: remove default logging/login behavior and keep minimal global app data.
- Modify `app.wxss`: add global page background, typography helpers, cards, pills, gradients, buttons, grids.
- Create/replace tab pages:
  - `pages/roam/roam.{wxml,wxss,js,json}`: 信息漫游 tab.
  - `pages/planner/planner.{wxml,wxss,js,json}`: 智能规划 tab.
  - `pages/community/community.{wxml,wxss,js,json}`: 旅行社区 tab.
  - `pages/profile/profile.{wxml,wxss,js,json}`: 个人中心 tab.
- Create secondary pages:
  - `pages/recommend/recommend.{wxml,wxss,js,json}`: 商品推荐.
  - `pages/compare/compare.{wxml,wxss,js,json}`: 商品对比.
  - `pages/route/route.{wxml,wxss,js,json}`: 路线规划.
  - `pages/crowd/crowd.{wxml,wxss,js,json}`: 历史客流.
  - `pages/holiday/holiday.{wxml,wxss,js,json}`: 节假日预测.
  - `pages/import-trip/import-trip.{wxml,wxss,js,json}`: 导入平台行程.
  - `pages/orders/orders.{wxml,wxss,js,json}`: 订单.
  - `pages/history/history.{wxml,wxss,js,json}`: 最近浏览.
  - `pages/favorites/favorites.{wxml,wxss,js,json}`: 我的收藏.
  - `pages/trips/trips.{wxml,wxss,js,json}`: 我的行程.
  - `pages/post/post.{wxml,wxss,js,json}`: 发帖.
  - `pages/rating/rating.{wxml,wxss,js,json}`: 评价打分.
  - `pages/share/share.{wxml,wxss,js,json}`: 分享.
- Leave existing `pages/index/*` and `pages/logs/*` unused unless cleanup is requested later.

## Task 1: App Shell and Global Style

**Files:**
- Modify: `app.json`
- Modify: `app.js`
- Modify: `app.wxss`

- [ ] **Step 1: Replace app configuration**

Write this exact `app.json`:

```json
{
  "pages": [
    "pages/roam/roam",
    "pages/planner/planner",
    "pages/community/community",
    "pages/profile/profile",
    "pages/recommend/recommend",
    "pages/compare/compare",
    "pages/route/route",
    "pages/crowd/crowd",
    "pages/holiday/holiday",
    "pages/import-trip/import-trip",
    "pages/orders/orders",
    "pages/history/history",
    "pages/favorites/favorites",
    "pages/trips/trips",
    "pages/post/post",
    "pages/rating/rating",
    "pages/share/share"
  ],
  "window": {
    "navigationBarTextStyle": "black",
    "navigationBarTitleText": "西安漫游",
    "navigationBarBackgroundColor": "#f7fbf6",
    "backgroundColor": "#f7fbf6"
  },
  "tabBar": {
    "color": "#7f8f89",
    "selectedColor": "#27b37e",
    "backgroundColor": "#ffffff",
    "borderStyle": "white",
    "list": [
      {
        "pagePath": "pages/roam/roam",
        "text": "信息漫游"
      },
      {
        "pagePath": "pages/planner/planner",
        "text": "智能规划"
      },
      {
        "pagePath": "pages/community/community",
        "text": "旅行社区"
      },
      {
        "pagePath": "pages/profile/profile",
        "text": "个人中心"
      }
    ]
  },
  "style": "v2",
  "componentFramework": "glass-easel",
  "sitemapLocation": "sitemap.json",
  "lazyCodeLoading": "requiredComponents"
}
```

- [ ] **Step 2: Replace app bootstrap**

Write this exact `app.js`:

```js
App({
  globalData: {
    cityName: '西安',
    themeName: '清新旅游'
  }
})
```

- [ ] **Step 3: Replace global stylesheet**

Write this exact `app.wxss`:

```css
page {
  min-height: 100vh;
  background: #f7fbf6;
  color: #1f2d2a;
  font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Arial, sans-serif;
}

.page {
  min-height: 100vh;
  padding: 28rpx 28rpx 48rpx;
  box-sizing: border-box;
}

.page-title {
  font-size: 42rpx;
  font-weight: 700;
  color: #183c34;
}

.page-subtitle {
  margin-top: 10rpx;
  color: #6b7c76;
  font-size: 26rpx;
  line-height: 1.6;
}

.section {
  margin-top: 30rpx;
}

.section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: 700;
  color: #203d36;
}

.section-more {
  color: #27b37e;
  font-size: 24rpx;
}

.card {
  background: #ffffff;
  border-radius: 28rpx;
  box-shadow: 0 16rpx 40rpx rgba(39, 98, 83, 0.08);
  box-sizing: border-box;
}

.soft-card {
  background: rgba(255, 255, 255, 0.82);
  border: 1rpx solid rgba(39, 179, 126, 0.12);
  border-radius: 28rpx;
  box-shadow: 0 14rpx 34rpx rgba(80, 124, 112, 0.07);
  box-sizing: border-box;
}

.pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10rpx 18rpx;
  border-radius: 999rpx;
  background: #e9f8f0;
  color: #179369;
  font-size: 24rpx;
  white-space: nowrap;
}

.pill-blue {
  background: #e9f5ff;
  color: #2384c6;
}

.pill-orange {
  background: #fff3df;
  color: #c97719;
}

.gradient-xian {
  background: linear-gradient(135deg, #dff7ee 0%, #a9dcff 52%, #ffdca8 100%);
}

.gradient-night {
  background: linear-gradient(135deg, #89d4ff 0%, #b4e5d1 48%, #ffe5b4 100%);
}

.gradient-mountain {
  background: linear-gradient(135deg, #d8f3dc 0%, #b7e4c7 44%, #95d5b2 100%);
}

.primary-button {
  height: 76rpx;
  border-radius: 999rpx;
  background: linear-gradient(135deg, #30c58c, #3aa8f5);
  color: #ffffff;
  font-size: 28rpx;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
}

.secondary-button {
  height: 72rpx;
  border-radius: 999rpx;
  background: #eef8f3;
  color: #22986d;
  font-size: 28rpx;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
}

.grid-2 {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20rpx;
}

.grid-3 {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18rpx;
}

.muted {
  color: #78908a;
}
```

- [ ] **Step 4: Verify app configuration loads**

Run: open the project in WeChat Developer Tools and compile.

Expected: compile fails at this point because referenced pages do not exist yet. The missing page errors should name `pages/roam/roam` and other new pages.

- [ ] **Step 5: Commit shell changes**

```bash
git add app.json app.js app.wxss
git commit -m "chore: configure xian travel app shell"
```

## Task 2: Build Four Tab Pages

**Files:**
- Create: `pages/roam/roam.wxml`, `pages/roam/roam.wxss`, `pages/roam/roam.js`, `pages/roam/roam.json`
- Create: `pages/planner/planner.wxml`, `pages/planner/planner.wxss`, `pages/planner/planner.js`, `pages/planner/planner.json`
- Create: `pages/community/community.wxml`, `pages/community/community.wxss`, `pages/community/community.js`, `pages/community/community.json`
- Create: `pages/profile/profile.wxml`, `pages/profile/profile.wxss`, `pages/profile/profile.js`, `pages/profile/profile.json`

- [ ] **Step 1: Create 信息漫游 page**

Write `pages/roam/roam.json`:

```json
{
  "navigationBarTitleText": "信息漫游"
}
```

Write `pages/roam/roam.js`:

```js
Page({
  data: {
    heroSlides: [
      { title: '城墙晨光', desc: '从永宁门出发，感受古都清晨的第一缕光。', style: 'gradient-xian' },
      { title: '钟鼓楼夜色', desc: '灯火映照中轴线，夜游西安更有烟火气。', style: 'gradient-night' },
      { title: '秦岭山水', desc: '把城市漫游延伸到山野之间。', style: 'gradient-mountain' }
    ],
    roamCards: [
      { title: '大唐不夜城', tag: '夜游推荐', desc: '沉浸式街区、演艺与美食动线。' },
      { title: '陕西历史博物馆', tag: '文化必看', desc: '用半天时间读懂千年长安。' },
      { title: '回民街', tag: '烟火美食', desc: '从小吃到伴手礼的一站式体验。' },
      { title: '华清宫', tag: '近郊路线', desc: '温泉、历史与骊山风景组合游。' }
    ],
    experienceItems: [
      { title: '70% 自动切换', desc: '根据场景提示模拟美景切换。' },
      { title: '导入美景照片', desc: '后续可替换为真实图片上传入口。' }
    ]
  }
})
```

Write `pages/roam/roam.wxml`:

```xml
<view class="page roam-page">
  <view class="page-title">西安信息漫游</view>
  <view class="page-subtitle">用清新的方式浏览古都风景、文化体验与城市灵感。</view>

  <swiper class="hero-swiper" indicator-dots autoplay circular interval="3200">
    <swiper-item wx:for="{{heroSlides}}" wx:key="title">
      <view class="hero-card {{item.style}}">
        <view class="hero-pill">Xi'an Travel</view>
        <view class="hero-title">{{item.title}}</view>
        <view class="hero-desc">{{item.desc}}</view>
      </view>
    </swiper-item>
  </swiper>

  <view class="section">
    <view class="section-head">
      <view class="section-title">推荐漫游</view>
      <view class="section-more">换一组</view>
    </view>
    <view class="grid-2">
      <view class="roam-card card" wx:for="{{roamCards}}" wx:key="title">
        <view class="roam-image gradient-xian"></view>
        <view class="pill">{{item.tag}}</view>
        <view class="roam-title">{{item.title}}</view>
        <view class="roam-desc">{{item.desc}}</view>
      </view>
    </view>
  </view>

  <view class="section">
    <view class="section-title">用户体验</view>
    <view class="experience-list">
      <view class="experience-card soft-card" wx:for="{{experienceItems}}" wx:key="title">
        <view>
          <view class="experience-title">{{item.title}}</view>
          <view class="experience-desc">{{item.desc}}</view>
        </view>
        <view class="experience-arrow">›</view>
      </view>
    </view>
  </view>
</view>
```

Write `pages/roam/roam.wxss`:

```css
.hero-swiper {
  height: 360rpx;
  margin-top: 28rpx;
  border-radius: 34rpx;
  overflow: hidden;
}

.hero-card {
  height: 100%;
  padding: 40rpx;
  border-radius: 34rpx;
  color: #143b33;
  box-sizing: border-box;
}

.hero-pill {
  display: inline-flex;
  padding: 10rpx 18rpx;
  border-radius: 999rpx;
  background: rgba(255, 255, 255, 0.72);
  font-size: 24rpx;
}

.hero-title {
  margin-top: 72rpx;
  font-size: 48rpx;
  font-weight: 800;
}

.hero-desc {
  width: 78%;
  margin-top: 16rpx;
  font-size: 26rpx;
  line-height: 1.6;
  color: #35534c;
}

.roam-card {
  padding: 18rpx;
}

.roam-image {
  height: 150rpx;
  border-radius: 22rpx;
  margin-bottom: 18rpx;
}

.roam-title {
  margin-top: 16rpx;
  font-size: 30rpx;
  font-weight: 700;
  color: #203d36;
}

.roam-desc {
  margin-top: 8rpx;
  color: #748780;
  font-size: 24rpx;
  line-height: 1.5;
}

.experience-list {
  margin-top: 18rpx;
  display: flex;
  flex-direction: column;
  gap: 18rpx;
}

.experience-card {
  padding: 24rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.experience-title {
  font-size: 30rpx;
  font-weight: 700;
}

.experience-desc {
  margin-top: 8rpx;
  color: #748780;
  font-size: 24rpx;
}

.experience-arrow {
  color: #27b37e;
  font-size: 48rpx;
}
```

- [ ] **Step 2: Create 智能规划 page**

Write `pages/planner/planner.json`:

```json
{
  "navigationBarTitleText": "智能规划"
}
```

Write `pages/planner/planner.js`:

```js
Page({
  data: {
    layers: [
      { name: '住宿', count: '128', color: 'green' },
      { name: '交通', count: '42', color: 'blue' },
      { name: '美食', count: '236', color: 'orange' },
      { name: '景点', count: '68', color: 'green' },
      { name: '公共设施', count: '91', color: 'blue' }
    ],
    tags: ['亲子游', '夜游西安', '历史文化', '美食路线', '错峰出行'],
    tools: [
      { title: '商品推荐', url: '/pages/recommend/recommend' },
      { title: '商品对比', url: '/pages/compare/compare' },
      { title: '路线规划', url: '/pages/route/route' },
      { title: '历史客流', url: '/pages/crowd/crowd' },
      { title: '节假日预测', url: '/pages/holiday/holiday' },
      { title: '导入平台行程', url: '/pages/import-trip/import-trip' }
    ]
  },
  goPage(e) {
    wx.navigateTo({ url: e.currentTarget.dataset.url })
  }
})
```

Write `pages/planner/planner.wxml`:

```xml
<view class="page planner-page">
  <view class="page-title">智能规划</view>
  <view class="search-card card">搜索西安景点、酒店、美食、停车场</view>

  <view class="map-card gradient-xian">
    <view class="map-title">西安 2D/3D 主题圈层</view>
    <view class="map-subtitle">静态地图占位 · 多色点位展示</view>
    <view class="map-dot dot-green dot-a"></view>
    <view class="map-dot dot-blue dot-b"></view>
    <view class="map-dot dot-orange dot-c"></view>
    <view class="map-dot dot-green dot-d"></view>
    <view class="popup-card">钟楼附近 · 热门景点 · 推荐停留 1.5h</view>
  </view>

  <view class="section">
    <view class="section-title">多主题圈层</view>
    <view class="layer-row">
      <view class="layer-card soft-card" wx:for="{{layers}}" wx:key="name">
        <view class="layer-dot {{item.color}}"></view>
        <view class="layer-name">{{item.name}}</view>
        <view class="layer-count">{{item.count}} 个点位</view>
      </view>
    </view>
  </view>

  <view class="planning-panel card">
    <view class="panel-handle"></view>
    <view class="section-head">
      <view class="section-title">上滑查看智能规划</view>
      <view class="section-more">静态面板</view>
    </view>
    <view class="tag-row">
      <view class="pill" wx:for="{{tags}}" wx:key="*this">{{item}}</view>
    </view>
    <view class="tool-grid">
      <view class="tool-item soft-card" wx:for="{{tools}}" wx:key="title" bindtap="goPage" data-url="{{item.url}}">
        <view class="tool-icon">{{index + 1}}</view>
        <view class="tool-title">{{item.title}}</view>
      </view>
    </view>
  </view>
</view>
```

Write `pages/planner/planner.wxss`:

```css
.search-card {
  margin-top: 24rpx;
  padding: 24rpx 28rpx;
  color: #8aa09a;
  font-size: 26rpx;
}

.map-card {
  position: relative;
  height: 430rpx;
  margin-top: 26rpx;
  border-radius: 34rpx;
  padding: 34rpx;
  box-sizing: border-box;
  overflow: hidden;
}

.map-title {
  font-size: 36rpx;
  font-weight: 800;
  color: #153d35;
}

.map-subtitle {
  margin-top: 10rpx;
  color: #507269;
  font-size: 24rpx;
}

.map-dot {
  position: absolute;
  width: 28rpx;
  height: 28rpx;
  border: 8rpx solid rgba(255, 255, 255, 0.82);
  border-radius: 50%;
  box-shadow: 0 8rpx 18rpx rgba(0, 0, 0, 0.12);
}

.dot-green,
.layer-dot.green {
  background: #27b37e;
}

.dot-blue,
.layer-dot.blue {
  background: #3aa8f5;
}

.dot-orange,
.layer-dot.orange {
  background: #ffad42;
}

.dot-a { left: 130rpx; top: 190rpx; }
.dot-b { right: 150rpx; top: 155rpx; }
.dot-c { left: 260rpx; bottom: 120rpx; }
.dot-d { right: 90rpx; bottom: 80rpx; }

.popup-card {
  position: absolute;
  left: 52rpx;
  right: 52rpx;
  bottom: 34rpx;
  padding: 20rpx 24rpx;
  border-radius: 22rpx;
  background: rgba(255, 255, 255, 0.84);
  color: #24443c;
  font-size: 24rpx;
}

.layer-row {
  display: flex;
  gap: 16rpx;
  overflow-x: auto;
  margin-top: 18rpx;
}

.layer-card {
  min-width: 190rpx;
  padding: 22rpx;
}

.layer-dot {
  width: 24rpx;
  height: 24rpx;
  border-radius: 50%;
}

.layer-name {
  margin-top: 18rpx;
  font-size: 28rpx;
  font-weight: 700;
}

.layer-count {
  margin-top: 8rpx;
  color: #78908a;
  font-size: 22rpx;
}

.planning-panel {
  margin-top: 30rpx;
  padding: 22rpx;
}

.panel-handle {
  width: 72rpx;
  height: 8rpx;
  margin: 0 auto 22rpx;
  border-radius: 999rpx;
  background: #d7e7e0;
}

.tag-row {
  display: flex;
  gap: 14rpx;
  overflow-x: auto;
  margin-bottom: 22rpx;
}

.tool-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16rpx;
}

.tool-item {
  padding: 22rpx 12rpx;
  text-align: center;
}

.tool-icon {
  width: 54rpx;
  height: 54rpx;
  line-height: 54rpx;
  margin: 0 auto 12rpx;
  border-radius: 20rpx;
  background: #e9f8f0;
  color: #27b37e;
  font-weight: 700;
}

.tool-title {
  font-size: 24rpx;
  color: #315048;
}
```

- [ ] **Step 3: Create 旅行社区 page**

Write `pages/community/community.json`:

```json
{
  "navigationBarTitleText": "旅行社区"
}
```

Write `pages/community/community.js`:

```js
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
```

Write `pages/community/community.wxml`:

```xml
<view class="page community-page">
  <view class="page-title">旅行社区</view>
  <view class="page-subtitle">分享西安行程、游记和真实体验。</view>

  <view class="compose-card gradient-night">
    <view>
      <view class="compose-title">记录我的西安之旅</view>
      <view class="compose-desc">发帖、评价、分享行程都可以从这里开始。</view>
    </view>
    <view class="compose-button" bindtap="goPost">去发帖</view>
  </view>

  <view class="section">
    <view class="tag-row">
      <view class="pill pill-blue" wx:for="{{tags}}" wx:key="*this">{{item}}</view>
    </view>
  </view>

  <view class="section">
    <view class="section-title">热门动态</view>
    <view class="post-list">
      <view class="post-card card" wx:for="{{posts}}" wx:key="title">
        <view class="post-image gradient-xian"></view>
        <view class="post-body">
          <view class="pill pill-orange">{{item.type}}</view>
          <view class="post-title">{{item.title}}</view>
          <view class="post-desc">{{item.desc}}</view>
          <view class="post-score">评分 {{item.score}}</view>
        </view>
      </view>
    </view>
  </view>

  <view class="community-actions grid-3">
    <view class="action-card soft-card" bindtap="goPost">发帖</view>
    <view class="action-card soft-card" bindtap="goRating">评价打分</view>
    <view class="action-card soft-card" bindtap="goShare">分享</view>
  </view>
</view>
```

Write `pages/community/community.wxss`:

```css
.compose-card {
  margin-top: 28rpx;
  padding: 34rpx;
  border-radius: 34rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.compose-title {
  font-size: 34rpx;
  font-weight: 800;
  color: #173e36;
}

.compose-desc {
  width: 360rpx;
  margin-top: 10rpx;
  font-size: 24rpx;
  color: #4b6a62;
  line-height: 1.5;
}

.compose-button {
  padding: 16rpx 24rpx;
  border-radius: 999rpx;
  background: #ffffff;
  color: #27b37e;
  font-size: 24rpx;
  font-weight: 700;
}

.tag-row {
  display: flex;
  gap: 14rpx;
  overflow-x: auto;
}

.post-list {
  margin-top: 18rpx;
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.post-card {
  padding: 18rpx;
  display: flex;
  gap: 20rpx;
}

.post-image {
  width: 190rpx;
  min-width: 190rpx;
  height: 160rpx;
  border-radius: 22rpx;
}

.post-title {
  margin-top: 12rpx;
  font-size: 30rpx;
  font-weight: 700;
}

.post-desc {
  margin-top: 8rpx;
  color: #748780;
  font-size: 24rpx;
  line-height: 1.45;
}

.post-score {
  margin-top: 10rpx;
  color: #f49b2f;
  font-size: 24rpx;
  font-weight: 700;
}

.community-actions {
  margin-top: 28rpx;
}

.action-card {
  padding: 24rpx 10rpx;
  text-align: center;
  color: #245047;
  font-size: 26rpx;
  font-weight: 700;
}
```

- [ ] **Step 4: Create 个人中心 page**

Write `pages/profile/profile.json`:

```json
{
  "navigationBarTitleText": "个人中心"
}
```

Write `pages/profile/profile.js`:

```js
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
```

Write `pages/profile/profile.wxml`:

```xml
<view class="page profile-page">
  <view class="user-card gradient-xian">
    <view class="avatar">旅</view>
    <view>
      <view class="user-name">西安旅客</view>
      <view class="user-desc">收藏灵感，规划下一段古都漫游。</view>
    </view>
  </view>

  <view class="section">
    <view class="section-title">我的服务</view>
    <view class="menu-list">
      <view class="menu-card card" wx:for="{{primaryItems}}" wx:key="title" bindtap="goPage" data-url="{{item.url}}">
        <view>
          <view class="menu-title">{{item.title}}</view>
          <view class="menu-desc">{{item.desc}}</view>
        </view>
        <view class="menu-arrow">›</view>
      </view>
    </view>
  </view>

  <view class="section">
    <view class="section-title">常用服务</view>
    <view class="grid-2 service-grid">
      <view class="service-card soft-card" wx:for="{{services}}" wx:key="*this">{{item}}</view>
    </view>
  </view>
</view>
```

Write `pages/profile/profile.wxss`:

```css
.user-card {
  padding: 36rpx;
  border-radius: 34rpx;
  display: flex;
  align-items: center;
  gap: 24rpx;
}

.avatar {
  width: 108rpx;
  height: 108rpx;
  border-radius: 36rpx;
  background: rgba(255, 255, 255, 0.72);
  color: #22a773;
  font-size: 46rpx;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-name {
  font-size: 36rpx;
  font-weight: 800;
  color: #183c34;
}

.user-desc {
  margin-top: 10rpx;
  color: #4b6a62;
  font-size: 24rpx;
}

.menu-list {
  margin-top: 18rpx;
  display: flex;
  flex-direction: column;
  gap: 18rpx;
}

.menu-card {
  padding: 26rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.menu-title {
  font-size: 30rpx;
  font-weight: 700;
}

.menu-desc {
  margin-top: 8rpx;
  color: #7b8f89;
  font-size: 24rpx;
}

.menu-arrow {
  color: #27b37e;
  font-size: 46rpx;
}

.service-grid {
  margin-top: 18rpx;
}

.service-card {
  padding: 28rpx;
  text-align: center;
  font-size: 26rpx;
  font-weight: 700;
  color: #245047;
}
```

- [ ] **Step 5: Compile four-tab shell**

Run: open the project in WeChat Developer Tools and compile.

Expected: four tab pages compile. Secondary pages are still missing, so compile may report missing paths for `pages/recommend/recommend` and later pages until Task 3 is complete.

- [ ] **Step 6: Commit tab pages**

```bash
git add pages/roam pages/planner pages/community pages/profile
git commit -m "feat: add xian travel tab pages"
```

## Task 3: Build Shared Secondary Page Pattern

**Files:**
- Create all secondary page files listed below.

- [ ] **Step 1: Create 商品推荐 page**

Write `pages/recommend/recommend.json`:

```json
{
  "navigationBarTitleText": "商品推荐"
}
```

Write `pages/recommend/recommend.js`:

```js
Page({
  data: {
    items: [
      { title: '城墙骑行体验', meta: '¥88 起 · 4.9 分', desc: '适合傍晚出发，俯瞰古城街巷。' },
      { title: '大唐不夜城夜游', meta: '¥128 起 · 4.8 分', desc: '含演艺推荐点位和美食路线。' },
      { title: '钟鼓楼讲解套票', meta: '¥68 起 · 4.7 分', desc: '适合第一次到访西安的旅客。' }
    ]
  }
})
```

Write `pages/recommend/recommend.wxml`:

```xml
<view class="page secondary-page">
  <view class="page-title">商品推荐</view>
  <view class="page-subtitle">基于西安热门体验的静态推荐卡片。</view>
  <view class="item-list">
    <view class="item-card card" wx:for="{{items}}" wx:key="title">
      <view class="item-image gradient-xian"></view>
      <view class="item-title">{{item.title}}</view>
      <view class="item-meta">{{item.meta}}</view>
      <view class="item-desc">{{item.desc}}</view>
    </view>
  </view>
</view>
```

Write `pages/recommend/recommend.wxss`:

```css
.item-list {
  margin-top: 28rpx;
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.item-card {
  padding: 20rpx;
}

.item-image {
  height: 180rpx;
  border-radius: 24rpx;
  margin-bottom: 18rpx;
}

.item-title {
  font-size: 32rpx;
  font-weight: 800;
}

.item-meta {
  margin-top: 8rpx;
  color: #27b37e;
  font-size: 24rpx;
  font-weight: 700;
}

.item-desc {
  margin-top: 8rpx;
  color: #748780;
  font-size: 24rpx;
  line-height: 1.5;
}
```

- [ ] **Step 2: Create 商品对比 page**

Write `pages/compare/compare.json`:

```json
{
  "navigationBarTitleText": "商品对比"
}
```

Write `pages/compare/compare.js`:

```js
Page({
  data: {
    rows: [
      { name: '城墙骑行', price: '¥88', score: '4.9', distance: '2.1km', reason: '风景开阔' },
      { name: '钟鼓楼讲解', price: '¥68', score: '4.7', distance: '0.8km', reason: '文化密度高' },
      { name: '不夜城夜游', price: '¥128', score: '4.8', distance: '5.6km', reason: '夜间氛围好' }
    ]
  }
})
```

Write `pages/compare/compare.wxml`:

```xml
<view class="page secondary-page">
  <view class="page-title">商品对比</view>
  <view class="page-subtitle">价格、评分、距离和推荐理由一屏对比。</view>
  <view class="compare-table card">
    <view class="compare-row compare-head">
      <view>项目</view><view>价格</view><view>评分</view><view>距离</view>
    </view>
    <view class="compare-row" wx:for="{{rows}}" wx:key="name">
      <view>{{item.name}}</view><view>{{item.price}}</view><view>{{item.score}}</view><view>{{item.distance}}</view>
      <view class="compare-reason">{{item.reason}}</view>
    </view>
  </view>
</view>
```

Write `pages/compare/compare.wxss`:

```css
.compare-table {
  margin-top: 28rpx;
  padding: 22rpx;
}

.compare-row {
  display: grid;
  grid-template-columns: 1.4fr 0.8fr 0.8fr 0.9fr;
  gap: 12rpx;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #edf4f0;
  font-size: 24rpx;
  color: #315048;
}

.compare-head {
  color: #7d918b;
  font-weight: 700;
}

.compare-reason {
  grid-column: 1 / 5;
  color: #27b37e;
  font-weight: 700;
}
```

- [ ] **Step 3: Create 路线规划 page**

Write `pages/route/route.json`:

```json
{
  "navigationBarTitleText": "路线规划"
}
```

Write `pages/route/route.js`:

```js
Page({
  data: {
    routes: [
      { title: '古城一日游', stops: ['钟楼', '鼓楼', '城墙', '回民街'], time: '约 8 小时' },
      { title: '夜游西安线', stops: ['大雁塔', '大唐不夜城', '曲江池'], time: '约 5 小时' },
      { title: '文化两日游', stops: ['陕历博', '碑林', '华清宫', '兵马俑'], time: '2 天' }
    ]
  }
})
```

Write `pages/route/route.wxml`:

```xml
<view class="page secondary-page">
  <view class="page-title">路线规划</view>
  <view class="page-subtitle">精选西安一日游、夜游和两日游路线。</view>
  <view class="route-list">
    <view class="route-card card" wx:for="{{routes}}" wx:key="title">
      <view class="route-title">{{item.title}}</view>
      <view class="route-time">{{item.time}}</view>
      <view class="stop-row">
        <view class="pill" wx:for="{{item.stops}}" wx:key="*this">{{item}}</view>
      </view>
    </view>
  </view>
</view>
```

Write `pages/route/route.wxss`:

```css
.route-list {
  margin-top: 28rpx;
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.route-card {
  padding: 26rpx;
}

.route-title {
  font-size: 32rpx;
  font-weight: 800;
}

.route-time {
  margin-top: 8rpx;
  color: #f49b2f;
  font-size: 24rpx;
  font-weight: 700;
}

.stop-row {
  margin-top: 18rpx;
  display: flex;
  flex-wrap: wrap;
  gap: 12rpx;
}
```

- [ ] **Step 4: Create 历史客流 page**

Write `pages/crowd/crowd.json`:

```json
{
  "navigationBarTitleText": "历史客流"
}
```

Write `pages/crowd/crowd.js`:

```js
Page({
  data: {
    bars: [35, 48, 76, 92, 68, 54, 40],
    tips: ['上午 10:00 后客流上升', '周六晚间大唐不夜城热度最高', '建议选择 9:00 前或 16:00 后入园']
  }
})
```

Write `pages/crowd/crowd.wxml`:

```xml
<view class="page secondary-page">
  <view class="page-title">历史客流</view>
  <view class="page-subtitle">静态趋势图展示热门时段和错峰建议。</view>
  <view class="chart-card card">
    <view class="bar-row">
      <view class="bar" wx:for="{{bars}}" wx:key="*this" style="height: {{item * 2}}rpx;"></view>
    </view>
  </view>
  <view class="tip-list">
    <view class="tip-card soft-card" wx:for="{{tips}}" wx:key="*this">{{item}}</view>
  </view>
</view>
```

Write `pages/crowd/crowd.wxss`:

```css
.chart-card {
  margin-top: 28rpx;
  padding: 32rpx;
}

.bar-row {
  height: 220rpx;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}

.bar {
  width: 54rpx;
  border-radius: 999rpx 999rpx 0 0;
  background: linear-gradient(180deg, #3aa8f5, #30c58c);
}

.tip-list {
  margin-top: 24rpx;
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.tip-card {
  padding: 24rpx;
  color: #315048;
  font-size: 26rpx;
}
```

- [ ] **Step 5: Create 节假日预测 page**

Write `pages/holiday/holiday.json`:

```json
{
  "navigationBarTitleText": "节假日预测"
}
```

Write `pages/holiday/holiday.js`:

```js
Page({
  data: {
    forecasts: [
      { day: '五一 Day 1', level: '高', advice: '优先预约博物馆，避开午后热门街区。' },
      { day: '五一 Day 2', level: '中高', advice: '适合安排城墙和钟鼓楼周边。' },
      { day: '端午假期', level: '中', advice: '推荐亲子文化路线和秦岭近郊。' }
    ]
  }
})
```

Write `pages/holiday/holiday.wxml`:

```xml
<view class="page secondary-page">
  <view class="page-title">节假日预测</view>
  <view class="page-subtitle">展示节假日热度、拥挤等级和推荐时间。</view>
  <view class="forecast-list">
    <view class="forecast-card card" wx:for="{{forecasts}}" wx:key="day">
      <view class="forecast-top">
        <view class="forecast-day">{{item.day}}</view>
        <view class="pill pill-orange">拥挤 {{item.level}}</view>
      </view>
      <view class="forecast-advice">{{item.advice}}</view>
    </view>
  </view>
</view>
```

Write `pages/holiday/holiday.wxss`:

```css
.forecast-list {
  margin-top: 28rpx;
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.forecast-card {
  padding: 26rpx;
}

.forecast-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.forecast-day {
  font-size: 32rpx;
  font-weight: 800;
}

.forecast-advice {
  margin-top: 16rpx;
  color: #748780;
  font-size: 26rpx;
  line-height: 1.6;
}
```

- [ ] **Step 6: Create 导入平台行程 page**

Write `pages/import-trip/import-trip.json`:

```json
{
  "navigationBarTitleText": "导入平台行程"
}
```

Write `pages/import-trip/import-trip.js`:

```js
Page({
  data: {
    steps: ['粘贴其他平台行程链接', '识别景点和时间', '自动生成西安路线'],
    result: ['Day 1：钟楼 → 城墙 → 回民街', 'Day 2：陕历博 → 大雁塔 → 大唐不夜城']
  }
})
```

Write `pages/import-trip/import-trip.wxml`:

```xml
<view class="page secondary-page">
  <view class="page-title">导入平台行程</view>
  <view class="page-subtitle">静态展示导入流程和自动生成路线结果。</view>
  <view class="import-card card">
    <view class="input-box">粘贴携程/美团/地图行程链接</view>
    <view class="primary-button">生成路线</view>
  </view>
  <view class="section">
    <view class="section-title">导入步骤</view>
    <view class="step-card soft-card" wx:for="{{steps}}" wx:key="*this">{{index + 1}}. {{item}}</view>
  </view>
  <view class="section">
    <view class="section-title">生成结果</view>
    <view class="step-card card" wx:for="{{result}}" wx:key="*this">{{item}}</view>
  </view>
</view>
```

Write `pages/import-trip/import-trip.wxss`:

```css
.import-card {
  margin-top: 28rpx;
  padding: 26rpx;
}

.input-box {
  height: 88rpx;
  line-height: 88rpx;
  padding: 0 24rpx;
  margin-bottom: 20rpx;
  border-radius: 22rpx;
  background: #f1f8f5;
  color: #8aa09a;
  font-size: 26rpx;
}

.step-card {
  margin-top: 16rpx;
  padding: 24rpx;
  color: #315048;
  font-size: 26rpx;
}
```

- [ ] **Step 7: Commit planning secondary pages**

```bash
git add pages/recommend pages/compare pages/route pages/crowd pages/holiday pages/import-trip
git commit -m "feat: add planning secondary pages"
```

## Task 4: Build Profile Secondary Pages

**Files:**
- Create: `pages/orders/*`, `pages/history/*`, `pages/favorites/*`, `pages/trips/*`, `pages/post/*`, `pages/rating/*`, `pages/share/*`

- [ ] **Step 1: Create 订单 page**

Write `pages/orders/orders.json`:

```json
{
  "navigationBarTitleText": "订单"
}
```

Write `pages/orders/orders.js`:

```js
Page({
  data: {
    orders: [
      { title: '城墙骑行体验', status: '待出行', date: '05月18日 17:00' },
      { title: '钟鼓楼讲解套票', status: '已完成', date: '04月26日 10:00' },
      { title: '不夜城夜游服务', status: '退款售后', date: '04月12日 19:30' }
    ]
  }
})
```

Write `pages/orders/orders.wxml`:

```xml
<view class="page secondary-page">
  <view class="page-title">订单</view>
  <view class="page-subtitle">待出行、已完成和退款售后订单。</view>
  <view class="list">
    <view class="row-card card" wx:for="{{orders}}" wx:key="title">
      <view>
        <view class="row-title">{{item.title}}</view>
        <view class="row-desc">{{item.date}}</view>
      </view>
      <view class="pill">{{item.status}}</view>
    </view>
  </view>
</view>
```

Write `pages/orders/orders.wxss`:

```css
.list {
  margin-top: 28rpx;
  display: flex;
  flex-direction: column;
  gap: 18rpx;
}

.row-card {
  padding: 26rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.row-title {
  font-size: 30rpx;
  font-weight: 800;
}

.row-desc {
  margin-top: 8rpx;
  color: #748780;
  font-size: 24rpx;
}
```

- [ ] **Step 2: Create 最近浏览 page**

Write `pages/history/history.json`:

```json
{
  "navigationBarTitleText": "最近浏览"
}
```

Write `pages/history/history.js`:

```js
Page({
  data: {
    records: ['钟楼夜游路线', '城墙骑行体验', '回民街美食攻略', '陕西历史博物馆预约']
  }
})
```

Write `pages/history/history.wxml`:

```xml
<view class="page secondary-page">
  <view class="page-title">最近浏览</view>
  <view class="page-subtitle">继续查看最近关注的景点、路线和商品。</view>
  <view class="list">
    <view class="row-card card" wx:for="{{records}}" wx:key="*this">
      <view>
        <view class="row-title">{{item}}</view>
        <view class="row-desc">刚刚浏览 · 西安推荐</view>
      </view>
      <view class="row-arrow">›</view>
    </view>
  </view>
</view>
```

Write `pages/history/history.wxss`:

```css
.list {
  margin-top: 28rpx;
  display: flex;
  flex-direction: column;
  gap: 18rpx;
}

.row-card {
  padding: 26rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.row-title {
  font-size: 30rpx;
  font-weight: 800;
}

.row-desc {
  margin-top: 8rpx;
  color: #748780;
  font-size: 24rpx;
}

.row-arrow {
  color: #27b37e;
  font-size: 46rpx;
}
```

- [ ] **Step 3: Create 我的收藏 page**

Write `pages/favorites/favorites.json`:

```json
{
  "navigationBarTitleText": "我的收藏"
}
```

Write `pages/favorites/favorites.js`:

```js
Page({
  data: {
    groups: [
      { title: '景点', count: '12', desc: '钟楼、城墙、大雁塔' },
      { title: '美食', count: '9', desc: '泡馍、肉夹馍、凉皮' },
      { title: '路线', count: '4', desc: '夜游、亲子、文化两日游' }
    ]
  }
})
```

Write `pages/favorites/favorites.wxml`:

```xml
<view class="page secondary-page">
  <view class="page-title">我的收藏</view>
  <view class="page-subtitle">收藏的景点、美食和路线。</view>
  <view class="grid-2 favorite-grid">
    <view class="favorite-card card" wx:for="{{groups}}" wx:key="title">
      <view class="favorite-count">{{item.count}}</view>
      <view class="favorite-title">{{item.title}}</view>
      <view class="favorite-desc">{{item.desc}}</view>
    </view>
  </view>
</view>
```

Write `pages/favorites/favorites.wxss`:

```css
.favorite-grid {
  margin-top: 28rpx;
}

.favorite-card {
  padding: 28rpx;
}

.favorite-count {
  color: #27b37e;
  font-size: 46rpx;
  font-weight: 900;
}

.favorite-title {
  margin-top: 10rpx;
  font-size: 30rpx;
  font-weight: 800;
}

.favorite-desc {
  margin-top: 8rpx;
  color: #748780;
  font-size: 24rpx;
  line-height: 1.5;
}
```

- [ ] **Step 4: Create 我的行程 page**

Write `pages/trips/trips.json`:

```json
{
  "navigationBarTitleText": "我的行程"
}
```

Write `pages/trips/trips.js`:

```js
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
```

Write `pages/trips/trips.wxml`:

```xml
<view class="page secondary-page">
  <view class="page-title">我的行程</view>
  <view class="page-subtitle">管理行程，并进行发帖、评价和分享。</view>
  <view class="trip-list">
    <view class="trip-card card" wx:for="{{trips}}" wx:key="title">
      <view class="trip-title">{{item.title}}</view>
      <view class="trip-date">{{item.date}}</view>
      <view class="trip-stops">{{item.stops}}</view>
    </view>
  </view>
  <view class="grid-3 trip-actions">
    <view class="action-card soft-card" bindtap="goPost">发帖</view>
    <view class="action-card soft-card" bindtap="goRating">评价打分</view>
    <view class="action-card soft-card" bindtap="goShare">分享</view>
  </view>
</view>
```

Write `pages/trips/trips.wxss`:

```css
.trip-list {
  margin-top: 28rpx;
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.trip-card {
  padding: 28rpx;
}

.trip-title {
  font-size: 32rpx;
  font-weight: 800;
}

.trip-date {
  margin-top: 10rpx;
  color: #27b37e;
  font-size: 24rpx;
  font-weight: 700;
}

.trip-stops {
  margin-top: 10rpx;
  color: #748780;
  font-size: 24rpx;
}

.trip-actions {
  margin-top: 28rpx;
}

.action-card {
  padding: 24rpx 8rpx;
  text-align: center;
  color: #245047;
  font-size: 26rpx;
  font-weight: 700;
}
```

- [ ] **Step 5: Create 发帖 page**

Write `pages/post/post.json`:

```json
{
  "navigationBarTitleText": "发帖"
}
```

Write `pages/post/post.js`:

```js
Page({ data: {} })
```

Write `pages/post/post.wxml`:

```xml
<view class="page secondary-page">
  <view class="page-title">发帖</view>
  <view class="page-subtitle">静态发布表单，用于展示社区内容创建流程。</view>
  <view class="form-card card">
    <view class="input-line">标题：我的西安旅行灵感</view>
    <view class="textarea-box">写下路线亮点、避坑建议和推荐美食。</view>
    <view class="upload-box gradient-xian">添加旅行照片</view>
    <view class="primary-button">发布动态</view>
  </view>
</view>
```

Write `pages/post/post.wxss`:

```css
.form-card {
  margin-top: 28rpx;
  padding: 26rpx;
}

.input-line,
.textarea-box {
  padding: 24rpx;
  border-radius: 22rpx;
  background: #f1f8f5;
  color: #6f8580;
  font-size: 26rpx;
}

.textarea-box {
  height: 180rpx;
  margin-top: 18rpx;
  line-height: 1.6;
}

.upload-box {
  height: 180rpx;
  margin: 18rpx 0;
  border-radius: 24rpx;
  color: #235148;
  font-size: 28rpx;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

- [ ] **Step 6: Create 评价打分 page**

Write `pages/rating/rating.json`:

```json
{
  "navigationBarTitleText": "评价打分"
}
```

Write `pages/rating/rating.js`:

```js
Page({
  data: {
    tags: ['交通方便', '适合拍照', '文化感强', '夜景好看']
  }
})
```

Write `pages/rating/rating.wxml`:

```xml
<view class="page secondary-page">
  <view class="page-title">评价打分</view>
  <view class="page-subtitle">星级评分、体验标签和文字评价静态 UI。</view>
  <view class="rating-card card">
    <view class="stars">★★★★★</view>
    <view class="tag-row">
      <view class="pill pill-orange" wx:for="{{tags}}" wx:key="*this">{{item}}</view>
    </view>
    <view class="textarea-box">这次西安行程节奏舒适，夜游体验很出片。</view>
    <view class="primary-button">提交评价</view>
  </view>
</view>
```

Write `pages/rating/rating.wxss`:

```css
.rating-card {
  margin-top: 28rpx;
  padding: 28rpx;
}

.stars {
  color: #ffad42;
  font-size: 56rpx;
  letter-spacing: 8rpx;
}

.tag-row {
  margin-top: 22rpx;
  display: flex;
  flex-wrap: wrap;
  gap: 14rpx;
}

.textarea-box {
  height: 180rpx;
  margin: 24rpx 0;
  padding: 24rpx;
  border-radius: 22rpx;
  background: #f1f8f5;
  color: #6f8580;
  font-size: 26rpx;
  line-height: 1.6;
}
```

- [ ] **Step 7: Create 分享 page**

Write `pages/share/share.json`:

```json
{
  "navigationBarTitleText": "分享"
}
```

Write `pages/share/share.js`:

```js
Page({
  data: {
    channels: ['微信好友', '朋友圈', '生成海报', '复制链接']
  }
})
```

Write `pages/share/share.wxml`:

```xml
<view class="page secondary-page">
  <view class="page-title">分享</view>
  <view class="page-subtitle">分享行程卡片和推荐渠道静态展示。</view>
  <view class="share-poster gradient-night">
    <view class="poster-title">西安两日轻松游</view>
    <view class="poster-desc">钟楼 · 城墙 · 大唐不夜城</view>
  </view>
  <view class="grid-2 channel-grid">
    <view class="channel-card card" wx:for="{{channels}}" wx:key="*this">{{item}}</view>
  </view>
</view>
```

Write `pages/share/share.wxss`:

```css
.share-poster {
  height: 430rpx;
  margin-top: 28rpx;
  padding: 38rpx;
  border-radius: 34rpx;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.poster-title {
  font-size: 44rpx;
  font-weight: 900;
  color: #173e36;
}

.poster-desc {
  margin-top: 12rpx;
  color: #4b6a62;
  font-size: 26rpx;
}

.channel-grid {
  margin-top: 28rpx;
}

.channel-card {
  padding: 28rpx;
  text-align: center;
  font-size: 26rpx;
  font-weight: 800;
}
```

- [ ] **Step 8: Commit profile secondary pages**

```bash
git add pages/orders pages/history pages/favorites pages/trips pages/post pages/rating pages/share
git commit -m "feat: add profile secondary pages"
```

## Task 5: Verification and Polish

**Files:**
- Modify files only if compile or visual review shows concrete issues.

- [ ] **Step 1: Compile in WeChat Developer Tools**

Run: open `d:\adc` in WeChat Developer Tools and click Compile.

Expected: no missing page errors and no WXML/WXSS syntax errors.

- [ ] **Step 2: Verify tab navigation**

In the simulator, tap these tabs:

1. 信息漫游
2. 智能规划
3. 旅行社区
4. 个人中心

Expected: each tab opens with its own title and visible content.

- [ ] **Step 3: Verify 智能规划 secondary navigation**

From 智能规划, tap each tool card:

1. 商品推荐
2. 商品对比
3. 路线规划
4. 历史客流
5. 节假日预测
6. 导入平台行程

Expected: each page opens, displays the correct title and static content, and back navigation returns to 智能规划.

- [ ] **Step 4: Verify 个人中心 secondary navigation**

From 个人中心, tap:

1. 订单
2. 最近浏览
3. 我的收藏
4. 我的行程

From 我的行程, tap:

1. 发帖
2. 评价打分
3. 分享

Expected: each page opens, displays the correct title and static content, and back navigation works.

- [ ] **Step 5: Verify 旅行社区 action navigation**

From 旅行社区, tap:

1. 去发帖
2. 发帖
3. 评价打分
4. 分享

Expected: each action opens the corresponding secondary page.

- [ ] **Step 6: Check visual requirements**

Confirm in the simulator:

- Light background is used throughout.
- Cards are rounded and shadowed.
- Gradients replace external images.
- Content names Xi'an places and travel scenarios.
- The app does not depend on remote image URLs.

- [ ] **Step 7: Commit verification fixes if any**

If fixes were needed:

```bash
git add app.json app.js app.wxss pages
git commit -m "fix: polish xian travel static prototype"
```

If no fixes were needed, do not create an empty commit.

## Self-Review

- Spec coverage: The plan implements four tabs, all requested secondary pages, Xi'an-specific static content, gradient placeholders, native Mini Program files, tab navigation, and static route navigation.
- Placeholder scan: No TBD/TODO/implement-later placeholders remain in implementation steps.
- Consistency: Page paths in `app.json`, navigation URLs, and file paths match across tasks.
