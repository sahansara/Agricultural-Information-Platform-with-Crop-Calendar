<?php

namespace App\Http\Controllers;

use App\Models\Feedback;
use Illuminate\Http\Request;

class FeedbackController extends Controller
{
    public function feedback4(Request $request)
    {
        return $this->getFeedbacks($request, null); // No limit, default pagination
    }

    public function feedbackAll(Request $request)
    {
        return $this->getFeedbacks($request, 50); // Paginate with a limit of 50
    }

    public function store(Request $request)
    {
        // Validate the incoming request data
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:15',
            'feedback' => 'required|string|max:5000',
        ]);

        // Create the feedback record
        Feedback::create($validated);

        // Return a success response
        return response()->json(['message' => 'Message sent successfully!'], 200);
    }

    public function destroy($id)
    {
        try {
            // Find the feedback by its ID
            $feedback = Feedback::findOrFail($id);
            
            // Delete the feedback record
            $feedback->delete();

            // Return a success response
            return response()->json(['message' => 'Feedback deleted successfully.'], 200);
        } catch (\Exception $e) {
            // If something goes wrong, return an error response
            return response()->json([
                'message' => 'Error deleting feedback.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    public function search(Request $request)
    {
        // Get the search query from the request (could be name or id)
        $search = $request->input('search');
    
        // Build the query
        $query = Feedback::query();
    
        // Check if the search query is a number (id)
        if (is_numeric($search)) {
            $query->where('id', $search);
        } else {
            // Otherwise, search by name
            $query->where('name', 'LIKE', "%{$search}%");
        }
    
        // Execute the query and return the result
        $feedback = $query->get();
    
        return response()->json($feedback, 200);
    }
    
    private function getFeedbacks(Request $request, $paginateLimit = null)
    {
        // Get the search query from the request
        $search = $request->input('search');

        // Build the query
        $query = Feedback::latest();

        // Apply search filter if provided
        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'LIKE', "%{$search}%")
                  ->orWhere('email', 'LIKE', "%{$search}%")
                  ->orWhere('feedback', 'LIKE', "%{$search}%")
                  ->orWhere('created_at', 'LIKE', "%{$search}%");
            });
        }

        // Paginate the results
        $feedbacks = $paginateLimit 
            ? $query->paginate($paginateLimit)
            : $query->paginate(); // Default pagination

        return response()->json($feedbacks, 200);
    }
}
