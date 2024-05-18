<?php

namespace App\Http\Controllers\Movie;

use App\Http\Controllers\BaseResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\Movie\MovieUpsertAdminRequest;
use App\Http\Resources\Movie\MovieAdminResource;
use App\Http\Resources\Movie\MovieDetailResource;
use App\Http\Resources\Movie\MovieLatestResource;
use App\Http\Resources\Movie\MovieResource;
use App\Repositories\Category\CategoryInterface;
use App\Repositories\Movie\MovieInterface;
use App\Repositories\MovieEpisode\MovieEpisodeInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class MovieController extends Controller
{

    public function __construct(
        private MovieInterface $movieRepository,
        private MovieEpisodeInterface $movieEpisodeRepository,
        private CategoryInterface $categoryRepository
    ) {
    }

    # ADMIN
    public function movieListAdmin()
    {
        $query = [];
        $movies = $this->movieRepository->list(["sort", "query" => $query], 25);
        return MovieAdminResource::collection($movies);
    }

    private function checkImageOrUrl($data)
    {
        return (is_string($data) || $data == null) ?
            $data :
            uploadImageQueue($data);
    }

    public function movieUpsertAdmin(MovieUpsertAdminRequest $request)
    {
        $validated = $request->validated();

        $bannerImage = $validated['banner_image'][0];
        $urlBanner = $this->checkImageOrUrl($bannerImage);

        $thumbImage = $validated['movie_image'][0];
        $urlThumb = $this->checkImageOrUrl($thumbImage);
        try {
            DB::beginTransaction();

            $categoryIdss = $this->categoryRepository->listIn($validated['categories'])
                ->toArray();

            $this->movieRepository->updateOrInsert($validated["id"] ?? null, [
                "movie_name" => $validated["movie_name"],
                "movie_name_other" => $validated["movie_name_other"],
                "release" => $validated["release"],
                "status" => $validated["status"] ? "on" : "off",
                "banner_image" => $urlBanner,
                "movie_image" => $urlThumb,
                "description" => $validated["description"],
                "slug" => Str::slug($validated["movie_name"]),
                "parent_id" => null,
                "episodes_counter" => $validated["episodes_counter"],
                "views" => 0
            ], $categoryIdss);

            DB::commit();
            return BaseResponse::msg("Thao tác thành công!");
        } catch (\Exception $e) {
            DB::rollBack();
            return BaseResponse::msg($e->getMessage(), 422);
        }
    }

    public function movies(Request $request)
    {
        $nameMovie = $request->input("name");
        $query = [];

        if ($nameMovie) {
            $query[] = ["movie_name", "like", "%$nameMovie%"];
        }

        $movies = $this->movieRepository->list(["sort", "query" => $query], 25);
        return MovieResource::collection($movies);
    }

    public function moviesLatest()
    {
        $movies = $this->movieEpisodeRepository->moviesLatest();
        return MovieLatestResource::collection($movies);
    }

    public function moviesRanking()
    {
        $movies = $this->movieRepository->list([
            "sort" => [["views", "desc"]]
        ], 10);
        return MovieResource::collection($movies);
    }

    public function movieDetail($slug)
    {
        $movie = $this->movieRepository->getFullBySlug($slug);
        return new MovieDetailResource($movie);
    }

    public function movieByCategory($slugCategory)
    {
        $movies = $this->movieRepository->list(["category_slug" => $slugCategory], 25);
        return MovieResource::collection($movies);
    }
}
