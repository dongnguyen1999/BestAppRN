import * as offlineFilters from '../constants/offlineFilters';
import filtersData from '../constants/filtersData';

export const filter = (data, filters) => {
  let distanceFilter = filters.get(offlineFilters.DISTANCE);
  let priceFilter = filters.get(offlineFilters.PRICE);
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
