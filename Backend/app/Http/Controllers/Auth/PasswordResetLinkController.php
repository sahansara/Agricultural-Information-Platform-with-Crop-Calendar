<?php
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Log;

class PasswordResetLinkController extends Controller
{
    /**
     * Handle an incoming password reset link request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request) {

        // Log the email request for debugging 
        Log::info("Processing password reset request", ['email' => $request->email]);
        
        $request->validate([
            'email' => 'required|email',
        ]);
        
        Log::info("Executed validate(); invoking sendResetLink()");
        
        // Send the password reset link
        $status = Password::sendResetLink($request->only('email'));
        
        Log::info("Executed sendResetLink() with status: " . $status);
        
        // Correct condition check
        if ($status === Password::RESET_LINK_SENT) {

            Log::info("Password reset link sent successfully", ['email' => $request->email]);
            
            return response()->json([
                'status' => __($status)
            ], 200);
        }
        
        Log::info("Failed to send reset link with status: " . $status);
        
        throw ValidationException::withMessages([
            'email' => [trans($status)],
        ]);
    }
}