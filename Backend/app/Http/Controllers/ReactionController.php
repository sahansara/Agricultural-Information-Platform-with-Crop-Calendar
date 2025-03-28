<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Reaction;

class ReactionController extends Controller
{
    public function getReactions($postId)
    {
        // Find reactions for the given post ID
        $reactions = Reaction::where('post_id', $postId)->first();

        // If no reaction record exists, create one with default values
        if (!$reactions) {
            $reactions = Reaction::create([
                'post_id' => $postId,
                'good' => 0,
                'neutral' => 0,
                'bad' => 0
            ]);
        }

        return response()->json($reactions, 200);
    }

    public function addReaction(Request $request, $postId)
    {
        // Validate request
        $validator = Validator::make($request->all(), [
            'type' => 'required|in:good,neutral,bad,remove',
            'previousReaction' => 'nullable|in:good,neutral,bad'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->first()], 422);
        }

        // Find or create a reaction record for the post
        $reaction = Reaction::firstOrCreate(
            ['post_id' => $postId],
            ['good' => 0, 'neutral' => 0, 'bad' => 0]
        );

        $type = $request->input('type');
        $previousReaction = $request->input('previousReaction');

        // If user is removing reaction
        if ($type === "remove" && $previousReaction) {
            if ($reaction->$previousReaction > 0) { // Prevent negative count
                $reaction->decrement($previousReaction);
            }
        } else {
            // If user had a previous reaction, remove it first
            if ($previousReaction && $previousReaction !== $type) {
                if ($reaction->$previousReaction > 0) {
                    $reaction->decrement($previousReaction);
                }
            }
            // Add the new reaction
            $reaction->increment($type);
        }

        $reaction->save();
        return response()->json($reaction, 200);
    }
}
