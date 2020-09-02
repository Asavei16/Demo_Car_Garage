import React, { Component } from 'react';
import CarService from '../services/CarService';

class CreateCarComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
             id: this.props.match.params.id,
             name: '',
             brand: '',
             madein: '',
             price:''
         }
         this.changeNameHandler = this.changeNameHandler.bind(this);
         this.changeBrandHandler = this.changeBrandHandler.bind(this);
         this.changeMadeinHandler = this.changeMadeinHandler.bind(this);
         this.changePriceHandler = this.changePriceHandler.bind(this);
         this.saveOrUpdateCar = this.saveOrUpdateCar.bind(this);
    }
    
    componentDidMount(){

        if(this.state.id === '_add'){
            return 
        }else{
            CarService.getCarById(this.state.id).then((res) =>{
            let car = res.data;
            this.setState({name: car.name,
                brand :car.brand,
                madein : car.madein,
                price: car.price
            });
        });
        }
        
    }

    saveOrUpdateCar =(e) =>{
        e.preventDefault();
        let car = {name: this.state.name, brand: this.state.brand, madein: this.state.madein, price: this.state.price};
        console.log('car => ' + JSON.stringify(car));

        if(this.state.id === '_add'){
            CarService.createCar(car).then(res =>{
                this.props.history.push('/cars');
            });   
        }else{
            CarService.updateCar(car, this.state.id).then(res =>{
                this.props.history.push('/cars');
            });  
        }

                     
    }

    changeNameHandler= (event) => {
        this.setState({name: event.target.value});
     }
        
    changeBrandHandler= (event) => {
        this.setState({brand: event.target.value});
    }        
        
    changeMadeinHandler= (event) => {
        this.setState({madein: event.target.value});
    }
    changePriceHandler= (event) => {
        this.setState({price: event.target.value});
    }        
        
    cancel(){
        this.props.history.push('/cars');
    }
               
    getTitle(){
        if(this.state.id === '_add'){
             return <h3 className="text-center">Add Car</h3>
         }else{
             return <h3 className="text-center">Update Car</h3>
            }
    }

    
    render() {
        return (
            <div>
               <div className = "container">
                   <div className= "row">
                       <div className ="card col-md-6 offset-md-3 offset-md-3">
                           {/* <h3 className="text-center">Add Car</h3> */}
                           {
                               this.getTitle()
                           }
                           <div className = "card-body">
                               <form>
                               <div className = "form-group">
                                             <label>  Name: </label>
                                             <input placeholder=" Name" name="name" className="form-control" 
                                                value={this.state.name} onChange={this.changeNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Brand: </label>
                                            <input placeholder="Brand" name="brand" className="form-control" 
                                                value={this.state.brand} onChange={this.changeBrandHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Made in: </label>
                                            <input placeholder="Made In" name="madein" className="form-control" 
                                                value={this.state.madein} onChange={this.changeMadeinHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Price: </label>
                                            <input placeholder="Price" name="price" className="form-control" 
                                                value={this.state.price} onChange={this.changePriceHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.saveOrUpdateCar}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>                                  
                               </form>
                           </div>
                       </div>
                   </div>
               </div>
            </div>
        );
    }
}

export default CreateCarComponent;




// import React, { Component } from 'react'
// import CarService from '../services/CarService';

// class CreateCarComponent extends Component {
//     constructor(props) {
//         super(props)

//         this.state = {
//             // step 2
//             id: this.props.match.params.id,
//             name: '',
//             brand: '',
//             madein: '',
//             price:''
//         }
//         this.changeNameHandler = this.changeNameHandler.bind(this);
//         this.changeBrandHandler = this.changeBrandHandler.bind(this);
//         this.changeMadeinHandler = this.changeMadeinHandler.bind(this);
//         this.changePriceHandler = this.changePriceHandler.bind(this);
//         this.saveOrUpdateCar = this.saveOrUpdateCar.bind(this);
//     }

//     // step 3
//     componentDidMount(){

//         // step 4
//         if(this.state.id === '_add'){
//             return
//         }else{
//             CarService.getCarById(this.state.id).then( (res) =>{
//                 let car = res.data;
//                 this.setState({name: car.name,
//                     brand: car.brand,
//                     madein : car.madein,
//                     price: car.price
//                 });
//             });
//         }        
//     }
//     saveOrUpdateCar = (e) => {
//         e.preventDefault();
//         let car = {name: this.state.name, brand: this.state.brand, madein: this.state.madein, price: this.state.price};
//         console.log('car => ' + JSON.stringify(car));

//         // step 5
//         if(this.state.id === '_add'){
//             CarService.createCar(car).then(res =>{
//                 this.props.history.push('/cars');
//             });
//         }else{
//             CarService.updateCar(car, this.state.id).then( res => {
//                 this.props.history.push('/cars');
//             });
//         }
//     }
    
//     changeNameHandler= (event) => {
//         this.setState({name: event.target.value});
//     }

//     changeBrandHandler= (event) => {
//         this.setState({brand: event.target.value});
//     }

//     changeMadeinHandler= (event) => {
//         this.setState({madein: event.target.value});
//     }
//     changePriceHandler= (event) => {
//         this.setState({price: event.target.value});
//     }

//     cancel(){
//         this.props.history.push('/cars');
//     }

//     getTitle(){
//         if(this.state.id === '_add'){
//             return <h3 className="text-center">Add Car</h3>
//         }else{
//             return <h3 className="text-center">Update Car</h3>
//         }
//     }
//     render() {
//         return (
//             <div>
//                 <br></br>
//                    <div className = "container">
//                         <div className = "row">
//                             <div className = "card col-md-6 offset-md-3 offset-md-3">
//                                 {
//                                     this.getTitle()
//                                 }
//                                 <div className = "card-body">
//                                     <form>
//                                         <div className = "form-group">
//                                             <label>  Name: </label>
//                                             <input placeholder=" Name" name="name" className="form-control" 
//                                                 value={this.state.name} onChange={this.changeNameHandler}/>
//                                         </div>
//                                         <div className = "form-group">
//                                             <label> Brand: </label>
//                                             <input placeholder="Brand" name="brand" className="form-control" 
//                                                 value={this.state.brand} onChange={this.changeBrandHandler}/>
//                                         </div>
//                                         <div className = "form-group">
//                                             <label> Made in: </label>
//                                             <input placeholder="Made In" name="madein" className="form-control" 
//                                                 value={this.state.madein} onChange={this.changeMadeinHandler}/>
//                                         </div>

//                                         <button className="btn btn-success" onClick={this.saveOrUpdateCar}>Save</button>
//                                         <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
//                                     </form>
//                                 </div>
//                             </div>
//                         </div>

//                    </div>
//             </div>
//         )
//     }
// }

// export default CreateCarComponent
