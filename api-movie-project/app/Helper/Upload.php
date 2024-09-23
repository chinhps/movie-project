<?php

use App\Jobs\UploadAvatarImgur;
use App\Jobs\UploadFileAPI;
use App\Models\User;

if (! function_exists('uploadImageQueue')) {
    function uploadImageQueue($image)
    {
        if (is_string($image)) {
            return $image;
        }
        $name = generateRandomFileName();
        // UPLOAD IMAGE QUEUE
        UploadFileAPI::dispatch(
            $image->store('uploads_temp'),
            $name,
            $image->getClientOriginalName()
        );

        return env('API_SERVER_IMAGE_STORAGE').'/'.$name.'.'.$image->getClientOriginalExtension();
    }
}

if (! function_exists('uploadAvatar')) {
    function uploadAvatar($image, User $user)
    {
        // UPLOAD IMAGE QUEUE
        $name = generateRandomFileName();
        $path = $image->storeAs(
            'avatars',
            $name
        );
        UploadAvatarImgur::dispatch($path, $user, $name);
    }
}

if (! function_exists('generateRandomFileName')) {
    function generateRandomFileName()
    {
        $prefix = 'image-';
        $uniqueId = uniqid();
        $randomString = bin2hex(random_bytes(16)); // Tạo chuỗi ngẫu nhiên có 32 ký tự
        $fileName = "{$prefix}{$uniqueId}-{$randomString}";

        return $fileName;
    }
}
