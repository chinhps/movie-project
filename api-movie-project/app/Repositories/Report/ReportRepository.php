<?php

namespace App\Repositories\Report;

use App\Models\Comment;
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

    public function commentList(float $limit = 15)
    {
        return $this->model->with(["user", "reportable"])->where('reportable_type', "comment")->paginate($limit);
    }

    public function movieList(float $limit = 15)
    {
        return $this->model->with(["user", "reportable"])->where('reportable_type', "movie")->paginate($limit);
    }

    public function detail(float $id)
    {
        return $this->model->find($id);
    }

    public function updateStatus(float $id, string $status)
    {
        $data = $this->model->with(["user", "reportable"])->find($id);
        $data->status = $status;
        $data->save();
        return $data;
    }

    public function updateOrInsert(
        float|null $id,
        array $params,
        User $user,
        ?Movie $movie = null,
        ?Comment $comment = null
    ) {
        $report = new MovieReport();
        if ($id) {
            $report = $this->model->find($id);
        }
        $report->user()->associate($user);
        $report->fill($params);
        $report->save();
        if ($movie) {
            $movie->reports()->save($report);
        }
        if ($comment) {
            $comment->reports()->save($report);
        }
        return $report;
    }
}
