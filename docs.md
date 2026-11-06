# Notes
Run the fake BE DB server with `npx json-server db.json --port 3000`.

When using the Angualar CLI to generate small components use the `--inline-template` flag

We installed *concurrently* for running several commands in the terminal and configured it in package.json with its own command to run multiple servers for us
```npm i -D concurrently```

```
"scripts": {
  "api": "json-server mock-api/db.json --port 3000",
  "seed": "node mock-api/seed.mjs",
  "dev": "concurrently -n api,web \"npm:api\" \"ng serve\""
}
```

```
npm run seed -- 5000    # generate data
npm run dev             # API + Angular together
curl "http://localhost:3000/products?_page=1&_per_page=5"
```

- ng g environment: creates something like .env file
- ng g interceptor <path-to-file>: generates a request/response ioterceptor
- ng g service <path-to-file>: generates a service class