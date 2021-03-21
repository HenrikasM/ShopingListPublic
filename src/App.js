import React, {Component} from 'react';
import AppNavbar from './components/AppNavbar';
import ShopingList from './components/ShopingList';
import ItemModal from './components/ItemModal';
import {Container} from 'reactstrap';

import {Provider} from 'react-redux';
import store from './store';
import {loadUser} from './action/authActions'

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component{
  componentDidMount() {
  store.dispatch(loadUser());
}

  render() {
  return (
    <Provider store={store}>
    <div className="App">
      <AppNavbar/>
      <Container>
      <ItemModal/>
      <ShopingList/>
      </Container>
    </div>
    </Provider>
  );
}
}

export default App;
