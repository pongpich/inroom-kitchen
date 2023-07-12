import React, { Component } from "react";
import $, { event } from "jquery";
import ReactToPrint, { PrintContextConsumer } from "react-to-print";
import axios from "axios";
import { REPORT_RAM, REPORT_RAM_TYPE } from "../../../API/AIP";
import Icon5 from "../../../../img/Food-status-icon/Group 205@3x.png";
import { Settime } from "./Time-Select";
import { formatDate } from "./Format-date";
import DateRangePicker from "rsuite/DateRangePicker";
import "rsuite/dist/rsuite.min.css";
import "./style.css";
// import "./report.module.scss";


var data1 = "";
var data2 = "";
var KITCHEN_NAME = "";
var today = new Date();
var REPORT_SET = "";


export default class Re_port extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datareport: "A",
      products: [],
      products_detail: [],
      Amount: [],
      products_detail_print: [],
      products_print: [],
      Amount_print: [],
      GET_DATA_KITCHEN: this.props.details.KITCHEN,
      USER: this.props.details.USER,
      DATE:
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate(),
      DATA_DATE_START: [],
      DATA_DATE_END: [],
      TO_DAY: formatDate(new Date()),
      TIME_START: "",
      TIME_END: "",
      TIME_NAME: "ทุกมื้อ",
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

  handleDropdownTime = (e) => {
    let NewsetTime = Settime(e);
    let TimeStart = NewsetTime[0].timestart;
    let TimeEnd = NewsetTime[0].timeend;

    let timeText = NewsetTime[0].timetext;
    let timeName = NewsetTime[0].timename;
    let TimeHeader = timeText + "  " + timeName;

    this.GET_DATA_BY_VALUE("", "", "", TimeStart, TimeEnd);

    this.setState({ TIME_NAME: TimeHeader });
  };

  handleDropdownChange = async (e) => {
    await this.setState({ datareport: e.target.value });
    const datavalue = e.target.value;
    if (datavalue === "A") {
      this.GET_DATA_BY_VALUE("");
    } else if (datavalue === "T") {
      this.GET_DATA_BY_VALUE("T");
    } else if (datavalue === "C") {
      this.GET_DATA_BY_VALUE("C");
    }
  };
  render() {
    const {
      reportorder,
      products,
      products_detail,
      Amount,
      USER,
      DATE,
      products_print,
      products_detail_print,
      Amount_print,
    } = this.state;


  

    return (
      <div>
        <div className="Show-title-and-qty-report">
          <div className="Box-icon-report">
            <img src={Icon5} className="Icon-menu-report" />
          </div>
          <div className="Box-text-title-report">
            <div className="Text-title-report">Summary report </div>
          </div>
          <div className="Box-text-title-report">
            <div className="Date-title-report">
              <DateRangePicker
                defaultValue={[new Date(), new Date()]}
                onChange={(value) => this.GET_REPORT_BY_DATE(value)}
                format="dd-MM-yyyy"
                id="date"
                style={{ color: "#292d33" }}
              />
            </div>

            <div className="Date-title-report">
              <div>
                <select
                  className="form-control"
                  id="dropdowntype"
                  onChange={(e) => {
                    this.handleDropdownChange(e);
                  }}
                  value={this.state.datareport}
                >
                  <option value="A">Report All</option>
                  <option value="T">Report total</option>
                  <option value="C">Print report cash</option>
                </select>
              </div>
            </div>
            <div className="Date-title-report">
              <div>
                <select
                  className="form-control"
                  id="dropdownTime"
                  onClick={(e) => this.handleDropdownTime(e.target.value)}
                >
                  <option value="alltime">ทุกช่วงเวลา</option>
                  <option value="morning">เช้า</option>
                  <option value="lunch">กลางวัน</option>
                  <option value="dinner">เย็น</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div style={{ marginTop: "5px" }}>
          <table
            className="table table-hover"
            style={{ backgroundColor: "#FFFFFF", fontSize: "13px" }}
          >
            <thead>
              <tr>
                <th scope="col" width="15%">
                  Datedd
                </th>
                <th scope="col" width="10%">
                  Order No.
                </th>
                <th scope="col" width="10%">
                  Room
                </th>
                <th scope="col" width="">
                  HN
                </th>
                <th scope="col" width="20%">
                  รายการอาหาร
                </th>
                <th scope="col" style={{ textAlign: "center" }}>
                  QTY
                </th>
                <th scope="col" style={{ textAlign: "center" }}>
                  Pirce
                </th>
                <th scope="col" style={{ textAlign: "center" }}>
                  Amount
                </th>
                <th scope="col" colSpan="1" style={{ textAlign: "center" }}>
                  Comment
                </th>
              </tr>
            </thead>
            {reportorder}
            {/* Show All report */}
            <tbody>
              {products.map((product2, key) => (
                <tr key={key} id={product2.PirSeq}>
                  <td>
                    {product2.PirOdrDte} {product2.PirOdrTme}
                  </td>
                  <td>
                    {(() => {
                      var datastring1 = product2.PirBillCod1;
                      var datastring2 = product2.PirBillCod2;
                      var n1 = datastring1.length;
                      var n2 = datastring2.length;

                      if (n1 === 1) {
                        data1 = "00" + product2.PirBillCod1;
                      }

                      if (n1 === 2) {
                        data1 = "0" + product2.PirBillCod1;
                      }

                      if (n1 === 3) {
                        data1 = product2.PirBillCod1;
                      }

                      if (n2 === 1) {
                        data2 = "00000" + product2.PirBillCod2;
                      }

                      if (n2 === 2) {
                        data2 = "0000" + product2.PirBillCod2;
                      }

                      if (n2 === 3) {
                        data2 = "000" + product2.PirBillCod2;
                      }

                      if (n2 === 4) {
                        data2 = "00" + product2.PirBillCod2;
                      }

                      if (n2 === 5) {
                        data2 = "0" + product2.PirBillCod2;
                      }

                      if (n2 === 6) {
                        data2 = product2.PirBillCod2;
                      }

                      return (
                        <span>
                          {data1}-{data2}
                        </span>
                      );
                    })()}
                  </td>
                  <td>
                    {product2.PirWrdCod}-{product2.PirRoomCod}-
                    {product2.PirBedCod}
                  </td>
                  <td>{product2.PirHn}</td>
                  <td>
                    {products_detail_print.map((product2) => (
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
                              <b>
                                {product2.FodMnuNamThai}
                                <br />
                              </b>
                            );
                          }
                        })()}
                      </span>
                    ))}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {products_detail_print.map((product2) => (
                      <span key={product2.PirSeq}>
                        {(() => {
                          if (data2 === product2.PirBillCod2) {
                            return (
                              <span>
                                {product2.PirOdrQty}
                                <br />
                              </span>
                            );
                          }
                        })()}
                      </span>
                    ))}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {products_detail_print.map((product2) => (
                      <span key={product2.PirSeq}>
                        {(() => {
                          if (data2 === product2.PirBillCod2) {
                            return (
                              <b>
                                {product2.FodPrcNum}
                                <br />
                              </b>
                            );
                          }
                        })()}
                      </span>
                    ))}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {products_detail_print.map((product2) => (
                      <span key={product2.PirSeq}>
                        {(() => {
                          if (data2 === product2.PirBillCod2) {
                            return (
                              <b>
                                {product2.FodPrcNum * product2.PirOdrQty}
                                <br />
                              </b>
                            );
                          }
                        })()}
                      </span>
                    ))}
                  </td>
                  <td>
                    {products_detail_print.map((product2) => (
                      <span key={product2.PirSeq}>
                        {(() => {
                          if (product2.PirOdrCmt === "Default") {
                            product2.PirOdrCmt = "-";
                          }

                          if (data2 === product2.PirBillCod2) {
                            return (
                              <b>
                                {product2.PirOdrCmt}
                                <br />
                              </b>
                            );
                          }
                        })()}
                      </span>
                    ))}
                  </td>
                </tr>
              ))}
              {Amount_print.map((product2) => (
                <tr key={product2.Amount}>
                  <td colSpan="4" style={{ textAlign: "center" }}>
                    <b>Total Amount</b>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <b>{product2.SumQTY}</b>
                  </td>
                  <td></td>
                  <td style={{ textAlign: "center" }}>
                    <b>{product2.Amount}</b>
                  </td>
                  <td></td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* ---------------- */}
        {/* PRINT            */}
        {/* ---------------- */}
        <div style={{ display: "none" }} >
        <style>{pageStyle}</style>
          <div ref={(el) => (this.componentRef = el)} className="report">
            <div
              className="page-header page-header-space text-right report"
              style={{ color: "#6c757d", fontSize: "8pt" }}
            >
              <b>Kitchen</b> : {KITCHEN_NAME} <br />
              <b>นักโภชนาการ</b> : {USER}
              <br />
            </div>
            <table className="table-bordered bg-white " style={{ fontSize: "12px" }} >
              <thead className="bg-white ">
                <tr className="header">
                  <th colSpan="12">
                    <h6>
                      <div
                        className={`${
                          this.state.datareport === "A" ? "" : "d-none"
                        } text-center`}
                      >
                        สรุปรายกddารอาหาร <span className="DateKitchen"></span>
                      </div>
                      <div
                        className={`${
                          this.state.datareport === "T" ? "" : "d-none"
                        } text-center`}
                      >
                        สรุปรายการอาหารคนไข้{" "}
                        <span className="DateKitchen"></span>
                      </div>
                      <div
                        className={`${
                          this.state.datareport === "C" ? "" : "d-none"
                        } text-center`}
                      >
                        สรุปรายการอาหารญาติ{" "}
                        <span className="DateKitchen"></span>
                      </div>
                      <br />
                    </h6>
                  </th>
                </tr>
                <tr>
                  <th width="10%" colSpan="1" style={{ textAlign: "center" }}>
                    Date
                  </th>
                  <th width="10%" colSpan="1" style={{ textAlign: "center" }}>
                    Order No.
                  </th>
                  <th width="10%" colSpan="1" style={{ textAlign: "center" }}>
                    Room
                  </th>
                  <th width="6%" colSpan="1" style={{ textAlign: "center" }}>
                    HN
                  </th>
                  <th width="21%" colSpan="2" style={{ textAlign: "center" }}>
                    รายการอาหาร
                  </th>
                  <th width="5%" colSpan="1" style={{ textAlign: "center" }}>
                    QTY
                  </th>
                  <th width="5%" colSpan="1" style={{ textAlign: "center" }}>
                    Pirce
                  </th>
                  <th width="5%" colSpan="1" style={{ textAlign: "center" }}>
                    Amount
                  </th>
                  <th width="23%" colSpan="2" style={{ textAlign: "center" }}>
                    Comment
                  </th>
                  <th width="5%" colSpan="1" style={{ textAlign: "center" }}>
                    Total bill
                  </th>
                </tr>
              </thead>

              <tbody className="page-detail">
                {products_detail_print.map((product2) => (
                  <tr key={product2.PirSeq}>
                    <td
                      id={
                        product2.PirBillCod1 +
                        product2.PirBillCod2 +
                        "DATE-BILL-TOTAL"
                      }
                      ref={this.GET_DATE.bind(
                        this,
                        product2.PirBillCod1,
                        product2.PirBillCod2,
                        product2.PirOdrDte,
                        product2.PirOdrTme,
                        "TOTAL"
                      )}
                    ></td>
                    <td
                      className={product2.PirBillCod1 + product2.PirBillCod2}
                      id={
                        product2.PirBillCod1 +
                        product2.PirBillCod2 +
                        "ID-BILL-TOTAL"
                      }
                      ref={this.GET_ID.bind(
                        this,
                        product2.PirBillCod1,
                        product2.PirBillCod2,
                        "TOTAL"
                      )}
                    ></td>
                    <td>
                      {product2.PirWrdCod}-{product2.PirRoomCod}-
                      {product2.PirBedCod}
                    </td>

                    <td>{product2.PirHn}</td>

                    <td colSpan="2">{product2.FodMnuNamThai}</td>
                    <td style={{ textAlign: "center" }}>
                      {product2.PirOdrQty}
                      <br />
                    </td>

                    <td style={{ textAlign: "center" }}>
                      {product2.FodPrcNum}
                      <br />
                    </td>

                    <td style={{ textAlign: "center" }}>
                      {product2.FodPrcNum * product2.PirOdrQty}
                      <br />
                    </td>

                    <td colSpan="2">
                      {product2.PirOdrCmt}
                      <br />
                    </td>

                    <td
                      style={{ textAlign: "center" }}
                      ref={this.GET_AM.bind(
                        this,
                        product2.PirBillCod1,
                        product2.PirBillCod2,
                        product2.Amount,
                        "TOTAL"
                      )}
                    >
                      <b
                        id={
                          product2.PirBillCod1 +
                          product2.PirBillCod2 +
                          "BILL-TOTAL"
                        }
                      ></b>
                    </td>
                  </tr>
                ))}

                {Amount_print.map((product2) => (
                  <tr key={product2.Amount}>
                    <td colSpan="1"></td>
                    <td colSpan="8" style={{ textAlign: "center" }}>
                      <b>Total Amount</b>
                    </td>
                    <td colSpan="2" style={{ textAlign: "center" }}>
                      <b>{product2.SumQTY}</b>
                    </td>

                    <td colSpan="1" style={{ textAlign: "center" }}>
                      <b>{product2.Amount}</b>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div
              className="page-footer page-footer-space"
              style={{ fontSize: "8pt" }}
            >
              <b>เวลา</b> : {this.state.TIME_NAME}
            </div>
          </div>
        </div>

        <div style={{ textAlign: "center" }}>
          <ReactToPrint content={() => this.componentRef}>
            <PrintContextConsumer>
              {({ handlePrint }) => (
                <div>
                  <button
                    onClick={handlePrint}
                    id="PRINT-CASH"
                    className="btn btn-outline-secondary"
                  >
                    <div
                      className={`${
                        this.state.datareport === "A" ? "" : "d-none"
                      } text-center`}
                    >
                      {" "}
                      <b>Print report All</b>{" "}
                      <span className="DateKitchen"></span>
                    </div>
                    <div
                      className={`${
                        this.state.datareport === "T" ? "" : "d-none"
                      } text-center`}
                    >
                      {" "}
                      <b>Print report total</b>{" "}
                      <span className="DateKitchen"></span>
                    </div>
                    <div
                      className={`${
                        this.state.datareport === "C" ? "" : "d-none"
                      } text-center`}
                    >
                      {" "}
                      <b>Print report cash </b>
                      <span className="DateKitchen"></span>
                    </div>
                  </button>
                </div>
              )}
            </PrintContextConsumer>
          </ReactToPrint>
        </div>
      </div>
    );
  }

  GET_ID(id1, id2, TYPE) {
    var datastring1 = id1;
    var datastring2 = id2;
    var n1 = datastring1.length;
    var n2 = datastring2.length;

    if (TYPE === "CASH") {
      $("#" + id1 + id2 + "ID-BILL-CASH").html(id1 + "-" + id2);
    }

    if (TYPE === "TOTAL") {
      $("#" + id1 + id2 + "ID-BILL-TOTAL").html(id1 + "-" + id2);
    }

    if (TYPE === "ALL") {
      $("#" + id1 + id2 + "ID-BILL-ALL").html(id1 + "-" + id2);
    }
  }

  GET_DATE(id1, id2, date, time, TYPE) {
    var a = [
      date.slice(6, 8),
      "/",
      date.slice(4, 6),
      "/",
      date.slice(0, 4),
    ].join("");
    var b = [time.slice(0, 2)];
    var c = [time.slice(2, 4)];

    if (TYPE === "CASH") {
      $("#" + id1 + id2 + "DATE-BILL-CASH").html(a + "  " + b + ":" + c);
    }

    if (TYPE === "TOTAL") {
      $("#" + id1 + id2 + "DATE-BILL-TOTAL").html(a + "  " + b + ":" + c);
    }

    if (TYPE === "ALL") {
      $("#" + id1 + id2 + "DATE-BILL-ALL").html(a + "  " + b + ":" + c);
    }
  }

  GET_AM(id1, id2, am, TYPE) {
    if (TYPE === "CASH") {
      $("#" + id1 + id2 + "BILL-CASH").html(am);
    }

    if (TYPE === "TOTAL") {
      $("#" + id1 + id2 + "BILL-TOTAL").html(am);
    }

    if (TYPE === "ALL") {
      $("#" + id1 + id2 + "BILL-ALL").html(am);
    }
  }

  PRINT(type) {
    this.GET_DATA_BY_VALUE(type);
    setTimeout(() => {
      $("#PRINT-CASH").click();
    }, 1000);
  }

  BILL_ALL_BY_DATE() {
    let { GET_DATA_KITCHEN, DATA_DATE_START, DATA_DATE_END } = this.state;

    if (DATA_DATE_START.length != "" || DATA_DATE_END.length != "") {
      fetch(
        REPORT_RAM.ALL_REPORT +
          GET_DATA_KITCHEN +
          "&Report_start=" +
          DATA_DATE_START +
          "&Report_end=" +
          DATA_DATE_END
      )
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

      fetch(
        REPORT_RAM.REPORT_DETAIL +
          GET_DATA_KITCHEN +
          "&Report_start=" +
          DATA_DATE_START +
          "&Report_end=" +
          DATA_DATE_END
      )
        .then((res) => res.json())
        .then(
          (result) => {
            // console.log(result);

            this.setState({
              products_detail: result,
            });
          },
          (error) => {
            this.setState({ error });
          }
        );

      fetch(
        REPORT_RAM.AMOUNT +
          GET_DATA_KITCHEN +
          "&Report_start=" +
          DATA_DATE_START +
          "&Report_end=" +
          DATA_DATE_END
      )
        .then((res) => res.json())
        .then(
          (result) => {
            // console.log(result);

            this.setState({
              Amount: result,
            });
          },
          (error) => {
            this.setState({ error });
          }
        );
    } else {
      fetch(REPORT_RAM.ALL_REPORT + GET_DATA_KITCHEN)
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

      fetch(REPORT_RAM.REPORT_DETAIL + GET_DATA_KITCHEN)
        .then((res) => res.json())
        .then(
          (result) => {
            this.setState({
              products_detail: result,
            });
          },
          (error) => {
            this.setState({ error });
          }
        );

      fetch(REPORT_RAM.AMOUNT + GET_DATA_KITCHEN)
        .then((res) => res.json())
        .then(
          (result) => {
            this.setState({
              Amount: result,
            });
          },
          (error) => {
            this.setState({ error });
          }
        );
    }
  }

  GET_REPORT_BY_DATE(value) {
    REPORT_SET = "true";
    function convert(str) {
      var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      return [date.getFullYear(), mnth, day].join("-");
    }

    const DATE_START = convert(value[0]);
    const DATE_END = convert(value[1]);
    const DATE_SET_START = DATE_START.replace(/^\s+|-|-\s+$/gm, "");
    const DATE_SET_END = DATE_END.replace(/^\s+|-|-\s+$/gm, "");

    this.setState({
      DATA_DATE_START: DATE_SET_START,
      DATA_DATE_END: DATE_SET_END,
    });

    setTimeout(() => {
      if (this.state.datareport === "A") {
        this.GET_DATA_BY_VALUE("", DATE_SET_START, DATE_SET_END);
      }

      if (this.state.datareport === "T") {
        this.GET_DATA_BY_VALUE("T", DATE_SET_START, DATE_SET_END);
      }

      if (this.state.datareport === "C") {
        this.GET_DATA_BY_VALUE("C", DATE_SET_START, DATE_SET_END);
      }
    }, 1500);
  }

  GET_DATA_BY_VALUE(type, date_start, date_end, time_start, time_end) {
    let { GET_DATA_KITCHEN } = this.state;
    let DATA_TYPE = type;
    let TIMESTART;
    let TIMEEND;

    if (time_start === "" && time_end === "") {
      let Item = document.getElementById("dropdownTime").value;
      let SettimeNew = Settime(Item);
      time_start = SettimeNew[0].timestart;
      time_end = SettimeNew[0].timeend;
    } else {
      let Item = document.getElementById("dropdownTime").value;
      let SettimeNew = Settime(Item);
      time_start = SettimeNew[0].timestart;
      time_end = SettimeNew[0].timeend;
    }

    // if (date_start === undefined && date_end === undefined) {
    if (this.state.DATA_DATE_START != "" && this.state.DATA_DATE_END != "") {
      date_start = this.state.DATA_DATE_START;
      date_end = this.state.DATA_DATE_END;
    } else {
      date_start = this.state.TO_DAY;
      date_end = this.state.TO_DAY;
    }
    // }
    // else {
    //   date_start = this.state.TO_DAY;
    //   date_end = this.state.TO_DAY;
    // }

    if (time_start != "" && time_end != "") {
      TIMESTART = "&Report_Timestart=" + time_start;
      TIMEEND = "&Report_Timeend=" + time_end;
    }

    if (time_start === undefined && time_end === undefined) {
      TIMESTART = "&Report_Timestart=" + time_start;
      TIMEEND = "&Report_Timeend=" + time_end;
    }

    if (type != "") {
      type = "&Type=" + DATA_TYPE;
    } else if (type === "A") {
      type = "";
    }

    if (type === "") {
      let Newtype = document.getElementById("dropdowntype").value;
      type = "&Type=" + Newtype;
      if (Newtype === "A") {
        type = "";
      }
    }
    console.log(date_start);
    console.log(
      REPORT_RAM_TYPE.REPORT_DETAIL +
        GET_DATA_KITCHEN +
        "&Report_start=" +
        date_start +
        "&Report_end=" +
        date_end +
        type +
        TIMESTART +
        TIMEEND
    );
    fetch(
      REPORT_RAM_TYPE.ALL_REPORT +
        GET_DATA_KITCHEN +
        "&Report_start=" +
        date_start +
        "&Report_end=" +
        date_end +
        type +
        TIMESTART +
        TIMEEND
    )
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

    fetch(
      REPORT_RAM_TYPE.REPORT_DETAIL +
        GET_DATA_KITCHEN +
        "&Report_start=" +
        date_start +
        "&Report_end=" +
        date_end +
        type +
        TIMESTART +
        TIMEEND
    )
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            products_detail_print: result,
          });
          console.log(result);
        },
        (error) => {
          this.setState({ error });
        }
      );

    fetch(
      REPORT_RAM_TYPE.AMOUNT +
        GET_DATA_KITCHEN +
        "&Report_start=" +
        date_start +
        "&Report_end=" +
        date_end +
        type +
        TIMESTART +
        TIMEEND
    )
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            Amount_print: result,
          });
        },
        (error) => {
          this.setState({ error });
        }
      );
  }

  componentDidMount() {
    $(".GET_TO_REPORT").click(function () {
      if (REPORT_SET != "") {
        $(".DateKitchen").html($("#date").val());
      } else {
        function formatDate(date) {
          var d = new Date(date),
            month = "" + (d.getMonth() + 1),
            day = "" + d.getDate(),
            year = d.getFullYear();

          if (month.length < 2) month = "0" + month;
          if (day.length < 2) day = "0" + day;

          return [day + "/" + month + "/" + year].join();
        }

        const date = formatDate(new Date());
        $(".DateKitchen").html(date);
      }
    });
    this.GET_DATA_BY_VALUE("", date, date);
  }
}
const pageStyle = `
@media print {
  table,
  td,
  th {
    border: 2px solid;
    padding: 5px;
  }
  .tr {
    border: 0px solid black;
    border-style: none;
  }
  @page {
    margin: 1cm 1cm 2cm 1cm;
    page-break-after: always;
    size: A4 landscape;
  }
  .table-bordered {
    border: 2px solid #dee2e6;
  }
}
`;