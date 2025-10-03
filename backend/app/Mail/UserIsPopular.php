<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use App\Models\User;

class UserIsPopular extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public User $user, public int $likeCount)
    {
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'A User Has Become Popular!',
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'emails.popular.user',
        );
    }

    public function attachments(): array
    {
        return [];
    }
}