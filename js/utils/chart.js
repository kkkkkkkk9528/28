// 图表生成工具模块

export function generateChartBars() {
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