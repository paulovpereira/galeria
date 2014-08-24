NODE_BIN = ./node_modules/.bin

npm:
	npm install

bower:
	$(NODE_BIN)/bower install

node:
	node bin/www

run: npm bower node
