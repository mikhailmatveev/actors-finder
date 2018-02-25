<?php

return new \Phalcon\Config([
    'baseUri'        => '/',
    'controllersDir' => 'controllers',
    'migrationsDir'  => 'migrations',
    'modelsDir'      => 'models',
    'database' => [
        'host'     => 'localhost',
        'name'     => 'actors',
        'username' => 'root',
        'password' => '',
        'schema'   => 'public'
    ]
]);
