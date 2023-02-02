export function normalizeStarCounter(num: number) {
  if (num >= 1000000000) {
    return `${(num / 1000000000).toFixed(1).replace(/\.0$/, '')}G`;
  }
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1).replace(/\.0$/, '')}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1).replace(/\.0$/, '')}K`;
  }
  return num;
}


// Funzione che stabilisce quando deve re renderizzare il componente
export const equalProps = (prev: any, next: any) => {
  if (JSON.stringify(prev) !== JSON.stringify(next)) {
    return false;
  }
  return true;
};