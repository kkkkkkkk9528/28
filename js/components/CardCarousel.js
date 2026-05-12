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
  const cardWidth = allCards[0].offsetWidth + 20;
  const scrollWidth = cardWidth * cards.length;

  track.style.width = `${cardWidth * allCards.length}px`;

  // 用JS实现自动滚动 + 双向拖动
  let position = 0;
  let speed = 1.5;
  let isDragging = false;
  let lastX = 0;
  let animationId = null;

  const move = () => {
    if (!isDragging) {
      position -= speed;
      if (position <= -scrollWidth) position = 0;
      track.style.transform = `translateX(${position}px)`;
    }
    animationId = requestAnimationFrame(move);
  };
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
    track.style.transform = `translateX(${position}px)`;
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
    track.style.transform = `translateX(${position}px)`;
  }, { passive: true });

  container.addEventListener('touchend', () => {
    isDragging = false;
  });

  container.style.cursor = 'grab';

  // 悬停放大效果 - 纯CSS :hover + :active 覆盖一切
  const style = document.createElement('style');
  style.id = 'carousel-styles';
  style.textContent = `
    .card-expand { transition: transform 0.3s ease !important; }
    .card-expand:hover, .card-expand:active, .card-expand.hovered { 
      transform: scale(1.15) !important; 
      z-index: 10 !important; 
    }
    .card-expand > * { margin-top: 0 !important; }
    .card-expand .card-expand-img { 
      width: 100% !important; 
      height: 60% !important; 
      object-fit: cover !important; 
      margin: 0 !important; 
      padding: 0 !important; 
      display: block !important; 
    }
    @media (max-width: 640px) {
      .card-expand .card-expand-img { height: 55% !important; }
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