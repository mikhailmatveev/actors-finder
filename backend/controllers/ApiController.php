<?php

use Phalcon\Http\Response;
use Phalcon\Mvc\Controller;

class ApiController extends Controller {

    public function getActor($id) {
        // If "id" param is correct, preform a model query
        if (is_numeric($id) && $id > 0) {
            $actor = Actors::getActor($id);
        }
        return (new Response())->setContent(json_encode($actor))->setContentType('application/json', 'UTF-8');
    }

    public function getActors() {
        // Get query string
        $q = $this->request->getQuery()['q'];
        // If "q" param satisfy the condition
        if (isset($q) && !empty($q) && is_string($q)) {
            // Get all actors by "q" param
            $actors = Actors::getActors($q);
        } else {
            // Get all actors
            $actors = Actors::getActors();
        }
        return (new Response())->setContent(json_encode($actors))->setContentType('application/json', 'UTF-8');
    }

}
