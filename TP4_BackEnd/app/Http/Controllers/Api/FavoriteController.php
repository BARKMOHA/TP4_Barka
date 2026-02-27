<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Favorite;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    public function index(Request $request)
    {
        return $request->user()->favorites;
    }

    public function store(Request $request)
    {
        $request->validate([
            'recipe_id' => 'required|integer',
            'title' => 'required|string',
            'image' => 'nullable|string'
        ]);

        $favorite = Favorite::firstOrCreate([
            'user_id' => $request->user()->id,
            'recipe_id' => $request->recipe_id
        ], [
            'title' => $request->title,
            'image' => $request->image
        ]);

        return response()->json($favorite);
    }

    public function destroy(Request $request, $recipeId)
    {
        Favorite::where('user_id', $request->user()->id)
            ->where('recipe_id', $recipeId)
            ->delete();

        return response()->json(['message' => 'Deleted']);
    }
}
