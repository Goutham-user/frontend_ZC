import React from 'react';
import '../Styles/home.css';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class Wallpaper extends React.Component {
    constructor() {
        super();
        this.state = {
            restaurentsData: [],
            inputText: undefined,
            suggestions: []
        }


    }
    handleLocationChange = (event) => {
        const locationId = event.target.value;
        sessionStorage.setItem('locationId', locationId);

        axios({
            url: `https://git-repo-zc-api4.onrender.com/restaurents/${locationId}`,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                this.setState({ restaurants: res.data.restaurents })
            })
            .catch(err => console.log(err))
    }

    handleInputChange = (event) => {
        const { restaurants } = this.state;
        const inputText = event.target.value;

        let suggestions = [];

        suggestions = restaurants.filter(item => item.name.toLowerCase().includes(inputText.toLowerCase()));
        this.setState({ inputText, suggestions });
    }

    selectingRestaurant = (resObj) => {
        this.props.history.push(`/detail?restaurentId=${resObj._id}`);
    }

    showSuggestion = () => {
        const { suggestions, inputText } = this.state;

        if (suggestions.length == 0 && inputText == undefined) {
            return null;
        }
        if (suggestions.length > 0 && inputText == '') {
            return null;
        }
        if (suggestions.length == 0 && inputText) {
            return <ul   >
                <li>No Search Results Found</li>
            </ul>
        }
        return (
            <ul  >
                {
                    suggestions.map((item, index) => (<li key={index} onClick={() => this.selectingRestaurant(item)}>{`${item.name} -   ${item.locality},${item.city}`}</li>))
                }
            </ul>
        );

    }


    render() {
        const { locationsData } = this.props;
        return(
            <div>
                <div className="col-12">
                    <img className="img-responsive home-background-image" src="./Assets/homepageimg.png" alt="home" />
                    <div className="image-content">
                        <div className="text-center">
                            <div className="logo">
                                <span>logo</span> 
                            </div>
                            <div  className="container-text">
                                Find the best restaurents, cafes and bars
                            </div>
                            <br/>
                            <div className="row">
                                <div className="col-4">
                                    <select className="location cursurPointer" name="location" id="loc" onChange={this.handleLocationChange}>
                                        <option value="0">Select City</option>

                                        {locationsData.map((location) =>  {
                                            return   <option value={location.location_id}>{`${location.name}, ${location.city}`}</option>

                                        }) }
                                        
                                    </select>
                                </div>
                                <div className="col-4">
                                    <div>
                                    {/* <span className="glyphicon glyphicon-search search"></span> */}
                                    <div>
                                        <input id="query" className="restaurentsDatainput" type="search"
                                            placeholder="Please Enter Restaurant Name" onChange={this.handleInputChange} />
                                        {this.showSuggestion()}
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>   
            </div>
        )
    }
}

export default withRouter(Wallpaper);