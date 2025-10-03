<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Picture;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class ProfileController extends Controller
{
    public function update(Request $request)
    {
        $user = $request->user();
        $validated = $request->validate([
            'name' => ['sometimes', 'string'],
            'age' => ['sometimes', 'integer'],
            'phone' => ['sometimes', 'string', Rule::unique('users', 'phone')->ignore($user->id)],
            'biography' => ['sometimes', 'string'],
            'latitude' => ['sometimes', 'numeric'],
            'longitude' => ['sometimes', 'numeric'],
            'pictures' => ['sometimes', 'array'],
            'pictures.*' => ['file', 'image'],
            'picture_order' => ['sometimes', 'array'],
            'picture_order.*' => ['integer'],
        ]);
        $user->update($validated);
        if ($request->hasFile('pictures')) {
            foreach ($request->file('pictures') as $file) {
                $path = $file->store('pictures', 'public');
                Picture::create([
                    'user_id' => $user->id,
                    'url' => Storage::url($path),
                    'order' => 0,
                ]);
            }
        }
        if (isset($validated['picture_order'])) {
            foreach ($validated['picture_order'] as $index => $id) {
                Picture::where('id', $id)->where('user_id', $user->id)->update(['order' => $index]);
            }
        }
        return response()->json($user->load('pictures'));
    }
}
