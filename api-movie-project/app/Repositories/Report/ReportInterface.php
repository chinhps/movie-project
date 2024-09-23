<?php

namespace App\Repositories\Report;

use App\Models\Comment;
use App\Models\Movie;
use App\Models\User;

interface ReportInterface
{
    public function detail(float $id);

    public function commentList(float $limit = 15);

    public function movieList(float $limit = 15);

    public function updateStatus(float $id, string $status);

    public function updateOrInsert(
        ?float $id,
        array $params,
        User $user,
        ?Movie $movie = null,
        ?Comment $comment = null
    );
}
