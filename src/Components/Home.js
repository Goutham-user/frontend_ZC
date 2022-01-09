import axios from 'axios';
import React from 'react';
import '../Styles/home.css'
import QuickSearchItems from './QuickSearchItems';
import Wallpaper from './Wallpaper';
 
class Home extends React.Component {
    constructor(){
        super();
        this.state = {
            locations: [],
            mealTypes: []
        }
    }
    componentDidMount(){
        sessionStorage.clear();
        document.title = "Zomato | Home";
        axios({
            url:'http://localhost:2000/locations',
            method:'GET',
            headers:{'Content-Type' : 'application/json' }
        }).then(res => {
            this.setState({locations : res.data.locations})
        }).catch(err => console.log(err))
        
        axios({
            url:'http://localhost:2000/mealtypes',
            method:'GET',
            headers:{'Content-Type' : 'application/json'}
        }).then(res => {
            this.setState({mealTypes : res.data.mealTYpes})
        }).catch(err => console.log(err))
    }
    
    render (){
        const { locations, mealTypes } = this.state
        return(
            <div>
                <Wallpaper locationsData={ locations } />
            <div className="container">
                <div className="quick-searches">
                    Quick Searches 
                </div>
                <div className="dis">Discover restaurents by type of meal</div>
                <div className="row">
                    <QuickSearchItems mealTypesData = { mealTypes }/>
                    
                 </div>
            </div>
            </div>
        )
    }
}

export default Home;