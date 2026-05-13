// 卡片轮播组件 - 简洁版
export function initCarousel() {
  const container = document.querySelector('.card-expand-container');
  if (!container) return;

  const track = container.querySelector('.card-3d-5');
  if (!track) return;

  const cards = track.querySelectorAll('.card-expand');
  if (cards.length === 0) return;

  // 克隆卡片实现无限滚动
  cards.forEach(card => track.appendChild(card.cloneNode(true)));
  cards.forEach(card => track.appendChild(card.cloneNode(true)));

  const allCards = track.querySelectorAll('.card-expand');
  let cardWidth = 0;
  let scrollWidth = 0;

  const updateTrackMetrics = () => {
    const trackStyles = window.getComputedStyle(track);
    const gap = parseFloat(trackStyles.columnGap || trackStyles.gap || '0') || 0;
    cardWidth = allCards[0].offsetWidth + gap;
    scrollWidth = cardWidth * cards.length;
    track.style.width = `${cardWidth * allCards.length}px`;
  };

  updateTrackMetrics();

  // 用JS实现自动滚动 + 双向拖动
  let position = 0;
  let speed = window.matchMedia('(max-width: 640px)').matches ? 1.1 : 1.5;
  let isDragging = false;
  let lastX = 0;
  let animationId = null;

  const normalizePosition = () => {
    while (position <= -scrollWidth) position += scrollWidth;
    while (position > 0) position -= scrollWidth;
  };

  const updateCardVisuals = () => {
    const isMobile = window.matchMedia('(max-width: 640px)').matches;
    if (!isMobile) {
      allCards.forEach(card => {
        card.style.removeProperty('--card-transform');
        card.style.removeProperty('--card-opacity');
        card.style.removeProperty('--card-z');
      });
      return;
    }

    const rect = container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;

    allCards.forEach(card => {
      const cardRect = card.getBoundingClientRect();
      const distance = Math.min(Math.abs(centerX - (cardRect.left + cardRect.width / 2)), rect.width);
      const ratio = 1 - distance / rect.width;
      card.style.setProperty('--card-transform', `translateY(${Math.round(ratio * -12)}px) scale(${(0.8 + ratio * 0.28).toFixed(3)})`);
      card.style.setProperty('--card-opacity', (0.55 + ratio * 0.45).toFixed(3));
      card.style.setProperty('--card-z', `${Math.round(1 + ratio * 9)}`);
    });
  };

  const render = () => {
    normalizePosition();
    track.style.transform = `translateX(${position}px)`;
    updateCardVisuals();
  };

  window.addEventListener('resize', () => {
    updateTrackMetrics();
    render();
  });

  const move = () => {
    if (!isDragging) position -= speed;
    render();
    animationId = requestAnimationFrame(move);
  };
  render();
  move();

  // 鼠标拖拽
  container.addEventListener('mousedown', e => {
    isDragging = true;
    lastX = e.clientX;
    container.style.cursor = 'grabbing';
  });

  container.addEventListener('mousemove', e => {
    if (!isDragging) return;
    const delta = e.clientX - lastX;
    position += delta;
    lastX = e.clientX;
    render();
  });

  container.addEventListener('mouseup', () => {
    isDragging = false;
    container.style.cursor = 'grab';
  });

  container.addEventListener('mouseleave', () => {
    isDragging = false;
    container.style.cursor = 'grab';
  });

  // 触摸拖拽
  container.addEventListener('touchstart', e => {
    isDragging = true;
    lastX = e.touches[0].clientX;
  }, { passive: true });

  container.addEventListener('touchmove', e => {
    if (!isDragging) return;
    const delta = e.touches[0].clientX - lastX;
    position += delta;
    lastX = e.touches[0].clientX;
    render();
  }, { passive: true });

  container.addEventListener('touchend', () => {
    isDragging = false;
  });

  container.style.cursor = 'grab';

  // 悬停放大效果 - 纯CSS :hover + :active 覆盖一切
  const style = document.createElement('style');
  style.id = 'carousel-styles';
  style.textContent = `
    .card-expand { transition: transform 0.3s ease, opacity 0.3s ease !important; }
    .card-expand:hover, .card-expand:active, .card-expand.hovered { 
      transform: scale(1.15) !important; 
      z-index: 10 !important; 
    }
    .card-expand > * { margin-top: 0 !important; }
    .card-expand .card-expand-img { 
      width: 100% !important; 
      height: calc(100% - var(--card-title-h) - 2px) !important; 
      top: 0 !important;
      object-fit: cover !important; 
      object-position: center 35% !important;
      margin: 0 !important; 
      display: block !important; 
    }
    @media (max-width: 640px) {
      .card-expand,
      .card-expand:hover,
      .card-expand:active,
      .card-expand.hovered {
        transform: var(--card-transform, translateY(0) scale(1)) !important;
        opacity: var(--card-opacity, 1) !important;
        z-index: var(--card-z, 1) !important;
      }
      .card-expand .card-expand-img {
        width: 100% !important;
        height: calc(100% - var(--card-title-h) - 1px) !important;
        top: 0 !important;
        left: 0 !important;
        object-fit: contain !important;
        object-position: center top !important;
      }
    }
    .card-expand-title { margin-top: auto !important; font-size: 16px !important; font-weight: 600 !important; }
    .card-expand-info { font-size: 12px !important; }
  `;
  document.head.appendChild(style);
  
  // 鼠标悬停事件
  allCards.forEach(card => {
    card.addEventListener('mouseenter', () => card.classList.add('hovered'));
    card.addEventListener('mouseleave', () => card.classList.remove('hovered'));
  });
}
