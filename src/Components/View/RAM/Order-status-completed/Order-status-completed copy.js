import React, { Component } from "react";
import $ from "jquery";
import Icon3 from "../../../../img/Food-status-icon/Serving-01-01.png";
import ReactToPrint, { PrintContextConsumer } from 'react-to-print';
import { ALL_ORDER_COMPLETED_RAM } from "../../../API/AIP";
import Icon_check from "../../../../img/Icon-check.png";
import "./style.css";
import RamIcon from "../../../../img/++ +--G+GíT@3x.png";

import {DatePicker} from 'rsuite';

var data1 = "";
var data2 = "";
var KITCHEN_NAME = "";
var funky;


export default class Order_status_completed extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      error: null,
      products: [],
      products_detail: [],
      data_bill_total: [],
      data_bill_cash: [],
      Slip: [],
      count1: [],
      GET_DATA_KITCHEN: this.props.details.KITCHEN,
      USER: this.props.details.USER
    };

    const { GET_DATA_KITCHEN } = this.state;
    KITCHEN_NAME = new URLSearchParams(GET_DATA_KITCHEN).get("Kitchen");

    if (KITCHEN_NAME === "K001") {
      KITCHEN_NAME = "อิสลาม";
    }

    if (KITCHEN_NAME === "K002") {
      KITCHEN_NAME = "Danebury";
    }

    if (KITCHEN_NAME === "K003") {
      KITCHEN_NAME = "FoodHouse";
    }
  }

  render() {

    const {
      products,
      count1,
      products_detail
    } = this.state;

    return (
      <div>
        <div className="Show-title-and-qty-completed">
          <div className="Box-icon-process">
            <img src={Icon3} className="Icon-menu-completed" />
          </div>

          <div className="Box-text-title-completed">
            <div className="Text-title-completed">ปรุงเสร็จ</div>
          </div>

          <div className="Box-text-title-completed">
            <div className="Date-title-report">
              <DatePicker format="dd-MM-yyyy" defaultValue={new Date()} onChange={(value) => this.Detail_date(value)}/>
            </div>
          </div>

          <div className="Box-title-completed-QTY">
            {count1.map((product) => (
              <span className="Text-title-completed-QTY" key={product.QTY1 + "key"} >
                {product.Countdata1}
              </span>
            ))}
            <span className="Text-qty">Orders</span>
          </div>
        </div>

        <div style={{ marginTop: "5px" }}>
          <table className="" style={{ backgroundColor: "#FFFFFF", fontSize: "13px" }} >
            <thead style={{ backgroundColor: "#E5E5E5" }}>
              <tr>
                <th scope="col" style={{ width: "auto" }}>
                  Order No.
                </th>
                <th scope="col" style={{ width: "auto" }}>
                  Time / Room
                </th>
                <th scope="col" style={{ width: "auto" }}>
                  รายการ
                </th>
                <th scope="col" style={{ width: "auto" }}>
                  รายละเอียด
                </th>
                <th scope="col" style={{ textAlign: "center", width: "5%" }}>
                  จำนวน
                </th>
                <th scope="col" style={{ textAlign: "center", width: "16%" }}>
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.PirBillCod1 + product.PirBillCod2} id={`${product.PirBillCod1}${product.PirBillCod2}`}>
                  <td>
                    {(() => {
                      var datastring1 = product.PirBillCod1;
                      var datastring2 = product.PirBillCod2;
                      var n1 = datastring1.length;
                      var n2 = datastring2.length;

                      if (n1 === 1) {
                        data1 = "00" + product.PirBillCod1;
                      }

                      if (n1 === 2) {
                        data1 = "0" + product.PirBillCod1;
                      }

                      if (n1 === 3) {
                        data1 = product.PirBillCod1;
                      }

                      if (n2 === 1) {
                        data2 = "00000" + product.PirBillCod2;
                      }

                      if (n2 === 2) {
                        data2 = "0000" + product.PirBillCod2;
                      }

                      if (n2 === 3) {
                        data2 = "000" + product.PirBillCod2;
                      }

                      if (n2 === 4) {
                        data2 = "00" + product.PirBillCod2;
                      }

                      if (n2 === 5) {
                        data2 = "0" + product.PirBillCod2;
                      }

                      if (n2 === 6) {
                        data2 = product.PirBillCod2;
                      }

                      return (
                        <span>
                          {data1}-{data2}
                        </span>
                      );
                    })()}
                  </td>
                  <td>
                    {product.PirOdrTme} / {product.PirWrdCod}-
                    {product.PirRoomCod}-{product.PirBedCod}
                  </td>
                  <td>
                    {products_detail.map((product2) => (
                      <span key={product2.PirSeq}>
                        {(() => {
                          var datastring1 = product2.PirBillCod1;
                          var datastring2 = product2.PirBillCod2;
                          var n1 = datastring1.length;
                          var n2 = datastring2.length;

                          if (n1 === 1) {
                            product2.PirBillCod1 = "00" + product2.PirBillCod1;
                          }

                          if (n1 === 2) {
                            product2.PirBillCod1 = "0" + product2.PirBillCod1;
                          }

                          if (n1 === 3) {
                            product2.PirBillCod1 = product2.PirBillCod1;
                          }

                          if (n2 === 1) {
                            product2.PirBillCod2 =
                              "00000" + product2.PirBillCod2;
                          }

                          if (n2 === 2) {
                            product2.PirBillCod2 =
                              "0000" + product2.PirBillCod2;
                          }

                          if (n2 === 3) {
                            product2.PirBillCod2 = "000" + product2.PirBillCod2;
                          }

                          if (n2 === 4) {
                            product2.PirBillCod2 = "00" + product2.PirBillCod2;
                          }

                          if (n2 === 5) {
                            product2.PirBillCod2 = "0" + product2.PirBillCod2;
                          }

                          if (n2 === 6) {
                            product2.PirBillCod2 = product2.PirBillCod2;
                          }

                          if (data2 === product2.PirBillCod2) {
                            return (
                              <div>
                                {(() => {
                                  if (product2.PirOdrStt != "F" && product2.PirOdrQty != product2.PirScanCheck) {
                                    return (
                                      <span>
                                        &nbsp;&nbsp; &nbsp;&nbsp;
                                        <b
                                          id={"Text" + product2.PirSeq}
                                          style={{ color: "#d0d0d0e5" }}
                                        >
                                          <div className="Box-text">
                                            <div className="text-name-detail" >{product2.FodMnuNamThai}</div>
                                            <span className="tooltiptext">{product2.FodMnuNamThai}</span>
                                          </div>
                                          <br/>
                                        </b>
                                      </span>
                                    );
                                  } 
                                  
                                  if (product2.PirOdrStt === "F" && product2.PirOdrQty === product2.PirScanCheck) {
                                    return (
                                      <span>
                                        <img
                                          src={Icon_check}
                                          style={{ width: "20px" }}
                                          id={"Icon-check" + product2.PirSeq}
                                        />
                                        &nbsp;
                                        <b id={"Text" + product2.PirSeq}>
                                          <div className="Box-text">
                                            <div className="text-name-detail" >{product2.FodMnuNamThai}</div>
                                            <span className="tooltiptext">{product2.FodMnuNamThai}</span>
                                          </div>
                                          <br/>
                                        </b>
                                      </span>
                                    );
                                  }

                                  if (product2.PirOdrStt === "F" && product2.PirOdrQty != product2.PirScanCheck) {
                                    return (
                                      <span>
                                        &nbsp;&nbsp; &nbsp;&nbsp;
                                        <b id={"Text" + product2.PirSeq} style={{ color: "#d0d0d0e5" }}>
                                          <div className="Box-text">
                                          <div className="text-name-detail" >{product2.FodMnuNamThai}</div>
                                            <span className="tooltiptext">{product2.FodMnuNamThai}</span>
                                          </div>
                                          <br/>
                                        </b>
                                      </span>
                                    );
                                  }
                                })()}
                              </div>
                            );
                          }
                        })()}
                      </span>
                    ))}
                  </td>
                  <td>
                    {products_detail.map((product2) => (
                      <span key={product2.PirSeq}>
                        {(() => {
                          if (data2 === product2.PirBillCod2) {
                            return (
                              <span>
                                <div className="Box-text">
                                  <div className="text-com-detail" >{product2.PirOdrCmt}</div>
                                  <span className="tooltiptext-com">{product2.PirOdrCmt}</span>
                                </div>
                                <br/>
                              </span>
                            );
                          }
                        })()}
                      </span>
                    ))}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {products_detail.map((product2) => (
                      <span key={product2.PirSeq}>
                        {(() => {
                          if (data2 === product2.PirBillCod2) {
                            return (
                              <b>

                                <div className="Box-text">

                                  <div className="text-qty-detail" >
                                    {product2.PirScanCheck} / <span style={{ color: "#d0d0d0e5" }}>{product2.PirOdrQty}</span>
                                  </div>

                                  <span className="tooltiptext-qty">
                                    {product2.PirScanCheck} / <span style={{ color: "#d0d0d0e5" }}>{product2.PirOdrQty}</span>
                                  </span>

                                </div>
                                <br />
                           
                              </b>
                            )
                          }
                        })()}
                      </span>
                    ))}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <span>
                      <b>ปรุงเสร็จ</b>
                      <br/>
                      {/* <ReactToPrint 
                        trigger={() => <button type="">Print</button>} 
                        content={() => this.componentRef} /> */}
                 

                        {/* <button onClick={ this.SHOW_BILL.bind(this, product.PirBillCod1, product.PirBillCod2)} id={"Buttom_con"+product.PirBillCod2} className="btn btn-outline-secondary" style={{ border: "3px solid", display: "none", margin: 'auto' }}>
                          <b>Slip</b>
                        </button>
                        <br/> */}

                        <ReactToPrint content={() => this.componentRef} >
                          <PrintContextConsumer >
                              {({ handlePrint }) => (
                                <button onClick={handlePrint} id="Button-print" className="btn btn-outline-secondary" id={"Buttom_con"+product.PirBillCod2}>
                                  <b  onClick={ this.SHOW_BILL.bind(this, product.PirBillCod1, product.PirBillCod2)}>Slip</b>
                                </button>
                              )}
                          </PrintContextConsumer>
                        </ReactToPrint>

{/* <button id="Button-print" className="btn btn-outline-secondary" id={"Buttom_con"+product.PirBillCod2}>
                                  <b  onClick={ this.SHOW_BILL.bind(this, product.PirBillCod1, product.PirBillCod2)}>Slip</b>
                                </button> */}

                        <button type="button" className="btn btn-outline-secondary" style={{ border: "3px solid" }}
                          onClick={this.Re_to_process.bind(
                            this,
                            product.PirBillCod1,
                            product.PirBillCod2,
                            product.PirSeq
                          )}
                        >
                          <b style={{fontSize: '13px'}}>Re to process</b>
                        </button>
                    </span>
                  </td>

                  <td style={{display: 'none'}}>
                    <div ref={el => (this.componentRef = el)}>
                  
                      <div >
                        <div style={{textAlign: 'center', width: '445px'}}>
                          <img src={RamIcon} style={{width: '170px'}}/>
                          <br/>
                          <b style={{ fontSize: "13px" }}>
                            <span style={{paddingTop: '90px', fontSize: '20px'}}>
                              ใบเสร็จรับเงิน
                            {/* WARD {product.PirWrdCod}-{product.PirRoomCod}-{product.PirBedCod} HN : {product.PirHn} */}
                            </span>
                          
                            <br/>

                            ROOM {product.PirWrdCod}-{product.PirRoomCod}-{product.PirBedCod} HN : {product.PirHn}
                            <br/>
                            {/* <span > */}
                              <span style={{float: 'left'}}>
                                &nbsp;&nbsp;NAME : {product.PirUserName} &nbsp; 
                              </span>
                              <span style={{float: 'right'}}>
                                AGE : {product.PirUserAge}
                                <br/>
                                ON.{data1}-{data2}
                              
                              </span>
                            {/* </span> */}
                          </b>
                        </div>

                        <div style={{paddingLeft: '10px', paddingRight: '10px', width: '440px'}}>
                          
                          <table style={{ border: 'none', borderColor: '#FFFFFF'}} >

                            <tbody>
                              {products_detail.map((product2) => (

                                <tr key={product2.PirSeq}>

                                  {(() => {

                                    var datastring1 = product2.PirBillCod1;
                                    var datastring2 = product2.PirBillCod2;
                                    var n1 = datastring1.length;
                                    var n2 = datastring2.length;

                                    if (n1 === 1) {
                                      product2.PirBillCod1 = "00" + product2.PirBillCod1;
                                    }

                                    if (n1 === 2) {
                                      product2.PirBillCod1 = "0" + product2.PirBillCod1;
                                    }

                                    if (n1 === 3) {
                                      product2.PirBillCod1 = product2.PirBillCod1;
                                    }

                                    if (n2 === 1) {
                                      product2.PirBillCod2 = "00000" + product2.PirBillCod2;
                                    }

                                    if (n2 === 2) {
                                      product2.PirBillCod2 = "0000" + product2.PirBillCod2;
                                    }

                                    if (n2 === 3) {
                                      product2.PirBillCod2 = "000" + product2.PirBillCod2;
                                    }

                                    if (n2 === 4) {
                                      product2.PirBillCod2 = "00" + product2.PirBillCod2;
                                    }

                                    if (n2 === 5) {
                                      product2.PirBillCod2 = "0" + product2.PirBillCod2;
                                    }

                                    if (n2 === 6) {
                                      product2.PirBillCod2 = product2.PirBillCod2;
                                    }

                                    if(data2 === product2.PirBillCod2 ){

                                      if(product2.PirPrcTyp === "T"){
                                        return(
                                          <td style={{border : 'none'}}>
                                            <span className="page">
                                              
                                              <table >
                                                <tbody>
                                                  <tr >
                                                    <td style={{border : 'none'}}>
                                                    <br />
                                                      <span
                                                        style={{
                                                          fontSize: "14px",
                                                          textAlign: "left",
                                                          color: 'black'
                                                        }}
                                                      >
                                                        {product2.FodMnuNamThai}
                                                        <br />
                                                        
                                                        {product2.PirOdrCmt}
                                                      </span>
                                                      <br />
                                                    </td>

                                                    <td style={{ textAlign: "right", color: 'black', border : 'none'}}>
                                                      <b style={{ fontSize: "14px", color: 'black', border : 'none'}}>

                                                      {product2.PirOdrQty} &nbsp;&nbsp;
                                                        ฿ {product2.FodPrcNum}
                                                      </b>
                                                    </td>

                                                  </tr>
                                                </tbody>
                                              </table>
                                            
                                            </span>
                                          </td>
                                        )
                                      }

                                    }
                              
                                  })()}

                                </tr>

                              ))}
                              

                              <tr>
                                <td>
                                  <br/>
                                  <div style={{ textAlign: "right", fontSize: "10px", width: "440px", border : 'none' }}>
                                      <b>
                                        รวม &nbsp;&nbsp;
                                        <span id={"SUM_QTY_TOTAL" + product.PirBillCod2}>
                                          {QTY_T}
                                        </span>
                                      </b>
                                      &nbsp;&nbsp;&nbsp;
                                      <u id={"SUM_PRICE_TOTAL" + product.PirBillCod2}>
                                        
                                      </u>
                                      &nbsp;
                                  </div>
                                  <br/>
                                </td>
                              </tr>

                            </tbody>

                          </table>

                        </div>

                      </div>

                    </div>

                    {/* <div id={`printme${product.PirBillCod1}${product.PirBillCod2}`} > */}
      
                      {/* ------------------------  */}
                      {/* รวมบิล                     */}
                      {/* --------------------------*/}
                      {/* <div id={`TOTAL${product.PirBillCod1}${product.PirBillCod2}`} className="Total-bill">

                        <div className="page-header" style={{ border: 'none', width: '440px'}}>
                            <div style={{float: 'left', background: '',  width: '440px'}}>
                              
                              <span style={{textAlign: 'center'}}>
                                <img src={RamIcon} style={{width: '150px'}}/>
                                <br/>
                                <b style={{ fontSize: "13px" }}>
                                  <span style={{paddingTop: '90px'}}>
                                  ใบเสร็จรับเงิน : WARD {product.PirWrdCod}-{product.PirRoomCod}-{product.PirBedCod} HN : {product.PirHn}
                                  </span>
                                
                                  <br/>
                                  <span >
                                    NAME : {product.PirUserName} &nbsp; AGE : {product.PirUserAge}
                                  </span>
                                </b>
                              </span>
                              <br/>  
                            </div>
                        </div>

                        <table style={{ border: 'none', borderColor: '#FFFFFF'}} >

                          <thead style={{border : 'none'}}>
                            <tr >
                              <td style={{border : 'none'}}>
                                <div className="page-header-space" style={{border: 'none'}}>

                                </div>
                              </td>
                            </tr>
                          </thead>

                          <tbody>
                            {products_detail.map((product2) => (

                              <tr key={product2.PirSeq}>

                                {(() => {

                                  var datastring1 = product2.PirBillCod1;
                                  var datastring2 = product2.PirBillCod2;
                                  var n1 = datastring1.length;
                                  var n2 = datastring2.length;

                                  if (n1 === 1) {
                                    product2.PirBillCod1 = "00" + product2.PirBillCod1;
                                  }

                                  if (n1 === 2) {
                                    product2.PirBillCod1 = "0" + product2.PirBillCod1;
                                  }

                                  if (n1 === 3) {
                                    product2.PirBillCod1 = product2.PirBillCod1;
                                  }

                                  if (n2 === 1) {
                                    product2.PirBillCod2 = "00000" + product2.PirBillCod2;
                                  }

                                  if (n2 === 2) {
                                    product2.PirBillCod2 = "0000" + product2.PirBillCod2;
                                  }

                                  if (n2 === 3) {
                                    product2.PirBillCod2 = "000" + product2.PirBillCod2;
                                  }

                                  if (n2 === 4) {
                                    product2.PirBillCod2 = "00" + product2.PirBillCod2;
                                  }

                                  if (n2 === 5) {
                                    product2.PirBillCod2 = "0" + product2.PirBillCod2;
                                  }

                                  if (n2 === 6) {
                                    product2.PirBillCod2 = product2.PirBillCod2;
                                  }

                                  if(data2 === product2.PirBillCod2 ){

                                    if(product2.PirPrcTyp === "T"){
                                      return(
                                        <td style={{border : 'none'}}>
                                          <span className="page">
                                            
                                            <table style={{width: '440px'}}>
                                              <tbody>
                                                <tr >
                                                  <td style={{border : 'none'}}>
                                                  <br />
                                                    <span
                                                      style={{
                                                        fontSize: "15px",
                                                        textAlign: "left",
                                                        color: 'black'
                                                      }}
                                                    >
                                                      {product2.FodMnuNamThai}
                                                      <br />
                                                      
                                                      {product2.PirOdrCmt}
                                                    </span>
                                                    <br />
                                                  </td>
  
                                                  <td style={{ textAlign: "right", color: 'black', border : 'none'}}>
                                                    <b style={{ fontSize: "12px", color: 'black', border : 'none'}}>

                                                    {product2.PirOdrQty} &nbsp;&nbsp;
                                                      ฿ {product2.FodPrcNum}
                                                    </b>
                                                  </td>

                                                </tr>
                                              </tbody>
                                            </table>
                                          
                                          </span>
                                        </td>
                                      )
                                    }
              
                                  }
                            
                                })()}

                              </tr>

                            ))}

                            <tr>
                              <td>
                                <br/>
                                <div style={{ textAlign: "right", fontSize: "10px", width: "440px", border : 'none' }}>
                                    <b>
                                      รวม &nbsp;&nbsp;
                                      <span id={"SUM_QTY_TOTAL" + product.PirBillCod2}>
                                        --
                                      </span>
                                    </b>
                                    &nbsp;&nbsp;&nbsp;
                                    <u id={"SUM_PRICE_TOTAL" + product.PirBillCod2}>--</u>
                                    &nbsp;
                                </div>
                                <br/>
                              </td>
                            </tr>

                          </tbody>

                          <tfoot style={{border : 'none'}}>
                            <tr >
                              <td style={{border : 'none'}}>
                              <div className="page-footer-space" style={{width: '440px'}}>
                                  <span className="Column" style={{ textAlign: "left", background: 'green' }}>
                                    <b style={{ fontSize: "12px"}}>
                                      ครัว : {KITCHEN_NAME}
                                      <br />
                                      ประเภท : อาหารตามสั่ง <br />
                                      เวลาสั่งอาหาร : {product.PirOdrDte} | {product.PirOdrTme}
                                      
                                    </b>
                                  </span>
                          
                                  <span className="Column" style={{ textAlign: "right", background: 'red' }}>
                               
                                    <b style={{fontSize: "12px"}}>
                                      นักโภชนาการ : {USER}
                                      <br/>
                                      ประเภทการชำระ : อาหารคนไข้
                                      <br/>
                                      ON.{data1}-{data2}
                                    </b>
                                  </span> 
                                </div>
                              </td>
                            </tr>
                          </tfoot> 
                
                        </table>

                      </div> */}

                      {/* ------------------------  */}
                      {/* เงินสด                     */}
                      {/* --------------------------*/}
                      {/* <div id={`CASH${product.PirBillCod1}${product.PirBillCod2}`} className="Cash-bill">

                      <div className="page-header" style={{ border: 'none'}}>
                        </div>

                        <table style={{ border: 'none', borderColor: '#FFFFFF'}} >

                          <thead style={{border : 'none'}}>
                            <tr >
                              <td style={{border : 'none'}}>
                                <div className="page-header-space" style={{border: 'none'}}>

                                </div>
                              </td>
                            </tr>
                          </thead>

                          <tbody>
                            {products_detail.map((product2) => (

                              <tr key={product2.PirSeq}>

                                {(() => {

                                  var datastring1 = product2.PirBillCod1;
                                  var datastring2 = product2.PirBillCod2;
                                  var n1 = datastring1.length;
                                  var n2 = datastring2.length;

                                  if (n1 === 1) {
                                    product2.PirBillCod1 = "00" + product2.PirBillCod1;
                                  }

                                  if (n1 === 2) {
                                    product2.PirBillCod1 = "0" + product2.PirBillCod1;
                                  }

                                  if (n1 === 3) {
                                    product2.PirBillCod1 = product2.PirBillCod1;
                                  }

                                  if (n2 === 1) {
                                    product2.PirBillCod2 = "00000" + product2.PirBillCod2;
                                  }

                                  if (n2 === 2) {
                                    product2.PirBillCod2 = "0000" + product2.PirBillCod2;
                                  }

                                  if (n2 === 3) {
                                    product2.PirBillCod2 = "000" + product2.PirBillCod2;
                                  }

                                  if (n2 === 4) {
                                    product2.PirBillCod2 = "00" + product2.PirBillCod2;
                                  }

                                  if (n2 === 5) {
                                    product2.PirBillCod2 = "0" + product2.PirBillCod2;
                                  }

                                  if (n2 === 6) {
                                    product2.PirBillCod2 = product2.PirBillCod2;
                                  }

                                  if(data2 === product2.PirBillCod2){

                                    if(product2.PirPrcTyp === "C"){

                                      return(
                                        <td style={{border : 'none'}}>
                                          <div className="page">
                                            
                                            <table style={{width: '440px'}}>
                                              <tbody>
                                                <tr >
                                                  <td style={{border : 'none'}}>
                                                    <span
                                                      style={{
                                                        fontSize: "15px",
                                                        textAlign: "left",
                                                        color: 'black'
                                                      }}
                                                    >
                                                      {product2.FodMnuNamThai}
                                                      <br/>
                                                      
                                                      {product2.PirOdrCmt}
                                                    </span>
                                                   
                                                  </td>
  
                        
  
                                                  <td style={{ textAlign: "right", color: 'black', border : 'none'}}>
                                                    <b style={{ fontSize: "12px", color: 'black', border : 'none'}}>

                                                    {product2.PirOdrQty} &nbsp;&nbsp;
                                                      ฿ {product2.FodPrcNum}
                                                    </b>
                                                    <br />
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                
                                          </div>
                                        </td>
                                      )
                                    }
                   
                                  }
                            
                                })()}

                              </tr>

                            ))}

                            <tr>
                              <td>
                                <div style={{ textAlign: "right", width: "440px" }}>
                                  <b>
                                    รวม &nbsp;&nbsp;{" "}
                                    <span id={"SUM_QTY_CASH" + product.PirBillCod2}>
                                      --
                                    </span>
                                  </b>
                                  &nbsp;&nbsp;&nbsp;
                                  <u id={"SUM_PRICE_CASH" + product.PirBillCod2}>--</u>
                                  &nbsp;
                                </div>
                                <br/>
                              </td>
                            </tr>

                          </tbody>

                          <tfoot style={{border : 'none', background: 'red' }}>
                            <tr>
                              <td style={{border : 'none'}}>
                                <div className="page-footer-space" style={{width: '440px'}}>

                                <span className="Column" style={{ textAlign: "left", background: 'green' }}>
                                    <b style={{ fontSize: "12px"}}>
                                      ครัว : {KITCHEN_NAME}
                                      <br />
                                      ประเภท : อาหารตามสั่ง <br />
                                      เวลาสั่งอาหาร : {product.PirOdrDte} | {product.PirOdrTme}
                                      
                                    </b>
                                  </span>
                          
                                  <span className="Column" style={{ textAlign: "right", background: 'red' }}>
                            
                                    <b style={{fontSize: "12px"}}>
                                      นักโภชนาการ : {USER}
                                      <br/>
                                      ประเภทการชำระ : อาหารญาติ
                                      <br/>
                                      ON.{data1}-{data2}
                                    </b>
                                  </span> 

            
                                </div>
                              </td>
                            </tr>
                          </tfoot> 

                        </table>

                      </div> */}

                    {/* </div> */}

                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>
    );
  }

  Detail_interval(){

    funky = setInterval(() => {

      const { GET_DATA_KITCHEN } = this.state;
        
      fetch(ALL_ORDER_COMPLETED_RAM.ALL_ORDER_COMPLETED + GET_DATA_KITCHEN).then((res) => res.json()).then(
        (result) => {
  
          this.setState({
            products: result,
          });
  
        },
        (error) => {
          this.setState({ error });
        }
      );
  
      fetch(ALL_ORDER_COMPLETED_RAM.ALL_ORDER_COMPLETED_DETAIL + GET_DATA_KITCHEN).then((res) => res.json()).then(
        (result) => {
  
          for (var i = 0; i < result.length; ++i) {
            var ORDER_NAME = result[i].FodMnuNamThai;
            // console.log(result[i]);
            
            result[i].FodMnuNamThai = ORDER_NAME.replace("[IS]", "").replace("[FH]", "");
  
            //! เช็คว่า อาหารใน bill นั้น status เป็น F ทั้งหมดหรือ ไม่
            fetch(
              ALL_ORDER_COMPLETED_RAM.COUNT_ORDER_BY_BILL +
              GET_DATA_KITCHEN +
              "&id_bill2=" +
              result[i].PirBillCod2
            )
              .then((res) => res.json())
              .then(
                (result2) => {
                  // console.log(result2);
                  //--------------------------- //
                  // นับจำนวน array              //
                  // -------------------------- //
                  var count_array = result2.length;
  
                  // เช็คข้อมูล array
                  this.status = {};
                  result2.forEach((d) => {
                    if (!this.status[d["PirOdrStt"]]) {
                      this.status[d["PirOdrStt"]] = 1;
                    } else {
                      this.status[d["PirOdrStt"]] += 1;
                    }
                  });
  
                  this.type = {};
                  result2.forEach((d) => {
                    if (!this.type[d["PirPrcTyp"]]) {
                      this.type[d["PirPrcTyp"]] = 1;
                    } else {
                      this.type[d["PirPrcTyp"]] += 1;
                    }
                  });
  
                  var Fully = 0;
  
                  for (var i = 0; i < result2.length; ++i) {
  
                    // console.log(result2[i])
  
                    if (count_array === this.status.F) {
                      // console.log("ครบ");
      
                      if(result2[i].PirScanCheck != result2[i].PirOdrQty){
  
                        //Not_complete += 1;
  
                      }else{
  
                        Fully += 1;
  
                      }
  
                      if(Fully === count_array){
  
                        $("#Buttom_con" + result2[i].PirBillCod2).css("display", "");
  
                      }
  
                    }
  
                  }
  
                },
                (error) => {
  
                  this.setState({ error });
  
              }
            );
  
          }
  
          // console.log(result);
  
          this.setState({
            products_detail: result,
          });
  
        },
        (error) => {
          this.setState({ error });
        }
      );
  
      fetch(ALL_ORDER_COMPLETED_RAM.COUNT_ORDER_COMPLETED + GET_DATA_KITCHEN).then((res) => res.json()).then(
        (result) => {
  
          var QTY1 = parseInt(result[0].QTY1);
          var count = QTY1;
          var myObj = {
            Countdata1: count,
          };
  
          result.push(myObj);
          this.setState({
            count1: result,
          });
  
        },
        (error) => {
          this.setState({ error });
        }
      );
      
    }, 1000);

  }

  Detail_date(value){

    const { GET_DATA_KITCHEN } = this.state;


    function convert(str) {
      var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      return [date.getFullYear(), mnth, day].join("-");
    }

    const DATE_VALUE = convert(value);

    if(DATE_VALUE != 'NaN-aN-aN'){

      clearInterval(funky);

      var DATE_DATA = DATE_VALUE;
      var DATE_SET_MAIN = convert(new Date()).replace(/^\s+|-|-\s+$/gm,'');
      var DATE_SET = DATE_DATA.replace(/^\s+|-|-\s+$/gm,'');

      // console.log(DATE_SET);
      // console.log(DATE_SET_MAIN);

      if(DATE_SET === DATE_SET_MAIN){

        this.Detail_interval();

      }else{

        fetch(ALL_ORDER_COMPLETED_RAM.ALL_ORDER_COMPLETED + GET_DATA_KITCHEN + "&Date=" + DATE_SET).then((res) => res.json()).then(
          (result) => {
    
            this.setState({
              products: result,
            });
    
          },
          (error) => {
            this.setState({ error });
          }
        );
    
        fetch(ALL_ORDER_COMPLETED_RAM.ALL_ORDER_COMPLETED_DETAIL + GET_DATA_KITCHEN + "&Date=" + DATE_SET).then((res) => res.json()).then(
          (result) => {
    
            for (var i = 0; i < result.length; ++i) {
              var ORDER_NAME = result[i].FodMnuNamThai;
              // console.log(result[i]);
              
              result[i].FodMnuNamThai = ORDER_NAME.replace("[IS]", "").replace("[FH]", "");
    
              //! เช็คว่า อาหารใน bill นั้น status เป็น F ทั้งหมดหรือ ไม่
              fetch(
                ALL_ORDER_COMPLETED_RAM.COUNT_ORDER_BY_BILL +
                GET_DATA_KITCHEN +
                "&id_bill2=" +
                result[i].PirBillCod2
              )
                .then((res) => res.json())
                .then(
                  (result2) => {
                    // console.log(result2);
                    //--------------------------- //
                    // นับจำนวน array              //
                    // -------------------------- //
                    var count_array = result2.length;
    
                    // เช็คข้อมูล array
                    this.status = {};
                    result2.forEach((d) => {
                      if (!this.status[d["PirOdrStt"]]) {
                        this.status[d["PirOdrStt"]] = 1;
                      } else {
                        this.status[d["PirOdrStt"]] += 1;
                      }
                    });
    
                    this.type = {};
                    result2.forEach((d) => {
                      if (!this.type[d["PirPrcTyp"]]) {
                        this.type[d["PirPrcTyp"]] = 1;
                      } else {
                        this.type[d["PirPrcTyp"]] += 1;
                      }
                    });
    
                    var Fully = 0;
    
                    for (var i = 0; i < result2.length; ++i) {
    
                      // console.log(result2[i])
    
                      if (count_array === this.status.F) {
                        // console.log("ครบ");
        
                        if(result2[i].PirScanCheck != result2[i].PirOdrQty){
    
                          // Not_complete += 1;
    
                        }else{
    
                          Fully += 1;
    
                        }
    
                        if(Fully === count_array){
    
                          $("#Buttom_con" + result2[i].PirBillCod2).css("display", "");
    
                        }
    
                      }
    
                    }
    
                  },
                  (error) => {
    
                    this.setState({ error });
    
                }
              );
    
            }
    
            // console.log(result);
    
            this.setState({
              products_detail: result,
            });
    
          },
          (error) => {
            this.setState({ error });
          }
        );
    
        fetch(ALL_ORDER_COMPLETED_RAM.COUNT_ORDER_COMPLETED + GET_DATA_KITCHEN + "&Date=" + DATE_SET).then((res) => res.json()).then(
          (result) => {
    
            var QTY1 = parseInt(result[0].QTY1);
            var count = QTY1;
            var myObj = {
              Countdata1: count,
            };
    
            result.push(myObj);
            this.setState({
              count1: result,
            });
    
          },
          (error) => {
            this.setState({ error });
          }
        );

      }

    }else{
      
      this.Detail_interval();
    }

  }

  Re_to_process(id1, id2) {
    const { GET_DATA_KITCHEN } = this.state;
    $.ajax({
      url:
        ALL_ORDER_COMPLETED_RAM.UPDATE_STATUS_TO_PROCESS +
        "?Bill1=" +
        id1 +
        "&Bill2=" +
        id2 +
        "&Kitchen=" +
        new URLSearchParams(GET_DATA_KITCHEN).get("Kitchen"),
      type: "POST",
      success: function (data) {
        window.location.reload();
        // console.log(data);
      },
    });
  }

  GET_DATA_BILL(id1, id2){


    const { GET_DATA_KITCHEN, QTY_T, PRICE_T } = this.state;
     
    var T_C = '';
    var T_T = '';
    
    // console.log(ALL_ORDER_COMPLETED_RAM.ALL_ORDER_COMPLETED_DETAIL + GET_DATA_KITCHEN+'&ID1='+id1+'&ID2='+id2);
    fetch(ALL_ORDER_COMPLETED_RAM.ALL_ORDER_COMPLETED_DETAIL + GET_DATA_KITCHEN+'&ID1='+id1+'&ID2='+id2).then((res) => res.json()).then(
      (result) => {

        console.log(result);

        for (var i = 0; i < result.length; ++i) {

          if(result[i].PirPrcTyp === "C"){
            T_C = "YES";
          }

          if(result[i].PirPrcTyp === "T"){
            T_T = "YES";
          }

        }

        if(T_C != "YES"){
          $(`#CASH${id1}${id2}`).css("display", "none");
          console.log("CASH - none");
        }

        if(T_T != "YES"){
          $(`#TOTAL${id1}${id2}`).css("display", "none");

          console.log("TOTAL - none");
        }

        console.log(T_C);
        console.log("----");
        console.log(T_T);

      },
      (error) => {
        this.setState({ error });
      }
    );

  }

  SHOW_BILL (id1, id2) {

    const { GET_DATA_KITCHEN, PRICE_TLLL} = this.state;

    this.setState({
      PRICE_TLLL : 2
    });
    
    // this.GET_DATA_BILL(id1, id2);


    fetch(ALL_ORDER_COMPLETED_RAM.AMOUNT + GET_DATA_KITCHEN + "&Billid1="+id1+"&Billid2="+id2+"&Type_t=T").then((res) => res.json()).then(
      (result) => {

        // console.log(result);
        // QTY_T = result[0].SumQTY_T;
        // PRICE_T = result[0].Amount_T;


 

        console.log(PRICE_TLLL);

        // QTY_T = 'ttt';
        // PRICE_T = 'ppp';
        console.log("QTY TT "+result[0].SumQTY_T);
        console.log("PRICE TT "+result[0].Amount_T);

        // $("#SUM_QTY_TOTAL" + id2).html( result[0].SumQTY_T );

        // $("#SUM_PRICE_TOTAL" + id2).html(
        //   result[0].Amount_T
        // );

      },
      (error) => {
        this.setState({ error });
      }
    );


    fetch(ALL_ORDER_COMPLETED_RAM.AMOUNT +GET_DATA_KITCHEN + "&Billid1="+id1+"&Billid2="+id2+"&Type_c=C").then((res) => res.json()).then(
      (result) => {

        // console.log("QTY CC "+result[0].SumQTY_C);
        // console.log("PRICE CC "+result[0].Amount_C);

        // $("#SUM_QTY_CASH" + id2).html(
        //     result[0].SumQTY_C
        // );

        // $("#SUM_PRICE_CASH" + id2).html(
        //   result[0].Amount_C
        // );

      },
      (error) => {
        this.setState({ error });
      }
    );


  }


  componentDidMount() {

    this.Detail_date();

  }
}