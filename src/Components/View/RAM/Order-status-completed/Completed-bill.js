import React, { Component } from "react";
import $ from "jquery";
import Icon3 from "../../../../img/Food-status-icon/Serving-01-01.png";
import ReactToPrint, { PrintContextConsumer } from 'react-to-print';
import { ALL_ORDER_COMPLETED_RAM } from "../../../API/AIP";
import Icon_check from "../../../../img/Icon-check.png";
import RamIcon from "../../../../img/รพ รามโลโก้@3x@3x.jpg";


var data1 = "";
var data2 = "";
var KITCHEN_NAME = "";

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
      products_detail,
      data_bill_total,
      data_bill_cash,
      USER,
    } = this.state;
    return (
      <div>
        {products.map((product) => (
            <table ref={el => (this.componentRef = el)} id={`TOTAL-Com${product.PirBillCod1}${product.PirBillCod2}`} style={{width: '405px', background: 'red'}} >

              <thead style={{ background: 'green', width: '100%'}}>
                  <tr>
                      <td className="page-header-space" >
                          <div className="page-header-space" >
                            -
                          </div>
                      </td>
                  </tr>
              </thead>

              <tbody style={{ background : '#FFFFFF' }}>
                  <tr>
                      <td>
                          <div className="page" >
                            -
                          </div>
                      </td>
                  </tr>
              </tbody>

              <tfoot style={{ background : 'green' }}>
                  <tr>
                      <td>
                          <div className="page-footer-space" >
                            -
                          </div>
                      </td>
                  </tr>
              </tfoot>

            </table>
          ))}

      </div>
    );
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


  componentDidMount() {
    const { GET_DATA_KITCHEN } = this.state;

    setInterval(() => {

      fetch(ALL_ORDER_COMPLETED_RAM.ALL_ORDER_COMPLETED + GET_DATA_KITCHEN)
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

      fetch(ALL_ORDER_COMPLETED_RAM.ALL_ORDER_COMPLETED_DETAIL + GET_DATA_KITCHEN)
      .then((res) => res.json())
      .then(
        (result) => {

          var total = [];
          var cash = [];

          for (var i = 0; i < result.length; ++i) {
            var ORDER_NAME = result[i].FodMnuNamThai;
            result[i].FodMnuNamThai = ORDER_NAME.replace("[IS]", "").replace(
              "[FH]",
              ""
            );

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

                  var Sum_price = "";
                  var Sum_price_c = "";
                  var sum_t = [];
                  var sum_c = [];

                  var Fully = 0;
                  var Not_complete = 0;

                  for (var i = 0; i < result2.length; ++i) {

                    if (count_array === this.status.F) {
                      // console.log("ครบ");
      
                      if(result2[i].PirScanCheck != result2[i].PirOdrQty){
                        Not_complete += 1;
                      }else{
                        Fully += 1;
                      }

                      if(Fully === count_array){
                        // console.log("ครบ")
                        $("#Buttom_con" + result2[i].PirBillCod2).css("display", "block");
                      }

                      if (result[i].PirPrcTyp === "T") {
                        sum_t.push(result[i]);

                        Sum_price = result[i].FodPrcNum * result[i].PirOdrQty;

                        $("#SUM_QTY_TOTAL" + result2[i].PirBillCod2).html(
                          this.type.T
                        );
                        $("#SUM_PRICE_TOTAL" + result2[i].PirBillCod2).html(
                          Sum_price
                        );
                      }

                      if (result[i].PirPrcTyp === "C") {
                        sum_c.push(result[i]);

                        Sum_price_c = result[i].FodPrcNum * result[i].PirOdrQty;

                        $("#SUM_QTY_CASH" + result2[i].PirBillCod2).html(
                          this.type.C
                        );
                        $("#SUM_PRICE_CASH" + result2[i].PirBillCod2).html(
                          Sum_price_c
                        );
                        // console.log(result[i]);
                      }
                    } else {
                      // console.log("ไม่ครบ");
                    }
                  }
                },
                (error) => {
                  this.setState({ error });
                }
              );

            if (result[i].PirPrcTyp === "C") {
              // console.log(result[i].PirPrcTyp);

              cash.push(result[i]);

              // console.log("-------- CASH -------");
              // console.log(cash);

              $("#CASH" + result[i].PirBillCod1 + result[i].PirBillCod2).css(
                "display",
                "block"
              );

              this.setState({
                data_bill_cash: cash,
              });
            }

            if (result[i].PirPrcTyp === "T") {
              // console.log(result[i].PirPrcTyp);

              total.push(result[i]);

              // console.log("-------- TOTAL -------");
              // console.log(total);

              $("#TOTAL" + result[i].PirBillCod1 + result[i].PirBillCod2).css(
                "display",
                "block"
              );

              this.setState({
                data_bill_total: total,
              });
            }
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

      fetch(ALL_ORDER_COMPLETED_RAM.COUNT_ORDER_COMPLETED + GET_DATA_KITCHEN)
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
