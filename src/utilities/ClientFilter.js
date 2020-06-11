import * as offlineFilters from '../constants/offlineFilters';
import filtersData from '../constants/filtersData';

export const filter = (data, filters) => {
  let distanceFilter = filters.get(offlineFilters.DISTANCE);
  let priceFilter = filters.get(offlineFilters.PRICE);
  let exceptFilter = filters.get(offlineFilters.EXCEPT);
  let result = data;
  if (distanceFilter != undefined) {
    distanceFilter = distanceFilter.match(/\d+/)[0];
    // console.log(distanceFilter);
    result = filterWithDistance(result, distanceFilter);
  }
  if (priceFilter) {
    priceFilter = filtersData
      .filter(({title}) => title === offlineFilters.PRICE)[0]
      .listItem.indexOf(priceFilter);
    // console.log(priceFilter);
    result = filterWithPrice(result, priceFilter);
  }
  console.log(exceptFilter);
  if (exceptFilter) {
    const exceptKeywords = exceptFilter
      .split(',')
      .map(value => value.toLowerCase().trim())
      .filter(value => value.length !== 0);
    exceptKeywords.forEach(word => (result = filterWithExcept(result, word)));
  }
  return result;
};

export const filterWithDistance = (data, km) => {
  return data.filter(({distance}) => distance < km);
};

export const filterWithPrice = (data, rank) => {
  return data.filter(({detail}) => {
    let price_level = detail.price_level || 0;
    return price_level <= rank;
  });
};

export const filterWithExcept = (data, word) => {
  return data.filter(({name}) => !name.includes(word));
};
