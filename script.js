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

  // Hitung cicilan awal menggunakan rumus n
  console.log(`Cicilan awal menggunakan rumus anuitas: ${n.toFixed(2)}`);

  // Hitung nilai awal n
  let nx = n - target; // Nilai awal n
  let iterasi = 0;

  // Iterasi menggunakan metode Newton-Raphson
  while (true) {
    iterasi++;

    // Hitung nilai turunan fungsi
    const turunan = faksen;

    // Penanganan kasus di mana turunan fungsi adalah nol
    if (turunan === 0) {
      document.getElementById("hasilAsli").innerText =
        "Turunan fungsi adalah nol. Iterasi dihentikan.";
      return [null, null];
    }

    // Hitung nilai x(n)
    const xn = n - target;

    // Tampilkan nilai n, x(n), dan f'(n) pada setiap iterasi
    document.getElementById(
      "hasilAsli"
    ).innerText = `Iterasi ${iterasi}: n = ${n.toFixed(2)}, x(n) = ${xn.toFixed(
      2
    )}, f'(n) = ${turunan.toFixed(2)}`;

    // Hitung nilai iterasi baru
    const nilai_baru = n - xn / turunan;

    // Menghentikan iterasi jika toleransi tercapai atau mencapai batas iterasi maksimum
    if (Math.abs(nilai_baru - n) < toleransi || iterasi >= maks_iter) {
      break;
    }

    n = nilai_baru;
  }

  return [n, iterasi];
}
