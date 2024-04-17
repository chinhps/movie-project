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
        WebsiteInfo::factory(4)->create();
    }
}
