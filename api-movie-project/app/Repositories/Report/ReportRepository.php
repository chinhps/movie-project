<?php

namespace App\Repositories\Report;

use App\Models\Movie;
use App\Models\MovieReport;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class ReportRepository implements ReportInterface
{
    public function __construct(
        private Model $model = new MovieReport()
    ) {
    }

    public function updateOrInsert(float|null $id, array $params, User $user, Movie $movie)
    {
        $report = new MovieReport();
        if ($id) {
            $report = $this->model->find($id);
        }
        $report->movie()->associate($movie);
        $report->user()->associate($user);
        $report->fill($params);
        $report->save();

        return $report;
    }
}
