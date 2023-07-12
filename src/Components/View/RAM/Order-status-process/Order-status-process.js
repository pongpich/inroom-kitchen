import React, { Component } from 'react';
import $ from 'jquery';

import { ALL_ORDER_PROCESS_RAM } from '../../../API/AIP';
import Icon2 from '../../../../img/Food-status-icon/Cook-01-01.png';
import './style.css';

var data1 = '';
var data2 = '';

export default class Order_status_process extends Component {

    constructor(props){
        super(props);
        this.state = {
            value: '',
            error : null,
            products : [],
            products_detail : [],
            count1 : [],
            GET_DATA_KITCHEN : this.props.details.KITCHEN
        };
    }

    render() {
        const {products, count1, products_detail} = this.state;
        return (
            <div>
                <div className="Show-title-and-qty-process">
                    <div className="Box-icon-process">
                        <img src={Icon2} className="Icon-menu-process"/>
                    </div>
                    <div className="Box-text-title-process">
                        <div className="Text-title-process" >กำลังปรุง</div>
                    </div>
                    <div className="Box-title-process-QTY">
                        {count1.map(product => (
                            <span className="Text-title-process-QTY" key={product.QTY1+"key"}>
                                {product.Countdata1}
                            </span>
                        ))}
                        <span className="Text-qty">Orders</span>
                    </div>
                </div>

                <div style={{marginTop: '5px'}}>
                    <table className="" style={{backgroundColor: '#FFFFFF', fontSize: '13px'}}>
                        <thead style={{backgroundColor: '#E5E5E5'}}>
                            <tr>
                                <th scope="col" style={{width: 'auto'}}>Order No.</th>
                                <th scope="col" style={{width: 'auto'}}>Time / Room</th>
                                <th scope="col" style={{width: 'auto'}}>รายการ</th>
                                <th scope="col" style={{width: 'auto'}}>รายละเอียด</th>
                                <th scope="col" style={{width: 'auto'}}>ราคา</th>
                                <th scope="col" style={{textAlign: 'center'}}>จำนวน</th>
                                <th scope="col" style={{textAlign: 'center', width: '16%'}}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                             {products.map(product => ( 
                                <tr key={product.PirBillCod1+product.PirBillCod2} id={product.PirSeq} >
                                    <td>
                                        {(()=>{

                                            var datastring1 = product.PirBillCod1;
                                            var datastring2 = product.PirBillCod2;
                                            var n1 = datastring1.length;
                                            var n2 = datastring2.length;

                                            if(n1 === 1){
                                                data1 = "00"+product.PirBillCod1;
                                            }

                                            if(n1 === 2){
                                                data1 = "0"+product.PirBillCod1;
                                            }
                                            
                                            if(n1 === 3){
                                                data1 = product.PirBillCod1;
                                            }

                                            if(n2 === 1){
                                                data2 = "00000"+product.PirBillCod2;
                                            }

                                            if(n2 === 2){
                                                data2 = "0000"+product.PirBillCod2;
                                            }

                                            if(n2 === 3){
                                                data2 = "000"+product.PirBillCod2;
                                            }

                                            if(n2 === 4){
                                                data2 = "00"+product.PirBillCod2;
                                            }

                                            if(n2 === 5){
                                                data2 = "0"+product.PirBillCod2;
                                            }

                                            if(n2 === 6){
                                                data2 = product.PirBillCod2;
                                            }

                                            return(
                                                <span>
                                                    {data1}-{data2}
                                                </span>
                                            );

                                        })()}
                                    </td>
                                    <td>
                                        {product.PirOdrDte} {product.PirOdrTme} / {product.PirWrdCod}-{product.PirRoomCod}-{product.PirBedCod}
                                    </td>
                                    <td >
                                        {products_detail.map(product2 => (
                                            <span key={product2.PirSeq} >
                                                {(()=>{
                                                    var datastring1 = product2.PirBillCod1;
                                                    var datastring2 = product2.PirBillCod2;
                                                    var n1 = datastring1.length;
                                                    var n2 = datastring2.length;

                                                    if(n1 === 1){
                                                        product2.PirBillCod1 = "00"+product2.PirBillCod1;
                                                    }

                                                    if(n1 === 2){
                                                        product2.PirBillCod1 = "0"+product2.PirBillCod1;
                                                    }

                                                    if(n1 === 3){
                                                        product2.PirBillCod1 = product2.PirBillCod1;
                                                    }

                                                    if(n2 === 1){
                                                        product2.PirBillCod2 = "00000"+product2.PirBillCod2;
                                                    }

                                                    if(n2 === 2){
                                                        product2.PirBillCod2 = "0000"+product2.PirBillCod2;
                                                    }

                                                    if(n2 === 3){
                                                        product2.PirBillCod2 = "000"+product2.PirBillCod2;
                                                    }

                                                    if(n2 === 4){
                                                        product2.PirBillCod2 = "00"+product2.PirBillCod2;
                                                    }

                                                    if(n2 === 5){
                                                        product2.PirBillCod2 = "0"+product2.PirBillCod2;
                                                    }

                                                    if(n2 === 6){
                                                        product2.PirBillCod2 = product2.PirBillCod2;
                                                    }

                                                    if(data2 === product2.PirBillCod2 ){
                                                        return(
                                                            <b> 
                                                                <div className="Box-text">
                                                                    <div className="text-name-detail" >{product2.FodMnuNamThai}</div>
                                                                    <span className="tooltiptext">{product2.FodMnuNamThai}</span>
                                                                </div>
                                                                <br/>
                                                            </b>
                                                        );
                                                    }
                                                })()}
                                            </span>
                                        ))}
                                    </td>

                                    <td>
                                        {products_detail.map(product2 => ( 
                                            <span key={product2.PirSeq}>
                                                {(()=>{
                                                    if(data2 === product2.PirBillCod2 ){
                                                        return(
                                                            <span>
                                                                <div className="Box-text">
                                                                    <div className="text-com-detail" >{product2.PirOdrCmt}</div>
                                                                    <span className="tooltiptext-com">{product2.PirOdrCmt}</span>
                                                                </div>
                                                                <br/>
                                                            </span>
                                                        )
                                                    }
                                                })()}
                                            </span>
                                        ))}
                                    </td>

                                    <td>
                                        {products_detail.map(product2 => ( 
                                            <span key={product2.PirSeq}>
                                                {(()=>{
                                                    if(data2 === product2.PirBillCod2 ){
                                                        return(
                                                            <span>
                                                                <div className="Box-text">
                                                                    <div className="text-com-detail" >{product2.FodPrcNum}</div>
                                                                    <span className="tooltiptext-com">{product2.FodPrcNum}</span>
                                                                </div>
                                                                <br/>
                                                            </span>
                                                        )
                                                    }
                                                })()}
                                            </span>
                                        ))}
                                    </td>

                                    <td style={{textAlign: 'center'}}>
                                        {products_detail.map(product2 => ( 
                                            <span key={product2.PirSeq}>
                                                {(()=>{
                                                    if(data2 === product2.PirBillCod2 ){
                                                        return(
                                                            <b>
                                                                <div className="Box-text">
                                                                    <div className="text-qty-detail" >{product2.PirOdrQty}</div>
                                                                    <span className="tooltiptext-qty">{product2.PirOdrQty}</span>
                                                                </div>
                                                                <br />
                                                            </b>
                                                        )
                                                    }
                                                })()}
                                            </span>
                                        ))}
                                    </td>
                                    <td style={{textAlign: 'center'}}>
                                        {(() => {
                                            return(
                                                <span>  
                                                    <b>กำลังปรุง</b>
                                                    <br/><br/>
                                                    <button type="button" className="btn btn-outline-secondary" style={{border: '3px solid'}} onClick={this.Re_to_call.bind(this, product.PirBillCod1, product.PirBillCod2)} id={"Button_con"+product.PirBillCod1, product.PirBillCod2}>
                                                        <b>re to call</b>
                                                    </button>
                                                </span>
                                            );
                                        })()}
                                    </td>
                                  </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    Re_to_call(id1, id2){
        const { GET_DATA_KITCHEN } = this.state;
        $.ajax({
            url : ALL_ORDER_PROCESS_RAM.UPDATE_STATUS_TO_CALL+"?Bill1="+id1+"&Bill2="+id2+"&Kitchen="+new URLSearchParams(GET_DATA_KITCHEN).get("Kitchen"),
            type : "POST",
            success:function(data){
                window.location.reload();
                // console.log(data);
            }            
        });

    }

    Update_status_process(id){

        $.ajax({
            url : ALL_ORDER_PROCESS_RAM.UPDATE_STATUS_PROCESS+"?IdOrder="+id,
            type : "POST",
            success:function(data){
                // console.log(data);
            }            
        });


        setTimeout(() => {

            fetch(ALL_ORDER_PROCESS_RAM.ALL_ORDER_PROCESS).then(res => res.json()).then(
                (result)=>{
      
                    this.setState({
                        products : result
                    });
          
                },(error) => {
                    this.setState({error});
                }
            );

            fetch(ALL_ORDER_PROCESS_RAM.COUNT_ORDER_PROCESS).then(res => res.json()).then(
                (result)=>{
    
                    var QTY1 = parseInt(result[0].QTY1);
                    var count = QTY1;
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
            
        }, 300);
        
    }

    
    componentDidMount(){

        const { GET_DATA_KITCHEN } = this.state;
        // console.log(GET_DATA_KITCHEN);
        setInterval(() => {
            
            fetch(ALL_ORDER_PROCESS_RAM.ALL_ORDER_PROCESS+GET_DATA_KITCHEN).then(res => res.json()).then(
                (result)=>{

                    // console.log(result);
    
                    this.setState({
                        products : result
                    });
        
                },(error) => {
                    this.setState({error});
                }
            );

            fetch(ALL_ORDER_PROCESS_RAM.ALL_ORDER_PROCESS_DETAIL+GET_DATA_KITCHEN).then(res => res.json()).then(
                (result)=>{

                    for(var i = 0; i < result.length; ++i) {
                        var ORDER_NAME = result[i].FodMnuNamThai
                        result[i].FodMnuNamThai = ORDER_NAME.replace('[IS]','').replace('[FH]','');
                    }

                    console.log(result);
    
                    this.setState({
                        products_detail : result
                    });
        
                },(error) => {
                    this.setState({error});
                }
            );


            fetch(ALL_ORDER_PROCESS_RAM.COUNT_ORDER_PROCESS+GET_DATA_KITCHEN).then(res => res.json()).then(
                (result)=>{

                    var QTY1 = parseInt(result[0].QTY1);
                    var count = QTY1;
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

        }, 1000);

    }
}