import React, { Component } from 'react';
import $ from 'jquery';

import { ALL_ORDER_CALL } from '../../../API/AIP';

import Icon1 from '../../../../img/Food-status-icon/Recieved Order-01.png';

import './style.css';

export default class Order_status_call extends Component {

    constructor(props){
        super(props);
        this.state = {
            value: '',
            error : null,
            products : [],
            count1 : [],
            count2 : [],
        };
    }

    render() {
        const {products, count1, count2} = this.state;
        return (
            <div>
                <div className="Show-title-and-qty-call">

                    <div className="Box-icon-call">
                        <img src={Icon1} className="Icon-menu-call"/>
                    </div>

                    <div className="Box-text-title-call">
                        <div style={{backgroundColor: '', width: '100%'}}>
                            <input type="radio" className="Radio-call" id="Radio-call" name="menu" style={{display: 'none'}} defaultChecked />
                            <a className="All-status-call" id="All-status-call" onClick={this.All.bind(this)}>
                                ทั้งหมด &nbsp;
                                {count1.map(product => ( 
                                    <span key={product.QTY1+product.QTY2}>
                                        {product.Countdata1}
                                    </span>
                                ))}
                            </a>

                            &nbsp;&nbsp;|&nbsp;&nbsp;

                            <input type="radio" className="general-call" id="general-call" name="menu" style={{display: 'none'}} />
                            <a className="All-status-general-call" onClick={this.General.bind(this)}>
                                ทั่วไป &nbsp;
                                {count1.map(product => ( 
                                    <span key={product.QTY1+product.QTY2}>
                                        {product.QTY1}
                                    </span>
                                ))}
                            </a> 

                            &nbsp;&nbsp;|&nbsp;&nbsp;

                            <input type="radio" className="daily-call" id="daily-call" name="menu" style={{display: 'none'}} />
                            <a className="All-status-daily-call" onClick={this.Daily.bind(this)}>
                                ประจำวัน &nbsp;
                                {count1.map(product => ( 
                                    <span key={product.QTY1+product.QTY2}>
                                        {product.QTY2}
                                    </span>
                                ))}
                            </a>

                            <span className="Select-daily-call" >
                                &nbsp;&nbsp;|&nbsp;&nbsp;
                                <select id="Select-order-time" onClick={this.Select_order_time.bind(this)} style={{width: '120px', border: 'none', backgroundColor: '#F2E8E8'}}>
                                    <option>---</option>
                                    <option>มื้อเช้า</option>
                                    <option>มื้อกลางวัน</option>
                                    <option>มื้อเย็น</option>
                                </select>
                            </span>
                            <br/>
                            <div className="Text-title-call" style={{marginBottom: '-30px'}}>รับออเดอร์</div>
                        </div>
                    </div>

                    <div className="Box-title-QTY">
                        {count2.map(product => (
                            <span className="Text-title-QTY" key={product.QTY1+product.QTY2}>
                                {product.Countdata1}
                                {product.Countdata2}
                                {product.Countdata3}
                            </span>
                        ))}
                        <span className="Text-qty">Orders</span>
                    </div>
                </div>

                <div className="tableFixHead">
                    <table className="table table-hover" style={{backgroundColor: '#FFFFFF', fontSize: '13px'}}>
                        <thead>
                            <tr>
                                <th scope="col" style={{width: '12%'}}>Order No.</th>
                                <th scope="col" style={{width: '20%'}}>Time / Room</th>
                                <th scope="col" style={{width: '25%'}}>รายการ</th>
                                <th scope="col" style={{width: '12%'}}>รายละเอียด</th>
                                <th scope="col" style={{textAlign: 'center'}}>จำนวน</th>
                                <th scope="col" style={{width: '9%'}}>มื้อ</th>
                                <th scope="col" style={{textAlign: 'center', width: '16%'}}>Status</th>
                            </tr>
                        </thead>
                        <tbody className="test">
                            {products.map(product => (  
                                <tr key={product.PirSeq} id={product.PirSeq} >
                                    <td>
                                        {(()=>{

                                            var datastring1 = product.PirBillCod1;
                                            var datastring2 = product.PirBillCod2;
                                            var n1 = datastring1.length;
                                            var n2 = datastring2.length;

                                            if(n1 === 1){
                                                product.PirBillCod1 = "00"+product.PirBillCod1;
                                            }

                                            if(n1 === 2){
                                                product.PirBillCod1 = "0"+product.PirBillCod1;
                                            }
                                            
                                            if(n1 === 3){
                                                product.PirBillCod1 = product.PirBillCod1;
                                            }

                                            if(n2 === 1){
                                                product.PirBillCod2 = "00000"+product.PirBillCod2;
                                            }

                                            if(n2 === 2){
                                                product.PirBillCod2 = "0000"+product.PirBillCod2;
                                            }

                                            if(n2 === 3){
                                                product.PirBillCod2 = "000"+product.PirBillCod2;
                                            }

                                            if(n2 === 4){
                                                product.PirBillCod2 = "00"+product.PirBillCod2;
                                            }

                                            if(n2 === 5){
                                                product.PirBillCod2 = "0"+product.PirBillCod2;
                                            }

                                            if(n2 === 6){
                                                product.PirBillCod2 = product.PirBillCod2;
                                            }
                           
                                            return(
                                                <span>
                                                    {product.PirBillCod1}-{product.PirBillCod2}
                                                </span>
                                            )

                                        })()}
                                    </td>
                                    <td>{product.PirOdrTme} / {product.PirWrdCod}-{product.PirRoomCod}-{product.PirBedCod}</td>
                                    <td>
                                        <b>{product.FodMnuNamThai}</b>
                                        <br/>
                                        {(()=>{
                                            var PIR_FOOD_INF = product.PirFodInf;
                                            product.PirFodInf = PIR_FOOD_INF.replaceAll("/", '\n');
                                            // $('.'+product.PirSeq).html(DATA);
                                            // return(
                                            //     <span style={{backgroundColor: ''}}  className={product.PirSeq}></span>
                                            // )
                                        })()}
                                        {product.PirFodInf}
                                        {/* <span style={{backgroundColor: ''}}  className={product.PirSeq}></span> */}
                                    </td>
                                    <td>{product.PirOdrCmt}</td>
                                    <td style={{textAlign: 'center'}}>{product.PirOdrQty}</td>
                                    <td>{product.SetTime}</td>
                                    <td style={{textAlign: 'center'}}>
                                        {(() => {

                                            if(product.PirOrderTy != ''){

                                                product.PirOrderTy = "ประจำวัน";
                                                $('#'+product.PirSeq).css('backgroundColor', '#E5E5E5');
                                                return(
                                                    <span>  
                                                        <b>{product.PirOrderTy}</b>
                                                        <br/><br/>
                                                    </span>
                                                )
                                            }else{
                                                return(
                                                    <span>  
                                                        <b>ทั่วไป</b>
                                                        <br/><br/>
                                                    </span>
                                                )
                                            }

                                        })()}
                                        <button type="button" className="btn btn-outline-secondary" style={{border: '3px solid'}} onClick={this.Update_status_call.bind(this, product.PirSeq)}>
                                            <b>รับออเดอร์</b>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    Select_order_time(){
        console.log($('#Select-order-time').val())
        
        var data = $('#Select-order-time').val();
   
        if(data == 'มื้อเช้า'){
            fetch(ALL_ORDER_CALL.ORDER_MORNING).then(res => res.json()).then(
                (result)=>{
                    // console.log(data);
                    this.setState({
                        products : result
                    })
          
                },(error) => {
          
                    this.setState({error})
          
                }  
            );
        }

        if(data == 'มื้อกลางวัน'){
            fetch(ALL_ORDER_CALL.ORDER_NOON).then(res => res.json()).then(
                (result)=>{

                    this.setState({
                        products : result
                    })
          
                },(error) => {
          
                    this.setState({error})
          
                }  
            );
        }

        if(data == 'มื้อเย็น'){
            fetch(ALL_ORDER_CALL.ORDER_EVENING).then(res => res.json()).then(
                (result)=>{
            
                    this.setState({
                        products : result
                    })
          
                },(error) => {
          
                    this.setState({error})
          
                }  
            );
        }

    }

    Update_status_call(id){

        $('#Select-order-time').val('---');

        $.ajax({
            url : ALL_ORDER_CALL.UPDATE_STATUS_CALL+"?IdOrder="+id,
            type : "POST",
            success:function(data){
                // console.log(data);
            }            
        });

        setTimeout(() => {

            //! ALL
            if($('#Radio-call').is(':checked')) { 

                fetch(ALL_ORDER_CALL.ALL_ORDER_CALL).then(res => res.json()).then(
                    (result)=>{
                        this.setState({
                            products : result
                        });
                    },(error) => {
                        this.setState({error});
                    }
                );

                fetch(ALL_ORDER_CALL.COUNT_ORDER_CALL).then(res => res.json()).then(
                    (result)=>{
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
                        this.setState({error});
                    }
                );

                fetch(ALL_ORDER_CALL.COUNT_ORDER_CALL).then(res => res.json()).then(
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
                        this.setState({error});
                    }
                );

            }

            //! GENRAL
            if($('#general-call').is(':checked')){

                fetch(ALL_ORDER_CALL.ALL_ORDER_GENERAL_CALL).then(res => res.json()).then(
                    (result)=>{
                        this.setState({
                            products : result
                        });
                    },(error) => {
                        this.setState({error});
                    }
                );

                fetch(ALL_ORDER_CALL.COUNT_ORDER_CALL).then(res => res.json()).then(
                    (result)=>{
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
                        this.setState({error});
                    }
                );

                fetch(ALL_ORDER_CALL.COUNT_GENERAL_CALL).then(res => res.json()).then(
                    (result)=>{
                        var QTY1 = parseInt(result[0].QTY1);
                        var myObj = {
                            "Countdata2" : QTY1
                        }
                        result.push( myObj );
                        this.setState({
                            count2 : result
                        });
              
                    },(error) => {
                        this.setState({error});
                    }
                );

            }

            //! DAILY
            if($('#daily-call').is(':checked')){

                fetch(ALL_ORDER_CALL.ALL_ORDER_DAILY_CALL).then(res => res.json()).then(
                    (result)=>{

                
                        this.setState({
                            products : result
                        });

                    },(error) => {
                        this.setState({error});
                    }
                );

                fetch(ALL_ORDER_CALL.COUNT_ORDER_CALL).then(res => res.json()).then(
                    (result)=>{
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
                        this.setState({error});
                    }
                );

                fetch(ALL_ORDER_CALL.COUNT_DAILY_CALL).then(res => res.json()).then(
                    (result)=>{
                        var QTY1 = parseInt(result[0].QTY1);
                        var myObj = {
                            "Countdata2" : QTY1
                        }
                        result.push( myObj );
                        this.setState({
                            count2 : result
                        });
                    },(error) => {
                        this.setState({error});
                    }
                );

            }

        }, 300);
        
    }


    All(){

        $('#Select-order-time').val('---');

        $('.Radio-call').prop( "checked", true );
        fetch(ALL_ORDER_CALL.ALL_ORDER_CALL).then(res => res.json()).then(
            (result)=>{
        
                this.setState({
                    products : result
                })
      
            },(error) => {
      
                this.setState({error})
      
            }  
        );


        fetch(ALL_ORDER_CALL.COUNT_ORDER_CALL).then(res => res.json()).then(
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
                this.setState({error});
            }
        );

    }


    General(){

        $('#Select-order-time').val('---');

        $('.general-call').prop( "checked", true );
        fetch(ALL_ORDER_CALL.ALL_ORDER_GENERAL_CALL).then(res => res.json()).then(
            (result)=>{
        
                this.setState({
                    products : result
                });
      
            },(error) => {
                this.setState({error});
            } 
        );


        fetch(ALL_ORDER_CALL.COUNT_GENERAL_CALL).then(res => res.json()).then(
            (result)=>{

                var QTY1 = parseInt(result[0].QTY1);
                var myObj = {
                    "Countdata2" : QTY1
                }
                result.push( myObj );
  
                this.setState({
                    count2 : result
                });
      
            },(error) => {
                this.setState({error});
            }
        );

    }


    Daily(){

        $('#Select-order-time').val('---');

        $('#daily-call').prop( "checked", true );
        fetch(ALL_ORDER_CALL.ALL_ORDER_DAILY_CALL).then(res => res.json()).then(
            (result)=>{

                console.log(result)
        
                this.setState({
                    products : result
                });
      
            },(error) => {
                this.setState({error});
            }
        );


        fetch(ALL_ORDER_CALL.COUNT_DAILY_CALL).then(res => res.json()).then(
            (result)=>{

                var QTY1 = parseInt(result[0].QTY1);

                var myObj = {
                    "Countdata2" : QTY1
                }
                result.push( myObj );
  
                this.setState({
                    count2 : result
                });
      
            },(error) => {
                this.setState({error});
            }
        );

    }
  

    componentDidMount(){

        // setInterval(() => {
            
            fetch(ALL_ORDER_CALL.ALL_ORDER_CALL).then(res => res.json()).then(
                (result)=>{
            
                    this.setState({
                        products : result
                    });
        
                },(error) => {
                    this.setState({error});
                }
            );

        // }, 1000);


        fetch(ALL_ORDER_CALL.COUNT_ORDER_CALL).then(res => res.json()).then(
            (result)=>{

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
                this.setState({error});
            }
        );

        
        fetch(ALL_ORDER_CALL.COUNT_ORDER_CALL).then(res => res.json()).then(
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
                this.setState({error});
            }
        );

        
    }
}