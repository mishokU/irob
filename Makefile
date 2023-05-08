MAKEFLAGS += --silent

export COMPOSE_PROJECT_NAME ?= irob
export APP_ENV ?= dev
export ENV_FILE = .env
export DOCKER_COMPOSE = docker compose \
	-f ${ENV_ENVIRONMENT}/docker-compose.${APP_ENV}.yml \
	--env-file ${ENV_FILE}

ifneq ("$(wildcard ~/.bash_profile)","")
	include ~/.bash_profile
endif

SHELL=/bin/bash -o pipefail

help: ## Справка по командам
	@printf "\033[33m%s:\033[0m\n" 'Доступные команды'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  \033[32m%-18s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

init: stop build install start info ## Сборка и запуск проекта


build: ## Сборка контейнеров
    $(DOCKER_COMPOSE) build

install: install-frontend ## Установка зависимостей
install-client:
	$(DOCKER_COMPOSE) run --rm -T client npm i

install-server:
	$(DOCKER_COMPOSE) run --rm -T server npm i

install-ws:
	$(DOCKER_COMPOSE) run --rm -T ws npm i

reinstall: clean rm-env rm-output rm-modules init ## полная очистка и повторная сборка

graph: ## Генерация графа зависимостей в проекте
	$(DOCKER_COMPOSE) exec frontend $(YARN) graph

clean: ## Остановка и очистка контейнеров
	$(DOCKER_COMPOSE) down --rmi local -v

rm-env:
	rm -f $(ENV_FILE)

rm-output:
	@rm -rf app/{coverage,gen}

rm-modules:
	@rm -rf app/node_modules

start: ## Запуск контейнеров
	$(DOCKER_COMPOSE) up -d --no-build
restart:
	$(DOCKER_COMPOSE) restart
stop:
	$(DOCKER_COMPOSE) stop
down:
    $(DOCKER_COMPOSE) down

info:
	echo ""
	echo "# localhost:"
	echo "site: http://localhost:8${PROJECT_ID}/"
	echo "cms: http://localhost:8${PROJECT_ID}/cms/"
	echo "redoc: http://localhost:8${PROJECT_ID}/api/v1/"
	echo "graph: http://localhost:45${PROJECT_ID}/projects/all"
	echo "storybook: http://localhost:44${PROJECT_ID}/"

.DEFAULT_GOAL := help