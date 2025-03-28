<?php

namespace App\Http\Controllers;
use App\Models\Post;
use Illuminate\Http\Request;

class PostsController extends Controller
{
    protected $post;

    public function __construct() {
        $this->post = new Post();
    }

    public function index()
    {
        return $this->post->all();
    }

    public function store(Request $request)
{
    // Validate incoming request
    $request->validate([
        'title' => 'required|string|max:255',
        'body' => 'required|string',
        'card_image_url' => 'required|url',
        'banner_image_url' => 'required|url',
    ]);

    // Create post
    return Post::create([
        'title' => $request->title,
        'body' => $request->body,
        'card_image_url' => $request->card_image_url,
        'banner_image_url' => $request->banner_image_url,
    ]);
}

    

    public function show(string $id)
    {
        return $this->post->find($id);
    }

    public function update(Request $request, string $id)
    {
        // Validate incoming request
        $request->validate([
            'title' => 'required|string|max:255',
            'body' => 'required|string',
            'card_image' => 'image|nullable|max:1999',
            'banner_image' => 'image|nullable|max:1999',
        ]);

        // Find the post
        $post = $this->post->find($id);

        // Handle image uploads
        $cardImageUrl = $post->card_image_url; // Keep old URL
        $bannerImageUrl = $post->banner_image_url; // Keep old URL

        if ($request->hasFile('card_image')) {
            $file = $request->file('card_image');
            $filename = time() . '_card.' . $file->getClientOriginalExtension();
            $file->move(public_path('images/cards'), $filename);
            $cardImageUrl = 'images/cards/' . $filename; // Update to new URL
        }

        if ($request->hasFile('banner_image')) {
            $file = $request->file('banner_image');
            $filename = time() . '_banner.' . $file->getClientOriginalExtension();
            $file->move(public_path('images/banners'), $filename);
            $bannerImageUrl = 'images/banners/' . $filename; // Update to new URL
        }

        // Update the post with the new data
        $post->update([
            'title' => $request->title,
            'body' => $request->body,
            'card_image_url' => $cardImageUrl,
            'banner_image_url' => $bannerImageUrl,
        ]);

        return $post; // Return the updated post
    }

    public function destroy(string $id)
    {
        $post = $this->post->find($id);
        return $post->delete();   
    }
}
