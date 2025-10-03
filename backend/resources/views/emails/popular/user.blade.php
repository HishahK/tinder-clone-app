<x-mail::message>
# User Popularity Alert

The user **{{ $user->name }}** (ID: {{ $user->id }}) has surpassed 50 likes.

Total Likes: **{{ $likeCount }}**

You may want to check their profile.

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>