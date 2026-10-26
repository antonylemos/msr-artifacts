# Microfrontends Demo (Rspack + Module Federation)

Демонстрационный проект, показывающий работу **микрофронтендов** через **Module Federation** на базе **Rspack**.

Проект состоит из трёх независимых приложений:

- **host** — React-приложение (контейнер), которое подключает удалённые модули.
- **remote** — React-приложение (микрофронтенд), которое отдаёт наружу компонент `RemoteContent` и само подключает Vue-микрофронтенд.
- **vue_remote** — Vue 3 приложение (микрофронтенд), которое отдаёт наружу компонент `Counter`.

---

## Схема взаимодействия

```
┌──────────────────────┐
│        host          │  React  •  http://localhost:3000
│  (React container)   │
└──────────┬───────────┘
           │  remote@http://localhost:3001/remoteEntry.js
           ▼
┌──────────────────────┐
│       remote         │  React  •  http://localhost:3001
│  (React microfront)  │
└──────────┬───────────┘
           │  vue_remote@http://localhost:3002/remoteEntry.js
           ▼
┌──────────────────────┐
│     vue_remote       │  Vue 3  •  http://localhost:3002
│  (Vue microfront)    │
└──────────────────────┘
```

`host` ничего не знает про `vue_remote`. Vue-микрофронтенд подключается внутри `remote`, что демонстрирует **вложенную федерацию**.

---

## Порты и стек

| Приложение   | Стек    | Порт | Что отдаёт / потребляет                           |
|--------------|---------|------|---------------------------------------------------|
| `host`       | React   | 3000 | потребляет `remote`                               |
| `remote`     | React   | 3001 | отдаёт `./RemoteContent`, потребляет `vue_remote` |
| `vue_remote` | Vue 3   | 3002 | отдаёт `./Counter`                                |

Сборщик у всех приложений — **Rspack**.

---

## Требования

- **Node.js** ≥ 18
- **npm** ≥ 9

---

## Установка

Установите зависимости в каждой из трёх папок:

```bash
cd vue_remote && npm install
cd ../remote  && npm install
cd ../host    && npm install
```

---

## Запуск

Каждое приложение запускается **в отдельном терминале** командой `npm run start`.

> Порядок запуска не критичен, но рекомендуется поднимать микрофронтенды первыми, чтобы host сразу мог их подтянуть.

### Терминал 1 — Vue-микрофронтенд

```bash
cd vue_remote
npm run start
# http://localhost:3002
```

### Терминал 2 — React-микрофронтенд

```bash
cd remote
npm run start
# http://localhost:3001
```

### Терминал 3 — Host

```bash
cd host
npm run start
# http://localhost:3000
```

После запуска всех трёх приложений откройте:

**http://localhost:3000**

На странице должен отобразиться:

- React-компонент `RemoteContent`, пришедший из `remote`
- внутри него — Vue-компонент `Counter` (кнопка инкремента счётчика), пришедший из `vue_remote`

---

## Структура проекта

```
.
├── host/                  # React-контейнер (порт 3000)
│   ├── src/
│   └── module-federation.config.ts
│
├── remote/                # React-микрофронтенд (порт 3001)
│   ├── src/
│   │   └── RemoteContent.tsx
│   └── module-federation.config.ts
│
└── vue_remote/            # Vue 3 микрофронтенд (порт 3002)
    ├── src/
    │   └── Counter.vue
    └── module-federation.config.ts
```

---

## Ключевые особенности

- **Вложенная федерация** — host → remote → vue_remote.
- **Кросс-фреймворковое взаимодействие** — React-контейнер рендерит Vue-компонент.
- **Singleton Vue** — гарантирует единый рантайм Vue между приложениями.
- **Rspack** — быстрый сборщик, совместимый с экосистемой webpack и Module Federation.

---
