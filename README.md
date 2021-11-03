```json
  "scripts": {
    "start": "node server.js",
    "dev": "NODE_ENV=dev PORT=3000 nodemon server.js",
    "test": "PORT=3001 jest --watchAll",
    "test:serve": "NODE_ENV=test PORT=3001 node server.js",
    "test:unit": "PORT=3001 jest --testPathPattern=/tests/unit",
    "test:integration_tests": "NODE_ENV=test PORT=3001 jest --testPathPattern=/tests/integration",
    "test:integration": "start-server-and-test test:serve http://localhost:3001 test:integration_tests",
    "test:e2e_tests": "cypress run",
    "test:e2e": "start-server-and-test test:serve http://localhost:3001 test:e2e_tests"
  }
```