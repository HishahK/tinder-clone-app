<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Swipe;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\DB;

/**
 * @OA\Info(
 * version="1.0.0",
 * title="Tinder Clone API",
 * description="API Documentation for the Tinder Clone App"
 * )
 */
class ApiController extends Controller
{
    /**
     * @OA\Get(
     * path="/api/recommendations",
     * summary="Get user recommendations",
     * tags={"Users"},
     * security={{"sanctum":{}}},
     * @OA\Parameter(name="page", in="query", required=false, @OA\Schema(type="integer")),
     * @OA\Response(response=200, description="Successful operation"),
     * @OA\Response(response=401, description="Unauthenticated")
     * )
     */
    public function recommendations(Request $request)
    {
        $user = $request->user();
        $swipedUserIds = Swipe::where('swiper_id', $user->id)->pluck('swiped_id');
        $swipedUserIds[] = $user->id;

        $users = User::with('pictures')
            ->whereNotIn('id', $swipedUserIds)
            ->paginate(10);

        return response()->json($users);
    }

    /**
     * @OA\Post(
     * path="/api/swipe",
     * summary="Perform a swipe action (like/nope)",
     * tags={"Actions"},
     * security={{"sanctum":{}}},
     * @OA\RequestBody(
     * required=true,
     * @OA\JsonContent(
     * required={"swiped_id", "action"},
     * @OA\Property(property="swiped_id", type="integer", example=2),
     * @OA\Property(property="action", type="string", enum={"like", "nope"}, example="like")
     * )
     * ),
     * @OA\Response(response=201, description="Action recorded"),
     * @OA\Response(response=422, description="Validation error")
     * )
     */
    public function swipe(Request $request)
    {
        $validated = $request->validate([
            'swiped_id' => ['required', 'integer', 'exists:users,id'],
            'action' => ['required', Rule::in(['like', 'nope'])],
        ]);

        Swipe::updateOrCreate(
            ['swiper_id' => $request->user()->id, 'swiped_id' => $validated['swiped_id']],
            ['action' => $validated['action']]
        );

        return response()->json(['message' => 'Action recorded'], 201);
    }

    /**
     * @OA\Get(
     * path="/api/likes",
     * summary="Get list of liked users",
     * tags={"Users"},
     * security={{"sanctum":{}}},
     * @OA\Response(response=200, description="Successful operation"),
     * @OA\Response(response=401, description="Unauthenticated")
     * )
     */
    public function liked(Request $request)
    {
        $user = $request->user();
        $likedUserIds = Swipe::where('swiper_id', $user->id)
            ->where('action', 'like')
            ->pluck('swiped_id');

        $users = User::with('pictures')->whereIn('id', $likedUserIds)->get();

        return response()->json($users);
    }
}