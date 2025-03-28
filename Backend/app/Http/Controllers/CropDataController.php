<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CropData;

class CropDataController extends Controller
{
    public function search(Request $request)
    {
        // Validate the incoming request
        $validated = $request->validate([
            'crop_type' => 'required|string|max:255',
        ]);

        // Query only for the required crop type
        $cropData = CropData::where('crop_type', $validated['crop_type'])
            ->select([
                'variety',
                'duration_months',
                'spacing',
                'feed_rate_kg_ha',
                'urea_kg_ha',
                'tsp_kg_ha',
                'mop_kg_ha',
                'yield_kg_ha',
                'others',
            ])
            ->get();

        // Return the result as a JSON response
        return response()->json($cropData);
    }
}
