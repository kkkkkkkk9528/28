// 主应用 - 纯静态导航网站
import { navData } from './data/nav-data.js';
import { createNavigationCard } from './components/NavigationCard.js';

/**
 * 获取倒计时时间 - 动态倒计时
 */
let countdownTarget = null;

function getCountdown() {
  if (!countdownTarget) {
    // 设置目标时间为4小时后
    const now = new Date();
    countdownTarget = new Date(now.getTime() + 4 * 60 * 60 * 1000);
  }
  
  const now = new Date();
  const diff = countdownTarget - now;
  
  if (diff <= 0) {
    // 重置倒计时
    countdownTarget = new Date(now.getTime() + 4 * 60 * 60 * 1000);
    return `${String(4).padStart(2, '0')}小时 ${String(0).padStart(2, '0')}分 ${String(0).padStart(2, '0')}秒`;
  }
  
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
  return `${String(hours).padStart(2, '0')}小时 ${String(minutes).padStart(2, '0')}分 ${String(seconds).padStart(2, '0')}秒`;
}

/**
 * 更新倒计时显示
 */
function updateCountdown() {
  const countdownEl = document.getElementById('countdown-display');
  if (countdownEl) {
    countdownEl.textContent = getCountdown();
  }
}

/**
 * 启动倒计时定时器
 */
function startCountdownTimer() {
  updateCountdown();
  setInterval(updateCountdown, 1000);
}



/**
 * 生成图表柱状图
 */
function generateChartBars() {
  const bars = [];
  const heights = [48, 80, 64, 96, 112, 80];
  const labels = ['视讯', 'PG', '世界杯', '电子', 'PC', '棋牌'];
  for (let i = 0; i < 6; i++) {
    const height = heights[i];
    const isActive = i === 4;
    bars.push(`
      <div class="flex flex-col items-center flex-grow">
        <div class="w-full h-${Math.floor(height/4)} bg-primary/40 rounded-t-sm mx-0.5 ${isActive ? 'border-t-2 border-primary' : ''} ${isActive ? 'shadow-[0_0_15px_rgba(183,109,255,0.3)]' : ''}"></div>
        <span class="text-[10px] md:text-[12px] font-bold text-primary mt-1">${labels[i]}</span>
      </div>
    `);
  }
  return bars.join('');
}



/**
 * 搜索功能
 */
function searchItems(query) {
  if (!query || query.trim() === '') {
    return navData.items;
  }
  
  const lowerQuery = query.toLowerCase();
  return navData.items.filter(item => 
    item.title.toLowerCase().includes(lowerQuery) ||
    item.description.toLowerCase().includes(lowerQuery)
  );
}

/**
 * 渲染下载页面
 */
function renderDownloadPage() {
  return `
    <!-- Download Page -->
    <div class="mb-4 md:mb-stack-lg border-l-4 border-primary pl-4">
      <h1 class="font-h1 text-2xl md:text-h1 uppercase leading-none">下载地址</h1>
      <p class="font-code text-[10px] md:text-secondary opacity-80 mt-1 md:mt-2">
        点击下方链接可跳转至对应下载页面
      </p>
    </div>
    
    <!-- Download Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <!-- 官方下载地址 -->
      <div class="glass-panel p-4 flex flex-col items-center gap-3 cursor-pointer hover:scale-[1.02] transition-transform" onclick="window.open('https://sjgj04.vip/', '_blank')">
        <img src="./images/ng.webp" class="w-20 h-20 rounded-lg object-contain bg-white" alt="官方下载"/>
        <span class="font-code text-sm text-primary font-bold">官方下载地址</span>
        <span class="font-code text-xs text-outline">https://sjgj04.vip/</span>
        <span class="px-3 py-1 text-[10px] font-code rounded-full bg-primary/20 text-primary">点击下载</span>
      </div>
      
      <!-- 旺旺安卓下载 -->
      <div class="glass-panel p-4 flex flex-col items-center gap-3 cursor-pointer hover:scale-[1.02] transition-transform" onclick="window.open('https://www.wwtalk.cha', '_blank')">
        <img src="./images/sj.webp" class="w-20 h-20 rounded-lg object-contain bg-white" alt="旺旺下载"/>
        <span class="font-code text-sm text-secondary font-bold">旺旺安卓下载</span>
        <span class="font-code text-xs text-outline">https://www.wwtalk.cha</span>
        <span class="px-3 py-1 text-[10px] font-code rounded-full bg-secondary/20 text-secondary">点击下载</span>
      </div>
      
      <!-- 旺旺官网 -->
      <div class="glass-panel p-4 flex flex-col items-center gap-3 cursor-pointer hover:scale-[1.02] transition-transform" onclick="window.open('https://www.wwtalk.app', '_blank')">
        <img src="./images/ng.webp" class="w-20 h-20 rounded-lg object-contain bg-white" alt="旺旺官网"/>
        <span class="font-code text-sm text-tertiary font-bold">旺旺官网</span>
        <span class="font-code text-xs text-outline">https://www.wwtalk.app</span>
        <span class="px-3 py-1 text-[10px] font-code rounded-full bg-tertiary/20 text-tertiary">点击下载</span>
      </div>
      
      <!-- 苹果用户 -->
      <div class="glass-panel p-4 flex flex-col items-center gap-3" onclick="window.open('https://apps.apple.com/app/旺商聊', '_blank')">
        <img src="./images/sj.webp" class="w-20 h-20 rounded-lg object-contain bg-white" alt="苹果下载"/>
        <span class="font-code text-sm text-primary-container font-bold">苹果用户下载</span>
        <span class="font-code text-xs text-outline text-center px-2">应用商店搜索"旺商聊"</span>
        <span class="px-3 py-1 text-[10px] font-code rounded-full bg-primary-container/20 text-primary-container">App Store</span>
      </div>
    </div>
    
    <!-- 提示信息 -->
    <div class="mt-6 glass-panel p-4">
      <div class="flex items-center gap-2 mb-2">
        <svg class="text-secondary" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
        <span class="font-code text-sm text-secondary font-bold">温馨提示</span>
      </div>
      <p class="font-code text-xs text-outline">
        苹果用户可在 App Store 搜索"旺商聊"进行下载，安卓用户可点击上方链接进行下载。
      </p>
    </div>
    
    <!-- 返回按钮 -->
    <div class="mt-4">
      <button onclick="window.location.hash='/'" class="glass-panel px-4 py-2 font-code text-sm text-primary hover:bg-primary/10 transition-colors">
        ← 返回首页
      </button>
    </div>
  `;
}

/**
 * 渲染搜索结果页
 */
function renderSearchPage(query) {
  const results = searchItems(query);
  
  return `
    <!-- Search Header -->
    <div class="mb-4 md:mb-stack-lg border-l-4 border-primary pl-4">
      <h1 class="font-h1 text-2xl md:text-h1 text-primary-fixed-dim uppercase leading-none">搜索结果</h1>
      <p class="font-code text-[10px] md:text-secondary opacity-80 mt-1 md:mt-2 flex items-center gap-1">
        <svg class="text-[12px] md:text-[16px]" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        关键词: "${query}" // 找到 ${results.length} 个结果
      </p>
    </div>
    
    <!-- Search Input -->
    <div class="mb-4">
      <div class="flex items-center bg-surface-container px-stack-sm py-2 rounded-lg border border-outline-variant">
        <svg class="text-outline text-[18px]" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        <input class="bg-transparent border-none focus:ring-0 text-code font-code placeholder:text-outline w-full ml-2" 
               placeholder="搜索游戏..." type="text" id="search-input" value="${query}"
               onkeypress="if(event.key==='Enter'){app.search(this.value)}"/>
      </div>
    </div>
    
    <!-- Results Grid -->
    <div class="grid grid-cols-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-1 md:gap-gutter" id="loot-grid">
      ${results.length === 0 ? `
        <div class="col-span-full glass-panel p-stack-lg text-center">
          <svg class="text-outline text-4xl mb-4" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M8 8l6 6"/><path d="M14 8l-6 6"/></svg>
          <p class="font-code text-outline">未找到相关内容，请尝试其他关键词</p>
        </div>
      ` : results.map(item => createNavigationCard(item)).join('')}
    </div>
  `;
}

/**
 * 渲染首页
 */
function renderHomePage() {
  return `
    <!-- Hero Header -->
    <div class="mb-4 md:mb-stack-lg border-l-4 border-primary pl-4">
      <h1 class="font-h1 text-2xl md:text-h1 uppercase leading-none glitch" data-glitch="注册就送88-888">注册就送88-888</h1>
      
      <!-- 网站标签 -->
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
    
    <!-- Recommended Loot Grid -->
    <div class="grid grid-cols-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-1 md:gap-gutter" id="loot-grid">
      ${navData.items.map(item => createNavigationCard(item)).join('')}
    </div>
    
    <!-- 认证图片 -->
    <div class="w-full flex justify-center my-6">
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

/**
 * 应用主对象
 */
const app = {
  currentRoute: 'home',
  
  /**
   * 初始化应用
   */
  init() {
    
    // 绑定搜索
    const searchInput = document.getElementById('global-search');
    if (searchInput) {
      searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          this.search(searchInput.value);
        }
      });
    }
    
    // 初始渲染
    this.render();
    // 启动倒计时定时器
    startCountdownTimer();
  },
  
  /**
   * 路由处理
   */
  handleRoute() {
    const hash = window.location.hash.slice(1) || '/';
    
    if (hash.startsWith('/search')) {
      const query = new URLSearchParams(hash.split('?')[1] || '').get('q') || '';
      return this.renderSearch(query);
    } else if (hash === '/download') {
      return this.renderDownloadPage();
    } else {
      return this.renderHome();
    }
  },
  
  /**
   * 渲染页面
   */
  render() {
    const main = document.querySelector('main');
    if (main) {
      main.innerHTML = this.handleRoute();
    }
  },
  
  /**
   * 渲染首页
   */
  renderHome() {
    return renderHomePage();
  },
  
  /**
   * 渲染搜索页
   */
  renderSearch(query) {
    return renderSearchPage(query);
  },
  
  /**
   * 执行搜索
   */
  search(query) {
    window.location.hash = `/search?q=${encodeURIComponent(query)}`;
  }
};

// 监听hash变化
window.addEventListener('hashchange', () => app.render());

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => app.init());

// 导出供全局使用
window.app = app;

export default app;