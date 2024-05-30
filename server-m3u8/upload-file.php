<?php
$target_dir = "uploads/";
$target_file = $target_dir . md5(uniqid(rand(), true)) . '.m3u8';
$uploadOk = 1;
$fileType = strtolower(pathinfo($_FILES["fileToUpload"]["name"], PATHINFO_EXTENSION));

header('Content-Type: application/json');

// Check if the file is an m3u8 file
if ($fileType != "m3u8") {
    $response_data = array(
        'status' => 413,
        'message' => "Only m3u8 files are allowed.",
    );
    echo json_encode($response_data);
    $uploadOk = 0;
}

// Check file size
if ($_FILES["fileToUpload"]["size"] > 500000) {
    $response_data = array(
        'status' => 413,
        'message' => "Sorry, your file is too large.",
    );
    echo json_encode($response_data);
    $uploadOk = 0;
}

// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
    $response_data = array(
        'status' => 413,
        'message' => "Your file was not uploaded.",
    );
    echo json_encode($response_data);
} else {
    // Verify the file and move it to the final directory
    if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
        $response_data = array(
            'status' => 200,
            'message' => 'File uploaded successfully',
            'fileName' => getCurrentLink() . "/" . $target_file
        );
        echo json_encode($response_data);
    } else {
        $response_data = array(
            'status' => 413,
            'message' => "There was an error uploading your file.",
        );
        echo json_encode($response_data);
    }
}

function getCurrentLink()
{
    $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' ? 'https' : 'http';
    $hostName = $_SERVER['HTTP_HOST'];
    $currentUrl = $protocol . '://' . $hostName;
    return  $currentUrl;
}
