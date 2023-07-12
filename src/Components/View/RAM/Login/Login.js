import React, { Component } from 'react';
import $ from 'jquery';
import './style.css';
import { FontAwesomeIcon } from '../../../Icon/Icon';
import icon_web from '../../../../img/PiR_Logo-03.png';
import { KITCHEN_LOGIN } from '../../../API/AIP';
import swal from 'sweetalert';

export default class Login extends Component {

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
            <div className="Body-login">
                <div className="Login-detail">
                    <div className="Box-left">
                        {/* left */}

                    </div>

                    <div className="Box-right">
                        {/* right */}

                        <div className="Title-login">
                            <img src={icon_web} style={{width: '70px'}}/>
                            &nbsp;&nbsp;
                            <span className="Text-tiele-login">KITCHEN</span>
                        </div>
                        <br/>
                        <br/>
                        <div className="from-login">
                            <form id="From-kitchen-login">
                                
                                <div className="form-group ">
                                    <div className="col">
                                    <input type="text" className="form-control Login-User" placeholder="Username" id="User" name="User"/>
                                    </div>
                                </div>
                               
                                <div className="form-group ">
                                    <div className="col Box-pass-login">
                                        <input type="password" className="form-control Login-Pass" placeholder="Password" id="Pass" name="Pass"/>
                                        <button type="button" className="form-control Button-test" onClick={this.Login.bind(this)}>
                                            <i className="fas fa-arrow-right"></i>
                                            <FontAwesomeIcon icon={['fas', 'arrow-right']}/>
                                        </button>
                                    </div>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    Login(){

        $.ajaxSetup({
			cache: false,
			contentType: false,
			processData: false
		});  

		var User = $('#User').val();
		var Pass = $('#Pass').val();
        var HISTORY = this.props.history;

		var formData = new FormData($('#From-kitchen-login')[0]);
        
		$.post(KITCHEN_LOGIN.KITCHEN_LOGIN+"?User="+User+"&Pass="+Pass, formData, function(data){

			if(User != '' || Pass != ''){

				if(data === 'Notdata'){

					swal("Warning!", "No User!", "warning");

				}else{

					var x = JSON.parse(data);

					if(x.result[0].sResultCmt === ''){

                        HISTORY.push("/Choose-kitchen?User="+x.result[0].sLocName);
                        // console.log(x.result[0].sLocName);

					}else{

						swal("Warning!", "Incorrect User Name or Password", "warning");
                        console.log(x.result[0].sResultCmt);

					}
	
				}	

			}else{

				swal("Warning!", "Please enter information!", "warning");

			}

		});

    }

}