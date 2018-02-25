<?php

$config = require('config.php');

(new \Phalcon\Loader())
    ->registerDirs([
        $config->controllersDir,
        $config->migrationsDir,
        $config->modelsDir
    ])
    ->register();
