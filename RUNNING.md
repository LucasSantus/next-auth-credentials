<h3 id="running">:computer: Installation</h3>

> Below you will find instructions on how to install and run the project:

<h4><strong>Cloning project</strong></h4>

```
git clone git@github.com:LucasSantus/next-auth-credentials.git
```

```
cd next-auth-credentials
```

<h4><strong>Enviroment variables</strong></h4>

> For the project to work correctly, the keys in the .env must be filled in correctly

```
cp .env.example .env
```

<h4><strong>Installing dependencies & running</strong></h4>

<h6><strong>Using pnpm</strong></h6>

```
pnpm i
```

```
pnpm migrate
```

```
pnpm dev
```

<h6><strong>Using yarn</strong></h6>

```
yarn
```

```
yarn migrate
```

```
yarn dev
```

<h6><strong>Using npm</strong></h6>

```
npm i
```

```
npm run migrate
```

```
npm run dev
```
