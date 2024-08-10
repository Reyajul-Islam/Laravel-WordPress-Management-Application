<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WordPressSite extends Model
{
    use HasFactory;

    protected $table = 'wordpress_sites';
    protected $fillable = ['path', 'host'];
}
