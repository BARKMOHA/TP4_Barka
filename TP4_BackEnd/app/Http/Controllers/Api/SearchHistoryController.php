<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SearchHistory;
use Illuminate\Http\Request;

class SearchHistoryController extends Controller
{
    public function index(Request $request)
    {
        return SearchHistory::where('user_id', $request->user()->id)
            ->latest()
            ->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'ingredient' => 'required|string',
            'results_count' => 'required|integer'
        ]);

        return SearchHistory::create([
            'user_id' => $request->user()->id,
            'ingredient' => $request->ingredient,
            'results_count' => $request->results_count,
            'searched_at' => now()
        ]);
    }
}

