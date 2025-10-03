
# Install PHP dependencies if vendor directory doesn't exist.
if [ ! -d vendor ]; then
  composer install --no-dev --optimize-autoloader
fi

# Ensure there is an application key; skip if it's already set via Secrets.
if [ -z "$APP_KEY" ]; then
  php artisan key:generate --show > /dev/null
fi

# Run database migrations (adjust or remove if you want to handle this manually).
php artisan migrate --force

# Start Laravel’s built-in server on 0.0.0.0 so Replit can route requests:contentReference[oaicite:3]{index=3}.
php artisan serve --host=0.0.0.0 --port=8000
