import React, {Component} from 'react';
import '../css/App.css';
import AddAppointments from './AddAppointments';
import SearchAppointments from './SearchAppointments';
import ListAppointments from './ListAppointments';

class App extends Component {

  constructor(){
    super();
    this.state = {
      myAppointments: [],
    };
  }

  // Lifecycle method
  componentDidMount(){
    fetch('./data.json')
    .then(response => response.json())
    .then(result => {
      const apts = result.map(item => {
        return item;
      })
      this.setState({
        myAppointments: apts,
      });
    });
  }

  render(){

    return (
      <div className="App">
        <main className="page bg-white" id="petratings">
          <div className="container">
            <div className="row">
              <div className="col-md-12 bg-white">
                <div className="container">
                  <AddAppointments></AddAppointments>
                  <SearchAppointments></SearchAppointments>
                  <ListAppointments appointments={this.state.myAppointments}></ListAppointments>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

};

export default App;
