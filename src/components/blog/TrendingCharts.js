import React, { useState, useEffect } from "react";

import Highcharts from "highcharts";
import HighchartReact from "highcharts-react-official";

import { getTrendCases } from "../../services/crud";

const xAxisCategories = []

const SortDatesData = function(startDate, endDate, dataObj, key) {
  var arr = [],
    lastDay,
    startMonth,
    endMonth,
    startDay,
    lastDay,
    prevData = 0;
  var startYear = startDate.split("-");
  var endYear = endDate.split("-");

  for (var i = parseInt(startYear["0"]); i <= parseInt(endYear["0"]); i++) {
    startMonth = i > parseInt(startYear["0"]) ? 1 : parseInt(startYear["1"]);
    endMonth = i == endYear["0"] ? endYear["1"] : 12;

    for (var j = startMonth; j <= endMonth; j++) {
      startDay =
        i == startYear["0"] && startMonth == j ? parseInt(startYear["2"]) : 1;
      lastDay =
        endYear["0"] == i && endMonth == j
          ? endYear["2"]
          : new Date(i, j, 0).getDate();

      for (var k = startDay; k <= lastDay; k++) {
        let checkMonth = j < 10 ? i + "0" + j : i + "" + j;
        let date = k < 10 ? checkMonth + "0" + k : checkMonth + "" + k;
        xAxisCategories.push(date);
        if (dataObj[key][date]) {
          let value = Number(dataObj[key][date]);
          arr.push(prevData + value);
          prevData += value;
        }
      }
    }
  }

  return arr;
};

const options = {
    xAxis: {
        categories: xAxisCategories
    },
  chart: {
    type: "line"
  },
  credits: {
    enabled: false
  },
  title: { text: "Trending Charts" },
  
  series: [
    // {
    //   name: "",
    //   data: [ ],
    //   color: "",
    // }
  ]
};

const TRENDING_DATA = [
  {
    id: "kJoSHTinHGa",
    name: "COVID-19 - All cases",
    shortName: "All Cases",
    color: "#ffcccb"
  },
  {
    id: "",
    name: "COVID-19 - Active cases",
    color: "#d1edf2",
    shortName: "Active Cases"
  },
  {
    id: "PkGdfHQyWWH",
    name: "COVID-19 - Recovered cases",
    color: "#98FB98",
    shortName: "Recovered Cases"
  },
  {
    id: "r2VxAVW1IEy",
    name: "COVID-19 - Deaths",
    color: "#C0C0C0",
    shortName: "Deaths"
  }
];

const TrendingCharts = () => {
  const [trendingData, setTrendingData] = useState({});

  useEffect(async () => {
    await getTrendCases().then(data => {
      let dataObj = {};
      let dataSeries = {};

      data.rows.forEach(row => {
        if (!dataObj[row[0]]) dataObj[row[0]] = {};
        dataObj[row[0]][row[1]] = row[2];
      });
      for (let key in dataObj) {
        dataSeries[key] = SortDatesData(
          "2021-01-01",
          "2021-09-10",
          dataObj,
          key
        );
      }
      let dataTrending = {
        options: options
      };
      for (let child of TRENDING_DATA) {
        if (dataSeries[child["id"]]) {
          dataTrending["options"]["series"].push(
            {
              data: dataSeries[child["id"]],
              name: child["shortName"],
              color: child["color"]
            }
          );
        }
      }
      setTrendingData(dataTrending);
    });
  }, []);

  return <HighchartReact highcharts={Highcharts} options={trendingData.options} />;
};
export default TrendingCharts;
