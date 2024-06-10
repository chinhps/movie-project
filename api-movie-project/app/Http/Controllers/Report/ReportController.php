<?php

namespace App\Http\Controllers\Report;

use App\Http\Controllers\BaseResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\Report\CommentReportRequest;
use App\Http\Requests\Report\MovieReportRequest;
use App\Repositories\Comment\CommentInterface;
use App\Repositories\Movie\MovieInterface;
use App\Repositories\Report\ReportInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
    public function __construct(
        private ReportInterface $reportRepository,
        private MovieInterface $movieRepository,
        private CommentInterface $commentRepository
    ) {
    }

    public function comment(CommentReportRequest $request)
    {
        $validated = $request->validated();
        $user = Auth::user();
        $comment = $this->commentRepository->detail($validated['id']);

        try {
            DB::beginTransaction();
            $this->reportRepository->updateOrInsert(null, [
                "description" => json_encode($validated["reason"]),
                "status" => "success",
            ], $user, comment: $comment);
            DB::commit();
            return BaseResponse::msg("Cảm ơn bạn đã báo cáo! Chúng tôi sẽ xử lý sớm nhất!");
        } catch (\Exception $e) {
            DB::rollBack();
            dd($e);
            return BaseResponse::msg("Có lỗi xảy ra trong khi báo cáo!", 413);
        }
    }

    public function movie(MovieReportRequest $request)
    {
        $validated = $request->validated();
        $user = Auth::user();
        $movie = $this->movieRepository->getBySlug($validated['slug']);

        try {
            DB::beginTransaction();
            $this->reportRepository->updateOrInsert(null, [
                "description" => json_encode($validated["reason"]),
                "status" => "success",
            ], $user, movie: $movie);
            DB::commit();
            return BaseResponse::msg("Cảm ơn bạn đã báo cáo! Chúng tôi sẽ xử lý sớm nhất!");
        } catch (\Exception $e) {
            DB::rollBack();
            dd($e);
            return BaseResponse::msg("Có lỗi xảy ra trong khi báo cáo!", 413);
        }
    }
}
