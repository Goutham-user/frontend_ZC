import React from 'react';
import '../Styles/home.css';
import { withRouter } from 'react-router-dom';

class QuickSearchItems extends React.Component {
    handleNavigate = (mealTypeId) => {
        const loactionId= sessionStorage.getItem('loactionId');
        if(loactionId){
            this.props.history.push(`/filter?mealTypeId=${mealTypeId}&_locationId=${loactionId}`);
        }
        else{
            this.props.history.push(`/filter?mealTypeId=${mealTypeId}`);
        }
    }
    render(){
        const { mealTypesData } = this.props;
        return(
            <div>
                {
                    mealTypesData.map((item) => {
                        return(
                            <div tabIndex="0" className="col-lg-4 col-md-6 col-sm-12 box cursurPointer" onClick={() => this.handleNavigate(item.meal_type)}>
                            <img className="box-image" src={`./${item.image}`} />
                            <span className="box-text">{ item.name} <br/> <span className="inside-cont"> { item.content}</span> </span>
                        </div>
                        )
                    })
                }
           
            </div>

        )
    }
} 

export default withRouter(QuickSearchItems); 