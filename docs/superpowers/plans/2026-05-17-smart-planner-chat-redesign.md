# 智能规划对话式改版 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将智能规划页改为“顶部地图占位 + 底部半开可上滑对话面板”的交互形态，满足醒目入口、打开动画、新标签和“< 新对话”要求。

**Architecture:** 保持单页改造，不新增复杂组件。通过 `planner.js` 管理面板状态机与会话数据，通过 `planner.wxml` 重排结构，通过 `planner.wxss` 实现半开/全开与动画。新增一个纯函数工具文件承载手势阈值判断，使用 Node 内置测试器做最小 TDD 覆盖。

**Tech Stack:** 微信小程序原生（WXML/WXSS/JS）、Node.js `node:test` + `assert`。

---

## 文件结构与职责

- Modify: `pages/planner/planner.wxml`
  - 页面骨架重构：地图占位、底部对话面板、消息区、标签区、输入区。
- Modify: `pages/planner/planner.js`
  - 状态机、手势、发送消息、`< 新对话` 重置逻辑。
- Modify: `pages/planner/planner.wxss`
  - 新视觉风格、半开/全开动画、按钮与消息样式。
- Create: `pages/planner/panel-state.js`
  - 手势阈值与状态切换纯函数。
- Create: `tests/panel-state.test.js`
  - 纯函数测试（先红后绿）。
- Create: `package.json`
  - 最小测试脚本（仅用于本地验证纯函数逻辑）。

### Task 1: 建立手势与状态纯函数（TDD）

**Files:**
- Create: `pages/planner/panel-state.js`
- Create: `tests/panel-state.test.js`
- Create: `package.json`

- [ ] **Step 1: 写失败测试（RED）**

```js
// tests/panel-state.test.js
const test = require('node:test')
const assert = require('node:assert/strict')
const {
  shouldExpand,
  shouldCollapse,
  nextPanelState
} = require('../pages/planner/panel-state')

test('shouldExpand: 上滑超过阈值返回 true', () => {
  assert.equal(shouldExpand(200, 150, 24), true)
})

test('shouldExpand: 上滑不足阈值返回 false', () => {
  assert.equal(shouldExpand(200, 185, 24), false)
})

test('shouldCollapse: 下滑超过阈值返回 true', () => {
  assert.equal(shouldCollapse(150, 210, 28), true)
})

test('nextPanelState: collapsed 上滑进入 expanded', () => {
  assert.equal(nextPanelState('collapsed', 200, 150), 'expanded')
})

test('nextPanelState: expanded 下滑进入 collapsed', () => {
  assert.equal(nextPanelState('expanded', 150, 210), 'collapsed')
})
```

- [ ] **Step 2: 运行测试确认失败**

Run: `npm test`
Expected: FAIL，提示找不到 `../pages/planner/panel-state`

- [ ] **Step 3: 写最小实现（GREEN）**

```js
// pages/planner/panel-state.js
function shouldExpand(startY, endY, threshold) {
  return startY - endY >= threshold
}

function shouldCollapse(startY, endY, threshold) {
  return endY - startY >= threshold
}

function nextPanelState(currentState, startY, endY) {
  const expandThreshold = 24
  const collapseThreshold = 28

  if (currentState === 'collapsed' && shouldExpand(startY, endY, expandThreshold)) {
    return 'expanded'
  }

  if (currentState === 'expanded' && shouldCollapse(startY, endY, collapseThreshold)) {
    return 'collapsed'
  }

  return currentState
}

module.exports = {
  shouldExpand,
  shouldCollapse,
  nextPanelState
}
```

```json
// package.json
{
  "name": "xian-travel-miniprogram",
  "private": true,
  "scripts": {
    "test": "node --test tests/*.test.js"
  }
}
```

- [ ] **Step 4: 运行测试确认通过**

Run: `npm test`
Expected: PASS，5 个测试全部通过

- [ ] **Step 5: 提交**

```bash
git add package.json pages/planner/panel-state.js tests/panel-state.test.js
git commit -m "test(planner): add panel state helper with node tests"
```

### Task 2: 重构页面结构（地图在上 + 对话面板在下）

**Files:**
- Modify: `pages/planner/planner.wxml`

- [ ] **Step 1: 写失败验证（RED）**

Run: 在开发者工具中打开智能规划页
Expected: 仍看到旧“多主题圈层”模块，结构不符合新设计

- [ ] **Step 2: 最小结构改造（GREEN）**

```xml
<!-- 核心结构示意，实际以完整文件替换 -->
<view class="planner-page">
  <view class="map-shell">
    <view class="map-mask"></view>
    <view class="map-empty">地图组件待接入（支持拖拽/缩放）</view>
  </view>

  <view class="agent-panel {{panelState}}" bindtouchstart="onPanelTouchStart" bindtouchend="onPanelTouchEnd">
    <view class="panel-grabber"></view>
    <view class="panel-top">
      <view class="new-chat" wx:if="{{panelState === 'expanded'}}" bindtap="startNewChat">&lt; 新对话</view>
      <button class="open-agent-btn" wx:if="{{panelState !== 'expanded'}}" bindtap="openAgentPanel">打开智能体对话</button>
    </view>

    <scroll-view class="message-list" scroll-y="true">
      <view class="message {{item.role}}" wx:for="{{messages}}" wx:key="index">{{item.text}}</view>
    </scroll-view>

    <view class="tool-tabs">
      <view class="tool-tab {{activeTool === item ? 'active' : ''}}" wx:for="{{tools}}" wx:key="*this" bindtap="onSelectTool" data-tool="{{item}}">{{item}}</view>
    </view>

    <view class="chat-composer">
      <input class="chat-input" value="{{draft}}" bindinput="onInput" placeholder="请输入你的需求" />
      <view class="send-btn" bindtap="onSend">发送</view>
    </view>
  </view>
</view>
```

- [ ] **Step 3: 回归验证**

Run: 在开发者工具刷新页面
Expected: 旧圈层模块消失，出现地图占位 + 底部对话面板

- [ ] **Step 4: 提交**

```bash
git add pages/planner/planner.wxml
git commit -m "feat(planner): rebuild layout to map plus chat panel"
```

### Task 3: 接入状态机与对话行为

**Files:**
- Modify: `pages/planner/planner.js`
- Modify: `pages/planner/planner.json`（如需启用组件配置）

- [ ] **Step 1: 写失败验证（RED）**

Run: 页面点击“打开智能体对话”
Expected: 仍无法展开或无新对话逻辑

- [ ] **Step 2: 最小逻辑实现（GREEN）**

```js
const { nextPanelState } = require('./panel-state')

Page({
  data: {
    panelState: 'collapsed',
    activeTool: '商品推荐',
    tools: ['商品推荐', '商品对比', '路线规划', '历史客流', '节假日预测', '导入平台行程'],
    messages: [
      { role: 'assistant', text: '你好，我是智能规划助手，想先做商品推荐还是路线规划？' }
    ],
    draft: '',
    touchStartY: 0,
    mapStatus: 'placeholder'
  },

  openAgentPanel() {
    if (this.data.panelState === 'transitioning') return
    this.setData({ panelState: 'expanded' })
  },

  onPanelTouchStart(e) {
    this.setData({ touchStartY: e.changedTouches[0].clientY })
  },

  onPanelTouchEnd(e) {
    const endY = e.changedTouches[0].clientY
    const next = nextPanelState(this.data.panelState, this.data.touchStartY, endY)
    if (next !== this.data.panelState) {
      this.setData({ panelState: next })
    }
  },

  onSelectTool(e) {
    const tool = e.currentTarget.dataset.tool
    this.setData({ activeTool: tool })
  },

  onInput(e) {
    this.setData({ draft: e.detail.value })
  },

  onSend() {
    const text = (this.data.draft || '').trim()
    if (!text) return

    const nextMessages = this.data.messages.concat(
      { role: 'user', text },
      { role: 'assistant', text: `已收到你的需求：${text}` }
    )

    this.setData({ messages: nextMessages, draft: '' })
  },

  startNewChat() {
    this.setData({
      messages: [{ role: 'assistant', text: '你好，我是智能规划助手，想先做商品推荐还是路线规划？' }],
      draft: ''
    })
  }
})
```

- [ ] **Step 3: 回归验证**

Run: 手动测试
Expected: 点击可展开、上滑下滑可切换、`< 新对话`可重置

- [ ] **Step 4: 提交**

```bash
git add pages/planner/planner.js
git commit -m "feat(planner): add panel state machine and chat interactions"
```

### Task 4: 完成视觉与动效

**Files:**
- Modify: `pages/planner/planner.wxss`

- [ ] **Step 1: 写失败验证（RED）**

Run: 查看页面
Expected: 对话面板仍无明显层次与动画，按钮不醒目

- [ ] **Step 2: 最小样式实现（GREEN）**

```css
/* 核心示意，实际需完整替换 planner.wxss */
.planner-page {
  min-height: 100vh;
  background: linear-gradient(180deg, #eef7f3 0%, #f9fcfb 100%);
  padding: 0;
}

.map-shell {
  position: relative;
  height: 48vh;
  background: linear-gradient(135deg, #d4efe5 0%, #bfe1f7 58%, #f5ddb7 100%);
}

.agent-panel {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 34rpx 34rpx 0 0;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 -16rpx 44rpx rgba(20, 66, 56, 0.18);
  transition: height 0.32s ease, transform 0.32s ease;
}

.agent-panel.collapsed { height: 42vh; }
.agent-panel.expanded { height: 90vh; }

.panel-grabber {
  width: 74rpx;
  height: 8rpx;
  border-radius: 999rpx;
  background: #bdd2ca;
  margin: 14rpx auto;
}

.open-agent-btn {
  height: 80rpx;
  border-radius: 999rpx;
  background: linear-gradient(135deg, #23bf86, #2ea1f3);
  color: #fff;
  font-size: 28rpx;
  font-weight: 700;
}

.tool-tab.active {
  background: #e5f8f1;
  color: #1f9f70;
}
```

- [ ] **Step 3: 回归验证**

Run: 手工验证展开动画与视觉层次
Expected: 按钮醒目、展开顺滑、移动端无明显溢出

- [ ] **Step 4: 提交**

```bash
git add pages/planner/planner.wxss
git commit -m "style(planner): redesign chat panel visuals and animations"
```

### Task 5: 端到端验收与文档同步

**Files:**
- Modify: `docs/superpowers/specs/2026-05-17-smart-planner-chat-redesign-design.md`（仅在实现偏差时更新）

- [ ] **Step 1: 运行纯函数测试**

Run: `npm test`
Expected: PASS

- [ ] **Step 2: 按验收清单逐项手测**

Run: 开发者工具中测试
Expected:
- 顶部地图占位存在
- 面板默认半开且可上滑
- 醒目按钮可展开并有动画
- 展开后左上角有“< 新对话”且可重置
- 标签为指定 6 项
- 原多主题圈层模块已删除

- [ ] **Step 3: 提交最终整合**

```bash
git add pages/planner docs/superpowers/specs/2026-05-17-smart-planner-chat-redesign-design.md package.json tests
git commit -m "feat(planner): deliver conversational smart planning redesign"
```
