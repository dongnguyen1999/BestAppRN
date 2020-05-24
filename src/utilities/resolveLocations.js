import {getDistanceFrom2Locations} from './computeDistance';

export const resolveForHomeItem = (response, currentLocation) => {
  // formatted_address name icon place_id
  let newMap = new Map();
  response.data.results.forEach(result => {
    let photo_reference;
    if (result.photos && result.photos.length > 0) {
      photo_reference = result.photos[0].photo_reference;
    }
    let distance = getDistanceFrom2Locations(
      currentLocation,
      result.geometry.location,
    );
    newMap.set(result.place_id, {
      place_id: result.place_id,
      name: result.name,
      photo_reference: photo_reference,
      formatted_address: result.formatted_address,
      distance: distance,
    });
  });
  return newMap;
};
