import Axios from 'axios';
import * as PATH from '../constants/path';

const fetchTours = placeIds => {
  if (!placeIds || placeIds.length == 0) {
    return Axios.get(
      `${PATH.databaseDomain}${PATH.stourDatabase}${PATH.getTours}`,
    );
  }
  let ids = placeIds.map(placeId => `'${placeId}'`).join(',');
  return Axios.get(
    `${PATH.databaseDomain}${PATH.stourDatabase}${
      PATH.getTours
    }?place_ids=${ids}`,
  );
};

export default fetchTours;
