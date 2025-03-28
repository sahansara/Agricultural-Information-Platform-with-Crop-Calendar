<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class TestMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public function __construct()
    {
        // Add any necessary data as constructor parameters
    }

    /**
     * Build the message.
     */
    public function build()
    {
        return $this->subject('Test Email')
            ->from('your_email@example.com', 'Your App Name') // Optional: Set a sender email and name
            ->view('emails.plaintext'); // Correctly reference a plain text view
    }

    /**
     * Get the message envelope.
     */
    public function envelope()
    {
        return new \Illuminate\Mail\Mailables\Envelope(
            subject: 'Test Email'
        );
    }

    /**
     * Get the message content definition.
     */
    public function content()
    {
        return new \Illuminate\Mail\Mailables\Content(
            text: 'This is a test email sent from your Laravel backend.' // Specify plain text content
        );
    }

    /**
     * Get the attachments for the message.
     */
    public function attachments(): array
    {
        return [];
    }
}
