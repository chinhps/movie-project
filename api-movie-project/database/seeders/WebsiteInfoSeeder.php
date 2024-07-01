<?php

namespace Database\Seeders;

use App\Models\WebsiteInfo;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class WebsiteInfoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        /*
            LOGO => link,
            Email => string,
            Brand => name brand
            description => string 
        */
        WebsiteInfo::create([
            "asset_key" => "LOGO",
            "asset_name" => "Logo",
            "asset_data" => "https://i.imgur.com/VKvo2q0.png"
        ]);

        WebsiteInfo::create([
            "asset_key" => "EMAIL",
            "asset_name" => "Email liên hệ",
            "asset_data" => "chinh@chinh.dev"
        ]);

        WebsiteInfo::create([
            "asset_key" => "BRAND",
            "asset_name" => "Tên thương hiệu",
            "asset_data" => "AnimeFu"
        ]);

        WebsiteInfo::create([
            "asset_key" => "DOMAIN",
            "asset_name" => "Tên miền",
            "asset_data" => explode("//", env("APP_URL"))[1]
        ]);

        WebsiteInfo::create([
            "asset_key" => "DESCRIPTION",
            "asset_name" => "Mô tả website (SEO)",
            "asset_data" => "AnimeFu - Trang web xem Anime HD trực tuyến. Kho Anime phong phú nhiều thể loại, cập nhật mới liên tục mỗi ngày."
        ]);

        WebsiteInfo::create([
            "asset_key" => "KEYWORD",
            "asset_name" => "Từ khoá (SEO)",
            "asset_data" => "anime,animefu"
        ]);
    }
}
