<?php
$host = "localhost";
$user = "root";
$password = "";
$database = "bus_booking";

$conn = new mysqli($host, $user, $password, $database);

if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Validate required fields
    $required_fields = ['nama', 'id_pemesan', 'terminal_asal', 'tujuan', 'jenis_bis_id', 'umur', 'jenis_kelamin', 'waktu', 'jumlah', 'posisi_duduk', 'kode_pemesanan'];
    
    foreach ($required_fields as $field) {
        if (!isset($_POST[$field]) || empty($_POST[$field])) {
            die("❌ Error: Field $field is required");
        }
    }
    
    $nama = $_POST['nama'];
    $id_pemesan = $_POST['id_pemesan'];
    $terminal_asal = $_POST['terminal_asal'];
    $tujuan = $_POST['tujuan'];
    $jenis_bis_id = $_POST['jenis_bis_id'];
    $umur = $_POST['umur'];
    $jenis_kelamin = $_POST['jenis_kelamin'];
    $waktu_jam = $_POST['waktu'];
    $tanggal_hari_ini = date('Y-m-d');
    $waktu = $tanggal_hari_ini . ' ' . $waktu_jam . ':00';
    $jumlah = $_POST['jumlah'];
    $posisi_duduk_array = $_POST['posisi_duduk'];
    $no_bangku_array = isset($_POST['no_bangku']) ? $_POST['no_bangku'] : [];
    $kode_pemesanan = $_POST['kode_pemesanan'];

    // Validate arrays
    if (count($posisi_duduk_array) != $jumlah) {
        die("❌ Error: Jumlah posisi duduk tidak sesuai dengan jumlah tiket");
    }
    
    if (count($no_bangku_array) != $jumlah) {
        die("❌ Error: Jumlah nomor bangku tidak sesuai dengan jumlah tiket");
    }

    // Cek apakah sudah ada pemesanan dengan data yang sama
    $check_query = "SELECT kode_pemesanan FROM bookings WHERE nama=? AND id_pemesan=? AND terminal_asal=? AND tujuan=? AND waktu=? LIMIT 1";
    $stmt = $conn->prepare($check_query);
    $stmt->bind_param("sssss", $nama, $id_pemesan, $terminal_asal, $tujuan, $waktu);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $kode_pemesanan = $row['kode_pemesanan'];
    } else {
        // Insert data untuk setiap tiket
        $sql = "INSERT INTO bookings (nama, id_pemesan, terminal_asal, tujuan, jenis_bis_id, umur, jenis_kelamin, waktu, jumlah, posisi_duduk, no_bangku, kode_pemesanan) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        
        if (!$stmt) {
            die("❌ Error preparing statement: " . $conn->error);
        }
        
        $success = true;
        for ($i = 0; $i < $jumlah; $i++) {
            $posisi_duduk = $posisi_duduk_array[$i];
            $no_bangku = $no_bangku_array[$i];
            
            // Ambil data diri per tiket jika ada
            $nama_tiket = isset($_POST['nama_tiket'][$i-1]) ? $_POST['nama_tiket'][$i-1] : $nama;
            $id_tiket = isset($_POST['id_tiket'][$i-1]) ? $_POST['id_tiket'][$i-1] : $id_pemesan;
            $umur_tiket = isset($_POST['umur_tiket'][$i-1]) ? $_POST['umur_tiket'][$i-1] : $umur;
            $jk_tiket = isset($_POST['jk_tiket'][$i-1]) ? $_POST['jk_tiket'][$i-1] : $jenis_kelamin;
            
            $stmt->bind_param("sssssiisssss", $nama_tiket, $id_tiket, $terminal_asal, $tujuan, $jenis_bis_id, $umur_tiket, $jk_tiket, $waktu, $jumlah, $posisi_duduk, $no_bangku, $kode_pemesanan);
            if (!$stmt->execute()) {
                $success = false;
                break;
            }
        }
        
        if (!$success) {
            die("❌ Error menyimpan data: " . $stmt->error);
        }
    }

    // Ambil nama jenis bis untuk ditampilkan
    $jenis_bis_query = "SELECT nama FROM jenis_bis WHERE id = ?";
    $stmt = $conn->prepare($jenis_bis_query);
    $stmt->bind_param("i", $jenis_bis_id);
    $stmt->execute();
    $jenis_bis_result = $stmt->get_result();
    $jenis_bis_nama = "";
    if ($jenis_bis_result->num_rows > 0) {
        $jenis_bis_row = $jenis_bis_result->fetch_assoc();
        $jenis_bis_nama = $jenis_bis_row['nama'];
    }
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Konfirmasi Pemesanan</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="container">
    <h2>✅ Pemesanan Berhasil!</h2>
    <div class="ticket-box">
        <p><b>Nama:</b> <?php echo htmlspecialchars($nama); ?></p>
        <p><b>ID (KTP/Passport/Kartu Pelajar):</b> <?php echo htmlspecialchars($id_pemesan); ?></p>
        <p><b>Terminal Asal:</b> <?php echo htmlspecialchars($terminal_asal); ?></p>
        <p><b>Tujuan:</b> <?php echo htmlspecialchars($tujuan); ?></p>
        <p><b>Jenis Bus:</b> <?php echo htmlspecialchars($jenis_bis_nama); ?></p>
        <p><b>Umur:</b> <?php echo htmlspecialchars($umur); ?> tahun</p>
        <p><b>Jenis Kelamin:</b> <?php echo htmlspecialchars($jenis_kelamin); ?></p>
        <p><b>Waktu Pemberangkatan:</b> <?php echo htmlspecialchars($waktu); ?></p>
        <p><b>Jumlah Tiket:</b> <?php echo htmlspecialchars($jumlah); ?> tiket</p>
        <p><b>Data Tiket:</b></p>
        <ul style="margin-left: 20px;">
            <?php for ($i = 0; $i < $jumlah; $i++): ?>
                <li>
                    <b>Tiket <?php echo ($i + 1); ?>:</b><br>
                    <?php
                    // Data diri per tiket (jika ada)
                    $nama_tiket = isset($_POST['nama_tiket'][$i-1]) ? $_POST['nama_tiket'][$i-1] : $nama;
                    $id_tiket = isset($_POST['id_tiket'][$i-1]) ? $_POST['id_tiket'][$i-1] : $id_pemesan;
                    $umur_tiket = isset($_POST['umur_tiket'][$i-1]) ? $_POST['umur_tiket'][$i-1] : $umur;
                    $jk_tiket = isset($_POST['jk_tiket'][$i-1]) ? $_POST['jk_tiket'][$i-1] : $jenis_kelamin;
                    ?>
                    Nama: <?php echo htmlspecialchars($nama_tiket); ?><br>
                    ID: <?php echo htmlspecialchars($id_tiket); ?><br>
                    Umur: <?php echo htmlspecialchars($umur_tiket); ?><br>
                    Jenis Kelamin: <?php echo htmlspecialchars($jk_tiket); ?><br>
                    Posisi Duduk: <?php echo htmlspecialchars($posisi_duduk_array[$i]); ?><br>
                    Nomor Bangku: <?php echo htmlspecialchars($no_bangku_array[$i]); ?>
                </li>
            <?php endfor; ?>
        </ul>
        <p class="code">Kode Pemesanan: <?php echo htmlspecialchars($kode_pemesanan); ?></p>
    </div>
    <button onclick="window.print()">🖨 Cetak Tiket</button>
    <button onclick="resetForm()">🔄 Reset</button>
</div>

<script>
function resetForm() {
    if (confirm("Apakah Anda yakin ingin mereset pemesanan?")) {
        window.location.href = "index.html"; // Redirect ke halaman awal pemesanan
    }
}
</script>

</body>
</html>
<?php
}

$conn->close();
?>
