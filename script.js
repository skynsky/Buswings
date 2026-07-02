// Matriks kunci untuk Hill Cipher (2x2)
const keyMatrix = [[3, 3], [2, 5]];

// Fungsi untuk mengubah huruf ke angka (A = 0, ..., Z = 25)
function charToNum(char) {
    return char.charCodeAt(0) - 'A'.charCodeAt(0);
}

// Fungsi untuk mengubah angka ke huruf
function numToChar(num) {
    return String.fromCharCode(((num % 26 + 26) % 26) + 'A'.charCodeAt(0));
}

// Fungsi untuk mengenkripsi ID pemesan dengan Hill Cipher
function hillCipherEncrypt(id) {
    if (!id || typeof id !== 'string') {
        return 'ERROR';
    }
    
    id = id.toUpperCase().replace(/[^A-Z]/g, ''); // Hanya huruf A-Z
    
    if (id.length === 0) {
        return 'ERROR';
    }

    if (id.length % 2 !== 0) id += 'X'; // Tambahkan padding jika ganjil

    let encryptedText = '';
    
    for (let i = 0; i < id.length; i += 2) {
        let a = charToNum(id[i]);
        let b = charToNum(id[i + 1]);
    
        // Operasi perkalian matriks
        let x1 = (keyMatrix[0][0] * a + keyMatrix[0][1] * b) % 26;
        let x2 = (keyMatrix[1][0] * a + keyMatrix[1][1] * b) % 26;
    
        encryptedText += numToChar(x1) + numToChar(x2);
    }
    
    return encryptedText;
}

function getKapasitasBus() {
    const jenisBus = document.getElementById('jenis_bis_id');
    const selected = jenisBus.options[jenisBus.selectedIndex]?.textContent || '';
    if (selected.includes('Mini')) return 20;
    if (selected.includes('Medium')) return 35;
    if (selected.includes('Double Decker')) return 70;
    if (selected.includes('Big')) return 60;
    return 40; // default (misal Executive, Economy AC, dst)
}

function generateSeatSelections() {
    const jumlah = parseInt(document.getElementById("jumlah").value);
    const container = document.getElementById("seat-selections");
    
    if (!container) {
        console.error("Seat selections container not found");
        return;
    }
    
    container.innerHTML = "";

    // Data pemesan utama
    const namaPemesan = document.getElementById("nama")?.value || "";
    const idPemesan = document.getElementById("id_pemesan")?.value || "";
    const umurPemesan = document.getElementById("umur")?.value || "";
    const jkPemesan = document.getElementById("jenis_kelamin")?.value || "";
    const kapasitas = getKapasitasBus();

    if (jumlah > 0 && jumlah <= 10) {
        for (let i = 1; i <= jumlah; i++) {
            const div = document.createElement("div");
            div.className = "tiket-box";
            let dataDiri = "";
            if (i > 1) {
                dataDiri = `
                    <div class='chekbox-row'>
                        <input type='checkbox' id='sama_pemesan_${i}' onchange='toggleDataDiri(${i})'>
                        <label for='sama_pemesan_${i}'>Data diri sama dengan pemesan</label>
                    </div>
                    <div class='data-diri-row'>
                        <label for='nama_tiket_${i}'>Nama:</label>
                        <input type='text' id='nama_tiket_${i}' name='nama_tiket[]' required>
                        <label for='id_tiket_${i}'>ID (KTP/Passport/Kartu Pelajar):</label>
                        <input type='text' id='id_tiket_${i}' name='id_tiket[]' maxlength='30' required>
                        <label for='umur_tiket_${i}'>Umur:</label>
                        <input type='number' id='umur_tiket_${i}' name='umur_tiket[]' min='1' required>
                        <label for='jk_tiket_${i}'>Jenis Kelamin:</label>
                        <select id='jk_tiket_${i}' name='jk_tiket[]' required>
                            <option value=''>Pilih Jenis Kelamin</option>
                            <option value='Laki-laki'>Laki-laki</option>
                            <option value='Perempuan'>Perempuan</option>
                        </select>
                    </div>
                `;
            }
            // Dropdown no bangku
            let noBangkuOptions = '<option value="">Pilih No Bangku</option>';
            for (let n = 1; n <= kapasitas; n++) {
                noBangkuOptions += `<option value="${n}">${n}</option>`;
            }
            div.innerHTML = `
                <label for="posisi_duduk_${i}">Posisi Duduk Tiket ${i}:</label>
                <select id="posisi_duduk_${i}" name="posisi_duduk[]" required>
                    <option value="">Pilih Posisi Duduk</option>
                    <option value="Dekat Jendela">Dekat Jendela</option>
                    <option value="Tengah">Tengah</option>
                    <option value="Dekat Lorong">Dekat Lorong</option>
                </select>
                <label for="no_bangku_${i}">No Bangku Tiket ${i}:</label>
                <select id="no_bangku_${i}" name="no_bangku[]" required>${noBangkuOptions}</select>
                ${dataDiri}
            `;
            container.appendChild(div);
        }
    }
}

// Update semua dropdown no bangku jika jenis bus diganti
function updateNoBangkuDropdowns() {
    const kapasitas = getKapasitasBus();
    const jumlah = parseInt(document.getElementById("jumlah").value);
    for (let i = 1; i <= jumlah; i++) {
        const select = document.getElementById(`no_bangku_${i}`);
        if (select) {
            let noBangkuOptions = '<option value="">Pilih No Bangku</option>';
            for (let n = 1; n <= kapasitas; n++) {
                noBangkuOptions += `<option value="${n}">${n}</option>`;
            }
            select.innerHTML = noBangkuOptions;
        }
    }
}

// Tambahkan event listener pada jenis bus
const jenisBusSelect = document.getElementById('jenis_bis_id');
if (jenisBusSelect) {
    jenisBusSelect.addEventListener('change', function() {
        generateSeatSelections();
        updateNoBangkuDropdowns();
    });
}

// Fungsi toggle data diri sama dengan pemesan
function toggleDataDiri(i) {
    const cek = document.getElementById(`sama_pemesan_${i}`);
    const nama = document.getElementById("nama").value;
    const id = document.getElementById("id_pemesan").value;
    const umur = document.getElementById("umur").value;
    const jk = document.getElementById("jenis_kelamin").value;
    const namaTiket = document.getElementById(`nama_tiket_${i}`);
    const idTiket = document.getElementById(`id_tiket_${i}`);
    const umurTiket = document.getElementById(`umur_tiket_${i}`);
    const jkTiket = document.getElementById(`jk_tiket_${i}`);
    if (cek.checked) {
        namaTiket.value = nama;
        idTiket.value = id;
        umurTiket.value = umur;
        jkTiket.value = jk;
        namaTiket.disabled = true;
        idTiket.disabled = true;
        umurTiket.disabled = true;
        jkTiket.disabled = true;
    } else {
        namaTiket.value = "";
        idTiket.value = "";
        umurTiket.value = "";
        jkTiket.value = "";
        namaTiket.disabled = false;
        idTiket.disabled = false;
        umurTiket.disabled = false;
        jkTiket.disabled = false;
    }
}

// Fungsi untuk load data terminal
function loadTerminal() {
    fetch('get_data.php?type=terminal')
        .then(response => response.json())
        .then(data => {
            const select = document.getElementById('terminal_asal');
            select.innerHTML = '<option value="">Pilih Terminal Asal</option>';
            data.forEach(terminal => {
                const option = document.createElement('option');
                option.value = terminal.id;
                option.textContent = `${terminal.nama_terminal} (${terminal.lokasi})`;
                select.appendChild(option);
            });
        })
        .catch(error => console.error('Error:', error));
}

// Fungsi untuk load data jenis bis
function loadJenisBis() {
    fetch('get_data.php?type=jenis_bis')
        .then(response => response.json())
        .then(data => {
            const select = document.getElementById('jenis_bis_id');
            select.innerHTML = '<option value="">Pilih Jenis Bis</option>';
            data.forEach(bis => {
                const option = document.createElement('option');
                option.value = bis.id;
                option.textContent = bis.nama;
                select.appendChild(option);
            });
        })
        .catch(error => console.error('Error:', error));
}

// Fungsi untuk load waktu keberangkatan sesuai jadwal
function loadWaktu() {
    const terminalId = document.getElementById('terminal_asal').value;
    const tujuan = document.getElementById('tujuan').value;
    const waktuSelect = document.getElementById('waktu');
    waktuSelect.innerHTML = '<option value="">Pilih Waktu</option>';
    if (terminalId && tujuan) {
        fetch(`get_data.php?type=waktu&terminal_id=${encodeURIComponent(terminalId)}&tujuan=${encodeURIComponent(tujuan)}`)
            .then(response => response.json())
            .then(data => {
                data.forEach(jam => {
                    const option = document.createElement('option');
                    option.value = jam;
                    option.textContent = jam;
                    waktuSelect.appendChild(option);
                });
            })
            .catch(error => console.error('Error:', error));
    }
}

// Fungsi untuk update event listener tujuan dan terminal
function loadTujuan() {
    const terminalId = document.getElementById('terminal_asal').value;
    const select = document.getElementById('tujuan');
    select.innerHTML = '<option value="">Pilih Tujuan</option>';
    document.getElementById('waktu').innerHTML = '<option value="">Pilih Waktu</option>';
    if (terminalId) {
        fetch(`get_data.php?type=jadwal&terminal_id=${encodeURIComponent(terminalId)}`)
            .then(response => response.json())
            .then(data => {
                const tujuanSet = new Set();
                data.forEach(jadwal => {
                    if (!tujuanSet.has(jadwal.tujuan)) {
                        tujuanSet.add(jadwal.tujuan);
                        const option = document.createElement('option');
                        option.value = jadwal.tujuan;
                        option.textContent = jadwal.tujuan;
                        select.appendChild(option);
                    }
                });
            })
            .catch(error => console.error('Error:', error));
    }
}

// Fungsi untuk mengacak urutan karakter dalam string
function shuffleString(str) {
    let arr = str.split('');
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.join('');
}

// Fungsi untuk validasi form
function processForm() {
    let nama = document.getElementById("nama")?.value?.trim();
    let id_pemesan = document.getElementById("id_pemesan")?.value?.trim();
    
    if (!nama || !id_pemesan) {
        alert("Nama dan ID Pemesan tidak boleh kosong!");
        return false;
    }

    // Validasi jumlah tiket
    let jumlah = parseInt(document.getElementById("jumlah")?.value);
    if (!jumlah || jumlah < 1 || jumlah > 10) {
        alert("Jumlah tiket harus antara 1-10!");
        return false;
    }

    // Validasi posisi duduk
    let seatSelections = document.querySelectorAll('select[name^="posisi_duduk"]');
    let selectedSeats = [];
    let selectedSeatNumbers = [];
    
    for (let i = 0; i < seatSelections.length; i++) {
        if (seatSelections[i].value === "") {
            alert(`Posisi duduk untuk tiket ${i + 1} harus dipilih!`);
            return false;
        }
        selectedSeats.push(seatSelections[i].value);
    }
    
    // Validasi nomor bangku
    let seatNumberSelections = document.querySelectorAll('select[name^="no_bangku"]');
    for (let i = 0; i < seatNumberSelections.length; i++) {
        if (seatNumberSelections[i].value === "") {
            alert(`Nomor bangku untuk tiket ${i + 1} harus dipilih!`);
            return false;
        }
        selectedSeatNumbers.push(seatNumberSelections[i].value);
    }
    
    // Cek duplikasi posisi duduk
    let uniqueSeats = [...new Set(selectedSeats)];
    if (uniqueSeats.length !== selectedSeats.length) {
        alert("Posisi duduk tidak boleh sama untuk setiap tiket!");
        return false;
    }
    
    // Cek duplikasi nomor bangku
    let uniqueSeatNumbers = [...new Set(selectedSeatNumbers)];
    if (uniqueSeatNumbers.length !== selectedSeatNumbers.length) {
        alert("Nomor bangku tidak boleh sama untuk setiap tiket!");
        return false;
    }

    // Validasi data diri untuk tiket tambahan
    for (let i = 2; i <= jumlah; i++) {
        const checkbox = document.getElementById(`sama_pemesan_${i}`);
        if (checkbox && !checkbox.checked) {
            const namaTiket = document.getElementById(`nama_tiket_${i}`)?.value?.trim();
            const idTiket = document.getElementById(`id_tiket_${i}`)?.value?.trim();
            const umurTiket = document.getElementById(`umur_tiket_${i}`)?.value?.trim();
            const jkTiket = document.getElementById(`jk_tiket_${i}`)?.value;
            
            if (!namaTiket || !idTiket || !umurTiket || !jkTiket) {
                alert(`Data diri untuk tiket ${i} harus diisi lengkap!`);
                return false;
            }
        }
    }

    // Gabungkan nama dan id, lalu acak urutannya
    let gabungan = nama + id_pemesan;
    let acak = shuffleString(gabungan);
    let kodeEnkripsi = hillCipherEncrypt(acak);
    
    if (kodeEnkripsi === 'ERROR') {
        alert("Terjadi kesalahan dalam generate kode pemesanan. Silakan coba lagi!");
        return false;
    }
    
    document.getElementById("kode_pemesanan").value = kodeEnkripsi;

    return true;
}

// Event listener untuk form pemesanan
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form[action="save_booking.php"]');
    if (form) {
        form.addEventListener("submit", function(event) {
            if (!processForm()) {
                event.preventDefault();
                return false;
            }
        });
    }
});

// Load data saat halaman dimuat
window.onload = function() {
    loadTerminal();
    loadJenisBis();
    generateSeatSelections();
    document.getElementById('terminal_asal').addEventListener('change', function() {
        loadTujuan();
        document.getElementById('waktu').innerHTML = '<option value="">Pilih Waktu</option>';
    });
    document.getElementById('tujuan').addEventListener('change', loadWaktu);
};

// Event listener untuk perubahan jumlah tiket
const jumlahInput = document.getElementById('jumlah');
if (jumlahInput) {
    jumlahInput.addEventListener('change', generateSeatSelections);
}

