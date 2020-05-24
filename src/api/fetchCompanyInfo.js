import Axios from 'axios';
import * as PATH from '../constants/path';

const fetchCompanyInfo = comId => {
  return Axios.get(
    `${PATH.databaseDomain}${PATH.stourDatabase}${
      PATH.getCompanyInfo
    }?com_id=${comId}`,
  );
};

export default fetchCompanyInfo;
