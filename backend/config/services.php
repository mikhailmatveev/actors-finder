<?php

use Phalcon\Db\Adapter\Pdo\Postgresql as DbAdapter;

$config = require('config.php');

$di->set('db', function() use ($config) {
    return new DbAdapter([
        'host'     => $config->database->host,
        'username' => $config->database->username,
        'password' => $config->database->password,
        'dbname'   => $config->database->name
    ]);
});
