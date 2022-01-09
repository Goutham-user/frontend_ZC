import React from 'react';
import '../Styles/filter.css';
import queryString from 'query-string';
import axios from 'axios';

class Filter extends React.Component {

    constructor(){
        super();
        this.state = {
            restaurents: [],
            mealTypeId: undefined,
            locationsByCity: [],
            _locationId: undefined,
            cuisine: undefined,
            lcost: undefined,
            hcost: undefined,
            sort: 1,
            page: 1

        }
    }
    componentDidMount(){
        document.title = "Zomato | Filter"
        const qs = queryString.parse(this.props.location.search);
        const { mealTypeId, _locationId  } = qs;

        const filterObj = {
            mealType : mealTypeId,
            location: _locationId
        }



        axios({
            url:'http://localhost:2000/filter',
            method:'POST',
            headers:{'Content-Type' : 'application/json' },
            data: filterObj
        }).then(res => {
            this.setState({restaurents : res.data.restaurentsData, mealTypeId, _locationId})
        }).catch(err => console.log(err))

        axios({
            url:'http://localhost:2000/locations',
            method:'GET',
            headers:{'Content-Type' : 'application/json' }
        }).then(res => {
            this.setState({locationsByCity : res.data.locations})
        }).catch(err => console.log(err))
    }

    

      handleSortChange = (sort) => {
        const { mealTypeId, cuisine, _locationId , lcost, hcost, page  } = this.state;
        const filterObj = {
            mealType : mealTypeId,
            cuisine_id: cuisine,
            location: _locationId,
            lcost,
            hcost,
            sort,
            page
        };


        axios({
            url:'http://localhost:2000/filter',
            method:'POST',
            headers:{'Content-Type' : 'application/json' },
            data: filterObj
        }).then(res => {
            this.setState({restaurents : res.data.restaurentsData, sort })
        }).catch(err => console.log(err))

      }

      handleCostChange = (lcost, hcost) => {
        const { mealTypeId, cuisine, _locationId, page, sort  } = this.state;

        const filterObj = {
            mealType : mealTypeId,
            cuisine_id: cuisine,
            location: _locationId,
            lcost,
            hcost,
            sort,
            page
        };


        axios({
            url:'http://localhost:2000/filter',
            method:'POST',
            headers:{'Content-Type' : 'application/json' },
            data: filterObj
        }).then(res => {
            this.setState({restaurents : res.data.restaurentsData, lcost, hcost })
        }).catch(err => console.log(err))

      }

      handleLocationChange = (event) => {

          const _locationId = event.target.value;
          const { mealTypeId, cuisine, page, sort, lcost, hcost  } = this.state;
          const filterObj = {
            mealType : mealTypeId,
            cuisine_id: cuisine,
            location: _locationId,
            lcost,
            hcost,
            sort,
            page
        };
        console.log(_locationId)
        axios({
            url:'http://localhost:2000/filter',
            method:'POST',
            headers:{'Content-Type' : 'application/json' },
            data: filterObj
        }).then(res => {
            this.setState({restaurents : res.data.restaurentsData, _locationId })
        }).catch(err => console.log(err))
      }

      pagination =(pagenumber) => {
        const { mealTypeId, cuisine, sort, lcost, hcost, _locationId  } = this.state;
        const filterObj = {
          mealType : mealTypeId,
          cuisine_id: cuisine,
          location: _locationId,
          lcost,
          hcost,
          sort,
          page: pagenumber
      };

      axios({
          url:'http://localhost:2000/filter',
          method:'POST',
          headers:{'Content-Type' : 'application/json' },
          data: filterObj
      }).then(res => {
          this.setState({restaurents : res.data.restaurentsData, _locationId })
      }).catch(err => console.log(err))

    }
    
    navigateToDetailPage = (restaurentId) => {
        this.props.history.push(`/detail?restaurentId=${restaurentId}`)
    }


    render() {
        const { restaurents, locationsByCity } = this.state;
        return (
            <div>
                <div>
                    <div id="myId" className="heading">Breakfast Places in Mumbai</div>

                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-12 col-md-4 col-lg-4 filter-options">
                                <div className="filter-heading">Filters / Sort</div>
                                <span className="glyphicon glyphicon-chevron-down toggle-span" data-toggle="collapse"
                                    data-target="#filter"></span>
                                <div id="filter" className="collapse show">
                                    <div className="Select-Location">Select Location</div>
                                    <select className="Rectangle-2236" onChange={this.handleLocationChange}>
                                        <option>Select</option>
                                        { locationsByCity.map((location) => {
                                            return <option value={ location.location_id } > { location.name }, { location.city } </option>
                                        } ) }
                                        
                                    </select>
                                    <div className="Cuisine">Cuisine</div>
                                    <div style={{ display: 'block' }}>
                                        <input type="checkbox"  />
                                        <span className="checkbox-items">North Indian</span>
                                    </div>
                                    <div>
                                        <input type="checkbox" />
                                        <span className="checkbox-items">South Indian</span>
                                    </div>
                                    <div>
                                        <input type="checkbox" />
                                        <span className="checkbox-items">Chineese</span>
                                    </div>
                                    <div>
                                        <input type="checkbox" />
                                        <span className="checkbox-items">Fast Food</span>
                                    </div>
                                    <div>
                                        <input type="checkbox" />
                                        <span className="checkbox-items">Street Food</span>
                                    </div>
                                    <div className="Cuisine">Cost For Two</div>
                                    <div>
                                        <input type="radio" name="costForTwo" onChange={() =>  this.handleCostChange(1,500) }/>
                                        <span className="checkbox-items">Less than &#8377; 500</span>
                                    </div>
                                    <div>
                                        <input type="radio" name="costForTwo" onChange={() =>  this.handleCostChange(500,1000) }/>
                                        <span className="checkbox-items">&#8377; 500 to &#8377; 1000</span>
                                    </div>
                                    <div>
                                        <input type="radio" name="costForTwo" onChange={() =>  this.handleCostChange(1000,1500) }/>
                                        <span className="checkbox-items">&#8377; 1000 to &#8377; 1500</span>
                                    </div>
                                    <div>
                                        <input type="radio" name="costForTwo" onChange={() =>  this.handleCostChange(1500,2000) }/>
                                        <span className="checkbox-items">&#8377; 1500 to &#8377; 2000</span>
                                    </div>
                                    <div>
                                        <input type="radio" name="costForTwo" onChange={() =>  this.handleCostChange(2000,300) }/>
                                        <span className="checkbox-items">&#8377; 2000 +</span>
                                    </div>
                                    <div className="Cuisine">Sort</div>
                                    <div>
                                        <input type="radio" name="sort"  onChange={() => this.handleSortChange(1)} />
                                        <span className="checkbox-items">Price low to high</span>
                                    </div>
                                    <div>
                                        <input type="radio" name="sort" onChange={() => this.handleSortChange(-1)} />
                                        <span className="checkbox-items">Price high to low</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-8 col-lg-8">
                            { restaurents.length != 0 ? restaurents.map((restaurent) => {
                                    return(
                                        <div>
                                            <div className="Item cursurPointer" onClick={() => this.navigateToDetailPage(restaurent._id)}>
                                                <div>
                                                    <div className="small-item vertical">
                                                        <img className="img" src="./Assets/breakfast.jpg" />
                                                    </div>
                                                    <div className="big-item">
                                                        <div className="rest-name">{ restaurent.name }</div>
                                                        <div className="rest-location">{ restaurent.locality}</div>
                                                        <div className="rest-address"> { restaurent.city }, { restaurent.contact_number} </div>
                                                    </div>
                                                </div>
                                                <hr />
                                                <div>
                                                    <div className="margin-left">
                                                    <div className="Bakery">CUISINES : {restaurent.cuisine.map((cuisine) => `${cuisine.name}, `)}</div>
                                                        <div className="Bakery">COST FOR TWO : &#8377; { restaurent.min_price } </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }) : <div className="text-center noData"> No Result found </div>
                            }

                                <div className="pagination">
                                {  
                                     restaurents.length != 0 ?  
                                    restaurents.map((restaurent,index)=>{
                                        return(            
                                                <a role="link" className="cursurPointer" onClick={ ()=> this.pagination(index+1) }>{ index+1 }</a>
                                            )})
                                         : null
                                }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >   
        )
    }
}

export default Filter;