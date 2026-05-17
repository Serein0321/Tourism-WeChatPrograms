const {
  PLANNER_TOOLS,
  getToolRoute,
  hasToolRoute,
} = require('./planner-tools');

const WELCOME_MESSAGE = {
  role: 'assistant',
  text: '你好，我是西安漫游智能规划助手。告诉我出行时间、同行人数和偏好，我会帮你整理路线、体验商品和避峰建议。'
};

const HERO_ACTIONS = [
  { title: '路线规划', tool: '路线规划', desc: '按时间和距离安排行程' },
  { title: '商品推荐', tool: '商品推荐', desc: '匹配户外与城市体验' },
  { title: '商品对比', tool: '商品对比', desc: '对比价格、强度和适配人群' },
  { title: '导入行程', tool: '导入平台行程', desc: '整理平台订单和已有计划' },
];

const MAP_SUMMARIES = [
  { value: 'SDK', label: '地图待接入' },
  { value: '6项', label: '规划能力' },
  { value: 'AI', label: '对话生成' },
];

const PROMPT_GROUPS = [
  [
    '普吉岛 | 原生态户外体验',
    '自然风光好的国内徒步城市推荐',
    '山野蚊虫防护小技巧',
  ],
  [
    '西安三日亲子慢游怎么安排',
    '预算两千的周末露营装备清单',
    '雨天也适合的城市微旅行',
  ],
  [
    '适合第一次去秦岭的轻徒步路线',
    '帮我对比两款户外体验产品',
    '端午假期人少景美目的地',
  ],
];

function decorateTools(tools) {
  const toolMeta = {
    商品推荐: { shortTitle: '商品推荐', icon: 'icon-recommend', symbol: '✓' },
    商品对比: { shortTitle: '商品对比', icon: 'icon-compare', symbol: '=' },
    路线规划: { shortTitle: '行程规划', icon: 'icon-calendar', symbol: '+' },
    历史客流: { shortTitle: '历史客流', icon: 'icon-crowd', symbol: '~' },
    节假日预测: { shortTitle: '假日预测', icon: 'icon-holiday', symbol: '!' },
    导入平台行程: { shortTitle: '导入行程', icon: 'icon-link', symbol: '∞' },
  };

  return tools.map((tool) => Object.assign({}, tool, toolMeta[tool.title] || {
    shortTitle: tool.title,
    icon: 'icon-default',
    symbol: '+'
  }));
}

Page({
  data: {
    drawerState: 'peek',
    activeTool: '路线规划',
    tools: decorateTools(PLANNER_TOOLS),
    heroActions: HERO_ACTIONS,
    mapSummaries: MAP_SUMMARIES,
    promptGroups: PROMPT_GROUPS,
    promptIndex: 0,
    promptSuggestions: PROMPT_GROUPS[0],
    messages: [Object.assign({}, WELCOME_MESSAGE)],
    draft: '',
    touchStartY: 0,
    mapStatus: 'placeholder'
  },

  onDrawerTouchStart(e) {
    const touch = e.changedTouches && e.changedTouches[0];
    if (!touch) return;
    this.setData({ touchStartY: touch.clientY });
  },

  onDrawerTouchEnd(e) {
    const touch = e.changedTouches && e.changedTouches[0];
    if (!touch) return;

    const deltaY = touch.clientY - this.data.touchStartY;
    if (deltaY <= -40) {
      this.openChat();
      return;
    }

    if (deltaY >= 40) {
      this.showMapInfo();
    }
  },

  toggleDrawer() {
    if (this.data.drawerState === 'peek') {
      this.openChat();
      return;
    }
    this.showMapInfo();
  },

  openChat() {
    this.setData({ drawerState: 'chat' });
  },

  showMapInfo() {
    this.setData({ drawerState: 'peek' });
  },

  onSelectTool(e) {
    const tool = e.currentTarget.dataset.tool;
    if (!hasToolRoute(tool)) {
      console.warn('未知规划入口:', tool);
      wx.showToast({ title: '入口不存在', icon: 'none' });
      return;
    }

    const url = getToolRoute(tool);
    this.setData({ activeTool: tool, drawerState: 'chat' });

    wx.navigateTo({
      url,
      fail: (res) => {
        console.warn(`${tool}导航失败:`, res);
        wx.showToast({ title: '打开失败', icon: 'none' });
      }
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
      text: `收到，我来协助你完成${this.data.activeTool || '智能规划'}，先从需求要点开始。`
    };

    this.setData({
      messages: this.data.messages.concat(userMessage, assistantMessage),
      draft: '',
      drawerState: 'chat'
    });
  },

  onSelectPrompt(e) {
    const prompt = e.currentTarget.dataset.prompt || '';
    this.setData({ draft: prompt, drawerState: 'chat' });
  },

  refreshPrompts() {
    const nextIndex = (this.data.promptIndex + 1) % this.data.promptGroups.length;
    this.setData({
      promptIndex: nextIndex,
      promptSuggestions: this.data.promptGroups[nextIndex]
    });
  },

  startNewChat() {
    this.setData({
      messages: [Object.assign({}, WELCOME_MESSAGE)],
      draft: '',
      drawerState: 'chat'
    });
  }
});
