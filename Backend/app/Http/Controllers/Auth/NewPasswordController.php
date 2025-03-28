<?php

    namespace App\Http\Controllers\Auth;

    use App\Http\Controllers\Controller;
    use Illuminate\Auth\Events\PasswordReset;
    use Illuminate\Http\RedirectResponse;
    use Illuminate\Http\Request;
    use Illuminate\Support\Facades\Hash;
    use Illuminate\Support\Facades\Password;
    use Illuminate\Support\Str;
    use Illuminate\Validation\Rules;
    use Illuminate\Validation\ValidationException;
    use Inertia\Inertia;
    use Inertia\Response;
    use Illuminate\Support\Facades\Log;


    class NewPasswordController extends Controller
    {
        /**
         * Display the password reset view.
         */
        public function create(Request $request): Response 

        {  

            return Inertia::render('Auth/ResetPassword', [
                'email' => $request->email,
                'token' => $request->route('token'),
            ]);

            
        
        }

        /**
         * Handle an incoming new password request.
         *
         * @throws \Illuminate\Validation\ValidationException
         */
        public function store(Request $request)
        {   

            Log::info("Password reset request received", [
                'email' => $request->email,
                'token_provided' => $request->token ? 'yes' : 'no'
            ]);


            $request->validate([
                'token' => 'required',
                'email' => 'required|email',
                'password' => ['required', 'confirmed', Rules\Password::defaults()],
            ]);
            

           Log::info("Validation passed, attempting password reset");



            

            // Here we will attempt to reset the user's password. If it is successful we
            // will update the password on an actual user model and persist it to the
            // database. Otherwise we will parse the error and return the response.
            $status = Password::reset(
                $request->only('email', 'password', 'password_confirmation', 'token'),
                function ($user) use ($request) {
                    $user->forceFill([
                        'password' => Hash::make($request->password),
                        'remember_token' => Str::random(60),
                    ])->save();

                    event(new PasswordReset($user));

                    Log::info("Password updated successfully");

                }
            );
            Log::info("Password reset attempt completed", ['status' => $status]);

            // If the password was successfully reset, we will redirect the user back to
            // the application's home authenticated view. If there is an error we can
            // redirect them back to where they came from with their error message.
            if ($status == Password::PASSWORD_RESET) {
                if ($request->wantsJson() || $request->ajax() || $request->is('api/*')) {
                    return response()->json([
                        'message' => 'Password has been reset successfully',
                        'status' => $status
                    ]);
                }
                
                return redirect()->route('login')->with('status', __($status));
            }


            Log::info("Password reset failed", ['status' => $status]);

            throw ValidationException::withMessages([
                'email' => [trans($status)],
            ]);
        }
    }
