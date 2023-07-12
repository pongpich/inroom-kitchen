import React, { Component } from "react";
import $, { cleanData } from "jquery";
import QRCode from "react-qr-code";
import Icon1 from "../../../../img/Food-status-icon/Recieved Order-01.png";
import ReactToPrint, { PrintContextConsumer } from 'react-to-print';
import "./style.css";
import "../../../../font/Google-font.css";
import { Link, withRouter } from "react-router-dom";
import PAGE_PRINT from "./Page-Print-call-2";
import { ALL_ORDER_CALL_RAM } from "../../../API/AIP";

var data1 = "";
var data2 = "";
var id1 = "";
var id2 = "";

var Kitchen = "";

class Order_status_call extends Component {

  constructor(props) {

    super(props);
    this.state = {
      value: "",
      error: null,
      products: [],
      products_detail: [],
      count1: [],
      count2: [],
      GET_DATA_KITCHEN: this.props.details.KITCHEN,
      USER: this.props.details.USER,
      DATA : {
        KITCHEN: this.props.details.KITCHEN,
        USER : this.props.details.USER,
        ID1 : '',
        ID2 : ''
      },
      products_r: [],
      products_detail_r: [],
      ORDER_CALL : {
        QTY: [],
        PRICE: []
      },
      DETAIL_PRINT: [],
      PRODUCT_PRINT : []

    };

    this.componentRef = React.createRef();

    const { GET_DATA_KITCHEN } = this.state;
    const Kitchen_set = new URLSearchParams(GET_DATA_KITCHEN).get("Kitchen");
    const KITCHEN = new URLSearchParams(GET_DATA_KITCHEN).get("Kitchen");

    if (Kitchen_set === "K001") {
      Kitchen = "Islamic Food";
    }

    if (Kitchen_set === "K002") {
      Kitchen = "Dane bury";
    }

    if (Kitchen_set === "K003") {
      Kitchen = "Food House";
    }

  }

  render() {

    const { products, products_detail, count1, USER, products_r, products_detail_r, ORDER_CALL, DETAIL_PRINT, PRODUCT_PRINT } = this.state;

    return (
      <div id="body">
        <div className="Show-title-and-qty-call">

          <div className="Box-icon-call">
            <img src={Icon1} className="Icon-menu-call" />
          </div>

          <div className="Ram-box-text-title-call">
            <div className="Text-title-call">รับออเดอร์</div>
          </div>

          <div className="Box-title-QTY">
            {count1.map((product) => (
              <span className="Text-title-QTY" key={product.QTY1 + "key"}>
                {product.Countdata1}
              </span>
            ))}
            <span className="Text-qty">Orders</span>
          </div>

        </div>

        <div className="tableFixHead">

          <table className="" style={{ backgroundColor: "#FFFFFF", fontSize: "13px" }}>

            <thead>
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
                <th scope="col" style={{ textAlign: "center" }}>
                  จำนวน
                </th>
                <th scope="col" style={{ textAlign: "center", width: "16%" }}>
                  Status
                </th>
              </tr>
            </thead>

            <tbody>

              {products_r.map((product) => (
                  <tr key={product.PirBillCod1 + product.PirBillCod2} id={product.PirSeq}>
                    <td>
                      {(() => {
                        var datastring1 = product.PirBillCod1;
                        var datastring2 = product.PirBillCod2;
                        var n1 = datastring1.length;
                        var n2 = datastring2.length;

                        data1 = product.PirBillCod1;
                        data2 = product.PirBillCod2;

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
                      {product.PirOdrTme} / {product.PirWrdCod} - {product.PirRoomCod} - {product.PirBedCod}
                    </td>

                    <td>
                      {products_detail_r.map((product2) => (
                        <span key={product2.PirSeq} style={{border: '1px', borderColor : 'red'}}>
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

                            if (data2 === product2.PirBillCod2) {
                              return (
                                <b >
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
                      {products_detail_r.map((product2) => (
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
                      {products_detail_r.map((product2) => (
                        <span key={product2.PirSeq}>
                          {(() => {
                            if (data2 === product2.PirBillCod2) {
                              return (
                                <span>
                                  <div className="Box-text">
                                    <div className="text-com-detail" >{product2.FodPrcNum}</div>
                                    <span className="tooltiptext-com">{product2.FodPrcNum}</span>
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
                      {products_detail_r.map((product2) => (
                        <span key={product2.PirSeq}>
                          {(() => {
                            if (data2 === product2.PirBillCod2) {
                              return (
                                <b>
                                  <div className="Box-text">
                                    <div className="text-qty-detail" >{product2.PirOdrQty}</div>
                                    <span className="tooltiptext-qty">{product2.PirOdrQty}</span>
                                  </div>
                                  <br />
                                </b>
                              );
                            }
                          })()}
                        </span>
                      ))}
                    </td>

                    <td style={{ textAlign: "center" }}>
    
                        <b style={{color: '#c7c7c7'}}>Unanswered</b>

                    </td>

                  </tr>
              ))}

              {products.map((product) => (
                <tr key={product.PirBillCod1 + product.PirBillCod2} id={product.PirSeq}>
                  <td>
                    {(() => {
                      var datastring1 = product.PirBillCod1;
                      var datastring2 = product.PirBillCod2;
                      var n1 = datastring1.length;
                      var n2 = datastring2.length;

                      data1 = product.PirBillCod1;
                      data2 = product.PirBillCod2;

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
                  {product.PirOdrDte} {product.PirOdrTme} / {product.PirWrdCod} - {product.PirRoomCod} - {product.PirBedCod}
                  </td>

                  <td>
                    {products_detail.map((product2) => (
                      <span key={product2.PirSeq} style={{border: '1px', borderColor : 'red'}}>
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

                          if (data2 === product2.PirBillCod2) {
                            return (
                              <b >
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
                                  <div className="text-com-detail" >{product2.FodPrcNum}</div>
                                  <span className="tooltiptext-com">{product2.FodPrcNum}</span>
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
                                  <div className="text-qty-detail" >{product2.PirOdrQty}</div>
                                  <span className="tooltiptext-qty">{product2.PirOdrQty}</span>
                                </div>
                                <br />
                              </b>
                            );
                          }
                        })()}
                      </span>
                    ))}
                  </td>

                  <td style={{ textAlign: "center" }}>
     
                    <span>
                      <b>ทั่วไป</b>
                      <br/>

                      <button id="Button-print" className="btn btn-outline-secondary" >
                        <b onClick={this.Update_status_call.bind(this, product.PirBillCod1, product.PirBillCod2)}>รับออเดอร์</b>
                      </button>
                      
                      <span  style={{display: 'none'}}>
                        <ReactToPrint content={() => this.componentRef} >
                          <PrintContextConsumer >
                              {({ handlePrint }) => (
                                <button onClick={handlePrint} id="Button-print" className="btn btn-outline-secondary" >
                                  <b  id={`PRINT_${product.PirBillCod2}`}>รับออเดอร์</b>
                                </button>
                              )}
                          </PrintContextConsumer>
                        </ReactToPrint>
                      </span>

                    </span>
           
                  </td>

                  {/* ------------ */}
                  {/*   BOXPRINT   */}
                  {/* ------------ */}
                  <td  style={{ display: "none" }} >
                    <div ref={el => (this.componentRef = el)} >

                      {PRODUCT_PRINT.map((product2_user) => (
                        <span key={product2_user.PirBillCod1 + product2_user.PirBillCod2+`-PRINT`}>

                          {DETAIL_PRINT.map((product2) => (
                            <div key={product2.PirSeq} >

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

                            

                                  var ORDER_QTY = Number(product2.PirOdrQty);
                                  var ORDER_QTY_FOR = Number(product2.PirOdrQty);

                                  if (ORDER_QTY > 1) {

                                    ORDER_QTY = "1";
                                    var rows = [];

                                    for (var i = 0; i < ORDER_QTY_FOR; ++i) {

                                      rows.push(
                                        <table style={{width: '405px', marginLeft: '20px', marginRight: '20px', border: 'none', background: '#FFFFFF'}} className="print-source">

                                          <thead style={{border: 'none'}}>
                                              <tr style={{border: 'none'}}>
                                                  <td style={{border: 'none'}}>
                                                      <div className="page-header-space" style={{textAlign: 'center', background: '#FFFFFF', border: 'none'}}>
                                                          <table style={{border: 'none'}}>
                                                              <thead style={{textAlign: 'center', background: '#FFFFFF', border: 'none'}}>
                                                                  <tr style={{border: 'none'}}>

                                                                    <td colSpan="3" style={{border: 'none'}}>
                                                                      <div className="header" style={{marginTop : '0', border: 'none'}}>

                                                                        <b style={{ fontSize: "20px", border: 'none' }}>
                                                                          ใบรายการอาหาร  WARD {product2_user.PirWrdCod}
                                                                        </b>
                                                                        <br/>

                                                                        <span style={{ fontSize: "14px", fontWeight: '700' }}>
                                                                          Room : {product2_user.PirWrdCod}-{product2_user.PirRoomCod}-{product2_user.PirBedCod}
                                                                          &nbsp; HN : {product2_user.PirHn}
                                                                        </span>
                                                                        <br/>

                                                                        <span style={{float: 'left', fontSize: "14px"}}>
                                                                          {/* <b> */}
                                                                            NAME : {product2_user.PirUserName}
                                                                            <br />
                                                                            <span style={{float: 'left'}}>
                                                                              FOOD ALLERGIES : -
                                                                            </span>
                                                                          {/* </b> */}
                                                                        </span>

                                                                        <span style={{float: 'right', fontSize: "14px"}}>
                                                                          {/* <b> */}
                                                                            NO.{data1}-{data2}
                                                                            <br/>
                                                                            <span style={{float: 'right'}}>
                                                                            AGE : {product2_user.PirUserAge}
                                                                            </span>
                                                                          {/* </b> */}
                                                                        </span>
                                                                      
                                                                      </div>
                                                                      <br/>
                                                                    </td>
                                                                  </tr>
                                                              </thead>
                                                          </table>
                                                      </div>
                                                  </td>
                                              </tr>
                                          </thead>

                                          <tbody>
                                              <tr>
                                                  <td>
                                                      <div className="page" style={{paddingTop: '30px'}}>
                                                          <table>
                                                              <tr>
                                                                  <td>
                                                                  <span style={{ fontSize: "15px" }}>
                                                                      <b>{product2.FodMnuNamThai}</b>
                                                                  </span>
                                                                  </td>
                                      
                                                                  <td style={{ textAlign: "right", fontSize: "15px" }} >
                                                                  <b>
                                                                      {ORDER_QTY}
                                                                  </b>
                                                                  </td>

                                                              </tr>

                                                              <tr>
                                                                  <td style={{ fontSize: "15px", color: 'black'}}>
                                                                  {product2.PirOdrCmt}
                                                                  </td>
                                                              </tr>
                                          
                                                              <tr style={{ width: '100%'}} >
                                                                  <td colSpan="2" style={{textAlign: 'right'}}>
                                                                  <QRCode
                                                                      value={product2.PirSeq}
                                                                      size={110}
                                                                      className="QR"
                                                                  />
                                                                  </td>
                                                              </tr>
                                                          </table>
                                                      </div>
                                                  </td>
                                              </tr>
                                          </tbody>

                                          <tfoot>
                                              <tr>
                                                  <td>
                                                      <div className="page-footer-space">
                                                          <table >
                                                              <tbody >
                                                                  <tr style={{ verticalAlign: 'bottom'}}>
                                                                      
                                                                      <td style={{ fontSize: "20px", color: "black", }}  colSpan="2">
                                                                      <span style={{ fontSize: "10px", color: "black", fontWeight: '700' }}>
                                                                          เวลาสั่งอาหาร : {product2_user.PirOdrDte} | {product2_user.PirOdrTme}
                                                                          <br />
                                                                          นักโภชนาการ : {USER}
                                                                      </span>
                                                                      </td>

                                                                      <td  style={{ fontSize: "20px",  color: "black",  textAlign: "right"}}>
                                                                      <span style={{fontSize: "10px", color: "black", fontWeight: '700'}}>
                                                                          ครัว : {Kitchen}
                                                                          <br />
                                                                          ประเภท : อาหารตามสั่ง
                                                                      </span>
                                                                      </td>

                                                                  </tr>
                                                              </tbody>
                                                          </table>
                                                      </div>
                                                  </td>
                                              </tr>
                                          </tfoot>
            
                                        </table>
                                      );

                                    }

                                    return <div key={rows.key}>{rows}</div>;

                                  }else{

                                    return(
                                      <table style={{width: '405px', marginLeft: '20px', marginRight: '20px', border: 'none', background: '#FFFFFF'}} className="print-source">

                                        <thead style={{border: 'none'}}>
                                            <tr style={{border: 'none'}}>
                                                <td style={{border: 'none'}}>
                                                    <div className="page-header-space" style={{textAlign: 'center', background: '#FFFFFF', border: 'none'}}>
                                                        <table style={{border: 'none'}}>
                                                            <thead style={{textAlign: 'center', background: '#FFFFFF', border: 'none'}}>
                                                                <tr style={{border: 'none'}}>

                                                                    <td colSpan="3" style={{border: 'none'}}>
                                                                    <div className="header" style={{marginTop : '0', border: 'none'}}>

                                                                        <b style={{ fontSize: "20px", border: 'none' }}>
                                                                          ใบรายการอาหาร  WARD {product2_user.PirWrdCod}
                                                                        </b>
                                                                        <br/>

                                                                        <span style={{ fontSize: "14px", fontWeight: '700' }}>
                                                                          Room : {product2_user.PirWrdCod}-{product2_user.PirRoomCod}-{product2_user.PirBedCod}
                                                                          &nbsp; HN : {product2_user.PirHn}
                                                                        </span>
                                                                        <br/>

                                                                        <span style={{float: 'left', fontSize: "14px"}}>
                                                                          {/* <b> */}
                                                                            NAME : {product2_user.PirUserName}
                                                                            <br />
                                                                            <span style={{float: 'left'}}>
                                                                              FOOD ALLERGIES : -
                                                                            </span>
                                                                          {/* </b> */}
                                                                        </span>

                                                                        <span style={{float: 'right', fontSize: "14px"}}>
                                                                          {/* <b> */}
                                                                            NO.{data1}-{data2}
                                                                            <br/>
                                                                            <span style={{float: 'right'}}>
                                                                            AGE : {product2_user.PirUserAge}
                                                                            </span>
                                                                          {/* </b> */}
                                                                        </span>

                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </thead>
                                                        </table>
                                                    </div>
                                                </td>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            <tr>
                                                <td>
                                                    <div className="page" style={{paddingTop: '30px'}}>
                                                        <table>
                                                            <tr>
                                                                <td>
                                                                <span style={{ fontSize: "15px" }}>
                                                                    <b>{product2.FodMnuNamThai}</b>
                                                                </span>
                                                                </td>
                                    
                                                                <td style={{ textAlign: "right", fontSize: "15px" }} >
                                                                <b>
                                                                    {ORDER_QTY}
                                                                </b>
                                                                </td>

                                                            </tr>

                                                            <tr>
                                                                <td style={{ fontSize: "15px", color: 'black'}}>
                                                                {product2.PirOdrCmt}
                                                                </td>
                                                            </tr>
                                        
                                                            <tr style={{ width: '100%'}} >
                                                                <td colSpan="2" style={{textAlign: 'right'}}>
                                                                <QRCode
                                                                    value={product2.PirSeq}
                                                                    size={110}
                                                                    className="QR"
                                                                />
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>

                                        <tfoot>
                                            <tr>
                                                <td>
                                                    <div className="page-footer-space">
                                                        <table >
                                                            <tbody >
                                                                <tr style={{ verticalAlign: 'bottom'}}>
                                                                    
                                                                    <td style={{ fontSize: "20px", color: "black", }}  colSpan="2">
                                                                    <span style={{ fontSize: "14px", color: "black", fontWeight: '700' }}>
                                                                        เวลาสั่งอาหาร : {product2_user.PirOdrDte} | {product2_user.PirOdrTme}
                                                                        <br />
                                                                        นักโภชนาการ : {USER}
                                                                    </span>
                                                                    </td>

                                                                    <td  style={{ fontSize: "20px",  color: "black",  textAlign: "right"}}>
                                                                    <span style={{fontSize: "14px", color: "black", fontWeight: '700'}}>
                                                                        ครัว : {Kitchen}
                                                                        <br />
                                                                        ประเภท : อาหารตามสั่ง
                                                                    </span>
                                                                    </td>

                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tfoot>
            
                                      </table>
                                    )

                                  }

                            

                              })()}

                            </div>
                          ))}

                          <table  style={{width: '405px', marginLeft: '20px', marginRight: '20px', border: 'none'}}>

                            <thead>
                                <tr>
                                    <td>
                                        <div className="page-header-space-2" style={{textAlign: 'center'}}>
                                          <div className="header" style={{marginTop : '0', border: 'none'}}>

                                            <b style={{ fontSize: "20px", border: 'none' }}>
                                              ใบรายการอาหาร  WARD {product2_user.PirWrdCod}
                                            </b>
                                            <br/>

                                            <span style={{ fontSize: "14px", fontWeight: '700' }}>
                                              Room : {product2_user.PirWrdCod}-{product2_user.PirRoomCod}-{product2_user.PirBedCod}
                                              &nbsp; HN : {product2_user.PirHn}
                                            </span>
                                            <br/>

                                            <span style={{float: 'left', fontSize: "14px"}}>
                                              {/* <b> */}
                                                NAME : {product2_user.PirUserName}
                                                <br />
                                                <span style={{float: 'left'}}>
                                                  FOOD ALLERGIES : -
                                                </span>
                                              {/* </b> */}
                                            </span>

                                            <span style={{float: 'right', fontSize: "14px"}}>
                                              {/* <b> */}
                                                NO.{data1}-{data2}
                                                <br/>
                                                <span style={{float: 'right'}}>
                                                AGE : {product2_user.PirUserAge}
                                                </span>
                                              {/* </b> */}
                                            </span>

                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </thead>

                            <tbody style={{background: '#FFFFFF', border: 'none'}}>
                                <tr style={{border: 'none'}}>
                                    <td style={{border: 'none'}}>
                                        <div className="page-2" style={{border: 'none'}}>
                                            <table >
                                                {DETAIL_PRINT.map((product2) => (
                                                    <tr key={product2.PirSeq} style={{border: 'none'}}>
                                                        <td style={{border: 'none'}}>
                                                        
                                                            <div style={{width: '100%', border: 'none'}} >

                                                            <table style={{border: 'none'}}>
                                                                <thead style={{background: '#FFFFFF'}}>
                                                                <tr >
                                                                    <td style={{width:'360px', border: 'none'}}>
                                                                    <span style={{ fontSize: "13px", color: 'black'}}>
                                                                      <b>{product2.FodMnuNamThai}</b>
                                                                    </span>
                                                                    </td>
                                    
                                                                    <td style={{ fontSize: "13px" }}>
                                                                      <b>{product2.PirOdrQty}</b>
                                                                    </td>
                                    
                                                                    <td style={{ textAlign: "right" }}>
                                                                    <span style={{ fontSize: "13px" }}>
                                                                        <b>{product2.FodPrcNum * product2.PirOdrQty}</b>
                                                                    </span>
                                                                    </td>
                                                                </tr>
                                
                                                                <tr>
                                                                    <td colSpan="3">
                                                                    <p style={{ fontSize: "13px", color: 'black' }}>
                                                                        &nbsp; {product2.PirOdrCmt}
                                                                    </p>
                                                                    </td>
                                                                </tr>
                                                                </thead>
                                                            </table>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}

                                                <tr>
                                                    <td style={{ textAlign: 'right', border: 'none'}} colSpan="3">
                                                        <b style={{ fontSize: "14px", color: 'black' }}>
                                                        รวม &nbsp;
                                                        {/* <span id={"SUM_QTY_TOTAL_CALL" + product2_user.PirBillCod2}>
                                                            --
                                                        </span> */}
                                                        {ORDER_CALL.QTY}
                                                        &nbsp;&nbsp;
                                                        {/* <u id={"SUM_PRICE_CALL" + product2_user.PirBillCod2}>
                                                            --
                                                        </u> */}
                                                        {ORDER_CALL.PRICE}
                                                        </b>
                                                    </td>
                                                </tr>

                                            </table>

                                        </div>
                                    </td>
                                </tr>
                            </tbody>

                            <tfoot>
                                <tr>
                                    <td>
                                        <div className="page-footer-space-2" >
                                            <table >
                                                <tbody >
                                                    <tr style={{ verticalAlign: 'bottom'}}>
                                                        
                                                        <td style={{ fontSize: "20px", color: "black", }}  colSpan="2">
                                                        <span style={{ fontSize: "14px", color: "black", fontWeight: '700' }}>
                                                            เวลาสั่งอาหาร : {product2_user.PirOdrDte} | {product2_user.PirOdrTme}
                                                            <br />
                                                            นักโภชนาการ : {USER}
                                                        </span>
                                                        </td>

                                                        <td  style={{ fontSize: "20px",  color: "black",  textAlign: "right"}}>
                                                        <span style={{fontSize: "14px", color: "black", fontWeight: '700'}}>
                                                            ครัว : {Kitchen}
                                                            <br />
                                                            ประเภท : อาหารตามสั่ง
                                                        </span>
                                                        </td>

                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </td>
                                </tr>
                            </tfoot>
        
                          </table>

                        </span>
                      ))}

                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    );
  }


  Update_status_call(id1, id2) {

    const { GET_DATA_KITCHEN } = this.state;

    console.log("&ID1="+id1+"&ID2="+id2);

    fetch(ALL_ORDER_CALL_RAM.COUNT_ORDER_BY_BILL+GET_DATA_KITCHEN+"&ID1="+id1+"&ID2="+id2).then((res) => res.json()).then((result2) => {

      console.log(result2);

      this.setState({
        ORDER_CALL: {
          QTY : result2[0].SumQTY_C,
          PRICE : result2[0].Amount_C
        }
      });

      setTimeout(() => {
        $(`#PRINT_${id2}`).click();
        $.ajax({
          url: ALL_ORDER_CALL_RAM.UPDATE_STATUS_CALL + "?Bill1=" + id1 +  "&Bill2=" + id2 + "&Kitchen=" + new URLSearchParams(GET_DATA_KITCHEN).get("Kitchen"),
          type: "POST",
          success: function (data) {
            // console.log(data);
          },
        });
      }, 1000);

    });


    fetch(ALL_ORDER_CALL_RAM.ALL_ORDER_CALL_DETAIL + GET_DATA_KITCHEN+"&ID1="+id1+"&ID2="+id2)
    .then((res) => res.json())
    .then(
      (result) => {
        for (var i = 0; i < result.length; ++i) {

          var ORDER_NAME = result[i].FodMnuNamThai;

          result[i].FodMnuNamThai = ORDER_NAME.replace("[IS]", "").replace( "[FH]", "");
        }

        console.log(result);

        this.setState({
          DETAIL_PRINT: result,
        });
      },
      (error) => {
        this.setState({ error });
      }
    );


   


    fetch(ALL_ORDER_CALL_RAM.ALL_ORDER_CALL + GET_DATA_KITCHEN+`&ID1=${id1}&ID2=${id2}`)
    .then((res) => res.json())
    .then(
      (result) => {

        this.setState({
          PRODUCT_PRINT: result,
        });

      },
      (error) => {
        this.setState({ error });
      }
    );

    setTimeout(() => {

      fetch(ALL_ORDER_CALL_RAM.ALL_ORDER_CALL + GET_DATA_KITCHEN)
        .then((res) => res.json())
        .then(
          (result) => {

            this.setState({
              products: result,
            });

          },
          (error) => {
            this.setState({ error });
          }
        );

      fetch(ALL_ORDER_CALL_RAM.COUNT_ORDER_CALL + GET_DATA_KITCHEN)
        .then((res) => res.json())
        .then(
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


        // *** status R *** //

        fetch(ALL_ORDER_CALL_RAM.ALL_ORDER_R + GET_DATA_KITCHEN)
        .then((res) => res.json())
        .then(
          (result) => {
            // console.log(result);
  
            this.setState({
              products_r: result,
            });
          },
          (error) => {
            this.setState({ error });
          }
        );
  
        fetch(ALL_ORDER_CALL_RAM.ALL_ORDER_CALL_DETAIL_R + GET_DATA_KITCHEN)
        .then((res) => res.json())
        .then(
          (result) => {
  
            this.setState({
              products_detail_r : result,
            });
  
          },
          (error) => {
            this.setState({ error });
          }
        );
    }, 100);

  }

  componentDidMount() {

    const { GET_DATA_KITCHEN } = this.state;

    setInterval(() => {

      // *** status R *** //

      fetch(ALL_ORDER_CALL_RAM.ALL_ORDER_R + GET_DATA_KITCHEN)
      .then((res) => res.json())
      .then(
        (result) => {
          // console.log(result);

          this.setState({
            products_r: result,
          });
        },
        (error) => {
          this.setState({ error });
        }
      );

      fetch(ALL_ORDER_CALL_RAM.ALL_ORDER_CALL_DETAIL_R + GET_DATA_KITCHEN)
      .then((res) => res.json())
      .then(
        (result) => {

          this.setState({
            products_detail_r : result,
          });

        },
        (error) => {
          this.setState({ error });
        }
      );


      fetch(ALL_ORDER_CALL_RAM.ALL_ORDER_CALL + GET_DATA_KITCHEN)
      .then((res) => res.json())
      .then(
        (result) => {
          // console.log(result);

          this.setState({
            products: result,
          });
        },
        (error) => {
          this.setState({ error });
        }
      );

      fetch(ALL_ORDER_CALL_RAM.ALL_ORDER_CALL_DETAIL + GET_DATA_KITCHEN)
      .then((res) => res.json())
      .then(
        (result) => {
          for (var i = 0; i < result.length; ++i) {

            var ORDER_NAME = result[i].FodMnuNamThai;

            result[i].FodMnuNamThai = ORDER_NAME.replace("[IS]", "").replace( "[FH]", "");

            // fetch(ALL_ORDER_CALL_RAM.COUNT_ORDER_BY_BILL + GET_DATA_KITCHEN + "&id_bill2=" + result[i].PirBillCod2)
            // .then((res) => res.json())
            // .then((result2) => {

            //   var COUNT_ARRAY = result2.length;
            //   var SUM_QTY = [];
            //   var SUM_PRICE = [];
            //   var DATA_SUM_QTY = "";
            //   var DATA_SUM_PRICE = "";

            //   for (var i = 0; i < result2.length; ++i) {
            //     SUM_QTY.push(result[i]);
            //     DATA_SUM_QTY = SUM_QTY.reduce(
            //       (total, currentValue) =>
            //         (total = total + Number(currentValue.PirOdrQty)),
            //       0
            //     );

            //     SUM_PRICE.push({
            //       TOTAL: result[i].FodPrcNum * result[i].PirOdrQty,
            //     });

            //     DATA_SUM_PRICE = SUM_PRICE.reduce(
            //       (total, currentValue) =>
            //         (total = total + Number(currentValue.TOTAL)),
            //       0
            //     );

            //     $("#SUM_QTY_TOTAL_CALL" + result2[i].PirBillCod2).html(
            //       DATA_SUM_QTY
            //     );
            //     $("#SUM_PRICE_CALL" + result2[i].PirBillCod2).html(
            //       DATA_SUM_PRICE
            //     );
            //   }

            // });
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

      fetch(ALL_ORDER_CALL_RAM.COUNT_ORDER_CALL + GET_DATA_KITCHEN)
      .then((res) => res.json())
      .then(
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
}

export default withRouter(Order_status_call);