<?php

use Phalcon\Di\FactoryDefault;
use Phalcon\Mvc\Micro;
use Phalcon\Mvc\Micro\Collection as MicroCollection;

setlocale(LC_ALL, 'ru_RU.UTF8');

$di = new FactoryDefault();

require_once 'config/loader.php';
require_once 'config/services.php';

try {
    $app = new Micro($di);
    $microCollection = new MicroCollection();
    $microCollection->setHandler('ApiController', true);
    // Get actor info by ID
    $microCollection->get('/actor/{id}', 'getActor');
    // Get all actors or get actors by filter
    $microCollection->get('/actors', 'getActors');
    $app->mount($microCollection);
    // 404
    $app->notFound(function() {
        throw new Exception('Not found', 404);
    });
    $app->handle();
} catch (\Exception $e) {
    echo "{$e->getCode()}: {$e->getMessage()}. Stack trace: {$e->getTraceAsString()})";
}
