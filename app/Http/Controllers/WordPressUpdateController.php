<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\WordPressSite;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Symfony\Component\Process\Process;
use Inertia\Inertia;

class WordPressUpdateController extends Controller
{
    public function index()
    {
        $host = session()->get('connected_ssh');
        $sites = WordPressSite::where('host', $host)->orderBy('id', 'desc')->paginate(10);
        return Inertia::render('WordPressUpdates/Index', ['sites' => $sites]);
    }

    public function checkUpdates(Request $request)
    {
        $site = WordPressSite::find($request->id);
        $process = new Process([env('CHECK_UPDATE_SSH'), $site->path]);
        $process->run();

        if (!$process->isSuccessful()) {
            throw new ProcessFailedException($process);
        }

        $output = $process->getOutput();
        return response()->json(['output' => $output]);
    }

    public function applyUpdates(Request $request)
    {
        $site = WordPressSite::find($request->id);
        $process = new Process([env('APPLY_UPDATE_SSH'), $site->path]);
        $process->run();

        if (!$process->isSuccessful()) {
            throw new ProcessFailedException($process);
        }

        $output = $process->getOutput();
        return response()->json(['output' => $output]);
    }
}
