<?php

namespace App\Http\Controllers\Information;

use App\Http\Controllers\Controller;
use App\Http\Resources\Movie\MovieResource;
use App\Repositories\Information\InformationInterface;
use App\Repositories\Movie\MovieInterface;
use Illuminate\Http\Request;

class InforController extends Controller
{

    public function __construct(
        private InformationInterface $informationRepository,
        private MovieInterface $movieRepository
    ) {
    }

    public function list()
    {
        return $this->informationRepository->list();
    }

    public function homeBanners()
    {
        $banners = $this->movieRepository->autoBannerMovie();
        return MovieResource::collection($banners);
    }
}
