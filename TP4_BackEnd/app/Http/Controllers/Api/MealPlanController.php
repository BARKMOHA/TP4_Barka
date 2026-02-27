<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MealPlan;
use Illuminate\Http\Request;

class MealPlanController extends Controller
{
    public function index(Request $request)
    {
        return MealPlan::where('user_id', $request->user()->id)->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'recipe_id' => 'required|integer',
            'title' => 'required|string',
            'image' => 'nullable|string'
        ]);

        return MealPlan::create([
            'user_id' => $request->user()->id,
            'recipe_id' => $request->recipe_id,
            'title' => $request->title,
            'image' => $request->image
        ]);
    }

    public function destroy(Request $request, $id)
    {
        MealPlan::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->delete();

        return response()->json(['message' => 'Deleted']);
    }
}

