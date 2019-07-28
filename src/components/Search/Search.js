import React, {Component} from 'react';
import './Search.css';
import axios from 'axios';
import { connect } from 'react-redux';

class Search extends Component {
    state = {
        restaurantName: '',
    }

    handleInput=(event) => {
        this.setState({
            restaurantName: event.target.value,
        })
    }

    handleSearch = () => {
        console.log(this.state.restaurantName);
        axios.get(`/api/googleSearch/?restaurant=${this.state.restaurantName}&&lat=${this.props.reduxState.currentLocation.latitude}&&lng=${this.props.reduxState.currentLocation.longitude}`)
            .then(response => {
                console.log(response.data);
                this.props.dispatch({
                    type: 'SET_SEARCH_RESULT',
                    payload: response.data,
                })
                
            })
    }
    render() {
        return(
            <div>
                {/* {JSON.stringify(this.props.reduxState.googleResult)} */}
                <ul>
                    {this.props.reduxState.googleResult.length &&
                        this.props.reduxState.googleResult.map(restaurant => 
                            <li key={restaurant.place_id}>{restaurant.name} - 
                            {restaurant.vicinity} - 
                            {restaurant.rating} - 
                            {restaurant.geometry.location.lat}
                            {restaurant.geometry.location.lng}
                            </li>
                        )}
                </ul>
                <input placeholder="enter a restaurant name" onChange={this.handleInput}></input>
                <button onClick={this.handleSearch}>Search</button>
            </div>
        )
    }
}

const mapReduxStateToProps = reduxState => ({
    reduxState,
  })
export default connect(mapReduxStateToProps)(Search);