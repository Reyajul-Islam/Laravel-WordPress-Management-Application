<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\SSHController;
use App\Http\Controllers\WordPressSiteController;
use App\Http\Controllers\WordPressUpdateController;
use App\Http\Controllers\NginxLogController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/ssh/connect', [SSHController::class, 'index'])->name('ssh.connect');
    Route::post('/ssh/connect', [SSHController::class, 'connect'])->name('ssh.send');

    Route::middleware(['ssh'])->group(function () {
        Route::get('wordpress-sites', [WordPressSiteController::class, 'index'])->name('wordpress-sites');
        Route::get('wordpress-sites/create', [WordPressSiteController::class, 'create'])->name('wordpress-sites.create');
        Route::post('wordpress-sites/create', [WordPressSiteController::class, 'store'])->name('wordpress-sites.store');
        Route::get('wordpress-sites/{id}/edit', [WordPressSiteController::class, 'edit'])->name('wordpress-sites.edit');
        Route::patch('wordpress-sites/{id}/update', [WordPressSiteController::class, 'update'])->name('wordpress-sites.update');
        Route::delete('wordpress-sites/{id}/destroy', [WordPressSiteController::class, 'destroy'])->name('wordpress-sites.destroy');

        Route::get('/wordpress-updates', [WordPressUpdateController::class, 'index'])->name('wordpress-updates');
        Route::post('/wordpress-updates/check', [WordPressUpdateController::class, 'checkUpdates'])->name('wordpress-updates.check');
        Route::post('/wordpress-updates/apply', [WordPressUpdateController::class, 'applyUpdates'])->name('wordpress-updates.update');

        Route::get('/nginx-logs', [NginxLogController::class, 'index'])->name('nginx-logs');
        Route::post('/nginx-logs/parse', [NginxLogController::class, 'parseLogs'])->name('nginx-logs.parse');
    });

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
