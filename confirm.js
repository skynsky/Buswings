// confirm.js - Add this to your confirm.html page
document.addEventListener('DOMContentLoaded', function() {
    loadBookingConfirmation();
});

function loadBookingConfirmation() {
    // Get booking data from storage
    const bookingData = getStoredBookingData();
    
    if (!bookingData) {
        showNoBookingError();
        return;
    }
    
    // Display booking details
    displayBookingDetails(bookingData);
    
    // Initialize confirmation actions
    initConfirmationActions(bookingData);
}

function displayBookingDetails(data) {
    // Update page title
    document.title = `Konfirmasi Pemesanan - ${data.kode_pemesanan}`;
    
    // Display booking code
    const bookingCodeEl = document.getElementById('booking-code');
    if (bookingCodeEl) {
        bookingCodeEl.textContent = data.kode_pemesanan;
    }
    
    // Display passenger details
    displayPassengerInfo(data);
    
    // Display trip details
    displayTripDetails(data);
    
    // Display seat information
    displaySeatInfo(data);
    
    // Display booking summary
    displayBookingSummary(data);
}

function displayPassengerInfo(data) {
    const passengerInfoEl = document.getElementById('passenger-info');
    if (passengerInfoEl) {
        passengerInfoEl.innerHTML = `
            <div class="passenger-card">
                <h3>Informasi Pemesan</h3>
                <div class="info-row">
                    <span class="label">Nama:</span>
                    <span class="value">${data.nama}</span>
                </div>
                <div class="info-row">
                    <span class="label">ID:</span>
                    <span class="value">${data.id_pemesan}</span>
                </div>
                <div class="info-row">
                    <span class="label">Umur:</span>
                    <span class="value">${data.umur} tahun</span>
                </div>
                <div class="info-row">
                    <span class="label">Jenis Kelamin:</span>
                    <span class="value">${data.jenis_kelamin}</span>
                </div>
            </div>
        `;
    }
}

function displayTripDetails(data) {
    const tripDetailsEl = document.getElementById('trip-details');
    if (tripDetailsEl) {
        tripDetailsEl.innerHTML = `
            <div class="trip-card">
                <h3>Detail Perjalanan</h3>
                <div class="info-row">
                    <span class="label">Terminal Asal:</span>
                    <span class="value">${getTerminalName(data.terminal_asal)}</span>
                </div>
                <div class="info-row">
                    <span class="label">Tujuan:</span>
                    <span class="value">${data.tujuan}</span>
                </div>
                <div class="info-row">
                    <span class="label">Jenis Bus:</span>
                    <span class="value">${getBusTypeName(data.jenis_bis_id)}</span>
                </div>
                <div class="info-row">
                    <span class="label">Waktu Keberangkatan:</span>
                    <span class="value">${data.waktu}</span>
                </div>
                <div class="info-row">
                    <span class="label">Jumlah Tiket:</span>
                    <span class="value">${data.jumlah} tiket</span>
                </div>
            </div>
        `;
    }
}

function displaySeatInfo(data) {
    const seatInfoEl = document.getElementById('seat-info');
    if (seatInfoEl && data.posisi_duduk && data.no_bangku) {
        let seatHTML = '<div class="seat-card"><h3>Informasi Tempat Duduk</h3>';
        
        for (let i = 0; i < data.posisi_duduk.length; i++) {
            seatHTML += `
                <div class="seat-item">
                    <span class="seat-number">Tiket ${i + 1}:</span>
                    <span class="seat-position">${data.posisi_duduk[i]}</span>
                    <span class="seat-no">Bangku ${data.no_bangku[i]}</span>
                </div>
            `;
        }
        
        seatHTML += '</div>';
        seatInfoEl.innerHTML = seatHTML;
    }
}

function displayBookingSummary(data) {
    const summaryEl = document.getElementById('booking-summary');
    if (summaryEl) {
        const bookingDate = new Date(data.tanggal_pesan);
        summaryEl.innerHTML = `
            <div class="summary-card">
                <h3>Ringkasan Pemesanan</h3>
                <div class="info-row">
                    <span class="label">Kode Pemesanan:</span>
                    <span class="value booking-code">${data.kode_pemesanan}</span>
                </div>
                <div class="info-row">
                    <span class="label">Tanggal Pesan:</span>
                    <span class="value">${formatDate(bookingDate)}</span>
                </div>
                <div class="info-row">
                    <span class="label">Status:</span>
                    <span class="value status-${data.status}">${getStatusText(data.status)}</span>
                </div>
            </div>
        `;
    }
}

function initConfirmationActions(data) {
    // Confirm booking button
    const confirmBtn = document.getElementById('confirm-booking');
    if (confirmBtn) {
        confirmBtn.addEventListener('click', () => {
            confirmBooking(data);
        });
    }
    
    // Cancel booking button
    const cancelBtn = document.getElementById('cancel-booking');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            cancelBooking();
        });
    }
    
    // Edit booking button
    const editBtn = document.getElementById('edit-booking');
    if (editBtn) {
        editBtn.addEventListener('click', () => {
            editBooking();
        });
    }
    
    // Print booking button
    const printBtn = document.getElementById('print-booking');
    if (printBtn) {
        printBtn.addEventListener('click', () => {
            printBooking();
        });
    }
}

function confirmBooking(data) {
    // Show confirmation dialog
    if (confirm('Apakah Anda yakin ingin mengkonfirmasi pemesanan ini?')) {
        showProcessing('Mengkonfirmasi pemesanan...');
        
        // Update booking status
        data.status = 'confirmed';
        data.confirmed_at = new Date().toISOString();
        
        // Send to server (if you have a backend)
        submitBookingToServer(data)
            .then(response => {
                hideProcessing();
                showSuccess('Pemesanan berhasil dikonfirmasi!');
                
                // Update display
                updateBookingStatus('confirmed');
                
                // Clear temporary storage
                clearStoredBookingData();
                
                // Redirect to success page after delay
                setTimeout(() => {
                    window.location.href = 'booking-success.html';
                }, 3000);
            })
            .catch(error => {
                hideProcessing();
                showError('Gagal mengkonfirmasi pemesanan. Silakan coba lagi.');
                console.error('Booking confirmation error:', error);
            });
    }
}

function cancelBooking() {
    if (confirm('Apakah Anda yakin ingin membatalkan pemesanan ini?')) {
        clearStoredBookingData();
        window.location.href = 'index.html';
    }
}

function editBooking() {
    // Store current data for editing
    const currentData = getStoredBookingData();
    sessionStorage.setItem('editingBooking', JSON.stringify(currentData));
    
    // Redirect back to booking form
    window.location.href = 'booking.html';
}

function printBooking() {
    window.print();
}

function submitBookingToServer(data) {
    return new Promise((resolve, reject) => {
        // If you have a backend, replace this with actual API call
        fetch('save_booking.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                resolve(data);
            } else {
                reject(new Error(data.message || 'Server error'));
            }
        })
        .catch(error => {
            reject(error);
        });
    });
}

function showNoBookingError() {
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.innerHTML = `
            <div class="error-container">
                <div class="error-icon">⚠️</div>
                <h2>Tidak Ada Data Pemesanan</h2>
                <p>Tidak ada data pemesanan yang ditemukan. Silakan lakukan pemesanan terlebih dahulu.</p>
                <button onclick="window.location.href='index.html'" class="btn btn-primary">
                    Kembali ke Beranda
                </button>
            </div>
        `;
    }
}

function updateBookingStatus(status) {
    const statusEl = document.querySelector('.status-' + status);
    if (statusEl) {
        statusEl.textContent = getStatusText(status);
        statusEl.className = 'value status-' + status;
    }
}

// Helper functions
function getTerminalName(terminalId) {
    // You can replace this with actual terminal data lookup
    const terminals = {
        '1': 'Terminal Gambir',
        '2': 'Terminal Kampung Rambutan',
        '3': 'Terminal Pulo Gebang',
        // Add more terminals as needed
    };
    return terminals[terminalId] || 'Terminal ' + terminalId;
}

function getBusTypeName(busTypeId) {
    // You can replace this with actual bus type data lookup
    const busTypes = {
        '1': 'Executive',
        '2': 'Economy AC',
        '3': 'VIP',
        '4': 'Double Decker',
        // Add more bus types as needed
    };
    return busTypes[busTypeId] || 'Bus Type ' + busTypeId;
}

function getStatusText(status) {
    const statusTexts = {
        'pending': 'Menunggu Konfirmasi',
        'confirmed': 'Dikonfirmasi',
        'cancelled': 'Dibatalkan',
        'completed': 'Selesai'
    };
    return statusTexts[status] || status;
}

function formatDate(date) {
    return date.toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function showProcessing(message) {
    const overlay = document.createElement('div');
    overlay.id = 'processing-overlay';
    overlay.innerHTML = `
        <div class="processing-content">
            <div class="spinner"></div>
            <p>${message}</p>
        </div>
    `;
    document.body.appendChild(overlay);
}

function hideProcessing() {
    const overlay = document.getElementById('processing-overlay');
    if (overlay) {
        overlay.remove();
    }
}

function showSuccess(message) {
    showNotification(message, 'success');
}

function showError(message) {
    showNotification(message, 'error');
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 5000);
}