<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\WordPressSite;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class WordPressSiteController extends Controller
{
    public function index()
    {
        $host = session()->get('connected_ssh');
        $sites = WordPressSite::where('host', $host)->orderBy('id', 'desc')->paginate(10);
        return Inertia::render('WordPressSites/Index', ['sites' => $sites]);
    }

    public function create()
    {
        return Inertia::render('WordPressSites/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'path' => ['required','string'],
        ]);

        try {
            $data = $request->all();
            $data['host'] = session()->get('connected_ssh');
            WordPressSite::create($data);
            return Inertia::render('WordPressSites/Create', ['message' => 'Directory path added successfully']);
        } catch (\Exception $e) {
            return Inertia::render('WordPressSites/Create', ['error' => $e->getMessage()]);
        }
    }

    public function edit($id)
    {
        $site = WordPressSite::find($id);
        return Inertia::render('WordPressSites/Edit', ['site' => $site]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'path' => ['required','string'],
        ]);

        try {    
            WordPressSite::find($id)->update($request->all());
            return redirect()->route('wordpress-sites')->with(['message' => 'Directory path updated successfully']);
        } catch (\Exception $e) {
            return Inertia::render('WordPressSites/Edit', ['error' => $e->getMessage()]);
        }
    }

    public function destroy($id)
    {
        try {    
            WordPressSite::find($id)->delete();
            return redirect()->route('wordpress-sites')->with(['message' => 'Directory path deleted successfully']);
        } catch (\Exception $e) {
            return Inertia::render('WordPressSites/Index', ['error' => $e->getMessage()]);
        }
    }
}
