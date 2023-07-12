import React, { Component } from "react";
import { ALL_ORDER_CALL_RAM } from "../../../API/AIP";
import ReactToPrint, { PrintContextConsumer } from 'react-to-print';
import $ from 'jquery';
import QRCode from "react-qr-code";
import "./style.css";

var Kitchen = "";
var data1 = "";
var data2 = "";

export default class PrintCall extends Component {

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
        };
        this.componentRef = React.createRef();
  
        const { GET_DATA_KITCHEN } = this.state;
        const Kitchen_set = new URLSearchParams(GET_DATA_KITCHEN).get("Kitchen");
    
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
        const { products_detail, products, USER } = this.state;

        return (
          <div style={{background: '#FFFFFF'}}>

            <ReactToPrint content={() => this.componentRef} >
                <PrintContextConsumer>
                    {({ handlePrint }) => (
                        <button onClick={handlePrint} id="Button-print">Print this out!</button>
                    )}
                </PrintContextConsumer>
            </ReactToPrint>

            <button onClick={this.Print_click} id="Button-print">Print click</button>

            <div>
              {products.map((product) => (
                <span key={product.PirBillCod2} ref={el => (this.componentRef = el)}>

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

                  })()}

                  {products_detail.map((product2) => (
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

                          var ORDER_QTY = Number(product2.PirOdrQty);
                          var ORDER_QTY_FOR = Number(product2.PirOdrQty);

                          if (ORDER_QTY > 1) {

                            ORDER_QTY = "1";
                            var rows = [];

                            for (var i = 0; i < ORDER_QTY_FOR; ++i) {

                              // console.log(i)

                              rows.push(
                                <table>
                                  {/*  */}

                                  {/* <thead >
                                    <tr >
                                      <td colSpan="2">
                                        <div className="header" style={{marginTop : '0'}}>
                                          <b style={{ fontSize: "25px",  }}>
                                            WARD {product.PirWrdCod}
                                          </b>
                                          <br/>
            
                                          <span style={{ fontSize: "15px", fontWeight: '700' }}>
                                            Room : {product.PirWrdCod}-{product.PirRoomCod}-{product.PirBedCod}{" "}
                                            &nbsp; HN : {product.PirHn}
                                          </span>
                                          <br/>
            
                                          <span style={{ fontSize: "15px", fontWeight: '700' }}>
                                            NAME : {product.PirUserName} &nbsp; AGE : {product.PirUserAge}
                                            <br />
                                            FOOD ALLERGIES : -
                                          </span>
                                          <hr />
                                        </div>
                                      </td>
                                    </tr>
                                  </thead> */}
            
                                  {/* <tbody>
                                    <tr>
                                      <td>
                                        <span style={{ fontSize: "20px" }}>
                                          <b>{product2.FodMnuNamThai}</b>
                                        </span>
                                      </td>
            
                                      <td style={{ textAlign: "right", fontSize: "20px"  }} >
                                        <b>
                                          {ORDER_QTY}
                                        </b>
                                      </td>
                                    </tr>
            
                                    <tr>
                                      <td >
                                        <p style={{ fontSize: "15px", color: 'black'}}>
                                          <u>Comment</u> &nbsp;{" "}
                                          {product2.PirOdrCmt}
                                        </p>
                                      </td>
                                    </tr>
            
                                    <tr style={{ width: '100%'}} >
                                      <td colSpan="2" style={{textAlign: 'right'}}>
                                        <QRCode
                                          value={product2.PirSeq}
                                          size={150}
                                          className="QR"
                                        />
                                      </td>
                                    </tr>
                                  </tbody> */}
            
                                  {/* <tfoot >
                                    <tr>
            
                                      <td style={{ fontSize: "15px", color: "black" }}  colSpan="">
                                        <span style={{ fontSize: "10px", color: "black", fontWeight: '700' }}>
                                          เวลาสั่งอาหาร : {product.PirOdrDte} | {product.PirOdrTme}
                                          <br />
                                          นักโภชนาการ : {USER}
                                        </span>
                                      </td>
            
                                      <td  style={{ fontSize: "15px", float : 'right', color: "black", fontWeight: '700' }}>
                                        <span style={{fontSize: "10px", color: "black"}}>
                                          ครัว : {Kitchen}
                                          <br />
                                          ประเภท : อาหารตามสั่ง
                                        </span>
                                      </td>
            
                                    </tr>
                                  </tfoot> */}

                                </table>
                              );

                            }

                            return <div key={rows.key}>{rows}</div>;

                          }else{
                            return(
                              <table style={{width: '405px', marginLeft: '20px', marginRight: '20px'}} className="print-source">

                                <thead style={{border: 'none'}}>
                                  <tr>
                                    <td>
                                      <div className="header-space"> </div>
                                    </td>
                                  </tr>
                                </thead>

                                <tbody className="content">
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
                                      <u>Comment</u> {product2.PirOdrCmt}
                                    </td>
                                  </tr>
            
                                  <tr style={{ width: '100%'}} >
                                    <td colSpan="2" style={{textAlign: 'right'}}>
                                      <QRCode
                                        value={product2.PirSeq}
                                        size={200}
                                        className="QR"
                                      />
                                    </td>
                                  </tr>
                                </tbody>

                                {/* <tfoot>
                                  <tr>
                                    <td>
                                      <div className="footer-space"> </div>
                                    </td>
                                  </tr>
                                </tfoot> */}
    
                              </table>
                            )
                          }

                        }

                      })()}

                    <div className="header">
                      <table className="print-source" >
  
                        <thead >
                          <tr >
                            <td colSpan="3" style={{border: 'none'}}>
                              <div className="header" style={{marginTop : '0'}}>
                                <b style={{ fontSize: "30px",  }}>
                                  WARD {product.PirWrdCod}
                                </b>
                                <br/>

                                <span style={{ fontSize: "15px", fontWeight: '700' }}>
                                  Room : {product.PirWrdCod}-{product.PirRoomCod}-{product.PirBedCod}{" "}
                                  &nbsp; HN : {product.PirHn}
                                </span>
                                <br/>

                                <span style={{ fontSize: "15px", fontWeight: '700' }}>
                                  NAME : {product.PirUserName} &nbsp; AGE : {product.PirUserAge}
                                  <br />
                                  FOOD ALLERGIES : -
                                </span>
                                <br />
                                
                              </div>
                            </td>
                          </tr>
                        </thead>

                      </table>
                    </div>

                    <div className="footer" style={{marginLeft: '20px', marginRight: '25px',}}>
                      <table >
    
                        <tbody >
                          <tr style={{ verticalAlign: 'bottom'}}>
                            
                            <td style={{ fontSize: "20px", color: "black", }}  colSpan="2">
                              <span style={{ fontSize: "10px", color: "black", fontWeight: '700' }}>
                                เวลาสั่งอาหาร : {product.PirOdrDte} | {product.PirOdrTme}
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

                    </div>
                  ))}

                  <div >
                    <table style={{ marginLeft: '20px', marginRight: '20px', width: '410px',  }} className="print-source">

                    <thead>
                        <tr>
                          <td>
                            <div className="header-space">&nbsp; </div>
                          </td>
                        </tr>
                      </thead>
                      
                      <tbody style={{width: '500px', background: '#FFFFFF'}} >
                        {products_detail.map((product2) => (
                          <tr key={product2.PirSeq}>
                            <td >
                              {data2 === product2.PirBillCod2 ? (
                                <div style={{width: '100%', background: 'red'}} >

                                  <table >
                                    <thead>
                                      <tr >
                                        <td style={{width:'360px'}}>
                                          <span style={{ fontSize: "13px", color: 'black'}}>
                                            {product2.FodMnuNamThai}
                                          </span>
                                        </td>
        
                                        <td style={{ fontSize: "13px" }}>
                                          {product2.PirOdrQty}
                                        </td>
        
                                        <td style={{ textAlign: "right" }}>
                                          <span style={{ fontSize: "13px" }}>
                                            {product2.FodPrcNum * product2.PirOdrQty}
                                          </span>
                                        </td>
                                      </tr>
    
                                      <tr>
                                        <td colSpan="3">
                                          <p style={{ fontSize: "13px", color: 'black' }}>
                                            <u>Comment</u> &nbsp; {product2.PirOdrCmt}
                                          </p>
                                        </td>
                                      </tr>
                                    </thead>
                                  </table>
                                </div>
                              ) : null}
                            </td>
                          </tr>
              
                        ))}

                        <tr>
                          <td style={{ textAlign: 'right'}} colSpan="3">
                            <b style={{ fontSize: "15px", color: 'black' }}>
                              รวม &nbsp;
                              <span id={"SUM_QTY_TOTAL_CALL" + product.PirBillCod2}>
                                --
                              </span>
                              &nbsp;&nbsp;
                              <u id={"SUM_PRICE_CALL" + product.PirBillCod2}>
                                --
                              </u>
                            </b>
                          </td>
                        </tr>
                      </tbody>
  
                    </table>


                  </div>

                </span>
              ))}


            </div>

          </div>
        )
        
    }

    componentDidMount(){

        const { GET_DATA_KITCHEN } = this.state;

        // $('#Button-print').click();

        fetch(ALL_ORDER_CALL_RAM.ALL_ORDER_CALL + GET_DATA_KITCHEN).then((res) => res.json()).then(
            (result) => {

                // console.log(result)

                this.setState({
                    products: result,
                });

            },
            (error) => {
                this.setState({ error });
            }
        );

        fetch(ALL_ORDER_CALL_RAM.ALL_ORDER_CALL_DETAIL + GET_DATA_KITCHEN)
        .then((res) => res.json()).then(
            (result) => {
                for (var i = 0; i < result.length; ++i) {

                  var ORDER_NAME = result[i].FodMnuNamThai;
                  result[i].FodMnuNamThai = ORDER_NAME.replace("[IS]", "").replace("[FH]", "");
    
                  fetch(
                    ALL_ORDER_CALL_RAM.COUNT_ORDER_BY_BILL +
                      GET_DATA_KITCHEN +
                      "&id_bill2=" +
                      result[i].PirBillCod2
                  )
                    .then((res) => res.json())
                    .then((result2) => {
                      var COUNT_ARRAY = result2.length;
                      var SUM_QTY = [];
                      var SUM_PRICE = [];
                      var DATA_SUM_QTY = "";
                      var DATA_SUM_PRICE = "";
    
                      for (var i = 0; i < result2.length; ++i) {
                        SUM_QTY.push(result[i]);
                        DATA_SUM_QTY = SUM_QTY.reduce(
                          (total, currentValue) =>
                            (total = total + Number(currentValue.PirOdrQty)),
                          0
                        );
    
                        SUM_PRICE.push({
                          TOTAL: result[i].FodPrcNum * result[i].PirOdrQty,
                        });

                        DATA_SUM_PRICE = SUM_PRICE.reduce(
                          (total, currentValue) =>
                            (total = total + Number(currentValue.TOTAL)),
                          0
                        );
    
                        $("#SUM_QTY_TOTAL_CALL" + result2[i].PirBillCod2).html(
                          DATA_SUM_QTY
                        );
                        $("#SUM_PRICE_CALL" + result2[i].PirBillCod2).html(
                          DATA_SUM_PRICE
                        );
                      }
                    });
                }
                console.log(result)
  
                this.setState({
                    products_detail: result
                });

            }, (error) => {

                this.setState({ error });

            }
        );

    }

}
