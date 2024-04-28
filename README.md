Repository ini berisi implementasi sistem pendukung keputusan (SPK) menggunakan metode Multi-Attributive Border Approximation Method (MABAC).

### STUDI KASUS: PENILAIAN DESA

Gunakan metode MABAC untuk melakukan perhitungan pada penentuan calon desa terbaik yang diharapkan kedepannya dapat membantu para pembuat keputusan di Kecamatan Bondowoso, Kab. Bondowoso dalam memutuskan alternatif – alternatif dalam penilaian desa terbaik.

| KODE | KRITERIA                            | BOBOT |
| ---- | ----------------------------------- | ----- |
| C1   | Pendidikan Masyarakat               | 25    |
| C2   | Kesehatan Masyarakat                | 30    |
| C3   | Ekonomi Masyarakat                  | 25    |
| C4   | Pemberdayaan Kesejahteraan Keluarga | 20    |

Skor dari setiap desa berdasarkan kriterianya ditunjukkan dalam matriks keputusan berikut:

| KODE | DESA       | C1  | C2  | C3  | C4  |
| ---- | ---------- | --- | --- | --- | --- |
| D1   | Nangkaan   | 90  | 81  | 89  | 77  |
| D2   | Sukowiryo  | 70  | 80  | 80  | 85  |
| D3   | Kembang    | 85  | 69  | 78  | 80  |
| D4   | Tamansari  | 95  | 80  | 83  | 80  |
| D5   | Kademangan | 82  | 75  | 85  | 82  |
| D6   | Pejaten    | 76  | 85  | 80  | 87  |
| D7   | Badean     | 72  | 80  | 75  | 78  |
| D8   | Blindungan | 68  | 72  | 79  | 86  |

### Output:

**Tahap 1: Pembentukan matriks keputusan (X)**

![Matriks Keputusan](/assets/images/step-1.png)

**Tahap 2: Normalisasi matriks keputusan (X)**

![Matriks Normalisasi](/assets/images/step-2.png)

**Tahap 3: Perhitungan elemen matriks tertimbang (V)**

![Matriks Tertimbang](/assets/images/step-3.png)

**Tahap 4: Matriks area perkiraan batas (G)**

![Matriks Area Perkiraan Batas](/assets/images/step-4.png)

**Tahap 5: Perhitungan matriks jarak elemen alternatif dari batas perkiraan daerah (Q)**

![Matriks Jarak Alternatif dari Batas Perkiraan Daerah](/assets/images/step-5.png)

**Tahap 6: Perangkingan alternatif**

![Perankingan](/assets/images/step-6.png)

### Kesimpulan:

Hasil dari tabel di atas menunjukkan bahwa **Desa Nangkaan (D1) mendapatkan ranking pertama** dan **Desa Badean (D7) mendapatkan ranking terakhir**. Jadi, Desa Nangkaan adalah calon desa terbaik di Kecamatan Bondowoso, Kabupaten Bondowoso karena berada pada peringkat pertama yang didapatkan berdasarkan penilaian dari kriteria masing-masing.

---

<p align="center">Jika ada kesalahan dalam implementasi rumus saya mohon maaf ya guys HEHE 🙏😂</p>