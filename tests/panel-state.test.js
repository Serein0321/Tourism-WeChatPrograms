const test = require('node:test');
const assert = require('node:assert/strict');

const {
  createPanelState,
  getPanelPositionFromGesture,
  reducePanelState,
} = require('../pages/planner/panel-state');

test('createPanelState 返回初始不可变状态', () => {
  const state = createPanelState();

  assert.deepEqual(state, {
    isOpen: false,
    anchorY: 640,
  });
});

test('getPanelPositionFromGesture 会将手势位移限制在边界范围内', () => {
  const nextY = getPanelPositionFromGesture({
    startY: 500,
    deltaY: -360,
    minY: 120,
    maxY: 640,
  });

  assert.equal(nextY, 140);
});

test('reducePanelState 在 release 时按阈值吸附为展开态', () => {
  const state = {
    isOpen: false,
    anchorY: 420,
  };

  const next = reducePanelState(state, {
    type: 'release',
    openThreshold: 460,
    openY: 160,
    closedY: 640,
  });

  assert.deepEqual(next, {
    isOpen: true,
    anchorY: 160,
  });

  assert.notEqual(next, state);
});

test('reducePanelState 在 drag 时更新 anchorY 且不改变 isOpen', () => {
  const state = {
    isOpen: true,
    anchorY: 200,
  };

  const next = reducePanelState(state, {
    type: 'drag',
    nextY: 260,
  });

  assert.deepEqual(next, {
    isOpen: true,
    anchorY: 260,
  });
});
