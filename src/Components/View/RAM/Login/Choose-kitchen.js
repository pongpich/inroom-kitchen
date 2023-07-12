import React, { Component } from 'react';
import $ from 'jquery';
import './style.css';
import { FontAwesomeIcon } from '../../../Icon/Icon';
import icon_web from '../../../../img/PiR_Logo-03.png';

export default class Choose_kitchen extends Component {

    constructor(props){
        super(props);
        this.state = {
            value: '',
            error : null,
            products : [],
        };
    }

    render() {
        return (
            <div className="Body-choose-kitchen">

                <div className="Box-icon-choose-kitchen">
                    <div className="Title-choose-kitchen">
                        <img src={icon_web} style={{width: '70px'}}/>
                        &nbsp;&nbsp;&nbsp;
                        <span className="Text-tiele-choose-kitchen">KITCHEN</span>
                    </div>
                </div>

                <div className="Box-detail-choose-kitchen ">
                    <form className="Form-choose-kitchen">
                        <select className="form-control" id="Data-kitchen">
                            <option value="">เลือกครัว</option>
                            <option value="K001">อิสลาม</option>
                            <option value="K002">Danebury</option>
                            <option value="K003">FoodHouse</option>
                        </select>
                        <br/>
                        <div style={{float: 'right'}}>
                            <button type="button" className="btn btn-success" onClick={this.Next.bind(this)}>ตกลง</button>
                        </div>
                    </form>
                </div>
        
            </div>
        );
    }

    Next(){

        if($('#Data-kitchen').val() != ''){

            this.props.history.push("/Index/Call"+this.props.location.search+"&Kitchen="+$('#Data-kitchen').val());

        }else{

            console.log("กรุณาเลือกครัว");

        }
        
    }

}