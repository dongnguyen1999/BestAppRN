import Axios from 'axios';
import * as PATH from '../constants/path';

const fetchCompanyInfo = comId => {
  if (!comId || comId.length == 0) {
    return Axios.get(
      `${PATH.databaseDomain}${PATH.stourDatabase}${PATH.getCompanyInfo}`,
    );
  }
  return Axios.get(
    `${PATH.databaseDomain}${PATH.stourDatabase}${
      PATH.getCompanyInfo
    }?com_id=${comId}`,
  );
};

export default fetchCompanyInfo;
