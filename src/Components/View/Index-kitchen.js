import React, { Component } from 'react';
import $ from 'jquery';
import swal from 'sweetalert';
import { Link, HashRouter, Switch, Route } from "react-router-dom";

import icon_web from '../../img/PiR_Logo-03.png';
import Icon1 from '../../img/Food-status-icon/Recieved Order-01.png';
import Icon2 from '../../img/Food-status-icon/Cook-01-01.png';
import Icon3 from '../../img/Food-status-icon/Serving-01-01.png';
import Icon4 from '../../img/Food-status-icon/Group 206@3x.png';
import Icon5 from '../../img/Food-status-icon/Group 205@3x.png';
import Logout from '../../img/Log-out.png';


import { FontAwesomeIcon } from '../Icon/Icon';
import './Style.css';

import { HOSPITAL } from '../Config/Hospital-Config';

//? ----------------------- //
//?          RAM            //
//? ----------------------- //
import { ALL_ORDER_CALL_RAM, ALL_ORDER_PROCESS_RAM, ALL_ORDER_COMPLETED_RAM } from '../API/AIP';
import STATUS_CALL_RAM from './RAM/Order-status-call/Order-status-call';
import PRINT_BILL_COMPLETED from './RAM/Order-status-completed/Completed-bill';
import STATUS_PROCESS_RAM from './RAM/Order-status-process/Order-status-process';
import STATUS_COMPLETED_RAM from './RAM/Order-status-completed/Order-status-completed';
import SCAN from './RAM/Scan/Scan';
import REPORT from './RAM/Report/Report';


//! ----------------------- //
//!          CMR            //
//! ----------------------- //
import { ALL_ORDER_CALL, ALL_ORDER_PROCESS, ALL_ORDER_COMPLETED } from '../API/AIP';
import STATUS_CALL_CMR from './CMR/Order-status-call/Order-status-call';
import STATUS_PROCESS_CMR from './CMR/Order-status-process/Order-status-process';
import STATUS_COMPLETED_CMR from './CMR/Order-status-completed/Order-status-completed';

export default class componentName extends Component {

    constructor(props){
        super(props);
        this.state = {
            value: '',
            error : null,
            count1 : [],
            count2 : [],
            count3 : [],
            Status_call : false,
            Status_process : false,
            Status_completed : false,
            Scan : false,
            Report : false,
            DATA_KITCHEN : {
                KITCHEN : "?Kitchen="+new URLSearchParams(this.props.location.search).get("Kitchen"),
                USER : new URLSearchParams(this.props.location.search).get("User")
            }
        };
        this.hideComponent = this.hideComponent.bind(this);
        this.input = React.createRef();
    }

    hideComponent(name) {
        $('#'+name).prop( "checked", true );
    }

    render() {

        const { count1, count2, count3, DATA_KITCHEN } = this.state;
    
        return (
            <div>

                <nav className="navbar navbar-expand-lg navbar-light Header-ber" >
                    <span className="navbar-brand">
                        <a type="button" id="sidebarCollapse" className="" onClick={this.SidebarCollapse} style={{backgroundColor: 'none', color: '#888888'}}>
                            <FontAwesomeIcon icon={['fas', 'align-justify']}/>
                        </a>
                        <img src={icon_web} className="Icon"/>
                        &nbsp;
                        Kitchen Dashboard
                    </span>

                    {(()=>{
                        if(HOSPITAL === 'RAM'){
                            return(
                                <span style={{ width: '100%'}}>
                                    <span style={{float: 'right', display: 'flex', flexDirection: 'row'}}>

                                        {(()=>{
            
                                            var Kitchen_name = new URLSearchParams(this.props.location.search).get("Kitchen");
                                        
                                            if(Kitchen_name === 'K001'){
                                                Kitchen_name = "อิสลาม";
                                                $('#K001').css('display', 'none');
                                                $('#K002').css('display', 'block');
                                                $('#K003').css('display', 'block');
                                            }
            
                                            if(Kitchen_name === 'K002'){
                                                Kitchen_name = "Danebury";
                                                $('#K001').css('display', 'block');
                                                $('#K002').css('display', 'none');
                                                $('#K003').css('display', 'block');
                                            }
            
                                            if(Kitchen_name === 'K003'){
                                                Kitchen_name = "Food House";
                                                $('#K001').css('display', 'block');
                                                $('#K002').css('display', 'block');
                                                $('#K003').css('display', 'none');
                                            }
            
                                            return(
                                                <div className="Box-kitchen-select">
                                                    <select className="form-control From-select-kitchen-index" id="Data-kitchen" onClick={this.Select_kitchen.bind(this)} ref={this.input}>
                                                        <option value="" style={{color:'#999'}}>{Kitchen_name}</option>
                                                        <option value="K001" id="K001" >อิสลาม</option>
                                                        <option value="K002" id="K002" >Danebury</option>
                                                        <option value="K003" id="K003" >FoodHouse</option>
                                                    </select>
                                                </div>
                                            );
            
                                        })()}

                                        <div className="Box-log-out">
                                            <img src={Logout} style={{width: '70px'}} onClick={this.Logout.bind(this)}/>
                                        </div>

                                    </span>
                                </span>
                            )
                        }
                    })()}
                </nav>
    
                <div className="wrapper">
                    <nav id="sidebar">
                        <ul className="list-unstyled components">
                            <input type="radio" className="Status_call" id="Status_call" name="Menu-status" style={{display: 'none'}} defaultChecked/>
                            <li className="nav-item button_1">
                                <Link to={"/Index/Call"+this.props.location.search} onClick={() => this.hideComponent("Status_call")}>
                                    <img src={Icon1} className="Icon-menu"/> &nbsp; รับออเดอร์     
                                    &nbsp; 
                                    {count1.map(product => ( 
                                        <span key={product.QTY1+=product.Countdata1+"key-call"}>
                                            {product.Countdata1}
                                            {}
                                        </span>
                                    ))}
                                </Link>
                            </li>

                            <div className="Hr"></div>

                            <input type="radio" className="Status_process" id="Status_process" name="Menu-status" style={{display: 'none'}} />
                            <li className="button_2">
                                <Link to={"/Index/Process"+this.props.location.search} onClick={() => this.hideComponent("Status_process")}>
                                    <img src={Icon2} className="Icon-menu"/> &nbsp; กำลังปรุง
                                    &nbsp;&nbsp;
                                    {count2.map(product => ( 
                                        <span key={product.QTY1+=product.Countdata2+"key-process"}>
                                            {product.Countdata2}
                                        </span>
                                    ))}
                                </Link>
                            </li>  

                            <div className="Hr"></div>

                            <input type="radio" className="Status_completed" id="Status_completed" name="Menu-status" style={{display: 'none'}} />
                            <li className="button_3">
                                <Link to={"/Index/Completed"+this.props.location.search} onClick={() => this.hideComponent("Status_completed")}>
                                    <img src={Icon3} className="Icon-menu"/> &nbsp; ปรุงเสร็จ
                                    &nbsp;&nbsp;&nbsp;
                                    {count3.map(product => ( 
                                        <span key={product.QTY1+=product.Countdata3+"key-completed"}>
                                            {product.Countdata3}
                                        </span>
                                    ))}
                                </Link>
                            </li>

                            {(()=>{

                                if(HOSPITAL === 'RAM'){

                                    return(
                                        <span>

                                            <div className="Hr"></div>
                                                                        
                                            <input type="radio" className="Scan" id="Scan" name="Menu-status" style={{display: 'none'}} />
                                            <li className="button_4">
                                                <Link to={"/Index/Scan"+this.props.location.search} onClick={() => this.hideComponent("Scan")}>
                                                    <img src={Icon4} className="Icon-menu-scan"/>
                                                </Link>
                                            </li>

                                            <div className="Hr"></div>

                                            <input type="radio" className="Report" id="Report" name="Menu-status" style={{display: 'none'}} />
                                            <li className="button_5">
                                                <Link to={"/Index/Report"+this.props.location.search} onClick={() => this.hideComponent("Report")}>
                                                    <img src={Icon5} className="Icon-menu"/> &nbsp; Report
                                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                </Link>
                                            </li>

                                        </span>
                                    )

                                }
                            })()}

                            <li className="Box-show-time">
                                <b><span id="ShowTime1" style={{marginRight: '7px'}}></span>
                                :
                                <span id="ShowTime2" style={{marginLeft: '7px'}}></span></b>
                            </li>

                        </ul>
                    </nav>

                    <div id="content">
                        <div className="Box-show-detail">

                            {(()=>{

                                if(HOSPITAL === 'RAM'){

                                    return(
                                        <span>

                                            {/* <span style={{display: 'none'}}>
                                            { Status_call && <STATUS_CALL_RAM details={ DATA_KITCHEN } /> }
                                            { Status_process && <STATUS_PROCESS_RAM details={ DATA_KITCHEN } /> }
                                            { Status_completed && <STATUS_COMPLETED_RAM details={ DATA_KITCHEN } /> }
                                            { Scan && <SCAN details={ DATA_KITCHEN }/>}
                                            { Report && <REPORT details={ DATA_KITCHEN }/>}
                                            </span> */}

                                            <HashRouter>
                                                <Switch>
                                                    <Route path="/Index/Call" exact>
                                                        <STATUS_CALL_RAM details={ DATA_KITCHEN } />
                                                    </Route>
                                                    {/* ------------------------------------------ */}
                                                    
                                                    <Route path="/Index/Process" >
                                                        <STATUS_PROCESS_RAM details={ DATA_KITCHEN } />
                                                    </Route>
                                                    <Route path="/Index/Completed" >
                                                        <STATUS_COMPLETED_RAM details={ DATA_KITCHEN } />
                                                    </Route>
                                                    <Route path="/Index/Bill-completed" exact>
                                                        <PRINT_BILL_COMPLETED details={ DATA_KITCHEN } />
                                                    </Route>

                                                    <Route path="/Index/Scan" >
                                                        <SCAN details={ DATA_KITCHEN } />
                                                    </Route>
                                                    <Route path="/Index/Report" >
                                                        <REPORT details={ DATA_KITCHEN } />
                                                    </Route>
                                                </Switch>
                                            </HashRouter>
                                        </span>
                                    )
                                
                                }else{

                                    return(
                                        <span>
                                            <HashRouter>
                                                <Switch>
                                                    <Route path="/Index/Call" exact>
                                                        <STATUS_CALL_CMR details={ DATA_KITCHEN } />
                                                    </Route>
                                                    <Route path="/Index/Process" >
                                                        <STATUS_PROCESS_CMR details={ DATA_KITCHEN } />
                                                    </Route>
                                                    <Route path="/Index/Completed" >
                                                        <STATUS_COMPLETED_CMR details={ DATA_KITCHEN } />
                                                    </Route>
                                                    {/* <Route path="/Index/Scan" >
                                                        <SCAN details={ DATA_KITCHEN } />
                                                    </Route>
                                                    <Route path="/Index/Report" >
                                                        <REPORT details={ DATA_KITCHEN } />
                                                    </Route> */}
                                                </Switch>
                                            </HashRouter>
                                        </span>
                                    )
                                
                                }
                            })()}

                        </div> 
                    </div>
                </div>
            </div>
        );
    }


    SidebarCollapse(){
        $('#sidebar').toggleClass('active');
    }


    Select_kitchen(e){

        var Data_kitchen = $('#Data-kitchen').val();
        var Data_user = new URLSearchParams(this.props.location.search).get("User");
        if(Data_kitchen != ''){
  
            this.props.history.push(this.props.location.pathname+"?User="+Data_user+"&Kitchen="+Data_kitchen);
            setTimeout(() => {

                this.GET_DETAIL_CALL();

                this.setState({ 
                    DATA_KITCHEN : {
                        KITCHEN : "?Kitchen="+new URLSearchParams(this.props.location.search).get("Kitchen"),
                        USER : new URLSearchParams(this.props.location.search).get("User")
                    }
                });

            

            }, 300);

            window.location.reload();
        }else{
            // console.log("NULL");
        }

    }


    GET_DETAIL_CALL(){

        if(HOSPITAL === "RAM"){

            //? -------------------------- ?//
            //?            RAM             ?//
            //? -------------------------- ?//

            if(this.props.location.pathname === '/Index/Call'){
                $('#Status_call').prop( "checked", true );
            }
    
            if(this.props.location.pathname === '/Index/Process'){
                $('#Status_process').prop( "checked", true );
            }
    
            if(this.props.location.pathname === '/Index/Completed'){
                $('#Status_completed').prop( "checked", true );
            }
    
            if(this.props.location.pathname === '/Index/Scan'){
                $('#Scan').prop( "checked", true );
            }
    
            if(this.props.location.pathname === '/Index/Report'){
                $('#Report').prop( "checked", true );
            }

            fetch(ALL_ORDER_CALL_RAM.COUNT_ORDER_CALL+this.props.location.search).then(res => res.json()).then(
                (result)=>{
    
                    var QTY1 = parseInt(result[0].QTY1);
                    var count = QTY1;
                    var myObj = {
                        "Countdata1" : count
                    }
                    result.push( myObj );
                    
                    this.setState({
                        count1 : result
                    })
          
                },(error) => {
          
                    this.setState({error})
          
                }
            );
    
            fetch(ALL_ORDER_PROCESS_RAM.COUNT_ORDER_PROCESS+this.props.location.search).then(res => res.json()).then(
                (result)=>{
    
                    var QTY1 = parseInt(result[0].QTY1);
                    var count = QTY1;
                    var myObj = {
                        "Countdata2" : count
                    }
                    result.push( myObj );
      
                    this.setState({
                        count2 : result
                    })
          
                },(error) => {

                    this.setState({error})

                }
            );
    
            fetch(ALL_ORDER_COMPLETED_RAM.COUNT_ORDER_COMPLETED+this.props.location.search).then(res => res.json()).then(
                (result)=>{
    
                    var QTY1 = parseInt(result[0].QTY1);
                    var count = QTY1;
                    var myObj = {
                        "Countdata3" : count
                    }
                    result.push( myObj );
      
                    this.setState({
                        count3 : result
                    })
          
                },(error) => {
          
                    this.setState({error})
          
                }
            );

        }else{

            //! -------------------------- !//
            //!            CMR             !//
            //! -------------------------- !//
            
            if(this.props.location.pathname === '/Index/Call'){
                $('#Status_call').prop( "checked", true );
            }
    
            if(this.props.location.pathname === '/Index/Process'){
                $('#Status_process').prop( "checked", true );
            }
    
            if(this.props.location.pathname === '/Index/Completed'){
                $('#Status_completed').prop( "checked", true );
            }
    
            // if(this.props.location.pathname === '/Index/Scan'){
            //     $('#Scan').prop( "checked", true );
            // }
    
            // if(this.props.location.pathname === '/Index/Report'){
            //     $('#Report').prop( "checked", true );
            // }

            fetch(ALL_ORDER_CALL.COUNT_ORDER_CALL).then(res => res.json()).then(
                (result)=>{

                    // console.log(result);
    
                    var QTY1 = parseInt(result[0].QTY1);
                    var QTY2 = parseInt(result[1].QTY2);
                    var count = QTY1 += QTY2;
                    var myObj = {
                        "Countdata1" : count
                    }
                    result.push( myObj );

                    this.setState({
                        count1 : result
                    });
          
                },(error) => {
          
                    this.setState({error})
          
                }
            );
    
            fetch(ALL_ORDER_PROCESS.COUNT_ORDER_PROCESS).then(res => res.json()).then(
                (result)=>{
    
                    var QTY1 = parseInt(result[0].QTY1);
                    var QTY2 = parseInt(result[1].QTY2);
                    var count = QTY1 += QTY2;
                    var myObj = {
                        "Countdata2" : count
                    }
                    result.push( myObj );
      
                    this.setState({
                        count2 : result
                    });
          
                },(error) => {

                    this.setState({error})

                }
            );
    
            fetch(ALL_ORDER_COMPLETED.COUNT_ORDER_COMPLETED).then(res => res.json()).then(
                (result)=>{
    
                    var QTY1 = parseInt(result[0].QTY1);
                    var QTY2 = parseInt(result[1].QTY2);
                    var count = QTY1 += QTY2;
                    var myObj = {
                        "Countdata3" : count
                    }
                    result.push( myObj );
      
                    this.setState({
                        count3 : result
                    });
          
                },(error) => {
          
                    this.setState({error})
          
                }
            );

        }

    }

    Logout(){

        swal({
            icon: "warning",
            title: "Warning!",
            text: "You want to log out.",
            buttons: {
                cancel: true,
                confirmButtonText: `Confirm`,
              },
        }).then((value) => {

            if(value){
                this.props.history.push("/");
            }
              
        });
    }

    componentDidMount(){

        this.hideComponent();

        setInterval(() => {

            this.GET_DETAIL_CALL();
            
            var DATA_DATE = new Date();

            $('#ShowTime1').text(DATA_DATE.getHours());
            $('#ShowTime2').text((DATA_DATE.getMinutes()<10?'0':'') + DATA_DATE.getMinutes());

        }, 700);

    }
}