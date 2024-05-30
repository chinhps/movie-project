<?php

namespace App\Http\Controllers\HLS;

use App\Http\Controllers\BaseResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\HLS\HLSRequest;
use App\Http\Resources\HLS\HLSResource;
use App\Repositories\HLS\HLSInterface;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class HLSController extends Controller
{

    public function __construct(
        private HLSInterface $HLSRepository
    ) {
    }

    public function get($slug)
    {
        $data = $this->HLSRepository->detail($slug);
        return new HLSResource($data);
    }

    public function create(HLSRequest $request)
    {
        $validated = $request->validated();

        try {
            DB::beginTransaction();
            $slug = Str::random(25);
            $this->HLSRepository->updateOrInsert(null, [
                "link_m3u8" => $validated['link_m3u8'],
                "status" => "on",
                "slug" => $slug
            ]);
            DB::commit();
            return BaseResponse::data([
                "link" => env("APP_URL") . "/m3u8/hls/" . $slug,
                "message" => "Tạo thành công!"
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return BaseResponse::msg($e->getMessage(), 422);
        }
    }
}
