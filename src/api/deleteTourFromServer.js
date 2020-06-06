import Axios from 'axios';
import * as PATH from '../constants/path';

const deleteTourFromServer = id => {
  return Axios.get(
    `${PATH.databaseDomain}${PATH.stourDatabase}${
      PATH.deleteTour
    }?tour_id=${id}`,
  );
};

export default deleteTourFromServer;
