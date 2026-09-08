# Quiz Builder

### Start the frontend

Open a terminal in the `frontend` directory and run:

```bash
npm i
npm run dev
```

The frontend will start using Vite. Open the local URL shown in the terminal.

### Set up the database and start the backend

Make sure PostgreSQL is running and create a database for the project. Then configure the database connection in `backend/.env`:

```env
DATABASE_URL="postgresql://<username>:<password>@localhost:5432/quiz-builder-db"
```

Open another terminal in the `backend` directory and install the dependencies:

```bash
npm i
```

Generate the Prisma client and apply the database migrations:

```bash
npx prisma generate
npx prisma migrate dev
```

Start the backend in development mode:

```bash
npm run start:dev
```

### Create a sample quiz

1. Open the frontend and use the button in the header to navigate to the **Create Quiz** page.
2. Enter a quiz title.
3. Add at least one question.
4. Submit the quiz.
5. The new quiz will be added to the dashboard.
