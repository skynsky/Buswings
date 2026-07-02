<?php
$host = "localhost";
$user = "root";
$password = "";
$database = "bus_booking";

$conn = new mysqli($host, $user, $password, $database);

if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}

$kode = isset($_GET['kode_pemesanan']) ? trim($_GET['kode_pemesanan']) : '';
$tickets = [];
if ($kode !== '') {
    $sql = "SELECT b.*, jb.nama as jenis_bis_nama FROM bookings b LEFT JOIN jenis_bis jb ON b.jenis_bis_id = jb.id WHERE b.kode_pemesanan = ? ORDER BY b.waktu DESC, b.nama";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $kode);
    $stmt->execute();
    $result = $stmt->get_result();
    while ($row = $result->fetch_assoc()) {
        $tickets[] = $row;
    }
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Status Pemesanan Tiket</title>
    <link rel="stylesheet" href="style.css">
    <style>
        .ticket-box { margin-bottom: 20px; }
    </style>
</head>
<body>
    <h2>Status Pemesanan Tiket</h2>
    <div class="container">
        <form action="cek_status.php" method="GET" style="margin-bottom: 30px;">
            <label for="kode_pemesanan">Masukkan Kode Pemesanan:</label>
            <input type="text" id="kode_pemesanan" name="kode_pemesanan" maxlength="10" required value="<?php echo htmlspecialchars($kode); ?>">
            <button type="submit" style="background-color: #007bff; margin-top: 10px;">🔍 Cek Status</button>
        </form>
        <?php if ($kode !== ''): ?>
            <?php if (count($tickets) > 0): ?>
                <div class="ticket-box">
                    <h3>Detail Pemesanan</h3>
                    <p><b>Nama:</b> <?php echo htmlspecialchars($tickets[0]['nama']); ?></p>
                    <p><b>ID (KTP/Passport/Kartu Pelajar):</b> <?php echo htmlspecialchars($tickets[0]['id_pemesan']); ?></p>
                    <p><b>Terminal Asal:</b> <?php echo htmlspecialchars($tickets[0]['terminal_asal']); ?></p>
                    <p><b>Tujuan:</b> <?php echo htmlspecialchars($tickets[0]['tujuan']); ?></p>
                    <p><b>Jenis Bus:</b> <?php echo htmlspecialchars($tickets[0]['jenis_bis_nama']); ?></p>
                    <p><b>Umur:</b> <?php echo htmlspecialchars($tickets[0]['umur']); ?> tahun</p>
                    <p><b>Jenis Kelamin:</b> <?php echo htmlspecialchars($tickets[0]['jenis_kelamin']); ?></p>
                    <p><b>Waktu Pemberangkatan:</b> <?php echo htmlspecialchars($tickets[0]['waktu']); ?></p>
                    <p><b>Jumlah Tiket:</b> <?php echo count($tickets); ?> tiket</p>
                    <p><b>Data Tiket:</b></p>
                    <ul style="margin-left: 20px;">
                        <?php foreach ($tickets as $i => $t): ?>
                            <li>
                                <b>Tiket <?php echo ($i + 1); ?>:</b><br>
                                Nama: <?php echo htmlspecialchars($t['nama']); ?><br>
                                ID: <?php echo htmlspecialchars($t['id_pemesan']); ?><br>
                                Umur: <?php echo htmlspecialchars($t['umur']); ?><br>
                                Jenis Kelamin: <?php echo htmlspecialchars($t['jenis_kelamin']); ?><br>
                                Posisi Duduk: <?php echo htmlspecialchars($t['posisi_duduk']); ?><br>
                                Nomor Bangku: <?php echo htmlspecialchars($t['no_bangku'] ?? 'N/A'); ?>
                            </li>
                        <?php endforeach; ?>
                    </ul>
                    <p class="code">Kode Pemesanan: <?php echo htmlspecialchars($tickets[0]['kode_pemesanan']); ?></p>
                </div>
            <?php else: ?>
                <div class="ticket-box">
                    <p style="color: #c00; text-align:center;">❌ Kode pemesanan tidak ditemukan.</p>
                </div>
            <?php endif; ?>
        <?php endif; ?>
        <button type="button" onclick="window.location.href='index.html'" style="margin-top: 20px;">⬅️ Kembali ke Pemesanan</button>
    </div>
</body>
</html>
<?php $conn->close(); ?> 