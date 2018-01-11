install: install-deps install-flow-typed

install-deps:
	npm install

install-flow-typed:
	npm run flow-typed install

build:
	rm -rf dist
	npm run build

test:
	npm test

check-types:
	npm run flow

lint:
	npm run eslint — src/

publish:
	npm publish

.PHONY: test
