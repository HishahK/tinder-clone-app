<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use App\Mail\UserIsPopular;
use App\Models\User;

class CheckPopularUsers extends Command
{
    protected $signature = 'app:check-popular-users';
    protected $description = 'Check for users with over 50 likes and notify admin';

    public function handle()
    {
        $popularUsers = DB::table('swipes')
            ->select('swiped_id', DB::raw('count(*) as likes_count'))
            ->where('action', 'like')
            ->groupBy('swiped_id')
            ->having('likes_count', '>', 50)
            ->get();

        if ($popularUsers->isEmpty()) {
            $this->info('No new popular users found.');
            return;
        }

        foreach ($popularUsers as $popularUser) {
            $user = User::find($popularUser->swiped_id);
            if ($user) {
                Mail::to('admin@example.com')->send(new UserIsPopular($user, $popularUser->likes_count));
                $this->info("Notified admin about popular user: {$user->name}");
            }
        }
    }
}