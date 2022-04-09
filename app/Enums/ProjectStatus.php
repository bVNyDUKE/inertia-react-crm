<?php

namespace App\Enums;

enum ProjectStatus: string
{
    case ACTIVE = 'Active';
    case PENDING = 'Pending';
    case HOLD = 'Hold';
    case CANCELLED = 'Cancelled';
}
