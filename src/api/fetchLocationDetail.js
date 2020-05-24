import Axios from 'axios';
import * as PATH from '../constants/path';
import {googleApiKey} from '../constants/apiKey';

const fetchLocationDetail = placeId => {
  return Axios.get(`${PATH.googleMapPlacePath}${PATH.fetchDetail}/json`, {
    params: {
      place_id: placeId,
      key: googleApiKey,
    },
  });
};

export default fetchLocationDetail;
