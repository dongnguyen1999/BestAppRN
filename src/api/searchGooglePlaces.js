import Axios from 'axios';
import * as PATH from '../constants/path';
import {googleApiKey} from '../constants/apiKey';
import * as lang from '../constants/langCode';

export const search = searchText => {
  return Axios.get(
    `${PATH.googleMapPlacePath}${PATH.textSearch}${
      PATH.jsonOutput
    }?&query=${searchText}&key=${googleApiKey}&language=${lang.vietnamese}`,
  );
};

export const searchWithinRadius = (searchText, location, radius) => {
  return Axios.get(
    `${PATH.googleMapPlacePath}${PATH.textSearch}${
      PATH.jsonOutput
    }?&query=${searchText}&location=${location.latitude},${
      location.longitude
    }&radius=${radius}&key=${googleApiKey}&language=${lang.vietnamese}`,
  );
};

export const searchWithinPrice = (searchText, minprice, maxprice) => {
  let min = minprice || 0;
  let max = maxprice;
  return Axios.get(
    `${PATH.googleMapPlacePath}${PATH.textSearch}${
      PATH.jsonOutput
    }?&query=${searchText}&minprice=${min}&maxprice=${max}&key=${googleApiKey}&language=${
      lang.vietnamese
    }`,
  );
};

export const searchWithinPriceRadius = (
  searchText,
  location,
  radius,
  minprice,
  maxprice,
) => {
  let min = minprice || 0;
  let max = maxprice || Infinity;
  return Axios.get(
    `${PATH.googleMapPlacePath}${PATH.textSearch}${
      PATH.jsonOutput
    }?&query=${searchText}&location=${location.latitude},${
      location.longitude
    }&radius=${radius}&minprice=${min}&maxprice=${max}&key=${googleApiKey}&language=${
      lang.vietnamese
    }`,
  );
};

export const getResultNextPage = nextPageToken => {
  return Axios.get(
    `${PATH.googleMapPlacePath}${PATH.textSearch}${
      PATH.jsonOutput
    }?pagetoken=${nextPageToken}&key=${googleApiKey}`,
  );
};
