<?php
// Đường dẫn thư mục lưu trữ hình ảnh
$targetDir = "uploads-images/";
$uploadOk = 1;
$imageFileType = strtolower(pathinfo($_FILES["fileToUpload"]["name"], PATHINFO_EXTENSION));

// Tạo tên file ngẫu nhiên
$randomFileName = uniqid() . '.' . $imageFileType;
$targetFile = $targetDir . $randomFileName;

// Kiểm tra xem file có phải là hình ảnh thật hay không
if (isset($_POST["submit"])) {
    $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
    if ($check !== false) {
        $uploadOk = 1;
    } else {
        $uploadOk = 0;
        echo json_encode(["msg" => "File không phải là hình ảnh."]);
        exit;
    }
}

// Kiểm tra kích thước file
if ($_FILES["fileToUpload"]["size"] > 500000) {
    $uploadOk = 0;
    echo json_encode(["msg" => "Xin lỗi, file của bạn quá lớn."]);
    exit;
}

// Cho phép các định dạng file cụ thể
if ($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif") {
    $uploadOk = 0;
    echo json_encode(["msg" => "Xin lỗi, chỉ các file JPG, JPEG, PNG & GIF được cho phép."]);
    exit;
}

// Kiểm tra xem $uploadOk có bị đặt thành 0 bởi lỗi nào không
if ($uploadOk == 0) {
    echo json_encode(["msg" => "Xin lỗi, file của bạn không được upload."]);
    exit;
    // Nếu mọi thứ đều ổn, thử upload file
} else {
    if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $targetFile)) {
        echo json_encode([
            "msg" => "File đã được upload thành công.",
            'server_url' => getCurrentLink(), 
            "link" => $targetFile
        ]);
    } else {
        echo json_encode(["msg" => "Xin lỗi, đã xảy ra lỗi khi upload file của bạn."]);
    }
}


function getCurrentLink()
{
    $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' ? 'https' : 'http';
    $hostName = $_SERVER['HTTP_HOST'];
    $currentUrl = $protocol . '://' . $hostName;
    return  $currentUrl;
}
