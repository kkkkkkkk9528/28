// 主应用入口
import { startCountdownTimer } from './utils/countdown.js';
import { renderHomePage, renderDownloadPage, renderSearchPage } from './pages/page-render.js';
import { initCarousel } from './components/CardCarousel.js';

// 应用主对象
const app = {
  currentRoute: 'home',
  
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
    // 启动倒计时
    startCountdownTimer();
    // 初始化轮播
    initCarousel();
  },
  
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
  
  render() {
    const main = document.querySelector('main');
    if (main) {
      main.innerHTML = this.handleRoute();
    }
  },
  
  renderHome() {
    return renderHomePage();
  },
  
  renderSearch(query) {
    return renderSearchPage(query);
  },
  
  renderDownloadPage() {
    return renderDownloadPage();
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
