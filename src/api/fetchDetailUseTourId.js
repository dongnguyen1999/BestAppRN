import Axios from 'axios';
import * as PATH from '../constants/path';

const fetchDetailUseTourId = tourId => {
  return Axios.get(
    `${PATH.databaseDomain}${PATH.stourDatabase}${
      PATH.getTourDetail
    }?tour_id=${tourId}`,
  );
};

export default fetchDetailUseTourId;
