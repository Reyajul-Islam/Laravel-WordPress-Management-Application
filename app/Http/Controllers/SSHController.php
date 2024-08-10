<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\SSHService;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class SSHController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function index(Request $request): Response
    {
        return Inertia::render('SSH/Index');
    }

    public function connect(Request $request)
    {
        $request->validate([
            'host' => ['required'],
            'username' => ['required'],
            'password' => ['required'],
        ]);

        try {
            $ssh = new SSHService($request->host, $request->username, $request->password);
            session()->put('connected_ssh', $request->host);
            return Redirect::route('ssh.connect')->with(['message' => 'Connected successfully']);
        } catch (\Exception $e) {
            return Inertia::render('SSH/Index', ['error' => $e->getMessage()]);
        }
    }
}
