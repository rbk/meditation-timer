/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, {Component} from 'react';
import {
    Platform, 
    StyleSheet, 
    Text, 
    View,
    TouchableOpacity,
    Audio
  } from 'react-native';
import Sound from 'react-native-sound';
import BackgroundTimer from 'react-native-background-timer';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: '10:00',
      sessionInProgress: false
    }
  }

  playTone() {
    const sound = new Sound('start_tone.mp3', null, (error) => {
      if (error) {
        alert(JSON.stringify(error))
      }
      sound.play();
    });
  }

  resetTimer() {
    this.setState({
      text: '10:00'
    })
    // clearInterval(this.timer)
    BackgroundTimer.stopBackgroundTimer();
  }

  startTimer() {

    let seconds = 60*10
    let currSeconds = seconds

    // https://github.com/ocetnik/react-native-background-timer
    BackgroundTimer.runBackgroundTimer(() => {
      
    let secondHand = currSeconds % 60
    secondHand = (secondHand === 0) ? '00' : secondHand
    secondHand = (secondHand !== '00' && secondHand < 10) ? `0${secondHand}` : secondHand
    let displayTimer = `${Math.floor(currSeconds/60)}:${secondHand}`

      this.setState({
        text: displayTimer
      })
      if (currSeconds === 0) {
        this.stopSession()
        this.playTone()
      }
      currSeconds--
    }, 1000)
  }

  beginSession = () => {
    this.playTone()
    this.startTimer()
    this.setState({
      sessionInProgress: true
    })
  }

  stopSession = () => {
    this.resetTimer()
    this.setState({
      sessionInProgress: false
    })
  }


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Meditation Timer</Text>
        </View>
        <Text style={styles.timer}>{this.state.text}</Text>
        <Text style={styles.instructions}>Close your eyes, relax, and breath naturally.</Text>
        { !this.state.sessionInProgress &&
          <TouchableOpacity style={styles.beginButton} onPress={this.beginSession}>
            <Text style={styles.colorWhite}>Begin Session</Text>
          </TouchableOpacity>
        }
        { this.state.sessionInProgress &&
          <TouchableOpacity style={styles.stopButton} onPress={this.stopSession}>
            <Text style={styles.colorWhite}>Stop Session</Text>
          </TouchableOpacity>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  timer: {
    fontSize: 80,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  beginButton: {
    margin: 40,
    padding: 40,
    backgroundColor: '#4CAF50',
    width: '80%',
  },
  stopButton: {
    margin: 40,
    padding: 40,
    backgroundColor: '#F44336',
    width: '80%',
  },
  colorWhite: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 26
  },
  header: {
    position: 'absolute',
    top: 0,
    height: 60,
    width: '100%',
    backgroundColor: '#4CAF50'
  },
  headerText: {
    fontSize: 24,
    color: '#fff',
    paddingTop: 15,
    paddingLeft: 10,
    textAlign: 'center'
  },
  hide: {
    display: 'none'
  }
});
