// 页面渲染模块
import { navData } from '../data/nav-data.js';
import { getRandomOnline } from '../components/NavigationCard.js';
import { generateChartBars } from '../utils/chart.js';
import { searchItems } from '../services/search-service.js';

const DEFAULT_ITEM_URL = 'https://www.ng081.com';
const MAX_CAROUSEL_ITEMS = 5;
const DEFAULT_CAROUSEL_LABELS = { online: '在线人数', bonus: '反水优惠' };
const SEARCH_CAROUSEL_LABELS = { online: '在线', bonus: '反水' };
const HOME_TAGS = [
  { text: '游戏资讯', textColor: 'text-primary', borderColor: 'border-primary/40' },
  { text: '游戏福利', textColor: 'text-secondary', borderColor: 'border-secondary/40' },
  { text: '游戏社区', textColor: 'text-tertiary', borderColor: 'border-tertiary/40' },
  { text: '游戏开奖', textColor: 'text-primary-container', borderColor: 'border-primary-container/40' },
  { text: '游戏预测', textColor: 'text-secondary-container', borderColor: 'border-secondary-container/40' }
];
const HOME_BANNERS = [
  {
    image: './images/mdl.webp',
    alt: 'Banner 1',
    text: '注册就送88-888',
    textColor: 'text-primary',
    path: './pages/promotion.html'
  },
  {
    image: './images/PC.webp',
    alt: 'Banner 2',
    text: '游戏预测',
    textColor: 'text-secondary',
    path: './pages/first-deposit.html'
  },
  {
    image: './images/ng.webp',
    alt: 'Banner 3',
    text: '官方下载地址 旺旺下载地址',
    textColor: 'text-tertiary',
    path: './pages/download.html'
  },
  {
    image: './images/NGlog.webp',
    alt: 'Banner 4',
    text: 'VIP专属接待',
    textColor: 'text-primary-container',
    path: './pages/vip.html'
  },
  {
    image: './images/ng.webp',
    alt: 'Banner 5',
    text: '公示 避坑必看',
    textColor: 'text-secondary-container',
    path: './pages/warning.html'
  }
];

const fallbackCarouselImage = `
  <div class="flex items-center justify-center card-expand-img text-primary/50">
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"/>
    </svg>
  </div>
`;

const downloadItems = [
  {
    image: './images/ng.webp',
    alt: '官方下载',
    title: '官方下载地址',
    url: 'https://sjgj04.vip/',
    textColor: 'text-primary',
    chipClass: 'bg-primary/20 text-primary',
    chipText: '点击下载'
  },
  {
    image: './images/sj.webp',
    alt: '旺旺下载',
    title: '旺旺安卓下载',
    url: 'https://www.wwtalk.cha',
    textColor: 'text-secondary',
    chipClass: 'bg-secondary/20 text-secondary',
    chipText: '点击下载'
  },
  {
    image: './images/ng.webp',
    alt: '旺旺官网',
    title: '旺旺官网',
    url: 'https://www.wwtalk.app',
    textColor: 'text-tertiary',
    chipClass: 'bg-tertiary/20 text-tertiary',
    chipText: '点击下载'
  },
  {
    image: './images/sj.webp',
    alt: '苹果下载',
    title: '苹果用户下载',
    note: '应用商店搜索"旺商聊"',
    url: 'https://apps.apple.com/app/旺商聊',
    textColor: 'text-primary-container',
    chipClass: 'bg-primary-container/20 text-primary-container',
    chipText: 'App Store'
  }
];

function renderCarouselCard(item, index, labels) {
  const imageMarkup = item.iconImage
    ? `<img src="${item.iconImage}" class="card-expand-img" alt="${item.title}"/>`
    : fallbackCarouselImage;

  return `
    <div class="card-expand" data-index="${index}" onclick="window.open('${item.url || DEFAULT_ITEM_URL}', '_blank')">
      ${imageMarkup}
      <div class="card-expand-title">
        <span>${item.title}</span>
        <div class="card-expand-info">
          <span><span class="label">${labels.online}</span><span class="value">${getRandomOnline()}</span></span>
          <span><span class="label">${labels.bonus}</span><span class="value">${item.bonus || '0.5%'}</span></span>
        </div>
      </div>
    </div>
  `;
}

function renderCarousel(items, labels = DEFAULT_CAROUSEL_LABELS) {
  return `
    <div class="card-expand-container">
      <div class="card-3d-5">
        ${items.slice(0, MAX_CAROUSEL_ITEMS).map((item, index) => renderCarouselCard(item, index, labels)).join('')}
      </div>
    </div>
  `;
}

function renderHomeTag({ text, textColor, borderColor }) {
  return `<span class="glass-tag px-4 py-1.5 text-xs md:text-sm font-code rounded-full ${textColor} border ${borderColor}">${text}</span>`;
}

function renderHomeBanner({ image, alt, text, textColor, path }) {
  return `
    <div class="glass-panel p-2 flex items-center gap-3 cursor-pointer hover:scale-[1.02] transition-transform" onclick="window.location.href='${path}'">
      <img src="${image}" class="w-12 h-12 rounded-lg object-contain bg-white" alt="${alt}"/>
      <span class="font-code text-sm ${textColor} font-bold">${text}</span>
    </div>
  `;
}

function renderDownloadCard(item) {
  const description = item.note || item.url;

  return `
    <div class="glass-panel p-4 flex flex-col items-center gap-3 cursor-pointer hover:scale-[1.02] transition-transform" onclick="window.open('${item.url}', '_blank')">
      <img src="${item.image}" class="w-20 h-20 rounded-lg object-contain bg-white" alt="${item.alt}"/>
      <span class="font-code text-sm ${item.textColor} font-bold">${item.title}</span>
      <span class="font-code text-xs text-outline text-center">${description}</span>
      <span class="px-3 py-1 text-[10px] font-code rounded-full ${item.chipClass}">${item.chipText}</span>
    </div>
  `;
}

export function renderHomePage() {
  return `
    <!-- Hero Header -->
    <div class="mb-4 md:mb-stack-lg border-l-4 border-primary pl-4">
      <h1 class="font-h1 text-2xl md:text-h1 uppercase leading-none glitch" data-glitch="注册就送88-888">注册就送88-888</h1>
      
      <div class="flex flex-wrap gap-2 mt-2">
        ${HOME_TAGS.map(renderHomeTag).join('')}
      </div>
      
      <p class="font-code text-[10px] md:text-secondary opacity-80 mt-1 md:mt-2 flex items-center gap-1">
        <span class="text-[12px] md:text-[16px]">新玩家</span>
        福利截至: <span id="countdown-display"></span>
      </p>
    </div>
    
    <!-- Horizontal Sliding Cards -->
    ${renderCarousel(navData.items)}
    
    <!-- Auth Image -->
    <div class="w-full flex justify-center mt-0 mb-6">
      <img src="./images/yzfwaqwd.webp" class="w-full max-w-2xl rounded-xl" alt="认证"/>
    </div>
    
    <!-- Stats Panel -->
    <section class="mt-stack-lg grid grid-cols-1 gap-gutter">
      <div class="glass-panel p-stack-md">
        <div class="flex items-center gap-stack-sm mb-stack-sm">
          <svg class="text-primary" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          <h4 class="font-label-caps text-label-caps text-on-surface">热门指数</h4>
        </div>
        <div class="h-32 w-full bg-surface-container-low rounded-sm relative overflow-hidden flex items-end">
          <div class="absolute inset-0 opacity-10 bg-[radial-gradient(circle,rgba(221,183,255,0.1)_1px,transparent_1px)] [background-size:20px_20px]"></div>
          <div class="w-full h-1/2 bg-gradient-to-t from-primary/20 to-transparent flex items-end px-4">
            ${generateChartBars()}
          </div>
        </div>
      </div>
      
      <!-- Banner Cards -->
      <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
        ${HOME_BANNERS.map(renderHomeBanner).join('')}
      </div>
    </section>
  `;
}

export function renderDownloadPage() {
  return `
    <div class="mb-4 md:mb-stack-lg border-l-4 border-primary pl-4">
      <h1 class="font-h1 text-2xl md:text-h1 uppercase leading-none">下载地址</h1>
      <p class="font-code text-[10px] md:text-secondary opacity-80 mt-1 md:mt-2">点击下方链接可跳转至对应下载页面</p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      ${downloadItems.map(renderDownloadCard).join('')}
    </div>
    
    <div class="mt-6 glass-panel p-4">
      <div class="flex items-center gap-2 mb-2">
        <svg class="text-secondary" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
        <span class="font-code text-sm text-secondary font-bold">温馨提示</span>
      </div>
      <p class="font-code text-xs text-outline">苹果用户可在 App Store 搜索"旺商聊"进行下载，安卓用户可点击上方链接进行下载。</p>
    </div>
    
    <div class="mt-4">
      <button onclick="window.location.hash='/'" class="glass-panel px-4 py-2 font-code text-sm text-primary hover:bg-primary/10 transition-colors">← 返回首页</button>
    </div>
  `;
}

export function renderSearchPage(query) {
  const results = searchItems(query);
  
  return `
    <div class="mb-4 md:mb-stack-lg border-l-4 border-primary pl-4">
      <h1 class="font-h1 text-2xl md:text-h1 text-primary-fixed-dim uppercase leading-none">搜索结果</h1>
      <p class="font-code text-[10px] md:text-secondary opacity-80 mt-1 md:mt-2 flex items-center gap-1">
        <svg class="text-[12px] md:text-[16px]" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        关键词: "${query}" // 找到 ${results.length} 个结果
      </p>
    </div>
    
    <div class="mb-4">
      <div class="flex items-center bg-surface-container px-stack-sm py-2 rounded-lg border border-outline-variant">
        <svg class="text-outline text-[18px]" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        <input class="bg-transparent border-none focus:ring-0 text-code font-code placeholder:text-outline w-full ml-2" placeholder="搜索游戏..." type="text" id="search-input" value="${query}" onkeypress="if(event.key==='Enter'){app.search(this.value)}"/>
      </div>
    </div>
    
    ${results.length === 0 ? `
      <div class="col-span-full glass-panel p-stack-lg text-center">
        <svg class="text-outline text-4xl mb-4" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M8 8l6 6"/><path d="M14 8l-6 6"/></svg>
        <p class="font-code text-outline">未找到相关内容，请尝试其他关键词</p>
      </div>
    ` : `
      ${renderCarousel(results, SEARCH_CAROUSEL_LABELS)}
    `}
  `;
}
