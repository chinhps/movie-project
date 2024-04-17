<?php

namespace App\Http\Controllers\Movie;

use App\Http\Controllers\Controller;
use App\Http\Requests\Movie\MovieReportRequest;
use App\Repositories\Movie\MovieInterface;
use App\Repositories\MovieEpisode\MovieEpisodeInterface;
use App\Repositories\Report\ReportInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReportController extends Controller
{

    public function __construct(
        private ReportInterface $reportRepository,
        private MovieInterface $movieRepository,
    ) {
    }

    public function createReport(MovieReportRequest $request)
    {
        $validated = $request->validated();
        $user = Auth::user();
        $movie = $this->movieRepository->getBySlug($validated['slug']);

        return $this->reportRepository->updateOrInsert(null, [
            "description" => $validated["message"],
            "status" => "success",
        ], $user, $movie);
    }
}
