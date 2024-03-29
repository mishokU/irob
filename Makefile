MAKEFLAGS += --silent

export COMPOSE_PROJECT_NAME ?= irob
export APP_ENV ?= dev
export DOCKER_COMPOSE = docker compose \
	-f docker-compose.${APP_ENV}.yml \
	--env-file .env

SHELL=/bin/bash -o pipefail

help: ## Справка по командам
	@printf "\033[33m%s:\033[0m\n" 'Доступные команды'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  \033[32m%-18s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

init: stop build install start info ## Сборка и запуск проекта

build: ## Сборка контейнеров
	$(DOCKER_COMPOSE) build

data-fixture:
	cat ./database/backups/backup.sql | $(DOCKER_COMPOSE) exec -T --user=postgres db psql

install: install-client install-ws install-indexer install-server ## Установка зависимостей
install-client:
	$(DOCKER_COMPOSE) run --rm -T client yarn install

install-server:
	$(DOCKER_COMPOSE) run --rm -T server yarn install

install-ws:
	$(DOCKER_COMPOSE) run --rm -T ws yarn install

install-indexer:
	$(DOCKER_COMPOSE) run --rm -T indexer yarn install

start: ## Запуск контейнеров
	$(DOCKER_COMPOSE) up -d --no-build
restart:
	$(DOCKER_COMPOSE) restart
stop:
	$(DOCKER_COMPOSE) stop
down:
	$(DOCKER_COMPOSE) down
reload: down start

restart-nginx:
	$(DOCKER_COMPOSE) exec -T nginx bash -c "nginx -t && nginx -s reload"

logs-client: ## Showing logs to frontend
	$(DOCKER_COMPOSE) logs --tail="all" --follow client
logs-server: ## Showing logs to backend
	$(DOCKER_COMPOSE) logs --tail="all" --follow server
logs-ws: ## Showing logs to ws
	$(DOCKER_COMPOSE) logs --tail="all" --follow ws
logs-db: ## Showing logs to db
	$(DOCKER_COMPOSE) logs --tail="all" --follow db
logs-nginx: ## Showing logs to nginx
	$(DOCKER_COMPOSE) logs --tail="all" --follow nginx

shell-client: ## Entering into containers to frontend
	$(DOCKER_COMPOSE) exec client sh
shell-server: ## Entering into containers to backend
	$(DOCKER_COMPOSE) exec server sh
shell-nginx: ## Entering into containers to nginx
	$(DOCKER_COMPOSE) exec nginx sh
shell-db: ## Entering into containers to db
	$(DOCKER_COMPOSE) exec db sh
shell-ws: ## Entering into containers to ws
	$(DOCKER_COMPOSE) exec redoc ws


info:
	echo ""
	echo "# localhost:"
	echo "site: http://localhost:8${PROJECT_ID}/"
	echo "cms: http://localhost:8${PROJECT_ID}/cms/"
	echo "redoc: http://localhost:8${PROJECT_ID}/api/v1/"
	echo "graph: http://localhost:45${PROJECT_ID}/projects/all"
	echo "storybook: http://localhost:44${PROJECT_ID}/"

.DEFAULT_GOAL := help