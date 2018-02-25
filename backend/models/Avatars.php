<?php

use Phalcon\Mvc\Model;

class Avatars extends Model {

    public function initialize() {
        $this->belongsTo('actor_id', 'Actors', 'id');
    }

    public function getSource() {
        return 'avatars';
    }
}
