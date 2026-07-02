<?php
// Installation script for Bus Booking System
error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "<h1>🚌 Bus Booking System - Installation</h1>";
echo "<style>
    body { font-family: Arial, sans-serif; margin: 20px; }
    .success { color: green; }
    .error { color: red; }
    .warning { color: orange; }
    .info { color: blue; }
    .step { margin: 20px 0; padding: 10px; border-left: 4px solid #007bff; }
</style>";

// Step 1: Check PHP version
echo "<div class='step'>";
echo "<h3>Step 1: Checking PHP Version</h3>";
if (version_compare(PHP_VERSION, '7.4.0', '>=')) {
    echo "<p class='success'>✅ PHP Version: " . PHP_VERSION . " (Compatible)</p>";
} else {
    echo "<p class='error'>❌ PHP Version: " . PHP_VERSION . " (Requires 7.4 or higher)</p>";
    exit;
}
echo "</div>";

// Step 2: Check MySQL extension
echo "<div class='step'>";
echo "<h3>Step 2: Checking MySQL Extension</h3>";
if (extension_loaded('mysqli')) {
    echo "<p class='success'>✅ MySQLi extension is loaded</p>";
} else {
    echo "<p class='error'>❌ MySQLi extension is not loaded</p>";
    exit;
}
echo "</div>";

// Step 3: Test database connection
echo "<div class='step'>";
echo "<h3>Step 3: Testing Database Connection</h3>";
$host = "localhost";
$user = "root";
$password = "";
$database = "bus_booking";

$conn = new mysqli($host, $user, $password);

if ($conn->connect_error) {
    echo "<p class='error'>❌ Database connection failed: " . $conn->connect_error . "</p>";
    echo "<p class='info'>💡 Make sure XAMPP is running and MySQL service is started</p>";
    exit;
} else {
    echo "<p class='success'>✅ Database connection successful</p>";
}

// Check if database exists
$result = $conn->query("SHOW DATABASES LIKE '$database'");
if ($result->num_rows > 0) {
    echo "<p class='success'>✅ Database '$database' exists</p>";
    $conn->select_db($database);
} else {
    echo "<p class='warning'>⚠️ Database '$database' does not exist</p>";
    echo "<p class='info'>💡 Please create the database manually in phpMyAdmin or run the SQL script</p>";
    echo "<p class='info'>📝 SQL: CREATE DATABASE bus_booking;</p>";
    exit;
}
echo "</div>";

// Step 4: Check tables
echo "<div class='step'>";
echo "<h3>Step 4: Checking Database Tables</h3>";
$tables = ['terminal', 'jenis_bis', 'jadwal', 'bookings'];
$allTablesExist = true;

foreach ($tables as $table) {
    $result = $conn->query("SHOW TABLES LIKE '$table'");
    if ($result->num_rows > 0) {
        echo "<p class='success'>✅ Table '$table' exists</p>";
        
        // Check if table has data
        $count = $conn->query("SELECT COUNT(*) as count FROM $table")->fetch_assoc()['count'];
        echo "<p class='info'>   📊 Records: $count</p>";
    } else {
        echo "<p class='error'>❌ Table '$table' does not exist</p>";
        $allTablesExist = false;
    }
}

if (!$allTablesExist) {
    echo "<p class='warning'>⚠️ Some tables are missing. Please import database.sql</p>";
    echo "<p class='info'>💡 Go to phpMyAdmin > bus_booking > Import > Choose database.sql</p>";
    exit;
}
echo "</div>";

// Step 5: Test API endpoints
echo "<div class='step'>";
echo "<h3>Step 5: Testing API Endpoints</h3>";

// Test get_data.php
$testUrls = [
    'get_data.php?type=terminal' => 'Terminal Data',
    'get_data.php?type=jenis_bis' => 'Bus Types Data',
    'get_data.php?type=jadwal&terminal_id=1' => 'Schedule Data'
];

foreach ($testUrls as $url => $description) {
    $context = stream_context_create(['http' => ['timeout' => 5]]);
    $response = @file_get_contents($url, false, $context);
    
    if ($response !== false) {
        $data = json_decode($response, true);
        if (json_last_error() === JSON_ERROR_NONE && is_array($data)) {
            echo "<p class='success'>✅ $description: " . count($data) . " records</p>";
        } else {
            echo "<p class='error'>❌ $description: Invalid JSON response</p>";
        }
    } else {
        echo "<p class='error'>❌ $description: Connection failed</p>";
    }
}
echo "</div>";

// Step 6: System Status
echo "<div class='step'>";
echo "<h3>Step 6: System Status</h3>";
echo "<p class='success'>🎉 Installation completed successfully!</p>";
echo "<p class='info'>📱 You can now access the system at: <a href='Index.html'>Index.html</a></p>";
echo "<p class='info'>🔍 Test status checking at: <a href='cek_status.html'>cek_status.html</a></p>";
echo "<p class='info'>🧪 Test database connection at: <a href='test_connection.php'>test_connection.php</a></p>";
echo "</div>";

// Step 7: Recommendations
echo "<div class='step'>";
echo "<h3>Step 7: Recommendations</h3>";
echo "<ul>";
echo "<li>🔒 Change default database credentials in production</li>";
echo "<li>📁 Set proper file permissions</li>";
echo "<li>🔄 Regular database backups</li>";
echo "<li>📊 Monitor system performance</li>";
echo "<li>🛡️ Implement security measures</li>";
echo "</ul>";
echo "</div>";

$conn->close();
?> 