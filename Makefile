NODE_BIN = ./node_modules/.bin

npm:
	npm install

bower:
	$(NODE_BIN)/bower install

server_dev:
	node bin/www

server_prod:
	NODE_ENV=production node bin/www

mysql:
	echo 'CREATE DATABASE IF NOT EXISTS galeria_fotos' | mysql -u root

run: npm bower mysql server_dev
