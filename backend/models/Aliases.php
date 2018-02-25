<?php

use Phalcon\Mvc\Model;

class Aliases extends Model {

    public function initialize() {
        $this->belongsTo('actor_id', 'Actors', 'id');
    }

    public function getSource() {
        return 'aliases';
    }
}
