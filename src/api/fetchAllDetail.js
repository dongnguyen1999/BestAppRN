import fetchLocationDetail from './fetchLocationDetail';

const fetchAllDetail = placeIds => {
  return Promise.all(
    placeIds.map(placeId => fetchLocationDetail(placeId)),
  ).then(responses =>
    Promise.all(responses.map(response => response.data.result)),
  );
};

export default fetchAllDetail;
