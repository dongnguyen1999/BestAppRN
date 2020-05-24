import Axios from 'axios';
import * as PATH from '../constants/path';

const fetchPlacesUseTourId = tourId => {
  return Axios.get(
    `${PATH.databaseDomain}${PATH.stourDatabase}${
      PATH.getPlaces
    }?tour_id=${tourId}`,
  );
};

export default fetchPlacesUseTourId;
