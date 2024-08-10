<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Symfony\Component\Process\Process;

class NginxLogController extends Controller
{
    public function index()
    {
        return Inertia::render('NginxLogs/Index');
    }

    public function parseLogs(Request $request)
    {
        $request->validate([
            'path' => ['required','string'],
            'timeframe' => ['required','integer'],
        ]);

        $process = new Process([env('NGINX_LOG_SSH'), $request->path, $request->timeframe]);
        $process->run();

        if (!$process->isSuccessful()) {
            throw new ProcessFailedException($process);
        }

        $outputFile = 'parsed_logs.json';
        $output = json_decode(file_get_contents($outputFile), true);

        return response()->json(['output' => $output]);
    }
}
