function calculateAnnuity() {
  var pinjamanAwal = parseFloat(document.getElementById("pinjamanAwal").value);
  var sukuBunga = parseFloat(document.getElementById("sukuBunga").value) / 100;
  var target = parseInt(document.getElementById("target").value);
  var jumlahCicilan = parseInt(document.getElementById("jumlahCicilan").value);
  var monthlyInterestRate = sukuBunga / 12;
  var totalPayments = jumlahCicilan * 12;

  var monthlyPayment =
    (pinjamanAwal * sukuBunga) / 1 - (1 + sukuBunga) ** -jumlahCicilan;

  console.log(monthlyPayment);

  var tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = "";

  var remainingBalance = monthlyPayment - target;
  console.log(remainingBalance);

  var faksen =
    (pinjamanAwal * sukuBunga * (1 + sukuBunga) ** -jumlahCicilan) /
    (1 - (1 + sukuBunga) ** -jumlahCicilan) ** 2;

  console.log(faksen);

  var labels = [];
  var data = [];

  for (var month = 1; month <= 200; month++) {
    monthlyPayment = monthlyPayment - target / faksen;
    remainingBalance = monthlyPayment - target;

    var newRow = document.createElement("tr");
    newRow.innerHTML =
      "<td>" +
      month +
      "</td><td>" +
      monthlyPayment.toFixed(2) +
      "</td><td>" +
      remainingBalance.toFixed(2) +
      "</td><td>" +
      faksen.toFixed(2) +
      "</td>";
    tableBody.appendChild(newRow);

    if (monthlyPayment < 1) {
      break;
    }
    labels.push(month);
    data.push(remainingBalance.toFixed(2));
  }

  var ctx = document.getElementById("annuityChart").getContext("2d");
  var annuityChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Sisa Pinjaman",
          data: data,
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
}
