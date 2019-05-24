<?php
ini_set('display_errors', 1);

// read from file
$files = file_get_contents("filepath");

// split new lines
$file = explode(PHP_EOL, $file);
$first = 0;
$array = array();

// foreach line do the following
foreach($file as $line) {

	// ignore first line
	if ($first == 0) $first = 1;
	else {
		// separate line with comma
		$str = explode(",", $line);

		// check if lac = 231
		if ($str[7] == 231)
			array_push($array, $str[5] . ',' . $str[7]);
	}
 
}
// print only distinct lines
$result = array_unique($array);
print_r($result);
?>
