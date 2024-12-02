/**
 * Returns the current season in the format "Season Year"
 *
 * @see https://theotakubox.com/blogs/articles/seasons-and-cours-do-you-really-know-when-your-anime-came-out?srsltid=AfmBOoqhUPzEp5X9M3srNC1cQs4TKnAuObKU04GHrCNa39SxjHZttvB0
 * @returns string
 */
export function getCurrentSeason() {
  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  if (month >= 1 && month <= 3) {
    return `Winter ${year}`;
  } else if (month >= 4 && month <= 6) {
    return `Spring ${year}`;
  } else if (month >= 7 && month <= 9) {
    return `Summer ${year}`;
  } else if (month >= 10 && month <= 12) {
    return `Fall ${year}`;
  } else {
    return "";
  }
}
