function hitung() {
  const pinjaman = parseFloat(document.getElementById("pinjamanAwal").value);
  const bunga = parseFloat(document.getElementById("sukuBunga").value);
  const target = parseFloat(document.getElementById("target").value);
  const cicilan = parseFloat(document.getElementById("jumlahCicilan").value);

  //   hitung nilai xn
  const xn = pinjaman / cicilan + pinjaman / (bunga * cicilan);

  //   tampilkan nilai xn
  document.getElementById("hasilCicilan").innerText = xn.toFixed(3);

  const fx = xn - target;

  document.getElementById("hasilIterasi").innerText = fx.toFixed(3);
}
