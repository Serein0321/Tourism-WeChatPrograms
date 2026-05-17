function shouldExpand(startY, endY, threshold) {
  if (!Number.isFinite(startY) || !Number.isFinite(endY) || !Number.isFinite(threshold)) {
    return false;
  }

  const safeThreshold = Math.max(0, threshold);
  return startY - endY >= safeThreshold;
}

function shouldCollapse(startY, endY, threshold) {
  if (!Number.isFinite(startY) || !Number.isFinite(endY) || !Number.isFinite(threshold)) {
    return false;
  }

  const safeThreshold = Math.max(0, threshold);
  return endY - startY >= safeThreshold;
}

function nextPanelState(currentState, startY, endY) {
  const expandThreshold = 24;
  const collapseThreshold = 28;

  if (currentState === 'transitioning') {
    return 'transitioning';
  }

  if (currentState === 'collapsed' && shouldExpand(startY, endY, expandThreshold)) {
    return 'expanded';
  }

  if (currentState === 'expanded' && shouldCollapse(startY, endY, collapseThreshold)) {
    return 'collapsed';
  }

  if (currentState === 'collapsed' || currentState === 'expanded') {
    return currentState;
  }

  return 'collapsed';
}

module.exports = {
  shouldExpand,
  shouldCollapse,
  nextPanelState,
};
