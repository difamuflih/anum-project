function hitung() {
  const pinjaman = parseFloat(document.getElementById("pinjamanAwal").value);
  const sukuBunga = parseFloat(document.getElementById("sukuBunga").value);
  const bunga = sukuBunga / 100;
  const target = parseFloat(document.getElementById("target").value);
  const cicilan = parseFloat(document.getElementById("jumlahCicilan").value);

  //   hitung n
  const n = (pinjaman * bunga) / 1 - (1 + bunga) ** -cicilan;
  document.getElementById("hasilCicilan").innerText = n.toFixed(2);

  // hitung xn
  const xn = n - target;
  document.getElementById("hasilIterasi").innerText = xn.toFixed(2);

  // hitung faksen
  const faksen =
    (pinjaman * bunga * (1 + bunga) ** -cicilan) /
    (1 - (1 + bunga) ** -cicilan) ** 2;
  document.getElementById("hasilAksen").innerText = faksen.toFixed(2);
}
