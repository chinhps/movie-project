<?php

namespace App\Http\Controllers\Proxy;

use App\Helper\Crypto;
use App\Http\Controllers\Controller;
use App\Http\Requests\Proxy\ProxyConvertRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ProxyController extends Controller
{
    private string $KEY = "71b9111bd63e1f4d54f347938d6f2881";

    public function get(Request $request)
    {
        $code = $request->code;
        $data = Crypto::decrypt(($code), $this->KEY);
        if (!$data) {
            return abort(404);
        }
        $dataExplode = explode("|", $data);
        $url = $dataExplode[0];
        $data = Http::withHeaders(json_decode($dataExplode[1], true))->get(($url));
        return response($data->body())
            ->header('Content-Type', 'video/mp2t');
    }

    public function convert(ProxyConvertRequest $request)
    {
        $validated = $request->validated();
        $m3u8 = $validated['m3u8_link'];
        $m3u8Array = explode("/", $m3u8);
        array_pop($m3u8Array); # remove "video.m3u8"
        header('Content-Type: application/vnd.apple.mpegurl');
        $response = Http::withHeaders($validated['header_custom'])->get($m3u8);

        if ($response->successful()) {
            $data = $response->body();

            // Tách từng dòng và in ra
            $lines = explode("\n", $data);
            foreach ($lines as $line) {
                if (strpos($line, 'video') === 0 && substr($line, -3) === '.ts') {
                    $video_file = trim($line);
                    $code = Crypto::encrypt(implode("/", $m3u8Array) . "/" . $video_file . "|" . json_encode($validated['header_custom']), $this->KEY);
                    $proxy_link = 'http://localhost:8000/api/proxy/get?code=' . $code;
                    echo $proxy_link . "\n";
                } else {
                    echo $line . "\n";
                }
            }
        }
    }
}
