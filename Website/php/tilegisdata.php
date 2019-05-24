<?php
ini_set('display_errors', 1);

$host = '127.0.0.1';
$port = '*';
$dbname = '*';
$user = '*';
$password = '*';

if ($_GET) {
	$minlon = $_GET['minlon'];
	$minlat = $_GET['minlat'];
	$maxlon = $_GET['maxlon'];
	$maxlat = $_GET['maxlat'];
} else {
	$minlon = $argv[1];
	$minlat = $argv[2];
	$maxlon = $argv[3];
	$maxlat = $argv[4];
}

$conn = pg_connect("host=$host port=$port dbname=$dbname user=$user password=$password");
if (!$conn) {
    echo "Connection Error:" . pg_error();
    exit;
}

$sql = "SELECT * FROM opencellid WHERE lon <= " . $maxlon . " AND lon >= " . $minlon . " AND lat <= " . $maxlat . " AND lat >= " . $minlat . ";"; 
// for limiting data add to the query ex. limit 50

// sending the query
if (!$response = pg_query($conn, $sql)) {
	echo "A query error occured.\n";
	exit;
}

// echo the data back 
while ($row = pg_fetch_row($response)) {

	foreach($row as $i => $attr) 
		echo $attr.", ";
	echo ";";
}

?>
