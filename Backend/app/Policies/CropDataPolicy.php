<?php

namespace App\Policies;

use App\Models\CropData;
use App\Models\users;
use Illuminate\Auth\Access\Response;

class CropDataPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(users $users): bool
    {
        //
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(users $users, CropData $cropData): bool
    {
        //
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(users $users): bool
    {
        //
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(users $users, CropData $cropData): bool
    {
        //
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(users $users, CropData $cropData): bool
    {
        //
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(users $users, CropData $cropData): bool
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(users $users, CropData $cropData): bool
    {
        //
    }
}
