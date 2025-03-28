<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\AgriOfficer;

class AgriOfficerSeeder extends Seeder
{
    public function run()
    {
        $data = [
            ['name' => 'John Doe', 'district' => 'Colombo', 'agri_office_location' => 'Colombo Office', 'whatsapp_link' => 'https://wa.me/1234567890'],
            ['name' => 'Jane Smith', 'district' => 'Gampaha', 'agri_office_location' => 'Gampaha Office', 'whatsapp_link' => 'https://wa.me/1234567891'],
            ['name' => 'Michael Brown', 'district' => 'Kalutara', 'agri_office_location' => 'Kalutara Office', 'whatsapp_link' => 'https://wa.me/1234567892'],
            ['name' => 'Emily Davis', 'district' => 'Kandy', 'agri_office_location' => 'Kandy Office', 'whatsapp_link' => 'https://wa.me/1234567893'],
            ['name' => 'David Wilson', 'district' => 'Matale', 'agri_office_location' => 'Matale Office', 'whatsapp_link' => 'https://wa.me/1234567894'],
            ['name' => 'Sophia Johnson', 'district' => 'Nuwara Eliya', 'agri_office_location' => 'Nuwara Eliya Office', 'whatsapp_link' => 'https://wa.me/1234567895'],
            ['name' => 'James Anderson', 'district' => 'Galle', 'agri_office_location' => 'Galle Office', 'whatsapp_link' => 'https://wa.me/1234567896'],
            ['name' => 'Olivia Martinez', 'district' => 'Matara', 'agri_office_location' => 'Matara Office', 'whatsapp_link' => 'https://wa.me/1234567897'],
            ['name' => 'Daniel White', 'district' => 'Hambantota', 'agri_office_location' => 'Hambantota Office', 'whatsapp_link' => 'https://wa.me/1234567898'],
            ['name' => 'Isabella Lee', 'district' => 'Jaffna', 'agri_office_location' => 'Jaffna Office', 'whatsapp_link' => 'https://wa.me/1234567899'],
            ['name' => 'Ethan Harris', 'district' => 'Kilinochchi', 'agri_office_location' => 'Kilinochchi Office', 'whatsapp_link' => 'https://wa.me/1234567800'],
            ['name' => 'Mia Clark', 'district' => 'Mannar', 'agri_office_location' => 'Mannar Office', 'whatsapp_link' => 'https://wa.me/1234567801'],
            ['name' => 'Benjamin Lewis', 'district' => 'Vavuniya', 'agri_office_location' => 'Vavuniya Office', 'whatsapp_link' => 'https://wa.me/1234567802'],
            ['name' => 'Charlotte Young', 'district' => 'Mullaitivu', 'agri_office_location' => 'Mullaitivu Office', 'whatsapp_link' => 'https://wa.me/1234567803'],
            ['name' => 'William King', 'district' => 'Batticaloa', 'agri_office_location' => 'Batticaloa Office', 'whatsapp_link' => 'https://wa.me/1234567804'],
            ['name' => 'Amelia Hall', 'district' => 'Ampara', 'agri_office_location' => 'Ampara Office', 'whatsapp_link' => 'https://wa.me/1234567805'],
            ['name' => 'Alexander Scott', 'district' => 'Trincomalee', 'agri_office_location' => 'Trincomalee Office', 'whatsapp_link' => 'https://wa.me/1234567806'],
            ['name' => 'Harper Green', 'district' => 'Kurunegala', 'agri_office_location' => 'Kurunegala Office', 'whatsapp_link' => 'https://wa.me/1234567807'],
            ['name' => 'Lucas Adams', 'district' => 'Puttalam', 'agri_office_location' => 'Puttalam Office', 'whatsapp_link' => 'https://wa.me/1234567808'],
            ['name' => 'Ella Nelson', 'district' => 'Anuradhapura', 'agri_office_location' => 'Anuradhapura Office', 'whatsapp_link' => 'https://wa.me/1234567809'],
            ['name' => 'Henry Baker', 'district' => 'Polonnaruwa', 'agri_office_location' => 'Polonnaruwa Office', 'whatsapp_link' => 'https://wa.me/1234567810'],
            ['name' => 'Grace Carter', 'district' => 'Badulla', 'agri_office_location' => 'Badulla Office', 'whatsapp_link' => 'https://wa.me/1234567811'],
            ['name' => 'Samuel Evans', 'district' => 'Monaragala', 'agri_office_location' => 'Monaragala Office', 'whatsapp_link' => 'https://wa.me/1234567812'],
            ['name' => 'Victoria Turner', 'district' => 'Ratnapura', 'agri_office_location' => 'Ratnapura Office', 'whatsapp_link' => 'https://wa.me/1234567813'],
            ['name' => 'Daniel Parker', 'district' => 'Kegalle', 'agri_office_location' => 'Kegalle Office', 'whatsapp_link' => 'https://wa.me/1234567814']
        ];

        foreach ($data as $officer) {
            AgriOfficer::create($officer);
        }
    }
}
