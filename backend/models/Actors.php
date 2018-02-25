<?php

use Phalcon\Di;
use Phalcon\Mvc\Model;

class Actors extends Model {

    public function initialize() {
        $this->hasMany('id', 'Aliases', 'actor_id');
        $this->hasMany('id', 'Avatars', 'actor_id');
        $this->hasMany('id', 'Links', 'actor_id');
    }

    public static function getActor(int $id) {
        $result = (object) [];
        $actor = Actors::findFirst($id);
        if ($actor) {
            $result->id = $actor->id;
            $result->name = $actor->name;
            $result->birthDate = $actor->birth_date;
            $result->birthPlace = $actor->birth_place;
            $result->country = $actor->country;
            $result->status = $actor->career_status;
            $result->height = $actor->height;
            $result->color = $actor->color;
            // Aliases
            $result->aliases = [];
            foreach ($actor->aliases as $alias) {
                array_push($result->aliases, $alias->value);
            }
            // Avatars
            $result->avatars = [];
            foreach ($actor->avatars as $avatar) {
                array_push($result->avatars, $avatar->value);
            }
            // Links
            $result->links = [];
            foreach ($actor->links as $link) {
                array_push($result->links, $link->value);
            }
        }
        return $result;
    }

    public static function getActors(string $q = '') {
        $results = [];
        // If "q" param exists
        if (!empty($q) && strlen($q) > 0) {
            if (strlen($q) < 3) {
                return [];
            }
            $actorIds = Actors::find([
                'columns' => 'id',
                'conditions' => 'name ILIKE :q:',
                'bind' => [
                    'q' => "%{$q}%"
                ]
            ]);
            // Get actor by "id" and push it to "results"
            foreach ($actorIds as $item) {
                array_push($results, Actors::getActor($item->id));
            }
            $aliases = Aliases::find([
                'value ILIKE :q:',
                'bind' => [
                    'q' => "%{$q}%"
                ]
            ]);
            // Get actors by aliases and push it to "results"
            foreach ($aliases as $alias) {
                $actor = Actors::getActor($alias->actor_id);
                // Add only if not in "results"
                if (!in_array($actor, $results)) {
                    array_push($results, $actor);
                }
            }
            // Get all actors by "q" param
            return $results;
        }
        $actorIds = Actors::find([
            'columns' => 'id'
        ]);
        // Get actor by "id" and push it to "results"
        foreach ($actorIds as $item) {
            array_push($results, Actors::getActor($item->id));
        }
        // Otherwise, get all records
        return $results;
    }

    public function getSource() {
        return 'actors';
    }
}
