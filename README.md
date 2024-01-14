#Likwid Test
The Likwid Test project is developed as part of the interview process for candidates applying for the Full Stack Developer position at Likwid.

- [Getting Started](#getting-started)
- [Running Server](#running-server)

##Features
- **Feature Exploration:** Browse through a diverse set of features presented as interactive cards.
- **Task Assignment:** Each feature is associated with specific tasks that users can undertake.
- **XP Earning:** Users earn Experience Points (XP) upon successful completion of tasks.
- **User Avatar:** Users can customize their own avatar.  
- **Responsive Design:** Ensure an intuitive and visually pleasing interface that adapts to different screen sizes.

## Technologies Used
### Frontend:

- HTML, Typescript
- React.js for building interactive UI components
- Spline for 3d experience
- Stitches for css in js
- framer-motion for animation library

### Backend:

- NextJS API
- MongoDB as the database for storing feature and task data
- Upstash Redis as in memory storage, storing user task submission to prevent spam  

## Assignment:

### Objective:

Design and implement a full-stack application that allows users to explore and choose from a set of features, each associated with specific tasks. Users can complete these tasks to earn XP (Experience Points). The application should have a responsive and visually appealing interface, displaying cards for each feature with relevant details and associated tasks.

### Requirements:

1.  **Frontend:**

    *   Use js framework of your choice to build the frontend of the application.
    *   Create a landing page displaying a grid of cards, each representing a bunch of tasks to complete.
    *   Each card should include:
    
    *   Task name
    *   Description
    *   XP points earned for completing associated tasks
    *   Button to view tasks related to the feature
    
    *   Implement a task list page accessible from each feature card, displaying tasks associated with that feature.
    *   Each task should include:
    
    *   Task name
    *   Description
    *   XP points for completing the task
    *   Checkbox or button to mark the task as completed
    
    *   Implement a user profile page displaying the user's current XP balance and a list of completed tasks.

3.  **Backend:**

    *   You can use Node.js and Express.js to build the backend server - or use stack of your choice
    *   Set up RESTful APIs to handle:
    
    *   Retrieving the list of features
    *   Retrieving tasks associated with a specific feature
    *   Marking tasks as completed and updating user XP balance

    *   Store data in a simple database (e.g., SQLite, MongoDB) to keep track of features, tasks, and user XP.

5.  **Integration:**

    *   Connect the frontend and backend using API calls to fetch and display data.
    *   Ensure a smooth and responsive user experience.
    *   Implement error handling for cases like failed API requests.

7.  **Authentication:**

    *   Implement a basic user authentication system.
    *   Users should be able to sign up, log in, and log out.
    *   Only authenticated users should be able to earn XP and complete tasks.

9.  **XP Calculation:**

    *   Implement a system to calculate and update the user's XP balance based on completed tasks - get creative here.
    *   Ensure that XP is awarded only once for each completed task.

11. **Bonus Features (Optional):**
     
    *   Add a feature to reset the user's XP and task progress if inactive for a month
    *   Implement real-time updates for XP and task completion using WebSocket or a similar technology.
    *   Include user avatars and customization options.


## Getting Started

Welcome to the setup guide for likwid test! To get started, you need to configure your environment variables. Follow the steps below to set up your `.env` file.

### Step 1: Clone the Repository

Clone the project repository to your local machine:

```bash
git clone https://github.com/ryuzaki01/likwid-test.git
cd likwid-test
```

Install project dependency

```bash
yarn install
```

###Step 2: Create the .env file
Copy .env.example to a new file called .env.local:

```bash
cp .env.example .env.local
````

### Step 3: Configure Environment Variables
Open the .env file in a text editor of your choice and update the following variables:

- NEXTAUTH_URL: Set the URL for your Next.js application. By default, it's set to http://localhost:3000.
- NEXTAUTH_SECRET: Replace YOUR_SECRET with a secret key. You can generate one using:
    ```bash  
    openssl rand -base64 32
    ```
- JWT_SECRET: Replace YOUR_JWT_SECRET with a secure JWT secret. You can generate one using the same command as above.
- GITHUB_ID: Set this to your GitHub Client ID.
- GITHUB_SECRET: Set this to your GitHub Client Secret.

Here is an example of how your .env.local file might look:
```dotenv
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
JWT_SECRET=your_jwt_secret
GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret
```

## Running Server

run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
