import * as offlineFilter from '../constants/offlineFilters';
const createSearchString = (searchText, filtersData) => {
  let str = searchText;
  for (let [key, value] of filtersData.entries()) {
    if (offlineFilter.keys.includes(key)) {
      continue;
    }
    if (key === offlineFilter.EXCEPT && value) {
      const exceptKeywords = value
        .split(',')
        .map(value => value.toLowerCase().trim())
        .filter(value => value.length !== 0);
      exceptKeywords.forEach(keyword => (str = [str, `-${keyword}`].join(' ')));
      continue;
    }
    let filterName = key ? key.toLowerCase() : '';
    let filterValue = value ? value.toLowerCase() : '';
    str = [str, filterValue].join(' ');
  }
  return str.trim();
};

export default createSearchString;
