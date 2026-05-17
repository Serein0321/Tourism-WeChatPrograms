const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const projectRoot = path.resolve(__dirname, '..');
const plannerWxml = fs.readFileSync(
  path.join(projectRoot, 'pages/planner/planner.wxml'),
  'utf8'
);
const { PLANNER_TOOLS, getToolRoute } = require('../pages/planner/planner-tools');

test('planner page presents a map-backed assistant drawer', () => {
  assert.match(plannerWxml, /class="page planner-page planner-chat-page"/);
  assert.match(plannerWxml, /class="map-backdrop"/);
  assert.match(plannerWxml, /class="assistant-drawer"/);
  assert.match(plannerWxml, /class="drawer-grabber"/);
  assert.match(plannerWxml, /class="assistant-avatar"/);
  assert.match(plannerWxml, /class="hero-actions"/);
  assert.match(plannerWxml, /class="prompt-section"/);
  assert.match(plannerWxml, /class="bottom-tools"/);
  assert.match(plannerWxml, /class="composer-card"/);
  assert.doesNotMatch(plannerWxml, /map-shell|openAgentPanel|bindtouchstart|bindtouchend|panelState/);
  assert.ok(
    plannerWxml.indexOf('class="map-backdrop"') < plannerWxml.indexOf('class="assistant-drawer"'),
    'map backdrop should render behind the assistant drawer'
  );
});

test('planner page mirrors the referenced assistant entry content', () => {
  assert.match(plannerWxml, /Hi \{\{nickname\}\}/);
  assert.match(plannerWxml, /今天想去哪里玩/);
  assert.match(plannerWxml, /创建新行程/);
  assert.match(plannerWxml, /导入行程/);
  assert.match(plannerWxml, /体验商品对比/);
  assert.match(plannerWxml, /体验商品推荐/);
  assert.match(plannerWxml, /可以试试这些问题/);
  assert.match(plannerWxml, /换一换/);
  assert.match(plannerWxml, /请输入您想询问的内容/);
});

test('planner shortcut buttons map to the six target pages', () => {
  const expectedTools = [
    { title: '商品推荐', url: '/pages/recommend/recommend' },
    { title: '商品对比', url: '/pages/compare/compare' },
    { title: '路线规划', url: '/pages/route/route' },
    { title: '历史客流', url: '/pages/crowd/crowd' },
    { title: '节假日预测', url: '/pages/holiday/holiday' },
    { title: '导入平台行程', url: '/pages/import-trip/import-trip' },
  ];

  assert.deepEqual(PLANNER_TOOLS, expectedTools);
  for (const tool of expectedTools) {
    assert.equal(getToolRoute(tool.title), tool.url);
  }
});