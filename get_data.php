<?php
header('Content-Type: application/json');

$host = "localhost";
$user = "root";
$password = "";
$database = "bus_booking";

$conn = new mysqli($host, $user, $password, $database);

if ($conn->connect_error) {
    die(json_encode(['error' => 'Koneksi gagal: ' . $conn->connect_error]));
}

$type = $_GET['type'] ?? '';

switch ($type) {
    case 'terminal':
        $sql = "SELECT id, nama_terminal, lokasi FROM terminal ORDER BY nama_terminal";
        $result = $conn->query($sql);
        $data = [];
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
        }
        echo json_encode($data);
        break;
        
    case 'jenis_bis':
        $sql = "SELECT id, nama FROM jenis_bis ORDER BY nama";
        $result = $conn->query($sql);
        $data = [];
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
        }
        echo json_encode($data);
        break;
        
    case 'jadwal':
        $terminal_id = $_GET['terminal_id'] ?? '';
        if ($terminal_id) {
            $sql = "SELECT DISTINCT TRIM(tujuan) as tujuan FROM jadwal WHERE terminal_id = ? ORDER BY tujuan";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("i", $terminal_id);
            $stmt->execute();
            $result = $stmt->get_result();
            $data = [];
            if ($result->num_rows > 0) {
                while($row = $result->fetch_assoc()) {
                    $data[] = $row;
                }
            }
            echo json_encode($data);
        } else {
            echo json_encode([]);
        }
        break;
    case 'waktu':
        $terminal_id = $_GET['terminal_id'] ?? '';
        $tujuan = $_GET['tujuan'] ?? '';
        if ($terminal_id && $tujuan) {
            $sql = "SELECT jam_mulai, jam_selesai, interval_menit FROM jadwal WHERE terminal_id = ? AND tujuan = ? LIMIT 1";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("is", $terminal_id, $tujuan);
            $stmt->execute();
            $result = $stmt->get_result();
            $data = [];
            if ($row = $result->fetch_assoc()) {
                $jam_mulai = $row['jam_mulai'];
                $jam_selesai = $row['jam_selesai'];
                $interval = (int)$row['interval_menit'];
                $current = strtotime($jam_mulai);
                $end = strtotime($jam_selesai);
                while ($current <= $end) {
                    $data[] = date('H:i', $current);
                    $current = strtotime("+{$interval} minutes", $current);
                }
            }
            echo json_encode($data);
        } else {
            echo json_encode([]);
        }
        break;
    default:
        echo json_encode(['error' => 'Tipe data tidak valid']);
}

$conn->close();
?> 