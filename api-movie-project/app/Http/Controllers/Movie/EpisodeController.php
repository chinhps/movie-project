<?php

namespace App\Http\Controllers\Movie;

use App\Http\Controllers\BaseResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\Episode\EpisodeUpsertAdminRequest;
use App\Http\Resources\Episode\EpisodeDetailResource;
use App\Repositories\EpisodeSource\EpisodeSourceInterface;
use App\Repositories\Movie\MovieInterface;
use App\Repositories\MovieEpisode\MovieEpisodeInterface;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class EpisodeController extends Controller
{

    public function __construct(
        private MovieEpisodeInterface $movieEpisodeRepository,
        private MovieInterface $movieRepository,
        private EpisodeSourceInterface $episodeSourceRepository
    ) {
    }

    public function episodeWatch($slug)
    {
        return new EpisodeDetailResource($this->movieEpisodeRepository->getBySlug($slug));
    }

    public function episodeDetailAdmin($idMovie)
    {
    }

    public function episodeUpsertAdmin(EpisodeUpsertAdminRequest $request)
    {
        $validated = $request->validated();
        $movie = $this->movieRepository->detail($validated['idMovie']);

        try {
            DB::beginTransaction();
            foreach ($validated['data'] as $episode_data) {
                $episode = $this->movieEpisodeRepository->updateOrInsert(null, [
                    "episode_name" => $episode_data['episode_name'],
                    "status" => "on",
                    "slug" => Str::slug($movie->movie_name . " " . $episode_data['episode_name'])
                ], $movie);

                foreach ($episode_data['servers'] as $source) {
                    $this->episodeSourceRepository->updateOrInsert(null, [
                        "server_name" => $source['server_name'],
                        "source_link" => $source['server_source'],
                        "status" => "on"
                    ], $episode);
                }
            }
            DB::commit();
            return BaseResponse::msg("Thao tác thành công!");
        } catch (\Exception $e) {
            DB::rollBack();
            return BaseResponse::msg($e->getMessage(), 422);
        }
    }
}
