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
      USER: this.props.details.USER,
      TOTAL : {
        QTY : '',
        PRICE : ''
      },
      CASH: {
        QTY : '',
        PRICE : ''
      },
      DETAIL_PRINT: [],
      PRODUCT_PRINT : []
    };

    this.SHOW_BILL = this.SHOW_BILL.bind(this)

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
      products_detail,
      USER,
      DETAIL_PRINT,
      PRODUCT_PRINT
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
                <th scope="col" style={{ width: "auto" }}>
                  ราคา
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

                  <td>
                    {products_detail.map((product2) => (
                      <span key={product2.PirSeq}>
                        {(() => {
                          if (data2 === product2.PirBillCod2) {
                            return (
                              <span>
                                <div className="Box-text">
                                  <div className="text-com-detail" >{product2.FodPrcNum} </div>
                                  <span className="tooltiptext-com">{product2.FodPrcNum} </span>
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
         
                        <button onClick={ this.SHOW_BILL.bind(this, product.PirBillCod1, product.PirBillCod2)} className="btn btn-outline-secondary" id={"Buttom_con"+product.PirBillCod2}>
                          <b >Slip</b>
                        </button>

                          <span style={{display: 'none'}}>

                            <ReactToPrint content={() => this.componentRef_T}>
                              <PrintContextConsumer >
                                  {({ handlePrint }) => (
                                    <button onClick={handlePrint}  className="btn btn-outline-secondary" id={"Buttom_con_T"+product.PirBillCod2}>
                                      <b  >Slip T</b>
                                    </button>
                                  )}
                              </PrintContextConsumer>
                            </ReactToPrint>

                            <ReactToPrint content={() => this.componentRef_C}>
                              <PrintContextConsumer >
                                  {({ handlePrint }) => (
                                    <button onClick={handlePrint}  className="btn btn-outline-secondary" id={"Buttom_con_C"+product.PirBillCod2}>
                                      <b  >Slip C</b>
                                    </button>
                                  )}
                              </PrintContextConsumer>
                            </ReactToPrint>

                          </span>

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

                  {PRODUCT_PRINT.map((product_user) => (
                    <div key={product_user.PirBillCod1 + product_user.PirBillCod2} id={`${product_user.PirBillCod1}${product_user.PirBillCod2}`}>

                      {/* --------------------- */}
                      {/* อาหารคนไข้             */}
                      {/* --------------------- */}
                      <div ref={el => (this.componentRef_T = el)}>
                    
                        <div>
                          <div style={{textAlign: 'center', width: '445px'}}>
                            <img src={RamIcon} style={{width: '180px'}}/>
                            <br/>

                            <b style={{ fontSize: "13px" }}>
                              <span style={{paddingTop: '80px', fontSize: '20px'}}>
                                ใบส่งอาหาร
                              </span>
                              <br/>

                              ROOM {product_user.PirWrdCod}-{product_user.PirRoomCod}-{product_user.PirBedCod} HN : {product_user.PirHn}
                              <br/>

                              <span style={{float: 'left'}}>
                                &nbsp;&nbsp;NAME : {product_user.PirUserName} &nbsp; 
                              </span>

                              <span style={{float: 'right'}}>
                                AGE : {product_user.PirUserAge}
                              </span>

                            </b><br/><br/>
                          </div>

                          <div style={{paddingLeft: '10px', paddingRight: '10px', width: '440px'}}>
                            
                            <table style={{ border: 'none', borderColor: '#FFFFFF'}} >

                              <tbody>
                                {DETAIL_PRINT.map((product2) => (

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

                                      if(product2.PirPrcTyp === "T"){
                                        if((product2.PirOdrCmt === "-")||((product2.PirOdrCmt == ""))){
                                          return(
                                            <td style={{border : 'none'}}>
                                              <span className="page">
                                                
                                                <table >
                                                  <tbody>
                                                    <tr >
                                                      <td style={{border : 'none'}}>
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
                                        }else{
                                          return(
                                            <td style={{border : 'none'}}>
                                              <span className="page">
                                                
                                                <table >
                                                  <tbody>
                                                    <tr >
                                                      <td style={{border : 'none'}}>
                                                      {/* <br /> */}
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
                                              {/* <br/> */}
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
                                    <div style={{ textAlign: "right", fontSize: "14px", width: "440px", border : 'none' }}>
                                        <b>
                                          รวม &nbsp;&nbsp; {this.state.TOTAL.QTY} &nbsp;&nbsp; {this.state.TOTAL.PRICE}
                                        </b>
                                    </div>
                                    <br/>
                                  </td>
                                </tr>

                                <tr >
                                  <td style={{border : 'none'}}>
                                    <div className="page-footer-space" style={{width: '440px'}}>
                                      <span className="Column" style={{ textAlign: "left"}}>
                                        <b style={{ fontSize: "12px"}}>
                                          ครัว : {KITCHEN_NAME}
                                          <br />
                                          ประเภท : อาหารตามสั่ง <br />
                                          เวลาสั่งอาหาร : {product_user.PirOdrDte} | {product_user.PirOdrTme}
                                          
                                        </b>
                                      </span>
                              
                                      <span className="Column" style={{ textAlign: "right"}}>
                                  
                                        <b style={{fontSize: "12px"}}>
                                          นักโภชนาการ : {USER}
                                          <br/>
                                          ประเภทการชำระ : อาหารคนไข้
                                        </b>
                                      </span> 
                                    </div>
                                  </td>
                                </tr>

                              </tbody>

                            </table>

                          </div>

                        </div>

                      </div>

                      {/* --------------------- */}
                      {/* อาหารญาติ              */}
                      {/* --------------------- */}
                      <div ref={el => (this.componentRef_C = el)}>
                        <div >
                            <div style={{textAlign: 'center', width: '445px'}}>
                              <img src={RamIcon} style={{width: '180px'}}/>
                              <br/>
                              <b style={{ fontSize: "13px" }}>

                                <span style={{paddingTop: '80px', fontSize: '20px'}}>
                                  ใบเสร็จรับเงิน
                                </span>
                                <br/>

                                ROOM {product_user.PirWrdCod}-{product_user.PirRoomCod}-{product_user.PirBedCod} HN : {product_user.PirHn}
                                <br/>

                                <span style={{float: 'left'}}>
                                  &nbsp;&nbsp;NAME : {product_user.PirUserName} &nbsp; 
                                </span>

                                <span style={{float: 'right'}}>
                                  NO.{data1}-{data2}
                                  <br/>
                                  <span style={{float: 'right'}}>
                                  AGE : {product_user.PirUserAge}
                                  </span>
                                </span>

                              </b>
                            </div>

                            <div style={{paddingLeft: '10px', paddingRight: '10px', width: '440px'}}>
                              
                              <table style={{ border: 'none', borderColor: '#FFFFFF'}} >

                                <tbody>
                                  {DETAIL_PRINT.map((product2) => (

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

                                        if(product2.PirPrcTyp === "C"){
                                          // return(
                                          //   <td style={{border : 'none'}}>
                                          //     <span className="page">
                                                
                                          //       <table >
                                          //         <tbody>
                                          //           <tr >
                                          //             <td style={{border : 'none'}}>
                                          //             <br />
                                          //               <span
                                          //                 style={{
                                          //                   fontSize: "14px",
                                          //                   textAlign: "left",
                                          //                   color: 'black'
                                          //                 }}
                                          //               >
                                          //                 {product2.FodMnuNamThai}
                                          //                 <br />
                                                          
                                          //                 {product2.PirOdrCmt}
                                          //               </span>
                                          //               <br />
                                          //             </td>

                                          //             <td style={{ textAlign: "right", color: 'black', border : 'none'}}>
                                          //               <b style={{ fontSize: "14px", color: 'black', border : 'none'}}>

                                          //               {product2.PirOdrQty} &nbsp;&nbsp;
                                          //                 ฿ {product2.FodPrcNum}
                                          //               </b>
                                          //             </td>

                                          //           </tr>
                                          //         </tbody>
                                          //       </table>
                                              
                                          //     </span>
                                          //   </td>
                                          // )
                                          if((product2.PirOdrCmt === "-")||((product2.PirOdrCmt == ""))){
                                            return(
                                              <td style={{border : 'none'}}>
                                                <span className="page">
                                                  
                                                  <table >
                                                    <tbody>
                                                      <tr >
                                                        <td style={{border : 'none'}}>
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
                                          }else{
                                            return(
                                              <td style={{border : 'none'}}>
                                                <span className="page">
                                                  
                                                  <table >
                                                    <tbody>
                                                      <tr >
                                                        <td style={{border : 'none'}}>
                                                        {/* <br /> */}
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
                                                {/* <br/> */}
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
                                      <div style={{ textAlign: "right", fontSize: "14px", width: "440px", border : 'none' }}>
                                          <b>
                                            รวม &nbsp;&nbsp; {this.state.CASH.QTY} &nbsp;&nbsp; {this.state.CASH.PRICE}
                                          </b>
                                      </div>
                                      <br/>
                                    </td>
                                  </tr>

                                  <tr >
                                    <td style={{border : 'none'}}>
                                      <div className="page-footer-space" style={{width: '440px'}}>
                                        <span className="Column" style={{ textAlign: "left"}}>
                                          <b style={{ fontSize: "12px"}}>
                                            ครัว : {KITCHEN_NAME}
                                            <br />
                                            ประเภท : อาหารตามสั่ง <br />
                                            เวลาสั่งอาหาร : {product_user.PirOdrDte} | {product_user.PirOdrTme}
                                            
                                          </b>
                                        </span>
                                
                                        <span className="Column" style={{ textAlign: "right"}}>
                                    
                                          <b style={{fontSize: "12px"}}>
                                            นักโภชนาการ : {USER}
                                            <br/>
                                            ประเภทการชำระ : อาหารญาติ
                                          </b>
                                        </span> 
                                      </div>
                                    </td>
                                  </tr>

                                </tbody>

                              </table>

                            </div>

                        </div>
                      </div>

                    </div>
                  ))}

                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>
    );
  }

    SHOW_BILL (id1, id2) {

      const { GET_DATA_KITCHEN} = this.state;
      
      this.GET_DATA_BILL(id1, id2);


      fetch(ALL_ORDER_COMPLETED_RAM.AMOUNT + GET_DATA_KITCHEN + "&Billid1="+id1+"&Billid2="+id2+"&Type_t=T").then((res) => res.json()).then(
        (result) => {

          // console.log(result);

          this.setState({
            TOTAL : {
              QTY : result[0].SumQTY_T,
              PRICE : result[0].Amount_T
            }
          });

          // console.log("QTY TT "+result[0].SumQTY_T);
          // console.log("PRICE TT "+result[0].Amount_T);

        },
        (error) => {
          this.setState({ error });
        }
      );


      fetch(ALL_ORDER_COMPLETED_RAM.AMOUNT +GET_DATA_KITCHEN + "&Billid1="+id1+"&Billid2="+id2+"&Type_c=C").then((res) => res.json()).then(
        (result) => {

          this.setState({
            CASH: {
              QTY : result[0].SumQTY_C,
              PRICE : result[0].Amount_C
            }
          });


        },
        (error) => {
          this.setState({ error });
        }
      );


      fetch(ALL_ORDER_COMPLETED_RAM.ALL_ORDER_COMPLETED + GET_DATA_KITCHEN+"&ID1="+id1+"&ID2="+id2).then((res) => res.json()).then(
        (result) => {

          console.log(result);

          this.setState({
            PRODUCT_PRINT: result,
          });
  
        },
        (error) => {
          this.setState({ error });
        }
      );


      console.log(ALL_ORDER_COMPLETED_RAM.ALL_ORDER_COMPLETED_DETAIL + GET_DATA_KITCHEN+ "&ID1="+id1+"&ID2="+id2);
      fetch(ALL_ORDER_COMPLETED_RAM.ALL_ORDER_COMPLETED_DETAIL + GET_DATA_KITCHEN+ "&ID1="+id1+"&ID2="+id2).then((res) => res.json()).then(
        (result) => {

          //console.log(result);

          this.setState({
            DETAIL_PRINT: result,
          });

        },
        (error) => {
          this.setState({ error });
        }
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

            // console.log(result);
    
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

    GET_DATA_BILL(id1, id2) {

      const { GET_DATA_KITCHEN} = this.state;
      
      var T_C = '';
      var T_T = '';
      
      // console.log(ALL_ORDER_COMPLETED_RAM.ALL_ORDER_COMPLETED_DETAIL + GET_DATA_KITCHEN+'&ID1='+id1+'&ID2='+id2);
      fetch(ALL_ORDER_COMPLETED_RAM.ALL_ORDER_COMPLETED_DETAIL + GET_DATA_KITCHEN+'&ID1='+id1+'&ID2='+id2).then((res) => res.json()).then(
        (result) => {

          // console.log(result);

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

            // console.log("CASH - none");
          }

          if(T_T != "YES"){
            $(`#TOTAL${id1}${id2}`).css("display", "none");

            // console.log("TOTAL - none");
          }

          if(T_T === "YES" && T_C === "YES"){

            setTimeout(() => {

              $('#Buttom_con_C'+id2).click();
              
            }, 500);

            setTimeout(() => {

              $('#Buttom_con_T'+id2).click();
              
            }, 1500);

          }else{

            if(T_C === "YES"){

              setTimeout(() => {

                $('#Buttom_con_C'+id2).click();
                
              }, 500);

            }else{

              setTimeout(() => {

                $('#Buttom_con_T'+id2).click();
                
              }, 500);

            }

          }

          // console.log(T_C);
          // console.log("----");
          // console.log(T_T);

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