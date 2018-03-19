import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  header: {
    marginTop: 16,
    height: 60,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 50,
  },
  title: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 20,
  },
  clearButton: {
    width: 50,
  },
  clearButtonText: {
    fontSize: 12,
  },
  container: {
    flex: 1,
    flexGrow: 1,
  },
  messageStyle: {
    color: '#fff',
    marginTop: 16,
  },
  imageStyle: {
    marginTop: 16,
  },
});
