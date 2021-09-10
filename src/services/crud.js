const getBetweenDates = function (startDate, endDate) {
  var arr = [],
    lastDay,
    startMonth,
    endMonth, startDay, lastDay;
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
        let value = k < 10 ? checkMonth + "0" + k : checkMonth + "" + k;
        arr.push(value);
      }
    }
  }

  return arr;
};
export const getSummaryCases = async () => {
  const period = '2020;2021';
  let response = await fetch(
    `${process.env.REACT_APP_DHIS2_BASE_URL}/api/analytics.json?dimension=dx:kJoSHTinHGa;zUcGi0Y384Y;PkGdfHQyWWH;r2VxAVW1IEy;KWkvU3g4fLv&showHierarchy=false&hierarchyMeta=false&includeMetadataDetails=true&includeNumDen=true&skipRounding=false&aggregationType=SUM&completedOnly=false&outputIdScheme=NAME&filter=pe:${period}&paging=false`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        Authorization: "Basic aGlzcGRldjpEZXZoaXNwQDE=",
      },
    }
  );

  let data = await response.json();
  return data;
};

export const getActiveSummaryCases = async () => {
  const period = '2020;2021';
  let response = await fetch(
    `${process.env.REACT_APP_DHIS2_BASE_URL}/api/analytics.json?dimension=dx%3AzUcGi0Y384Y&showHierarchy=false&hierarchyMeta=false&includeMetadataDetails=true&includeNumDen=true&skipRounding=false&completedOnly=false&outputIdScheme=NAME&filter=ou%3AUSER_ORGUNIT%2Cpe:${period}&paging=false`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        Authorization: "Basic aGlzcGRldjpEZXZoaXNwQDE=",
      },
    }
  );

  let data = await response.json();
  return data;
};

export const getLastSevenDays = async () => {

  const period = 'LAST_7_DAYS';
  let response = await fetch(
    `${process.env.REACT_APP_DHIS2_BASE_URL}/api/analytics.json?dimension=dx:kJoSHTinHGa;zUcGi0Y384Y;PkGdfHQyWWH;r2VxAVW1IEy;KWkvU3g4fLv&showHierarchy=false&hierarchyMeta=false&includeMetadataDetails=true&includeNumDen=true&skipRounding=false&aggregationType=SUM&completedOnly=false&outputIdScheme=NAME&filter=pe:${period}&paging=false`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        Authorization: "Basic aGlzcGRldjpEZXZoaXNwQDE=",
      },
    }
  );

  let data = await response.json();
  return data;
};

export const getTrendCases = async () => {
  const period = getBetweenDates("2021-01-01", "2021-09-09");
  let response = await fetch(
    `${
      process.env.REACT_APP_DHIS2_BASE_URL
    }/api/analytics.json?dimension=dx:kJoSHTinHGa;PkGdfHQyWWH;r2VxAVW1IEy&dimension=pe:${period.join(
      ";"
    )}&showHierarchy=false&hierarchyMeta=false&includeMetadataDetails=true&includeNumDen=true&skipRounding=false&completedOnly=false&outputIdScheme=UID&filter=ou:USER_ORGUNIT&paging=false`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        Authorization: "Basic aGlzcGRldjpEZXZoaXNwQDE=",
      },
    }
  );

  let data = await response.json();
  return data;
};


export const getActiveCases =  async() => {
  const period = '2020;2021';
  let response = await fetch(
    `${
      process.env.REACT_APP_DHIS2_BASE_URL
    }/api/analytics.json?dimension=dx:zUcGi0Y384Y&showHierarchy=false&hierarchyMeta=false&includeMetadataDetails=true&includeNumDen=true&skipRounding=false&completedOnly=false&outputIdScheme=UID&filter=ou%3AUSER_ORGUNIT%2Cpe%3A${period}&paging=false`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        Authorization: "Basic aGlzcGRldjpEZXZoaXNwQDE=",
      },
    }
  );

  let data = await response.json();
  return data;
}


export const getRatesOverview = async () => {
  const period = '2020;2021';
  let response = await fetch(
    `${process.env.REACT_APP_DHIS2_BASE_URL}/api/analytics.json?dimension=dx%3Adsho3rAaUkr%3BgsrffZvk7mq%3BcLL0oBV4GKm%3BdXAhOKiim1x&showHierarchy=false&hierarchyMeta=false&includeMetadataDetails=true&includeNumDen=true&skipRounding=false&aggregationType=LAST&completedOnly=false&outputIdScheme=NAME&filter=ou%3AUSER_ORGUNIT_GRANDCHILDREN%2Cpe:${period}&paging=false`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        Authorization: "Basic aGlzcGRldjpEZXZoaXNwQDE=",
      },
    }
  );

  let data = await response.json();
  return data;
};
