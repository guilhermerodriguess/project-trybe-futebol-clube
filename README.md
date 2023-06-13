# Trybe Football Club

Hello! Welcome to the Trybe Futebol Clube repository. In this project, I was responsible for developing the dockerized backend of an informative website about football matches and rankings. The project involved the creation of an API using the TDD method and the integration of applications through docker-compose, so that they work consuming a database.

## About the project

Trybe Futebol Clube (TFC) is an informational website that provides information about football matches and rankings. In the project, the dockerized backend was developed using data modeling with Sequelize. The developed API follows the business rules provided in the project and can be consumed by the already provided front-end.

## Requirements Developed

The project consists of 4 main streams:

### Flow 1: Teams (Teams)

1. I created the migration and model for the times table.
2. I've developed tests that cover at least 5% of the files in `/app/backend/src`, with a minimum of 7 lines covered.
3. I developed the `/teams` endpoint in the backend to return all teams correctly.
4. I've developed tests that cover at least 10% of the files in `/app/backend/src`, with a minimum of 19 lines covered.
5. I developed the `/teams/:id` endpoint in the backend to return data from a specific team.

### Flow 2: Users and Login (Users and Login)

6. I created the migration and the model for the users table.
7. I've developed tests that cover at least 15% of the files in `/app/backend/src`, with a minimum of 25 lines covered.
8. I developed the `/login` endpoint on the back-end to allow access with valid data on the front-end.
9. I've developed tests that cover at least 20% of the files in `/app/backend/src`, with a minimum of 35 lines covered.
10. I developed the validation middleware for the token and the `/login/role` endpoint in the backend to return the data correctly in the frontend.

### Flow 3: Matches

13. I created the migration and model for the match table.
14. I've developed tests that cover at least 45% of the files in `/app/backend/src`, with a minimum of 70 lines covered.
15. I developed the `/matches` endpoint to return matches correctly on the front-end matches screen.
16. I developed the `/matches` endpoint to filter matches in progress or finished.
17. I developed the `/matches/:id/finish` endpoint to finish a match in the database.
18. I developed the `/matches/:id` endpoint to update matches in progress.

### Flow 4: Leaderboards

23. I developed the endpoint `/leaderboard/home` to return information about the performance of home teams.
24. I developed the `/leaderboard/home` endpoint to filter the rankings

tions of the home teams.
25. I developed the `/leaderboard/home` endpoint to update the table when inserting a match.
26. I developed the endpoint `/leaderboard/away` to return information about the performance of visiting teams.
27. Developed the `/leaderboard/away` endpoint to filter away team rankings.
28. I developed the `/leaderboard/away` endpoint to update the table when inserting a match.
29. I developed the `/leaderboard` endpoint to filter the overall ranking of teams.
30. I developed the `/leaderboard` endpoint to update the table when inserting a match.

## Running the Project

To run the project, you can follow these steps:

1. Clone the project repository: `git clone https://github.com/your-user/trybe-futebol-clube.git`.
2. Navigate to the project directory: `cd trybe-soccer-club`.
3. Run the `npm run build` command in the backend folder to build the application.
4. Run docker-compose to integrate the applications and configure the database: `docker-compose up`.
5. The project will be available at `http://localhost:3000`.

Now you will have Trybe Futebol Clube running locally. You can access the available routes on the backend and check the integration with the already provided frontend.

If you have any questions or need help, I'm here to help.
