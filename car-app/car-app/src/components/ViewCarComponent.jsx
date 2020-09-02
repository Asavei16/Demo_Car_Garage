import React, { Component } from 'react';
import CarService from '../services/CarService';

class ViewCarComponent extends Component {
    constructor(props){
        super(props)
         
        this.state = {
            id: this.props.match.params.id,
            car: {}

        }
    }
componentDidMount(){
    CarService.getCarById(this.state.id).then(res =>{
        this.setState({car:res.data});
    })

}

    render() {
        return (
            <div>
                <br></br>
                <div className="card col-md-6 offset-md-3">
                    <h3 className="text-center">View Car Details</h3>
                    <div className="card-body">
                        <div className="row">
                            <label> Name: </label>
                            <div>{this.state.car.name}</div>
                        </div>
                        <div className="row">
                            <label>Brand: </label>
                            <div>{this.state.car.brand}</div>
                        </div>
                        <div className="row">
                            <label>Made in: </label>
                            <div>{this.state.car.madein}</div>
                        </div>
                        <div className="row">
                            <label>Price: </label>
                            <div>{this.state.car.price}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ViewCarComponent;