// 页面渲染模块
import { navData } from '../data/nav-data.js';
import { getRandomOnline } from '../components/NavigationCard.js';
import { generateChartBars } from '../utils/chart.js';
import { searchItems } from '../services/search-service.js';

export function renderHomePage() {
  return `
    <!-- Hero Header -->
    <div class="mb-4 md:mb-stack-lg border-l-4 border-primary pl-4">
      <h1 class="font-h1 text-2xl md:text-h1 uppercase leading-none glitch" data-glitch="注册就送88-888">注册就送88-888</h1>
      
      <div class="flex flex-wrap gap-2 mt-2">
        <span class="glass-tag px-4 py-1.5 text-xs md:text-sm font-code rounded-full text-primary border border-primary/40">游戏资讯</span>
        <span class="glass-tag px-4 py-1.5 text-xs md:text-sm font-code rounded-full text-secondary border border-secondary/40">游戏福利</span>
        <span class="glass-tag px-4 py-1.5 text-xs md:text-sm font-code rounded-full text-tertiary border border-tertiary/40">游戏社区</span>
        <span class="glass-tag px-4 py-1.5 text-xs md:text-sm font-code rounded-full text-primary-container border border-primary-container/40">游戏开奖</span>
        <span class="glass-tag px-4 py-1.5 text-xs md:text-sm font-code rounded-full text-secondary-container border border-secondary-container/40">游戏预测</span>
      </div>
      
      <p class="font-code text-[10px] md:text-secondary opacity-80 mt-1 md:mt-2 flex items-center gap-1">
        <span class="text-[12px] md:text-[16px]">新玩家</span>
        福利截至: <span id="countdown-display"></span>
      </p>
    </div>
    
    <!-- Horizontal Sliding Cards -->
    <div class="card-expand-container">
      <div class="card-3d-5">
        ${navData.items.slice(0, 5).map((item, index) => `
          <div class="card-expand" data-index="${index}" onclick="window.open('${item.url || 'https://www.ng081.com'}', '_blank')">
            ${item.iconImage ? `<img src="${item.iconImage}" class="card-expand-img" alt="${item.title}"/>` : `<div class="flex items-center justify-center card-expand-img text-primary/50"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg></div>`}
            <div class="card-expand-title">
              <span>${item.title}</span>
              <div class="card-expand-info">
                <span><span class="label">在线人数</span><span class="value">${getRandomOnline()}</span></span>
                <span><span class="label">反水优惠</span><span class="value">${item.bonus || '0.5%'}</span></span>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
    
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
        <div class="glass-panel p-2 flex items-center gap-3 cursor-pointer hover:scale-[1.02] transition-transform" onclick="window.location.href='./pages/promotion.html'">
          <img src="./images/mdl.webp" class="w-12 h-12 rounded-lg object-contain bg-white" alt="Banner 1"/>
          <span class="font-code text-sm text-primary font-bold">注册就送88-888</span>
        </div>
        <div class="glass-panel p-2 flex items-center gap-3 cursor-pointer hover:scale-[1.02] transition-transform" onclick="window.location.href='./pages/first-deposit.html'">
          <img src="./images/PC.webp" class="w-12 h-12 rounded-lg object-contain bg-white" alt="Banner 2"/>
          <span class="font-code text-sm text-secondary font-bold">游戏预测</span>
        </div>
        <div class="glass-panel p-2 flex items-center gap-3 cursor-pointer hover:scale-[1.02] transition-transform" onclick="window.location.href='./pages/download.html'">
          <img src="./images/ng.webp" class="w-12 h-12 rounded-lg object-contain bg-white" alt="Banner 3"/>
          <span class="font-code text-sm text-tertiary font-bold">官方下载地址 旺旺下载地址</span>
        </div>
        <div class="glass-panel p-2 flex items-center gap-3 cursor-pointer hover:scale-[1.02] transition-transform" onclick="window.location.href='./pages/vip.html'">
          <img src="./images/NGlog.webp" class="w-12 h-12 rounded-lg object-contain bg-white" alt="Banner 4"/>
          <span class="font-code text-sm text-primary-container font-bold">VIP专属接待</span>
        </div>
        <div class="glass-panel p-2 flex items-center gap-3 cursor-pointer hover:scale-[1.02] transition-transform" onclick="window.location.href='./pages/warning.html'">
          <img src="./images/ng.webp" class="w-12 h-12 rounded-lg object-contain bg-white" alt="Banner 5"/>
          <span class="font-code text-sm text-secondary-container font-bold">公示 避坑必看</span>
        </div>
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
      <div class="glass-panel p-4 flex flex-col items-center gap-3 cursor-pointer hover:scale-[1.02] transition-transform" onclick="window.open('https://sjgj04.vip/', '_blank')">
        <img src="./images/ng.webp" class="w-20 h-20 rounded-lg object-contain bg-white" alt="官方下载"/>
        <span class="font-code text-sm text-primary font-bold">官方下载地址</span>
        <span class="font-code text-xs text-outline">https://sjgj04.vip/</span>
        <span class="px-3 py-1 text-[10px] font-code rounded-full bg-primary/20 text-primary">点击下载</span>
      </div>
      
      <div class="glass-panel p-4 flex flex-col items-center gap-3 cursor-pointer hover:scale-[1.02] transition-transform" onclick="window.open('https://www.wwtalk.cha', '_blank')">
        <img src="./images/sj.webp" class="w-20 h-20 rounded-lg object-contain bg-white" alt="旺旺下载"/>
        <span class="font-code text-sm text-secondary font-bold">旺旺安卓下载</span>
        <span class="font-code text-xs text-outline">https://www.wwtalk.cha</span>
        <span class="px-3 py-1 text-[10px] font-code rounded-full bg-secondary/20 text-secondary">点击下载</span>
      </div>
      
      <div class="glass-panel p-4 flex flex-col items-center gap-3 cursor-pointer hover:scale-[1.02] transition-transform" onclick="window.open('https://www.wwtalk.app', '_blank')">
        <img src="./images/ng.webp" class="w-20 h-20 rounded-lg object-contain bg-white" alt="旺旺官网"/>
        <span class="font-code text-sm text-tertiary font-bold">旺旺官网</span>
        <span class="font-code text-xs text-outline">https://www.wwtalk.app</span>
        <span class="px-3 py-1 text-[10px] font-code rounded-full bg-tertiary/20 text-tertiary">点击下载</span>
      </div>
      
      <div class="glass-panel p-4 flex flex-col items-center gap-3" onclick="window.open('https://apps.apple.com/app/旺商聊', '_blank')">
        <img src="./images/sj.webp" class="w-20 h-20 rounded-lg object-contain bg-white" alt="苹果下载"/>
        <span class="font-code text-sm text-primary-container font-bold">苹果用户下载</span>
        <span class="font-code text-xs text-outline text-center px-2">应用商店搜索"旺商聊"</span>
        <span class="px-3 py-1 text-[10px] font-code rounded-full bg-primary-container/20 text-primary-container">App Store</span>
      </div>
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
      <div class="card-expand-container">
        <div class="card-3d-5">
          ${results.slice(0, 5).map((item, index) => `
            <div class="card-expand" data-index="${index}" onclick="window.open('${item.url || 'https://www.ng081.com'}', '_blank')">
              ${item.iconImage ? `<img src="${item.iconImage}" class="card-expand-img" alt="${item.title}"/>` : `<div class="flex items-center justify-center card-expand-img text-primary/50"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg></div>`}
              <div class="card-expand-title">
                <span>${item.title}</span>
                <div class="card-expand-info">
                  <span><span class="label">在线</span><span class="value">${getRandomOnline()}</span></span>
                  <span><span class="label">反水</span><span class="value">${item.bonus || '0.5%'}</span></span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `}
  `;
}
