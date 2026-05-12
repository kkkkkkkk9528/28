// 搜索服务模块
import { navData } from '../data/nav-data.js';

export function searchItems(query) {
  if (!query || query.trim() === '') {
    return navData.items;
  }
  
  const lowerQuery = query.toLowerCase();
  return navData.items.filter(item => 
    item.title.toLowerCase().includes(lowerQuery) ||
    item.description.toLowerCase().includes(lowerQuery)
  );
}