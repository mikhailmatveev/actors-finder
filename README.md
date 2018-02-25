# actors-finder
A service for actors searching and providing info

## Configure

### Frontend
```
server {
    root /var/www/actors-finder/frontend;
    listen 8080;
    server_name localhost;
    index index.html;
    charset utf-8;

    location / {
        try_files $uri $uri/ index.html;
    }

    location ~ ^/api(.*)$ {
        proxy_pass http://127.0.0.1:8081/$1$is_args$args;
    }
}
```

### Backend API
```
server {
    root /var/www/actors-finder/backend;
    listen 8081;
    server_name localhost;
    index index.php;
    charset utf-8;

    access_log /var/log/nginx/actors-finder.access.log;
    error_log  /var/log/nginx/actors-finder.error.log;

    location / {
        try_files $uri $uri/ /index.php?_url=$uri&$args;
    }

    location ~ \.php$ {
        try_files $uri =404;

        fastcgi_pass unix:/var/run/php/php7.0-fpm.sock;
        fastcgi_index /index.php;

        include fastcgi_params;
        fastcgi_split_path_info       ^(.+\.php)(/.+)$;
        fastcgi_param PATH_INFO       $fastcgi_path_info;
        fastcgi_param PATH_TRANSLATED $document_root$fastcgi_path_info;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    }

    location ~ /\.ht {
        deny all;
    }
}
```

## Install
```
$ git clone https://github.com/mikhailmatveev/actors-finder.git
$ cd actors-finder/frontend/
$ npm install
$ npm run build
```

## Usage

### API
| URL                     | Description                                                        |
|-------------------------|--------------------------------------------------------------------|
| /api/actor/{id}         | Actor info                                                         |
| /api/actors             | Full list of actors                                                |
| /api/actors?q=blablabla | List of actors, where "blablabla" is a part of actor name or alias |

### Dev Tools
```
$ npm run watch
```
