<?php

namespace App\Http\Controllers\Information;

use App\Http\Controllers\Controller;
use App\Repositories\Information\InformationInterface;
use Illuminate\Http\Request;

class InforController extends Controller
{

    public function __construct(
        private InformationInterface $informationRepository
    ) {
    }

    public function list()
    {
        return $this->informationRepository->list();
    }
}
