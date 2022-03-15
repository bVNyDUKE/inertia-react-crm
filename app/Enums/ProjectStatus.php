<?php

namespace App\Enums;

enum ProjectStatus: string
{
    case ACTIVE = 'active';
    case PENDING = 'pending';
    case HOLD = 'hold';
    case CANCELLED = 'cancelled';
}

