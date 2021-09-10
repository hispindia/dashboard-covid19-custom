// import React from "react";
// import PropTypes from "prop-types";
// import { Row, Col, Card, CardHeader, CardBody, Button } from "shards-react";

// import RangeDatePicker from "../common/RangeDatePicker";
// import Chart from "../../utils/chart";
// import { getTrendCases } from "../../services/crud";

// const SortDatesData = function(startDate, endDate, dataObj, key) {
//   var arr = [],
//     lastDay,
//     startMonth,
//     endMonth,
//     startDay,
//     lastDay,
//     prevData = 0;
//   var startYear = startDate.split("-");
//   var endYear = endDate.split("-");

//   for (var i = parseInt(startYear["0"]); i <= parseInt(endYear["0"]); i++) {
//     startMonth = i > parseInt(startYear["0"]) ? 1 : parseInt(startYear["1"]);
//     endMonth = i == endYear["0"] ? endYear["1"] : 12;

//     for (var j = startMonth; j <= endMonth; j++) {
//       startDay =
//         i == startYear["0"] && startMonth == j ? parseInt(startYear["2"]) : 1;
//       lastDay =
//         endYear["0"] == i && endMonth == j
//           ? endYear["2"]
//           : new Date(i, j, 0).getDate();

//       for (var k = startDay; k <= lastDay; k++) {
//         let checkMonth = j < 10 ? i + "0" + j : i + "" + j;
//         let date = k < 10 ? checkMonth + "0" + k : checkMonth + "" + k;
//         if (dataObj[key][date]) {
//           let value = Number(dataObj[key][date]);
//           arr.push(prevData + value);
//           prevData += value;
//         }
//       }
//     }
//   }

//   return arr;
// };

// class UsersOverview extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       chartDatas: this.props.chartData
      
//     };
//     this.canvasRef = React.createRef();
//   }

//   componentDidMount() {
//     let chartData = this.props.chartData;
//     getTrendCases().then(data => {
//       let dataObj = {};
//       let dataSeries = {};

//       data.rows.forEach(row => {
//         if (!dataObj[row[0]]) dataObj[row[0]] = {};
//         dataObj[row[0]][row[1]] = row[2];
//       });
//       for (let key in dataObj) {
//         dataSeries[key] = SortDatesData(
//           "2021-01-01",
//           "2021-01-15",
//           dataObj,
//           key
//         );
//       }
//       let dataTrending = [];
//       for (let index in chartData.datasets) {
//         if (chartData.datasets[index]["id"])
//           dataTrending[index] = chartData.datasets[index];
//         if (dataSeries[chartData.datasets[index]["id"]]) {
//           dataTrending[index]["data"] =
//             dataSeries[chartData.datasets[index]["id"]];
//         }
//       }
//       this.setState({ chartData: dataTrending });
//     });
//     const chartOptions = {
//       ...{
//         responsive: true,
//         legend: {
//           position: "top"
//         },
//         elements: {
//           line: {
//             // A higher value makes the line look skewed at this ratio.
//             tension: 0.3
//           },
//           point: {
//             radius: 0
//           }
//         },
//         scales: {
//           xAxes: [
//             {
//               gridLines: false,
//               ticks: {
//                 callback(tick, index) {
//                   // Jump every 7 values on the X axis labels to avoid clutter.
//                   return index % 7 !== 0 ? "" : tick;
//                 }
//               }
//             }
//           ],
//           yAxes: [
//             {
//               ticks: {
//                 suggestedMax: 45,
//                 callback(tick) {
//                   if (tick === 0) {
//                     return tick;
//                   }
//                   // Format the amounts using Ks for thousands.
//                   return tick > 999 ? `${(tick / 1000).toFixed(1)}K` : tick;
//                 }
//               }
//             }
//           ]
//         },
//         hover: {
//           mode: "nearest",
//           intersect: false
//         },
//         tooltips: {
//           custom: false,
//           mode: "nearest",
//           intersect: false
//         }
//       },
//       ...this.props.chartOptions
//     };

//     const BlogUsersOverview = new Chart(this.canvasRef.current, {
//       type: "LineWithLine",
//       data: this.state.chartDatas,
//       options: chartOptions
//     });

//     // They can still be triggered on hover.
//     const buoMeta = BlogUsersOverview.getDatasetMeta(0);
//     buoMeta.data[0]._model.radius = 0;
//     buoMeta.data[
//       this.state.chartDatas.datasets[0].data.length - 1
//     ]._model.radius = 0;

//     // Render the chart.
//     BlogUsersOverview.render();
//   }

//   render() {
//     const { title } = this.props;
//     return (
//       <Card small className="h-100">
//         <CardHeader className="border-bottom">
//           <h6 className="m-0">{title}</h6>
//         </CardHeader>
//         <CardBody className="pt-0">
//           <Row className="border-bottom py-2 bg-light">
//             <Col sm="6" className="d-flex mb-2 mb-sm-0">
//               <RangeDatePicker />
//             </Col>
//           </Row>
//           <canvas
//             height="120"
//             ref={this.canvasRef}
//             style={{ maxWidth: "100% !important" }}
//           />
//         </CardBody>
//       </Card>
//     );
//   }
// }

// UsersOverview.propTypes = {
//   /**
//    * The component's title.
//    */
//   title: PropTypes.string,
//   /**
//    * The chart dataset.
//    */
//   chartData: PropTypes.object,
//   /**
//    * The Chart.js options.
//    */
//   chartOptions: PropTypes.object
// };

// UsersOverview.defaultProps = {
//   title: "Users Overview",
//   chartData: {
//     labels: Array.from(new Array(30), (_, i) => (i === 0 ? 1 : i)),
//     datasets: [
//       {
//         id: "kJoSHTinHGa",
//         name: "COVID-19 - All cases",
//         label: "All Cases",
//         fill: "start",
//         data: [],
//         backgroundColor: "rgba(0,123,255,0.1)",
//         borderColor: "rgba(0,123,255,1)",
//         pointBackgroundColor: "#ffffff",
//         pointHoverBackgroundColor: "rgb(0,123,255)",
//         borderWidth: 1.5,
//         pointRadius: 0,
//         pointHoverRadius: 3
//       },
//       {
//         name: "COVID-19 - Active cases",
//         label: "Active Cases",
//         fill: "start",
//         data: [],
//         backgroundColor: "rgba(255,65,105,0.1)",
//         borderColor: "rgba(255,65,105,1)",
//         pointBackgroundColor: "#ffffff",
//         pointHoverBackgroundColor: "rgba(255,65,105,1)",
//         borderDash: [3, 3],
//         borderWidth: 1,
//         pointRadius: 0,
//         pointHoverRadius: 2,
//         pointBorderColor: "rgba(255,65,105,1)"
//       },
//       {
//         id: "PkGdfHQyWWH",
//         name: "COVID-19 - Recovered cases",
//         label: "Recovered Cases",
//         data: [],
//         backgroundColor: "rgba(255,65,105,0.1)",
//         borderColor: "rgba(255,65,105,1)",
//         pointBackgroundColor: "#ffffff",
//         pointHoverBackgroundColor: "rgba(255,65,105,1)",
//         borderDash: [3, 3],
//         borderWidth: 1,
//         pointRadius: 0,
//         pointHoverRadius: 2,
//         pointBorderColor: "rgba(255,65,105,1)"
//       },
//       {
//         id: "r2VxAVW1IEy",
//         name: "COVID-19 - Deaths",
//         label: "Deaths",
//         data: [],
//         backgroundColor: "rgba(255,65,105,0.1)",
//         borderColor: "rgba(255,65,105,1)",
//         pointBackgroundColor: "#ffffff",
//         pointHoverBackgroundColor: "rgba(255,65,105,1)",
//         borderDash: [3, 3],
//         borderWidth: 1,
//         pointRadius: 0,
//         pointHoverRadius: 2,
//         pointBorderColor: "rgba(255,65,105,1)"
//       }
//     ]
//   }
// };

// export default UsersOverview;
