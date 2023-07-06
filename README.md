# SEA CINEMA

***

Introducing SEA Cinema, a rising star in the movie theater industry known for
its affordable ticket prices and wide range of movie genres.

## Tech Stack

<p style="display: flex;">
<img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo">
<img alt="Tailwind CSS" src="https://raw.githubusercontent.com/tailwindlabs/tailwindcss/HEAD/.github/logo-light.svg" width="350">
</p>
<img src="https://raw.githubusercontent.com/inertiajs/.github/master/LOGO.png" alt="Inertia.js" style="max-width: 100%;">

## Setup

### Installing Dependencies

Before starting the application, install all dependencies using these commands:

```
// Installing PHP dependencies
composer update
composer install

// Installing Node dependencies
npm install
```

### Configuring `.env` File & Application Key

After running all of those commands, create a new `.env` file in the root project directory. Copy all contents
from `.env.example`, or you can just save as the file as `.env` file.

Next, run `php artisan key:generate` to generate the app key. The `APP_KEY` key in the `.env` file should now contain
the application key.

### Configuring Database Connection & Tables

After generating the application key, now we can set up the database connection.
You may see inside the `.env` file where there are keys with `DB_` prefix, you can configure the database connection.
The default connection type will be MySQL.

After configuring the connection, now we can start migrating tables into our database. Run `php artisan migrate --seed`.
With this one line command, it will:

- **Creating all tables needed inside the database**
- **Inserting fetched movies data into movies table**
- **Inserting seats data, from 1 to 64 into seats table**
- **Inserting dummy showtimes data into showtimes table**

### Running the Application

Finally, we can run our application with the following command: `php artisan serve`. Or if you already installed *
*Laragon**, **Valet for Mac/Windows**, you don't have to run the command, just follow the default step to run Laravel on
top of those two.
