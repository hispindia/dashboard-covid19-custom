import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import SmallStats from "../components/common/SmallStats";
import TrendingCharts from "../components/blog/TrendingCharts.js";
import UsersByDevice from "../components/blog/UsersByDevice";
import NewDraft from "../components/blog/NewDraft";
import Discussions from "../components/blog/Discussions";
import TopReferrals from "../components/common/TopReferrals";

import {
  getSummaryCases,
  getLastSevenDays,
  getActiveSummaryCases,
  getRatesOverview
} from "../services/crud";

const smallStats = [
  {
    label: "Confirmed",
    name: "COVID-19 - All cases",
    value: "",
    percentage: "",
    increase: true,
    borderColor: "rgb(255,65,105)",
    chartLabels: [null, null, null, null, null, null, null],
    attrs: { md: "6", sm: "6" },
    datasets: [
      {
        label: "Today",
        fill: "start",
        borderWidth: 1.5,
        borderColor: "rgb(255,65,105)",
        backgroundColor: "rgba(255,65,105,0.1)",
        borderColor: "rgb(255,65,105)",
        data: [1, 2, 1, 3, 5, 4, 7]
      }
    ]
  },
  {
    label: "Active",
    name: "COVID-19 - Active cases",
    value: "",
    percentage: "",
    increase: false,
    borderColor: "rgb(255,140,0)",
    chartLabels: [null, null, null, null, null, null, null],
    attrs: { md: "6", sm: "6" },
    datasets: [
      {
        label: "Today",
        fill: "start",
        borderWidth: 1.5,
        backgroundColor: "#ffffdc",
        borderColor: "rgb(255,140,0)",
        data: [1, 2, 3, 3, 3, 4, 4]
      }
    ]
  },
  {
    label: "Recovered",
    name: "COVID-19 - Recovered cases",
    value: "",
    percentage: "",
    increase: false,
    decrease: true,
    borderColor: "rgb(144, 238, 144)",
    chartLabels: [null, null, null, null, null, null, null],
    attrs: { md: "4", sm: "6" },
    datasets: [
      {
        label: "Today",
        fill: "start",
        borderWidth: 1.5,
        backgroundColor: "#f2ffe6",
        borderColor: "rgb(144, 238, 144)",
        data: [2, 3, 3, 3, 4, 3, 3]
      }
    ]
  },
  {
    label: "Deceased",
    name: "COVID-19 - Deaths",
    value: "",
    percentage: "",
    increase: false,
    decrease: true,
    borderColor: "#B3B3B3",
    chartLabels: [null, null, null, null, null, null, null],
    attrs: { md: "4", sm: "6" },
    datasets: [
      {
        label: "Today",
        fill: "start",
        borderWidth: 1.5,
        backgroundColor: "#E6E6E6",
        borderColor: "#B3B3B3",
        data: [1, 7, 1, 3, 1, 4, 8]
      }
    ]
  }
];

const ratesOverview = [
  {
    label: "Recovery rate",
    name: "COVID-19 - Recovery rate (%,State)",
    value: "",
    percentage: "",
    increase: true,
    borderColor: "rgb(255,65,105)",
    chartLabels: [null, null, null, null, null, null, null],
    attrs: { md: "6", sm: "6" },
    datasets: [
      {
        label: "Today",
        fill: "start",
        borderWidth: 1.5,
        borderColor: "rgb(255,65,105)",
        backgroundColor: "rgba(255,65,105,0.1)",
        borderColor: "rgb(255,65,105)",
        data: [1, 2, 1, 3, 5, 4, 7]
      }
    ]
  },
  {
    label: "Testing Ratio",
    name: "COVID -19 Testing Ratio",
    value: "",
    percentage: "",
    increase: false,
    borderColor: "rgb(255,140,0)",
    chartLabels: [null, null, null, null, null, null, null],
    attrs: { md: "6", sm: "6" },
    datasets: [
      {
        label: "Today",
        fill: "start",
        borderWidth: 1.5,
        backgroundColor: "#ffffdc",
        borderColor: "rgb(255,140,0)",
        data: [1, 2, 3, 3, 3, 4, 4]
      }
    ]
  },
  {
    label: "Positivity Rate",
    name: "COVID-19 Positivity Rate (%,District)",
    value: "",
    percentage: "",
    increase: false,
    decrease: true,
    borderColor: "rgb(144, 238, 144)",
    chartLabels: [null, null, null, null, null, null, null],
    attrs: { md: "4", sm: "6" },
    datasets: [
      {
        label: "Today",
        fill: "start",
        borderWidth: 1.5,
        backgroundColor: "#f2ffe6",
        borderColor: "rgb(144, 238, 144)",
        data: [2, 3, 3, 3, 4, 3, 3]
      }
    ]
  },
  {
    label: "Fatality Rate",
    name: "COVID-19 - Case Fatality rate (%,State)",
    value: "",
    percentage: "",
    increase: false,
    decrease: true,
    borderColor: "#B3B3B3",
    chartLabels: [null, null, null, null, null, null, null],
    attrs: { md: "4", sm: "6" },
    datasets: [
      {
        label: "Today",
        fill: "start",
        borderWidth: 1.5,
        backgroundColor: "#E6E6E6",
        borderColor: "#B3B3B3",
        data: [1, 7, 1, 3, 1, 4, 8]
      }
    ]
  }
];
const BlogOverview = () => {
  const [summaryData, setSummaryData] = useState([]);
  const [trendingData, setTrendingData] = useState({});
  const [rateOverview, setRateOverview] = useState([]);

  useEffect(async () => {
    await getSummaryCases().then(data => {
      let dataObj = {};
      data.rows.forEach(row => (dataObj[row[0]] = row[1]));
      smallStats.forEach(
        child => (child.value = dataObj[child.name] ? dataObj[child.name] : "")
      );
    });

    await getActiveSummaryCases().then(data => {
      let dataObj = {};
      data.rows.forEach(row => (dataObj[row[0]] = row[1]));
      smallStats.forEach(child => {
        if (dataObj[child.name]) child.value = dataObj[child.name];
      });
    });
    await getLastSevenDays().then(data => {
      let dataObj = {};
      console.log(data);
      data.rows.forEach(row => (dataObj[row[0]] = row[1]));

      smallStats.forEach(
        child =>
          (child.percentage = dataObj[child.name] ? dataObj[child.name] : "")
      );
      setSummaryData(smallStats);
    });

    await getRatesOverview().then(data => {
      let dataObj = {};
      data.rows.forEach(row => (dataObj[row[0]] = row[1]));
      ratesOverview.forEach(
        child => (child.value = dataObj[child.name] ? dataObj[child.name] : "")
      );

      setRateOverview(ratesOverview);
    });
  }, []);

  return (
    <Container fluid className="main-content-container px-4">
      {/* Page Header */}
      <Row noGutters className="page-header py-4">
        <PageTitle
          title="Case Summary"
          subtitle="Dashboard"
          className="text-sm-left mb-3"
        />
      </Row>

      {/* Small Stats Blocks */}
      <Row>
        {smallStats.map((stats, idx) => (
          <Col className="col-lg mb-4" key={idx} {...stats.attrs}>
            <SmallStats
              id={`small-stats-${idx}`}
              variation="1"
              chartData={stats.datasets}
              chartLabels={stats.chartLabels}
              label={stats.label}
              value={stats.value}
              borderColor={stats.borderColor}
              percentage={stats.percentage}
              increase={stats.increase}
              decrease={stats.decrease}
            />
          </Col>
        ))}
      </Row>
      <Row>
        {rateOverview.map((rates, idx) => (
          <Col className="col-lg mb-4" key={idx} {...rates.attrs}>
            <SmallStats
              id={`rates-overview-${idx}`}
              variation="1"
              chartData={rates.datasets}
              chartLabels={rates.chartLabels}
              label={rates.label}
              value={rates.value}
              borderColor={rates.borderColor}
              percentage={rates.percentage}
              increase={rates.increase}
              decrease={rates.decrease}
            />
          </Col>
        ))}
      </Row>

      <Row>
        {/* Users Overview */}
        {/* <Col lg="12" md="12" sm="12" className="mb-4"> */}
          {/* <UsersOverview /> */}
          {/* <TrendingCharts />
        </Col> */}

        {/* Users by Device */}
        {/* <Col lg="4" md="6" sm="12" className="mb-4">
          <UsersByDevice />
        </Col> */}

        {/* New Draft */}
        {/* <Col lg="4" md="6" sm="12" className="mb-4">
          <NewDraft />
        </Col> */}

        {/* Discussions */}
        {/* <Col lg="5" md="12" sm="12" className="mb-4">
          <Discussions />
        </Col> */}

        {/* Top Referrals */}
        {/* <Col lg="3" md="12" sm="12" className="mb-4">
          <TopReferrals />
        </Col> */}
      </Row>
    </Container>
  );
};

export default BlogOverview;
