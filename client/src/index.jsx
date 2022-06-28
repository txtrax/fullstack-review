import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }

  }

  componentDidMount() {
    axios.get('/repos')
      .then(results => {
        this.setState({repos: results.data});
      })
      .catch(err => {
        console.log('try again');
      })
  }

  onSearch(term) {
    // console.log(`${term} was searched`);
    axios({
      method: 'POST',
      url: '/repos',
      data: {
        user: term
    }})
      .then(results => {
        axios.get('/repos')
          .then(results => {
            this.setState({repos: results.data});
          })
          .catch(err => {
            console.log('try again');
          })
      })
      .catch(err => {
        console.log('error in client post');
      })
  }

  render () {
    return (
    <div>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.onSearch.bind(this)}/>
      <RepoList repos={this.state.repos}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));