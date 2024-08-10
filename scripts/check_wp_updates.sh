
WP_PATH=$1

cd $WP_PATH

echo "Checking for WordPress core updates..."
wp core check-update

echo "Checking for theme updates..."
wp theme update --all --dry-run

echo "Checking for plugin updates..."
wp plugin update --all --dry-run
