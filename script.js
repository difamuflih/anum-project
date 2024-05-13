function calculateAnnuity() {
  var pinjamanAwal = parseFloat(document.getElementById("pinjamanAwal").value);
  var sukuBunga = parseFloat(document.getElementById("sukuBunga").value) / 100;
  var target = parseInt(document.getElementById("target").value);
  var jumlahCicilan = parseInt(document.getElementById("jumlahCicilan").value);

  const cicilanAwal =
    (pinjamanAwal * sukuBunga) / (1 - (1 + sukuBunga) ** -jumlahCicilan);
  document.getElementById(
    "hasilCicilan"
  ).innerText = `Hasil Anuitas Awal: ${cicilanAwal.toFixed(2)}`;

  var monthlyPayment = cicilanAwal - target;
  var tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = "";

  var labels = [];
  var data = [];
  var monthlyPaymentData = [];
  var faksenData = [];

  var remainingBalance =
    (pinjamanAwal * sukuBunga) / (1 - (1 + sukuBunga) ** -monthlyPayment) -
    target;
  var faksen =
    (pinjamanAwal * sukuBunga * (1 + sukuBunga) ** -monthlyPayment) /
    (1 - (1 + sukuBunga) ** -monthlyPayment) ** 2;

  for (var month = 1; month <= 200; month++) {
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

    var exMonthlyPayment = monthlyPayment;
    monthlyPayment = monthlyPayment - remainingBalance / faksen;

    if (exMonthlyPayment - monthlyPayment < 0.1) {
      break;
    }

    remainingBalance =
      (pinjamanAwal * sukuBunga) / (1 - (1 + sukuBunga) ** -monthlyPayment) -
      target;

    faksen =
      (pinjamanAwal * sukuBunga * (1 + sukuBunga) ** -monthlyPayment) /
      (1 - (1 + sukuBunga) ** -monthlyPayment) ** 2;

    labels.push(month);
    data.push(remainingBalance.toFixed(2));
    monthlyPaymentData.push(monthlyPayment.toFixed(2));
    faksenData.push(faksen.toFixed(2));
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
        {
          label: "Monthly Payment",
          data: monthlyPaymentData,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
        {
          label: "Faksen",
          data: faksenData,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
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
