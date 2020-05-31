import Axios from 'axios';
import * as PATH from '../constants/path';

const updateTourInfo = data => {
  const params = new URLSearchParams();
  for (var prop in data) {
    if (Object.prototype.hasOwnProperty.call(data, prop)) {
      if (prop === 'placeIds') {
        let placeIds = data[prop];
        placeIds.forEach(placeId => {
          params.append(`${prop}[]`, placeId);
        });
      } else params.append(prop, data[prop]);
    }
  }
  return Axios.post(
    `${PATH.databaseDomain}${PATH.stourDatabase}${PATH.updateTourInfo}`,
    params,
  );
};

export default updateTourInfo;
