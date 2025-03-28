<?php
namespace App\Http\Controllers;

use App\Models\Question;
use App\Models\Reply;
use Illuminate\Http\Request;

class QuestionController extends Controller
{
    // GET all questions
    public function index()
    {
        $questions = Question::all();
        return response()->json($questions);
    }

    // POST a new question
    public function store(Request $request)
    {
        $request->validate([
            'username' => 'required|string',
            'title' => 'required|string|unique:questions,title',
            'body' => 'nullable|string',
        ]);

        $question = Question::create([
            'username' => $request->username,
            'title' => $request->title,
            'body' => $request->body,
        ]);

        return response()->json($question, 201);
    }

    // POST a reply to a question
    public function reply(Request $request, $id)
    {
        $request->validate([
            'username' => 'required|string',
            'body' => 'required|string',
        ]);

        $question = Question::findOrFail($id);

        $reply = Reply::create([
            'question_id' => $question->id,
            'username' => $request->username,
            'body' => $request->body,
        ]);

        return response()->json($reply, 201);
    }

    // GET a question along with its replies
    public function show($id)
    {
        $question = Question::with('replies')->findOrFail($id);
        return response()->json($question);
    }
}