<?php

namespace App\Repositories\Information;

use App\Models\WebsiteInfo;
use Illuminate\Database\Eloquent\Model;

class InformationRepository implements InformationInterface
{
    public function __construct(
        private Model $model = new WebsiteInfo()
    ) {
    }

    public function list()
    {
        return $this->model->get();
    }

}
