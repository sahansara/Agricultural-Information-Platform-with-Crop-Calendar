<?php

namespace App\Http\Controllers;

use App\Models\AgriOfficer;
use Illuminate\Http\Request;

class AgriOfficerController extends Controller
{
    // Display all Agri Officers
    public function index()
    {
        $agriOfficers = AgriOfficer::all();
        return response()->json($agriOfficers);
    }

    // Store a new AgriOfficer
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'district' => 'required|string|max:255',
            'agri_office_location' => 'required|string|max:255',
            'whatsapp_link' => 'required|url',
        ]);

        $agriOfficer = AgriOfficer::create([
            'name' => $request->name,
            'district' => $request->district,
            'agri_office_location' => $request->agri_office_location,
            'whatsapp_link' => $request->whatsapp_link,
        ]);

        return response()->json($agriOfficer, 201);
    }

    // Search Agri Officers by name or district
    public function search(Request $request)
    {
        $query = $request->input('query');

        $agriOfficers = AgriOfficer::where('name', 'like', "%$query%")
            ->orWhere('district', 'like', "%$query%")
            ->get();

        return response()->json($agriOfficers);
    }

    // Update an AgriOfficer
    public function update(Request $request, $id)
    {
        $agriOfficer = AgriOfficer::find($id);

        if (!$agriOfficer) {
            return response()->json(['message' => 'Agri Officer not found'], 404);
        }

        $request->validate([
            'name' => 'sometimes|string|max:255',
            'district' => 'sometimes|string|max:255',
            'agri_office_location' => 'sometimes|string|max:255',
            'whatsapp_link' => 'sometimes|url',
        ]);

        $agriOfficer->update($request->all());

        return response()->json($agriOfficer);
    }

    // Delete an AgriOfficer
    public function destroy($id)
    {
        $agriOfficer = AgriOfficer::find($id);

        if (!$agriOfficer) {
            return response()->json(['message' => 'Agri Officer not found'], 404);
        }

        $agriOfficer->delete();

        return response()->json(['message' => 'Agri Officer deleted successfully']);
    }
}
