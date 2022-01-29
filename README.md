# Budget application using React and Spring

Budget application inspired by [this](https://www.youtube.com/watch?v=yz8x71BiGXg&t=2213s) YouTube tutorial but
instead of only using [ReactJS](https://reactjs.org/), it is a full stack application using React with 
[Typescript](https://www.typescriptlang.org/) and [Axios](https://github.com/axios/axios).
The backend uses [Spring](https://spring.io/), [H2](https://www.h2database.com/html/main.html) database with a file
and [Kotlin](https://kotlinlang.org/).

## How to run it

Execute `npm start` in the `frontend` folder to start React on port 3000.
Run the `BudgetApplication main` function in the `backend` folder to start Spring on port 8080 and the H2 database. 
This will create a `data` folder in the root project folder with a `.db` file.

Note that the controller classes of the backend use the `@CrossOrigin(origins = ["http://localhost:3000"])` annotation in order
for axios to be able to make REST calls to your localhost on port 8080.

## Functionality

This application allows you to organize your expenses by defining different categories with a limit (=budget) and
adding expenses to a pre-defined category or no category.

![image](https://user-images.githubusercontent.com/93260/151671778-e1f29bdb-9275-4907-b468-c1ac52caa5d8.png)

![image](https://user-images.githubusercontent.com/93260/151671856-6deef0e1-0ba6-4414-986d-b26d6a608461.png)

You can of course also view those expenses and delete them or delete an entire budget. Any expenses within a deleted
budget get moved to the "No Category" expenses.

![image](https://user-images.githubusercontent.com/93260/151671901-4b5ffd41-f81b-4c30-9f3d-204cdbd9b925.png)

