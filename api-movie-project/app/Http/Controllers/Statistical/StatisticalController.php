<?php

namespace App\Http\Controllers\Statistical;

use App\Http\Controllers\BaseResponse;
use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StatisticalController extends Controller
{

    public function list()
    {
        $userCounts = DB::table('users')->count();
        $commentInDay = DB::table('comments')->whereDate('created_at', now())->count();
        $movieCounts = DB::table('movies')->count();


        return BaseResponse::data([
            "user_counts" => $userCounts,
            "movie_counts" => $movieCounts,
            "comment_in_day" => $commentInDay,

            # chart
            "user_in_week" => $this->userInWeek('users'),
            "comment_in_week" => $this->userInWeek('comments'),
            "report_in_week" => $this->userInWeek('movie_reports'),

        ]);
    }

    public function userInWeek($nameTables)
    {
        $weekStart = now()->startOfWeek();
        $weekEnd = now()->endOfWeek();
        $allDates = [];
        $currentDate = $weekStart->copy();
        while ($currentDate <= $weekEnd) {
            $allDates[] = $currentDate->toDateString();
            $currentDate->addDay();
        }
        $counts = DB::table($nameTables)
            ->select(DB::raw('DATE(created_at) as date'), DB::raw('COUNT(*) as count'));

        $counts = $counts->whereBetween('created_at', [$weekStart, $weekEnd])
            ->groupBy('date')
            ->get()
            ->pluck('count', 'date')
            ->toArray();

        $result = [];
        foreach ($allDates as $date) {
            $result[] = isset($counts[$date]) ? $counts[$date] : 0;
        }
        return $result;
    }
}
