-- Tabel jenis bis
CREATE TABLE jenis_bis (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(100) NOT NULL
);

-- Tabel terminal
CREATE TABLE terminal (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama_terminal VARCHAR(100) NOT NULL,
    lokasi VARCHAR(100) NOT NULL
);

-- Tabel jadwal keberangkatan
CREATE TABLE jadwal (
    id INT AUTO_INCREMENT PRIMARY KEY,
    terminal_id INT,
    tujuan VARCHAR(100) NOT NULL,
    jam_mulai TIME NOT NULL,
    jam_selesai TIME NOT NULL,
    interval_menit INT NOT NULL,
    FOREIGN KEY (terminal_id) REFERENCES terminal(id)
);

-- Tabel bookings (pemesanan)
CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(255) NOT NULL,
    id_pemesan VARCHAR(30) NOT NULL,
    umur INT NOT NULL,
    jenis_kelamin ENUM('Laki-laki', 'Perempuan') NOT NULL,
    tujuan VARCHAR(100) NOT NULL,
    terminal_asal VARCHAR(100) NOT NULL,
    waktu DATETIME NOT NULL,
    jumlah INT NOT NULL,
    posisi_duduk VARCHAR(50) NOT NULL,
    no_bangku VARCHAR(10) NOT NULL,
    kode_pemesanan VARCHAR(10) NOT NULL,
    jenis_bis_id INT,
    FOREIGN KEY (jenis_bis_id) REFERENCES jenis_bis(id)
);

INSERT INTO terminal (nama_terminal, lokasi) VALUES
('Kampung Rambutan', 'Jakarta'),
('Pulo Gebang', 'Jakarta'),
('Cikarang', 'Bekasi'),
('Cicaheum', 'Bandung'),
('Leuwi Panjang', 'Bandung');

INSERT INTO jenis_bis (nama) VALUES
('Executive'),
('Economy AC'),
('Medium Bus'),
('Double Decker'),
('Super Eksekutif');

-- Dari Kampung Rambutan
INSERT INTO jadwal (terminal_id, tujuan, jam_mulai, jam_selesai, interval_menit) VALUES
(1, 'Bandung', '05:00:00', '23:00:00', 60),
(1, 'Bogor', '05:00:00', '23:00:00', 60),
(1, 'Sukabumi', '05:00:00', '23:00:00', 60);  -- :contentReference[oaicite:2]{index=2}

-- Dari Pulo Gebang (AKDP ke Jabar)
INSERT INTO jadwal (terminal_id, tujuan, jam_mulai, jam_selesai, interval_menit) VALUES
(2, 'Bandung', '05:00:00', '22:00:00', 60);  -- :contentReference[oaicite:3]{index=3}

-- Dari Cikarang
INSERT INTO jadwal (terminal_id, tujuan, jam_mulai, jam_selesai, interval_menit) VALUES
(3, 'Bandung', '06:00:00', '18:00:00', 60),
(3, 'Bekasi', '05:00:00', '21:00:00', 60),
(3, 'Karawang', '05:30:00', '19:30:00', 60),
(3, 'Purwakarta', '07:00:00', '17:00:00', 60);  -- :contentReference[oaicite:4]{index=4}

-- Dari Cicaheum (Bandung AKDP)
-- Rute ke berbagai kota Jabar (Cirebon, Indramayu, Garut, Tasikmalaya, Pangandaran) berdasarkan terminal Cicaheum outline
-- PO spesifik:
INSERT INTO jadwal (terminal_id, tujuan, jam_mulai, jam_selesai, interval_menit) VALUES
(4, 'Cirebon', '06:00:00', '18:00:00', 120),
(4, 'Indramayu', '06:00:00', '18:00:00', 120),
(4, 'Garut', '06:00:00', '18:00:00', 120),
(4, 'Tasikmalaya', '06:00:00', '18:00:00', 120),
(4, 'Pangandaran', '06:00:00', '18:00:00', 180);  -- :contentReference[oaicite:5]{index=5}

-- Dari Leuwi Panjang (Bandung ke Sumatra dan Jabar)
INSERT INTO jadwal (terminal_id, tujuan, jam_mulai, jam_selesai, interval_menit) VALUES
(5, 'Jakarta', '06:00:00', '21:00:00', 60),
(5, 'Liwa', '06:00:00', '21:00:00', 120),
(5, 'Palembang', '06:00:00', '21:00:00', 180);  -- :contentReference[oaicite:6]{index=6}
