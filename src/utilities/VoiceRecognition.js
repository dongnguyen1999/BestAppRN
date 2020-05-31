import Voice from '@react-native-community/voice';
import * as lang from '../constants/langCode';
export default class VoiceRecognition {
  constructor(context) {
    Voice.onSpeechStart = this.onSpeechStart.bind(context);
    Voice.onSpeechRecognized = this.onSpeechRecognized.bind(context);
    Voice.onSpeechResults = this.onSpeechResults.bind(context);
    Voice.onSpeechEnd = this.onSpeechEnd.bind(context);
    this.startRecognition = this.startRecognition.bind(context);
    this.destroyRecognition = this.destroyRecognition.bind(context);
    this.cleanRecognition = this.cleanRecognition.bind(context);
  }

  onSpeechStart(e) {
    this.setState({
      started: '√',
    });
  }
  onSpeechRecognized(e) {
    this.setState({
      recognized: '√',
    });
  }
  onSpeechResults(e) {
    this.setState({
      results: e.value,
      searchText: e.value[0],
    });
  }

  onSpeechEnd(e) {
    this.setState({
      recognized: '',
      started: '',
    });
  }

  async startRecognition(e) {
    await Voice.destroy();
    this.setState({
      searchText: '',
      recognized: '',
      started: '',
      results: [],
    });
    try {
      await Voice.start(lang.vietnamese);
    } catch (e) {
      console.error(e);
    }
  }

  destroyRecognition() {
    Voice.stop();
  }

  cleanRecognition() {
    Voice.destroy().then(Voice.removeAllListeners);
  }
}
