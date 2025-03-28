<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Users;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    protected $User;

    public function __construct()
    {
        $this->User = new Users();
    }

    public function index()
{
    return $this->User->all();
}

    // Register a new user
   // Register a new user
public function register(Request $request)
{
    // Validate the request using a helper method
    $validatedData = $this->validateUser($request);

    // Handle profile photo if provided
    if ($request->hasFile('profile_photo')) {
        $image = $request->file('profile_photo');
        
        // Generate a unique name for the image
        $imageName = time() . '.' . $image->getClientOriginalExtension();
        
        // Store the image in the 'profile_photos' folder within the public directory
        $image->move(public_path('profile_photos'), $imageName);

        // Add the image path to the validated data
        $validatedData['profile_photo'] = 'profile_photos/' . $imageName;
    }

    // Hash the password
    $validatedData['password'] = Hash::make($validatedData['password']);

    // Create the user
    $user = $this->User->create($validatedData);

    return response()->json([
        'message' => 'User registered successfully!',
        'user' => $user
    ], 201); // HTTP status for "Created"
}

protected function validateUser(Request $request)
{
    return $request->validate([
        'fullname' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:users,email',
        'phone' => 'required|string|max:15|unique:users,phone',
        'username' => 'required|string|max:10|unique:users,username',
        'district' => 'required|string|max:255',
        'password' => 'required|string|min:8',
        'user_type' => 'required|in:Farmer,Officer',
        // Updated: Profile photo can now be an uploaded file
        'profile_photo' => 'nullable|file|mimes:jpeg,jpg,png,gif|max:2048', // Allow only image files with size limit
    ]);
}


    // Login a user and issue a token
    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
            'remember' => 'nullable|boolean',  // Validate remember field
        ]);

        $loginField = filter_var($request->input('username'), FILTER_VALIDATE_EMAIL) ? 'email' : 'username';
        $credentials = [
            $loginField => $request->input('username'),
            'password' => $request->input('password'),
        ];

        $remember = $request->input('remember', false);  // Default to false if not provided

        if (Auth::attempt($credentials, $remember)) {  // Pass remember to Auth::attempt()
            $user = Auth::user();

            // Create a token for the user after successful login
            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'user' => [
                    'username' => $user->username,
                    'role' => $user->role,  // Ensure role is returned correctly
                ],
                'token' => $token
            ], 200);
        }

        $user = $this->User->where($loginField, $request->input('username'))->first();
        if ($user) {
            return response()->json(['message' => 'Invalid password'], 401);
        }

        return response()->json(['message' => 'User not found'], 404);
    }

    // Get the currently authenticated user
    public function getUserSession(Request $request)
    {
        $user = Auth::user();

        if ($user) {
            return response()->json([
                'user' => [
                    'id' => $user->id,
                    'username' => $user->username,
                    'email' => $user->email,
                    'profile_photo' =>$user-> profile_photo,
                ]
            ], 200);
        }

        return response()->json(['message' => 'No user logged in'], 401);
    }

    // Logout the user and revoke tokens
    public function logoutUser(Request $request)
    {

        $request->user()->tokens()->delete(); // Revoke all tokens
        return response()->json(['message' => 'Logged out successfully']);
        // $user = $request->user();

        // if ($user) {
        //     $user->tokens()->delete(); // Revoke all tokens
        //     return response()->json(['message' => 'Logout successful'], 200);
        // }

        // return response()->json(['message' => 'No user to log out'], 401);
    }

    

    // Show a single user by ID
    public function show(string $id)
    {
        $user = $this->User->find($id);
        return response()->json($user);
    }

    // Update user details
    public function update(Request $request, string $id)
    {
        $user = $this->User->find($id);
    
        // Start with basic validation rules
        $validatedData = $this->validateUserUpdate($request, $id);
    
        // Only update fields that are provided in the request
        if ($request->has('fullname')) {
            $user->fullname = $validatedData['fullname'];
        }
    
        if ($request->has('email') && $user->email !== $validatedData['email']) {
            $user->email = $validatedData['email'];  // Ensure new email doesn't conflict
        }
    
        if ($request->has('phone') && $user->phone !== $validatedData['phone']) {
            $user->phone = $validatedData['phone'];
        }
    
        if ($request->has('username') && $user->username !== $validatedData['username']) {
            $user->username = $validatedData['username'];  // Ensure new username doesn't conflict
        }
    
        if ($request->has('district')) {
            $user->district = $validatedData['district'];
        }
    
        if ($request->has('password')) {
            $user->password = Hash::make($validatedData['password']);
        }
    
        // Save the user after all updates
        $user->save();
    
        return response()->json([
            'message' => 'User updated successfully!',
            'user' => $user
        ]);
    }
    
    public function validateUserUpdate(Request $request, $id)
    {
        $rules = [
            'fullname' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|string|email|max:255|unique:users,email,' . $id,
            'phone' => 'sometimes|required|string|max:15|unique:users,phone,' . $id,
            'username' => 'sometimes|required|string|max:10|unique:users,username,' . $id,
            'district' => 'sometimes|required|string|max:255',
            'password' => 'nullable|string|min:8',  // Password is optional unless provided
            'user_type' => 'sometimes|in:Farmer,Officer',
            'profile_photo' => 'nullable|string',
        ];
    
        return $request->validate($rules);
    }

    // Delete user by ID
    public function destroy(string $id)
    {
        $user = $this->User->find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        // Delete the user
        $user->delete();

        return response()->json(['message' => 'User deleted successfully'], 200);
    }
}
