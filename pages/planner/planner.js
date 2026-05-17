const { nextPanelState } = require('./panel-state');

const DEFAULT_TOOLS = ['商品推荐', '商品对比', '路线规划', '历史客流', '节假日预测', '导入平台行程'];
const WELCOME_MESSAGE = {
  role: 'assistant',
  text: '你好，我是智能规划助手，想先做商品推荐还是路线规划？'
};

Page({
  data: {
    panelState: 'collapsed',
    activeTool: '商品推荐',
    tools: DEFAULT_TOOLS,
    messages: [Object.assign({}, WELCOME_MESSAGE)],
    draft: '',
    touchStartY: 0,
    mapStatus: 'placeholder'
  },

  expandPanel() {
    this.setData({ panelState: 'transitioning' });
    setTimeout(() => {
      this.setData({ panelState: 'expanded' });
    }, 320);
  },

  collapsePanel() {
    this.setData({ panelState: 'transitioning' });
    setTimeout(() => {
      this.setData({ panelState: 'collapsed' });
    }, 320);
  },

  openAgentPanel() {
    this.expandPanel();
  },

  onPanelTouchStart(e) {
    if (!e || !e.touches || e.touches.length === 0) {
      return;
    }
    const touch = e.touches[0];
    this.setData({ touchStartY: touch.clientY });
  },

  onPanelTouchEnd(e) {
    if (!e || !e.changedTouches || e.changedTouches.length === 0) {
      return;
    }
    const touch = e.changedTouches[0];
    const endY = touch.clientY;
    const panelState = nextPanelState(this.data.panelState, this.data.touchStartY, endY);

    this.setData({
      panelState,
      touchStartY: 0
    });
  },

  onSelectTool(e) {
    const tool = e.currentTarget.dataset.tool;
    if (!tool) {
      return;
    }

    if (!DEFAULT_TOOLS.includes(tool)) {
      return;
    }

    if (tool === '导入平台行程') {
      this.setData({ activeTool: tool });
      wx.navigateTo({
        url: '/pages/import-trip/import-trip',
        fail: (res) => {
          console.warn('导入平台行程导航失败:', res);
          wx.showToast({ title: '打开失败', icon: 'none' });
        }
      });
      return;
    }

    this.setData({
      activeTool: tool,
      draft: `请帮我做${tool}：`
    });
  },

  onInput(e) {
    let value = (e && e.detail && e.detail.value) || '';
    if (value.length > 200) {
      value = value.substring(0, 200);
    }
    this.setData({ draft: value });
  },

  onSend() {
    const content = (this.data.draft || '').trim();
    if (!content) {
      wx.showToast({ title: '请输入内容', icon: 'none' });
      return;
    }

    const userMessage = { role: 'user', text: content };
    const assistantMessage = {
      role: 'assistant',
      text: `收到，我来协助你完成${this.data.activeTool}，先从需求要点开始。`
    };

    this.setData({
      messages: this.data.messages.concat(userMessage, assistantMessage),
      draft: ''
    });
  },

  startNewChat() {
    this.setData({
      messages: [Object.assign({}, WELCOME_MESSAGE)],
      draft: '',
      touchStartY: 0,
      panelState: 'expanded'
    });
  }
});
