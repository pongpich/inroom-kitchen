import React, { Component } from 'react';
import $ from 'jquery';
import Icon3 from '../../../../img/Food-status-icon/Serving-01-01.png';

import { ALL_ORDER_COMPLETED } from '../../../API/AIP';

import './style.css';

export default class Order_status_completed extends Component {

    constructor(props){
        super(props);
        this.state = {
            value: '',
            error : null,
            products : [],
            count1 : []
        };
    }

    render() {
        const {products, count1} = this.state;
        return (
            <div>
                <div className="Show-title-and-qty-completed">
                    <div className="Box-icon-process">
                        <img src={Icon3} className="Icon-menu-completed"/>
                    </div>
                    <div className="Box-text-title-completed">
                        <div className="Text-title-completed" >ปรุงเสร็จ</div>
                    </div>
                    <div className="Box-title-completed-QTY">
                        {count1.map(product => (
                            <span className="Text-title-completed-QTY" key={product.QTY1+product.QTY2}>
                                {product.Countdata}
                            </span>
                        ))}
                        <span className="Text-qty">Orders</span>
                    </div>
                </div>

                <div style={{marginTop: '5px'}}>
                    <table className="table table-hover" style={{backgroundColor: '#FFFFFF', fontSize: '13px'}}>
                        <thead style={{backgroundColor: '#E5E5E5'}}>
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
                        <tbody>
                            {products.map(product => (  

                                <tr key={product.PirSeq} id={product.PirSeq}>
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
                                            var DATA = PIR_FOOD_INF.replaceAll("/", '<br/>');
                                            $('.'+product.PirSeq).html(DATA);
                                            return(
                                                <span style={{backgroundColor: ''}} className={product.PirSeq}></span>
                                            )
                                        })()}
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

                                        <button type="button" style={{border: '3px solid'}} className="btn btn-outline-secondary" >
                                            เตรียมเสิร์ฟ
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

    componentDidMount(){

        fetch(ALL_ORDER_COMPLETED.ALL_ORDER_COMPLETED).then(res => res.json()).then(
            (result)=>{
                var data = result;
                for (var i = 0; i < data.length; ++i){
                    if(data[i].PirOrderTy){
                        console.log(data[i].PirOrderTy);
                    }
                }

                this.setState({
                    products : result
                });
      
            },(error) => {
                this.setState({error});
            }
        );


        fetch(ALL_ORDER_COMPLETED.COUNT_ORDER_COMPLETED).then(res => res.json()).then(
            (result)=>{

                var QTY1 = parseInt(result[0].QTY1);
                var QTY2 = parseInt(result[1].QTY2);
                var count = QTY1 += QTY2;
                var myObj = {
                    "Countdata" : count
                }
                result.push( myObj );
                this.setState({
                    count1 : result
                });
      
            },(error) => {
                this.setState({error});
            }
        );

    }
}