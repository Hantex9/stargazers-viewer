/**
 * Function that normalize the number using the K M B units at the end of the string
 * es. 301500 will become 301.5K
 * @param num number to normalize
 * @returns normalized string number (es. 301.5K)
 */
export function normalizeStarCounter(num: number) {
  if (num >= 1000000000) {
    return `${(num / 1000000000).toFixed(1).replace(/\.0$/, '')}B`;
  }
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1).replace(/\.0$/, '')}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1).replace(/\.0$/, '')}K`;
  }
  return num;
}

/**
 * Utility function that determinete when a component should rerender or not
 * @param prev previous props
 * @param next next props
 * @returns true or false if the component should re render
 */
export const equalProps = (prev: any, next: any) => {
  if (JSON.stringify(prev) !== JSON.stringify(next)) {
    return false;
  }
  return true;
};

/**
 * Utility function to generate a placeholder array based on the number of elements desider
 * @param numOfElements numbers of placeholder element to creates
 * @returns the placeholder array
 */
export const generatePlaceholderArray = (numOfElements: number = 3): number[] => {
  const placeholderArray = [];
  for (let i = 0; i < numOfElements; i += 1) {
    placeholderArray.push(i);
  }
  return placeholderArray;
};
