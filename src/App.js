import React, { Component } from 'react'
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ToggleButton from 'react-bootstrap/ToggleButton'
import Loader from 'react-loader-spinner'

import Client from './components/Client'
import { Col, Row } from 'react-bootstrap';

class App extends Component {

  // ##################################
  constructor() {
    super();

    // Initializing client state variables
    this.state = {
      Client_details: [],
      isLoading: false,
      daysPeriod: 'day'
    }
    this.selectdayPeriod = this.selectdayPeriod.bind(this)
    this.getClientData = this.getClientData.bind(this)
    this.getDataAsync = this.getDataAsync.bind(this)
  }

  // ##################################
  //Api call to get client data
  async getDataAsync(dayPeriod) {

    // url for api
    var request = ' https://cors-anywhere.herokuapp.com/https://7cg8uz8p69.execute-api.us-east-1.amazonaws.com/test/people?period=' + dayPeriod
    console.log("request of login task:", request);

    // Api call method configuration
    let details = {
      method: 'GET',
    }

    let response = await fetch(request, details)
    let data = await response.json()
    return data;
  }

  // ##################################
  // Get data based upon the interval/period selected
  getClientData(dayperiod) {

    try {
      this.getDataAsync(dayperiod)
        .then(data => {
          console.log("Client Data Received: ", data.people[0].client)
          this.setState({
            Client_details: data.people,
            isLoading: true
          },
          // Callback Function 
          () => {
            console.log("Client Data Received: ", this.state.Client_details)
          });
        });
    }
    catch (e) {
      console.log("Data Not Returned: ", e)
      this.setState({
        isLoading: false
      })
    }
  }

  // ##################################  
  //Interval/Period selection function
  selectdayPeriod(e) {
    // If interval/period is a day
    if (e.target.value === "day") {
      this.setState({
        dayPeriod: e.target.value,
        isLoading: false,
        buttoncolor_today: "btn btn-warning",
        buttoncolor_week: "",
        buttoncolor_month: ""
        }, 
        // Callback Function
        () => {
          this.getClientData(this.state.dayPeriod)
        }
      );
    }  
    // If interval/period is a week
    else if (e.target.value === "week") {
      this.setState({
        dayPeriod: e.target.value,
        isLoading: false,
        buttoncolor_week: "btn btn-warning",
        buttoncolor_today: "",
        buttoncolor_month: ""
      },
      // Callback Function      
      () => {
        this.getClientData(this.state.dayPeriod)
      })
    }  
    // If interval/period is a month
    else if (e.target.value === "month") {
      this.setState({
        dayPeriod: e.target.value,
        isLoading: false,
        buttoncolor_week: "",
        buttoncolor_today: "",
        buttoncolor_month: "btn btn-warning"

      },
      // Callback Function    
      () => {
        this.getClientData(this.state.dayPeriod)
      })
    }
    // If interval/period is not selected 
    else {
      this.setState({
        dayPeriod: e.target.value,
        isLoading: false,
        buttoncolor_week: "",
        buttoncolor_today: "",
        buttoncolor_month: ""

      },
      // Callback Function
      () => {
        this.getClientData(this.state.dayPeriod)
      })
    }
  }

  // ##################################
  // Function to pre-set day as period on start-up
  componentDidMount() {
    this.setState({
      dayPeriod: 'day',
      isLoading: false,
      buttoncolor_today: "btn btn-warning"

    },
    // Callback Function
    () => {
      this.getClientData(this.state.dayPeriod)
    })
  }

  // ##################################  
  // Function to render component template
  render() {
    return (
      <div className="APP">
        <div className="card" >
          <div className="card-title Button">
            <nav className="navbar navbar-light bg-light">

              <h3 style={{ color: '#C0C0C0' }}> Activity</h3>

            </nav>
          </div>
          <div className="card-body">
            <Row>
              <Col md='2'>
                <button onClick={this.selectdayPeriod} value='day' className={this.state.buttoncolor_today}>Today</button>
              </Col>
              <Col md='2'>
                <button onClick={this.selectdayPeriod} value='week' className={this.state.buttoncolor_week}>This Week</button>
              </Col>
              <Col md='2'>
                <button onClick={this.selectdayPeriod} value='month' className={this.state.buttoncolor_month}>This Month</button>
              </Col>
            </Row>
            <br />
            <br />

            {
              this.state.isLoading ? <Client client_data={this.state.Client_details} /> : <Loader type="Oval" className="text-center" color="	#999900" height="30" width="30" />
            }
          </div>
        </div>
      </div>
    );
  }
}
export default App;
