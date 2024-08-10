
WP_PATH=$1

cd $WP_PATH

echo "Updating WordPress core..."
wp core update

echo "Updating themes..."
wp theme update --all

echo "Updating plugins..."
wp plugin update --all
