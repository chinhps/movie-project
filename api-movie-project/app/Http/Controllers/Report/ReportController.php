<?php

namespace App\Http\Controllers\Report;

use App\Http\Controllers\BaseResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\Report\CommentReportRequest;
use App\Http\Requests\Report\MovieReportRequest;
use App\Http\Requests\Report\ReportActionRequest;
use App\Http\Resources\Reports\ReportCommentAdminResource;
use App\Http\Resources\Reports\ReportMovieAdminResource;
use App\Repositories\Comment\CommentInterface;
use App\Repositories\Movie\MovieInterface;
use App\Repositories\Report\ReportInterface;
use App\Repositories\User\UserRepository;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
    public function __construct(
        private ReportInterface $reportRepository,
        private MovieInterface $movieRepository,
        private CommentInterface $commentRepository,
        private UserRepository $userRepository
    ) {}

    public function commentList()
    {
        $data = $this->reportRepository->commentList();

        return ReportCommentAdminResource::collection($data);
    }

    public function movieList()
    {
        $data = $this->reportRepository->movieList();

        return ReportMovieAdminResource::collection($data);
    }

    public function reportActionAdmin(ReportActionRequest $request)
    {
        $validated = $request->validated();
        try {
            DB::beginTransaction();
            // change status
            $report = $this->reportRepository->updateStatus($validated['id'], $validated['status']);

            // report
            if (isset($validated['report'])) {
                foreach ($validated['report'] as $reason) {
                    switch ($reason) {
                        case 'hidden':
                            // hidden comment
                            $this->commentRepository->statusComment($report->reportable, 'off');
                            break;
                        case 'block':
                            // block user
                            $this->userRepository->blockUser($report->user, true);
                            break;
                        default:
                            break;
                    }
                }
            }

            DB::commit();

            return BaseResponse::msg('Cập nhật trạng thái thành công!');
        } catch (\Exception $e) {
            DB::rollBack();

            return BaseResponse::msg($e->getMessage(), 413);
        }
    }

    public function comment(CommentReportRequest $request)
    {
        $validated = $request->validated();
        $user = Auth::user();
        $comment = $this->commentRepository->detail($validated['id']);

        try {
            DB::beginTransaction();
            $this->reportRepository->updateOrInsert(null, [
                'description' => json_encode($validated['reason']),
                'status' => 'success',
            ], $user, comment: $comment);
            DB::commit();

            return BaseResponse::msg('Cảm ơn bạn đã báo cáo! Chúng tôi sẽ xử lý sớm nhất!');
        } catch (\Exception $e) {
            DB::rollBack();

            return BaseResponse::msg('Có lỗi xảy ra trong khi báo cáo!', 413);
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
                'description' => json_encode($validated['reason']),
                'status' => 'success',
            ], $user, movie: $movie);
            DB::commit();

            return BaseResponse::msg('Cảm ơn bạn đã báo cáo! Chúng tôi sẽ xử lý sớm nhất!');
        } catch (\Exception $e) {
            DB::rollBack();

            return BaseResponse::msg('Có lỗi xảy ra trong khi báo cáo!', 413);
        }
    }
}
