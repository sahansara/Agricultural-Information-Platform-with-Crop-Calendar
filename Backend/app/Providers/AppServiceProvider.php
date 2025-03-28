<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Auth\Notifications\ResetPassword;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    // In app/Providers/AppServiceProvider.php


public function boot()
{
    ResetPassword::createUrlUsing(function ($user, string $token) {
        return 'http://localhost:5173/password-reset?token='.$token.'&email='.$user->getEmailForPasswordReset();
    });
}
}
