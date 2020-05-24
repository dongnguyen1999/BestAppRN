import Axios from 'axios';
import * as PATH from '../constants/path';
import {googleApiKey} from '../constants/apiKey';

const fetchPhotosGgApi = (photoreference, maxwidth, maxheight) => {
  return Axios.get(`${PATH.googleMapPlacePath}${PATH.fetchPhotos}`, {
    params: {
      photoreference: photoreference,
      key: googleApiKey,
      maxwidth: maxwidth,
      maxheight: maxheight,
    },
  });
};

export default fetchPhotosGgApi;
