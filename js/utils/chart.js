// 图表生成工具模块
const CHART_ITEMS = [
  { label: '视讯', height: 48, isActive: false },
  { label: 'PG', height: 80, isActive: false },
  { label: '世界杯', height: 64, isActive: false },
  { label: '电子', height: 96, isActive: false },
  { label: 'PC', height: 112, isActive: true },
  { label: '棋牌', height: 80, isActive: false }
];

export function generateChartBars() {
  return CHART_ITEMS.map(({ label, height, isActive }) => `
      <div class="flex flex-col items-center flex-grow">
        <div class="w-full h-${Math.floor(height / 4)} bg-primary/40 rounded-t-sm mx-0.5 ${isActive ? 'border-t-2 border-primary shadow-[0_0_15px_rgba(183,109,255,0.3)]' : ''}"></div>
        <span class="text-[10px] md:text-[12px] font-bold text-primary mt-1">${label}</span>
      </div>
    `).join('');
}
