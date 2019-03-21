export const PAGE_SIZES = {
  _5: 5,
  _10: 10,
  _20: 20,
  _60: 60,
  _100: 100
};

/**
 * Determines whether a given pages is in the predefined enumeration
 *
 * @param {Number} size - The size to check against
 * @returns {Boolean} -  True if size is valid, false otherwise.
 */
export function inPageSizes(size) {
  for (const value in PAGE_SIZES) {
    if (PAGE_SIZES[value] === size) {
      return true;
    }
  }
  return false;
}

