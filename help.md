/crudJS
│
├── /controllers
│   └── tool.ts
│   └── material.ts
│   └── user.ts
│
├── /models
│   └── item.ts        # Base Item Schema
│   └── tool.ts        # Tool Schema (inherits from Item)
│   └── material.ts    # Material Schema (inherits from Item)
│   └── user.ts        # User Schema
│
├── /utils
│   └── db.ts          # MongoDB connection logic
│   └── errorHandler.ts # Error handling utilities
│
├── .env               # Environment variables for DB connection
├── app.ts             # Main entry point
└── tsconfig.json      # TypeScript configuration