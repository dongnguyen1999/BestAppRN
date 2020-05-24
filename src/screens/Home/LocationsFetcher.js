import * as googleAPI from '../../api/searchGooglePlaces';
import * as resolveLocations from '../../utilities/resolveLocations';
import * as offlineFilter from '../../constants/offlineFilters';
import fetchAllDetail from '../../api/fetchAllDetail';

export default class LocationsFetcher {
  constructor(context) {
    this.previousSearch = '';
    this.searchLocations = this.searchLocations.bind(context);
    this.getNextPageLocations = this.getNextPageLocations.bind(context);
  }

  async searchLocations(filtersData) {
    if (!filtersData) {
      filtersData = this.state.filtersData;
    }
    let createSearchString = function() {
      let str = this.state.searchText;
      for (let [key, value] of filtersData.entries()) {
        if (offlineFilter.keys.includes(key)) {
          continue;
        }
        if (key === offlineFilter.EXCEPT && value) {
          const exceptKeywords = value
            .split(',')
            .map(value => value.toLowerCase().trim())
            .filter(value => value.length !== 0);
          exceptKeywords.forEach(
            keyword => (str = [str, `-${keyword}`].join(' ')),
          );
          continue;
        }
        let filterName = key ? key.toLowerCase() : '';
        let filterValue = value ? value.toLowerCase() : '';
        str = [str, filterValue].join(' ');
      }
      return str.trim();
    }.bind(this);
    const searchText = createSearchString();
    this.setState({showPlaces: true, tours: []});
    // console.log(searchText);
    if (searchText !== this.previousSearch) {
      this.setState({
        fetchingLocations: true,
        locations: new Map(),
        showFilters: false,
      });
      let response = await googleAPI.searchWithinRadius(
        searchText,
        {
          latitude: this.state.currentLocation.lat,
          longitude: this.state.currentLocation.lng,
        },
        50000,
      );
      this.previousSearch = searchText;
      let locations = resolveLocations.resolveForHomeItem(
        response,
        this.state.currentLocation,
        this.props.navigation,
      );
      let placeIds = [...locations.keys()];
      let details = await fetchAllDetail(placeIds);
      details.forEach(detail => {
        let placeId = detail.place_id;
        let location = locations.get(placeId);
        locations.set(placeId, {...location, detail: detail});
      });
      this.setState({
        locations: locations,
        fetchingLocations: false,
        nextPageToken: response.data.next_page_token,
      });
    } else {
      this.setState({filtersData: filtersData});
    }
  }

  async getNextPageLocations() {
    // console.log(this.state.nextPageToken);
    if (!this.state.nextPageToken) {
      return;
    }
    this.setState({fetchingLocations: true});
    const response = await googleAPI.getResultNextPage(
      this.state.nextPageToken,
    );
    let locations = resolveLocations.resolveForHomeItem(
      response,
      this.state.currentLocation,
      this.props.navigation,
    );
    let placeIds = [...locations.keys()];
    let details = await fetchAllDetail(placeIds);
    details.forEach(detail => {
      let placeId = detail.place_id;
      let location = locations.get(placeId);
      locations.set(placeId, {...location, detail: detail});
    });
    this.setState({
      locations: new Map([...this.state.locations, ...locations]),
      fetchingLocations: false,
      nextPageToken: response.data.next_page_token,
    });
  }
}
