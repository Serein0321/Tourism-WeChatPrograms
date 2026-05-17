const PLANNER_TOOLS = [
  { title: '商品推荐', url: '/pages/recommend/recommend' },
  { title: '商品对比', url: '/pages/compare/compare' },
  { title: '路线规划', url: '/pages/route/route' },
  { title: '历史客流', url: '/pages/crowd/crowd' },
  { title: '节假日预测', url: '/pages/holiday/holiday' },
  { title: '导入平台行程', url: '/pages/import-trip/import-trip' },
];

function getToolRoute(title) {
  const tool = PLANNER_TOOLS.find((item) => item.title === title);
  return tool ? tool.url : '';
}

function hasToolRoute(title) {
  return Boolean(getToolRoute(title));
}

module.exports = {
  PLANNER_TOOLS,
  getToolRoute,
  hasToolRoute,
};
