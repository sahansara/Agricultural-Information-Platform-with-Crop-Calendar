<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Auth\Notifications\ResetPassword;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        // Customize or disable throttling for password resets
        RateLimiter::for('reset-password', function ($request) {
            return Limit::perMinute(5)->by($request->email);
        });

        // Optionally override the ResetPassword notification URL
        ResetPassword::createUrlUsing(function ($user, string $token) {
            return url('/reset-password?token=' . $token);
        });
    }
}
