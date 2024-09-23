<?php

namespace App\Jobs;

use App\Models\User;
use GuzzleHttp\Client;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;

class UploadAvatarImgur implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct(
        protected string $path,
        protected User $user,
        protected string $fileName
    ) {}

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $fileContents = Storage::disk()->get($this->path);
        // UPLOAD TO IMGUR
        $client = new Client;
        $headers = [
            'Authorization' => 'Client-ID '.env('API_KEY_IMGUR'),
            'Accept' => 'application/json',
        ];

        $response = $client->request('POST', env('API_IMGUR_URL'), [
            'headers' => $headers,
            'multipart' => [
                [
                    'name' => 'image',
                    'contents' => $fileContents,
                    'filename' => $this->fileName,
                ],
            ],
        ])->getBody()->getContents();

        $data = json_decode((string) $response, true);
        if (isset($data['data']['link'])) {
            $user = $this->user;
            $user->avatar_url = $data['data']['link'];
            $user->save();
        }

        Storage::disk()->delete($this->path);
    }
}
