// 导航卡片组件

//  统一显示为"推荐"加载动画样式
const RARITY_CONFIG = {
  legendary: {
    label: '推荐',
    badgeClass: 'loader-label',
    textClass: 'text-secondary',
    glowColor: 'rgba(236,106,6,0.4)',
    icon: '注册',
    action: '领取'
  },
  epic: {
    label: '热门',
    badgeClass: 'loader-label',
    textClass: 'text-primary',
    glowColor: 'rgba(183,109,255,0.4)',
    icon: '注册',
    action: '领取'
  },
  rare: {
    label: '推荐',
    badgeClass: 'loader-label',
    textClass: 'text-tertiary',
    glowColor: 'rgba(77,142,255,0.4)',
    icon: '注册',
    action: '领取'
  },
  common: {
    label: '推荐',
    badgeClass: 'loader-label',
    textClass: 'text-outline',
    glowColor: 'rgba(100,100,100,0.4)',
    icon: '注册',
    action: '领取'
  }
};

/**
 * 创建导航卡片HTML
 * @param {Object} item - 导航条目数据
 * @returns {string} HTML字符串
 */
// 生成随机在线人数
function getRandomOnline() {
  const min = 5678;
  const max = 1000000;
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + 'w';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num.toString();
}

export function createNavigationCard(item) {
  const config = RARITY_CONFIG[item.rarity] || RARITY_CONFIG.common;
  const cardUrl = item.url || 'https://www.ng081.com';
  const cardIcon = item.icon || 'casino';
  const onlineCount = getRandomOnline();
  
  // 使用自定义图片图标或默认Material图标
  const iconContent = item.iconImage 
    ? `<img src="${item.iconImage}" class="w-full h-full object-contain p-0.5 md:p-2" alt="${item.title}" width="128" height="128" loading="lazy"/>`
    : `<svg class="text-[40px] md:text-[64px] text-primary/50" xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>`;
  
  return `
    <div class="glass-panel rarity-${item.rarity} p-1 md:p-stack-sm flex flex-col group hover:scale-[1.02] transition-transform duration-300 cursor-pointer h-full relative" 
         onclick="window.open('${cardUrl}', '_blank')">
      <div class="relative h-16 md:h-32 w-full bg-white overflow-hidden rounded-sm mb-1 md:mb-stack-sm flex items-center justify-center">
        ${iconContent}
        <div class="absolute top-0 left-0 z-10">
          <div class="bg-gradient-to-r from-primary to-secondary px-2 py-0.5 text-[8px] md:text-[10px] font-bold text-white rounded-br-md shadow-lg">
            <span class="animate-[pulse_1.5s_ease-in-out_infinite]">推荐</span>
          </div>
        </div>
        ${item.rarity === 'legendary' ? `
        <div class="absolute bottom-0.5 right-0.5 hidden md:flex gap-1">
          <div class="bg-background/80 backdrop-blur-md p-1 border border-outline-variant rounded">
            <svg class="text-[14px] text-secondary" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8zm0 18c-3.35 0-6-2.57-6-6.2 0-2.34 1.95-5.44 6-9.14 4.05 3.7 6 6.79 6 9.14 0 3.63-2.65 6.2-6 6.2z"/></svg>
          </div>
        </div>` : ''}
      </div>
      <div class="flex-grow px-0.5 md:px-2">
        <div class="flex flex-col justify-between items-start mb-0.5 md:mb-1">
          <h3 class="font-h3 text-on-surface truncate w-full mobile-title-text md:text-sm lg:text-h3">${item.title}</h3>
        </div>
        <div class="flex flex-col md:flex-row md:gap-2 mb-1 md:mb-stack-md overflow-hidden">
          <div class="flex flex-col">
            <span class="font-label-caps text-outline mobile-compact-text md:text-[6px]">在线人数</span>
            <span class="font-code text-on-surface mobile-compact-text md:text-[8px]">${onlineCount}</span>
          </div>
          <div class="flex flex-col">
            <span class="font-label-caps text-outline mobile-compact-text md:text-[6px]">反水优惠</span>
            <span class="font-code text-on-surface mobile-compact-text md:text-[8px]">${item.bonus}</span>
          </div>
        </div>
      </div>
      <button class="metallic-btn w-full py-0.5 md:py-stack-sm font-label-caps text-on-background hover:shadow-[0_0_15px_${config.glowColor}] transition-all flex items-center justify-center">
        <svg class="text-[10px] md:text-[18px]" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
        <span class="hidden md:inline ml-2">${config.action}</span>
      </button>
    </div>
  `;
}

/**
 * 渲染卡片网格
 * @param {Array} items - 导航条目数组
 * @param {string} containerId - 容器元素ID
 */
export function renderCardGrid(items, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  if (items.length === 0) {
    container.innerHTML = `
      <div class="col-span-full glass-panel p-stack-lg text-center">
        <svg class="text-outline text-4xl mb-4" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M8 8l6 6"/><path d="M14 8l-6 6"/></svg>
        <p class="font-code text-outline">暂无内容</p>
      </div>
    `;
    return;
  }
  
  container.innerHTML = items.map(item => createNavigationCard(item)).join('');
}

export default { createNavigationCard, renderCardGrid };