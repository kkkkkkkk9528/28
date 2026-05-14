// 主应用入口
import { startCountdownTimer } from './utils/countdown.js';
import {
  renderHomePage as renderHomePageContent,
  renderDownloadPage as renderDownloadPageContent,
  renderSearchPage as renderSearchPageContent
} from './pages/page-render.js';
import { initCarousel } from './components/CardCarousel.js';

// 应用主对象
const app = {
  initialized: false,
  
  init() {
    if (this.initialized) return;
    this.initialized = true;
    
    // 初始渲染
    this.render();
    // 启动倒计时
    startCountdownTimer();
    // 初始化轮播
    initCarousel();
  },
  
  handleRoute() {
    const hash = window.location.hash.slice(1) || '/';
    
    if (hash.startsWith('/search')) {
      const query = new URLSearchParams(hash.split('?')[1] || '').get('q') || '';
      return renderSearchPageContent(query);
    }

    if (hash === '/download') {
      return renderDownloadPageContent();
    }

    return renderHomePageContent();
  },
  
  render() {
    const main = document.querySelector('main');
    if (main) {
      main.innerHTML = this.handleRoute();
    }
  },
  
  search(query) {
    window.location.hash = `/search?q=${encodeURIComponent(query)}`;
  }
};

// 监听hash变化
window.addEventListener('hashchange', () => app.render());

// 初始化应用
document.addEventListener('DOMContentLoaded', () => app.init());

// 导出供全局使用
window.app = app;

export default app;
