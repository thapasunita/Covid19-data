import React from 'react'
import './App.css'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      data: null
    }
  }

  componentDidMount() {
    let app = this
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '867ad5897emsh1256d20eb2d2166p181717jsn814d4db2e5fe',
        'X-RapidAPI-Host': 'corona-virus-world-and-india-data.p.rapidapi.com'
      }
    };
    fetch('https://corona-virus-world-and-india-data.p.rapidapi.com/api', options)
      .then(response => response.json())
      .then(data => {
        app.setState({ data: data })
      })
  }

  render() {

    if (this.state.data !== null) {
      const countryList = this.state.data.countries_stat;
      const tableRowList = countryList.map((obj, index) => {

        let newcaseCol = <td> {obj.new_cases}</td>
        if (obj.new_cases > 0) {
          newcaseCol = <td className='newCase'> {obj.new_cases}</td>
        }

        let deathCol = <td> {obj.new_deaths}</td>
        if (obj.new_deaths > 0) {
          deathCol = <td className='death'> {obj.new_deaths}</td>
        }

        return <tr>
          <td>{++index}</td>
          <td> {obj.country_name}</td>
          <td> {obj.cases}</td>
          <td> {obj.deaths}</td>
          <td> {obj.total_recovered}</td>
          {deathCol}
          {newcaseCol}
          <td> {obj.total_tests}</td>
          <td> {obj.serious_critical}</td>
          <td> {obj.active_cases}</td>
        </tr>
      });

      return (
        <div>
          <div class='container'>
            <p style={{ textAlign: 'center' }}>COVID-19 CORONAVIRUS PANDEMIC</p>
            <div className='wrapper'>
              <div className='worldData'>
                <div>
                  <h1>Coronavirus Cases:</h1>
                  <h2>{this.state.data.world_total.total_cases}</h2>
                </div>
                <div>
                  <h1>Deaths:</h1>
                  <h2>{this.state.data.world_total.total_deaths}</h2>
                </div>
                <div>
                  <h1>Recovered:</h1>
                  <h2>{this.state.data.world_total.total_recovered}</h2>
                </div>
              </div>

              <div className='worldData'>
                <div>
                  <h1>New Cases:</h1>
                  <h2>{this.state.data.world_total.new_cases}</h2>
                </div>
                <div>
                  <h1>New Deaths:</h1>
                  <h2>{this.state.data.world_total.new_deaths}</h2>
                </div>
                <div>
                  <h1>Active Cases:</h1>
                  <h2>{this.state.data.world_total.active_cases}</h2>
                </div>
              </div>
            </div>


            <table class="table table-hover">
              {this.getTableHead()}
              <tbody>
                {tableRowList}
              </tbody>
            </table>
          </div>
        </div>
      )
    }

    return (
      <div className='loading-wrapper'>
        <div className="loader"></div>
      </div>
    )
  }



  getTableHead() {
    return <thead class='sticky-top'>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Country Name</th>
        <th scope="col">Cases</th>
        <th scope="col">Deaths</th>
        <th scope="col">Total recovered</th>
        <th scope="col">New deaths</th>
        <th scope="col">New cases</th>
        <th scope="col">Total tests</th>
        <th scope="col">Serious critical</th>
        <th scope="col">Active cases</th>
      </tr>
    </thead>
  }


}

export default App