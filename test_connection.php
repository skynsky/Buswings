<?php
$host = "localhost";
$user = "root";
$password = "";
$database = "bus_booking";

$conn = new mysqli($host, $user, $password, $database);

if ($conn->connect_error) {
    die("❌ Koneksi gagal: " . $conn->connect_error);
}

echo "✅ Koneksi database berhasil!<br>";

// Test query untuk mengecek tabel
$tables = ['terminal', 'jenis_bis', 'jadwal', 'bookings'];
foreach ($tables as $table) {
    $result = $conn->query("SHOW TABLES LIKE '$table'");
    if ($result->num_rows > 0) {
        echo "✅ Tabel '$table' ditemukan<br>";
        
        // Cek struktur tabel
        $columns = $conn->query("DESCRIBE $table");
        echo "   Kolom dalam tabel $table:<br>";
        while ($row = $columns->fetch_assoc()) {
            echo "   - {$row['Field']} ({$row['Type']})<br>";
        }
        echo "<br>";
    } else {
        echo "❌ Tabel '$table' tidak ditemukan<br>";
    }
}

// Test data
echo "<h3>Data Test:</h3>";
$result = $conn->query("SELECT COUNT(*) as count FROM terminal");
$row = $result->fetch_assoc();
echo "Jumlah terminal: " . $row['count'] . "<br>";

$result = $conn->query("SELECT COUNT(*) as count FROM jenis_bis");
$row = $result->fetch_assoc();
echo "Jumlah jenis bus: " . $row['count'] . "<br>";

$result = $conn->query("SELECT COUNT(*) as count FROM jadwal");
$row = $result->fetch_assoc();
echo "Jumlah jadwal: " . $row['count'] . "<br>";

$result = $conn->query("SELECT COUNT(*) as count FROM bookings");
$row = $result->fetch_assoc();
echo "Jumlah pemesanan: " . $row['count'] . "<br>";

$conn->close();
?> 