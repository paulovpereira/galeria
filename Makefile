NODE_BIN = ./node_modules/.bin

npm:
	npm install

bower:
	$(NODE_BIN)/bower install

server_dev:
	node bin/www

server_prod:
	NODE_ENV=production node bin/www

run: npm bower server_prod
