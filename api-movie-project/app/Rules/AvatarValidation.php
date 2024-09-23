<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class AvatarValidation implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if ($value === 'undefined') {
            return;
        }

        if (is_uploaded_file($value) && getimagesize($value)) {
            return;
        }

        $fail(':attribute is not avatar');
    }
}
