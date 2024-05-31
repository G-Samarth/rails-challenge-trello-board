# Rails AI Challenge Trello Board

A Trello-like task management board built with Next.js, TypeScript, tRPC, and PostgreSQL.

## Tech Stack

- **Frontend**:

  - Next.js
  - TypeScript
  - tRPC

- **Backend**:
  - Next.js API routes
  - PostgreSQL
  - Prisma
  - tRPC

## Features

- Create and delete lists
- Add and remove cards within lists
- Drag and drop cards between lists
- Persistent card positions
- Seamless type-safe communication between frontend and backend using tRPC

## Getting Started

### Prerequisites

- Node.js
- pnpm
- PostgreSQL

### Installation

1. Clone the repository:

2. Install dependencies using pnpm:

   ```sh
   pnpm install
   ```

3. Set up your PostgreSQL database and update the `.env` file with your database connection string:

   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/trellodb
   ```

4. Run Prisma migrations to set up the database schema:

   ```sh
   npx prisma migrate dev --name init
   ```

### Running the Development Server

Start the development server:

```sh
pnpm run dev
```

Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to see the application in action.

## Project Structure

- **components/**: Contains React components for the Header, Sidebar, Board, List, and Card.
- **pages/**: Contains Next.js pages, including the API routes.
- **styles/**: Contains CSS modules for styling components.
- **trpc/**: Contains tRPC context and router definitions.
- **utils/**: Contains utility functions and tRPC client setup.
- **prisma/**: Contains Prisma schema and migration files.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [tRPC](https://trpc.io/)
- [Prisma](https://www.prisma.io/)
- [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd)
