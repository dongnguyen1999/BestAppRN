import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import StourButton from '../../../components/StourButton';
import Filter from '../../../components/Filter';
import data from '../../../constants/filtersData';
import {RFValue} from 'react-native-responsive-fontsize';
import theme from '../../../themes/default';
import ExceptionInput from './ExceptionInput';
import {EXCEPT} from '../../../constants/offlineFilters';

class FiltersButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFilters: false,
      filtersData: new Map(),
    };
  }

  getNbUsedFilters() {
    let nbFilters = [...this.state.filtersData.values()].filter(
      value => value != undefined,
    ).length;
    return nbFilters;
  }

  updateFiltersData = (title, value) =>
    this.setState({filtersData: this.state.filtersData.set(title, value)});
  clearFiltersData = () => this.setState({filtersData: new Map()});

  changeShowFilters(filtersData, callbackValue) {
    if (!this.state.showFilters) {
      this.state.filtersData = filtersData;
    }
    if (this.state.showFilters) {
      callbackValue(this.state.filtersData);
    }
    this.setState({showFilters: !this.state.showFilters});
  }

  renderFilters(data) {
    let views = [];
    for (let index = 0; index < data.length; index += 2) {
      let item = data[index];
      let nextItem = data[index + 1];
      views.push(
        <View style={styles.filtersRow}>
          <Filter
            title={item.title}
            listItem={item.listItem}
            style={styles.filter}
            callbackValue={this.updateFiltersData}
            selectedValue={this.state.filtersData.get(item.title)}
          />
          {nextItem ? (
            <Filter
              title={nextItem.title}
              listItem={nextItem.listItem}
              style={styles.filter}
              callbackValue={this.updateFiltersData}
              selectedValue={this.state.filtersData.get(nextItem.title)}
            />
          ) : null}
        </View>,
      );
    }
    return views;
  }

  render() {
    const {
      onClearFilters,
      onSearchText,
      callbackValue,
      filtersData,
    } = this.props;
    const nbFilters = this.getNbUsedFilters();
    return (
      <View
        style={[
          styles.container,
          !this.state.showFilters ? {height: RFValue(40)} : undefined,
        ]}>
        <StourButton
          title={
            nbFilters ? `${nbFilters} ĐIỀU KIỆN LỌC` : 'LỌC KẾT QUẢ NÂNG CAO'
          }
          onPress={() => this.changeShowFilters(filtersData, callbackValue)}
          style={
            !this.state.showFilters && !nbFilters
              ? styles.titleButton
              : undefined
          }
        />
        {this.state.showFilters ? (
          <View style={styles.filtersContainer}>
            {this.renderFilters(data)}
            <ExceptionInput
              value={this.state.filtersData.get(EXCEPT)}
              callbackValue={this.updateFiltersData}
            />
            <View style={[styles.filtersRow, styles.buttonsRow]}>
              <StourButton
                title="LÀM MỚI BỘ LỌC"
                style={styles.refreshButton}
                titleStyle={styles.refreshButtonTitle}
                onPress={this.clearFiltersData}
              />
              <StourButton
                title="TÌM KIẾM"
                style={styles.searchButton}
                onPress={() => {
                  this.changeShowFilters(filtersData, callbackValue);
                  onSearchText(this.state.filtersData);
                }}
              />
            </View>
          </View>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: RFValue(90) * ((data.length + 2) / 2),
  },
  filtersContainer: {
    marginTop: RFValue(10),
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  filtersRow: {
    flex: 2,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonsRow: {
    flex: 1,
    marginTop: RFValue(5),
    marginBottom: RFValue(5),
  },
  filter: {
    width: '48%',
  },
  refreshButton: {
    width: '48%',
    backgroundColor: theme.pageColor,
    borderWidth: RFValue(1),
    borderColor: theme.lightElementColor,
  },
  refreshButtonTitle: {
    color: theme.lightElementColor,
  },
  searchButton: {
    width: '48%',
  },
  titleButton: {
    width: '100%',
    backgroundColor: theme.pageColor,
    borderColor: theme.lightElementColor,
  },
});

export default FiltersButton;
