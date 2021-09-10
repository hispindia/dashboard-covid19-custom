export default function() {
  return [
    {
      title: "Case Summary",
      to: "/case-summary",
      htmlBefore: '<i class="material-icons">edit</i>',
      htmlAfter: ""
    },
    {
      title: "Testing Summary",
      htmlBefore: '<i class="material-icons">vertical_split</i>',
      to: "/tesing-summary",
    },
    {
      title: "Infrastructure Data",
      htmlBefore: '<i class="material-icons">note_add</i>',
      to: "/infrastructure-data",
    },
    {
      title: "Logisitcs Data",
      htmlBefore: '<i class="material-icons">table_chart</i>',
      to: "/logistics",
    }
  ];
}
