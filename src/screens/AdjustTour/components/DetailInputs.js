import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Input from '../../../components/Input';
import Filter from '../../../components/Filter';
import * as Scaled from '../../../utilities/scaled';
import theme from '../../../themes/default';
import fetchCompanyInfo from '../../../api/fetchCompanyInfo';

class DetailInputs extends Component {
  constructor(props) {
    super(props);
    this.insertMode = props.insertMode;
    this.state = {
      companyData: [],
      selectedCompany: undefined,
    };
  }

  componentDidMount() {
    if (this.insertMode) this.fetchCompany();
  }

  fetchCompany = async () => {
    let comData = await fetchCompanyInfo();
    this.setState({companyData: comData.data});
  };

  render() {
    const {
      data,
      callbackValue,
      scrollViewCallback,
      style,
      showFilter,
    } = this.props;
    return (
      <View style={[styles.container, style]}>
        <Input
          title="Tên tour"
          titleStyle={styles.inputTitle}
          value={data.get('name')}
          callbackValue={text => callbackValue('name', text)}
        />
        <Input
          title="Số tiền"
          titleStyle={styles.inputTitle}
          value={data.get('price')}
          type="numeric"
          callbackValue={text => callbackValue('price', text)}
        />
        {this.insertMode ? (
          <View style={styles.companyView}>
            <Filter
              title="Công ty cung cấp: "
              style={styles.companySelection}
              listItem={this.state.companyData.map(com => com.name)}
              selectedValue={this.state.selectedCompany}
              callbackValue={(title, text) => {
                callbackValue(
                  'comId',
                  this.state.companyData.length > 0
                    ? this.state.companyData.filter(com => com.name == text)[0]
                        .id
                    : undefined,
                );
                this.setState({selectedCompany: text});
              }}
              show={true}
              fixedHeight={Scaled.height(200)}
            />
          </View>
        ) : (
          <View>
            <Input
              title="Tên công ty cung cấp"
              titleStyle={styles.inputTitle}
              value={data.get('comName')}
              callbackValue={text => callbackValue('comName', text)}
            />
            <Input
              title="Địa chỉ"
              titleStyle={styles.inputTitle}
              value={data.get('comAddress')}
              callbackValue={text => callbackValue('comAddress', text)}
            />
            <Input
              title="Số điện thoại"
              titleStyle={styles.inputTitle}
              value={data.get('comPhone')}
              callbackValue={text => callbackValue('comPhone', text)}
            />
            <Input
              title="Email"
              titleStyle={styles.inputTitle}
              value={data.get('comEmail')}
              type="email-address"
              callbackValue={text => callbackValue('comEmail', text)}
            />
          </View>
        )}
        <View style={styles.dayNightView}>
          <Filter
            title="Ngày"
            style={styles.filter}
            listItem={[1, 2, 3, 4, 5, 6]}
            onPop={scrollViewCallback}
            selectedValue={data.get('nbDay')}
            callbackValue={(title, text) => callbackValue('nbDay', text)}
            show={showFilter}
          />
          <Filter
            title="Đêm"
            style={styles.filter}
            listItem={[1, 2, 3, 4, 5, 6]}
            onPop={scrollViewCallback}
            selectedValue={data.get('nbNight')}
            callbackValue={(title, text) => callbackValue('nbNight', text)}
            show={showFilter}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  inputTitle: {
    marginTop: Scaled.height(15),
    fontFamily: theme.fontFamily,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: Scaled.fontSize(12),
    lineHeight: Scaled.height(12),
    color: 'white',
  },
  dayNightView: {
    marginTop: Scaled.height(10),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  filter: {
    width: '48%',
  },
  companySelection: {
    width: '100%',
  },
  companyView: {
    marginTop: Scaled.height(20),
  },
});

export default DetailInputs;
