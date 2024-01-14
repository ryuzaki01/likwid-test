# Likwid Test

The Likwid Test project is developed as part of the interview process for candidates applying for the Full Stack Developer position at Likwid.

- [Getting Started](#getting-started)
- [Running Server](#running-server)

##Features
- **Feature Exploration:** Browse through a diverse set of features presented as interactive cards.
- **Task Assignment:** Each feature is associated with specific tasks that users can undertake.
- **XP Earning:** Users earn Experience Points (XP) upon successful completion of tasks.
- **User Avatar:** Users can customize their own avatar.
- **Social Media Connections:** Users can connect their twitter & discord to link.
- **Responsive Design:** Ensure an intuitive and visually pleasing interface that adapts to different screen sizes.

## Technologies Used
### Frontend:

- HTML, Typescript
- [React.js](https://react.dev/) for building interactive UI components
- [Stitches]() for css in js
- [Radix UI](https://www.radix-ui.com/) for UI Components primitives base
- [Framer Motion](https://www.framer.com/motion/) for animation library

### Backend:

- [NextJS framework](https://nextjs.org/)
- [MongoDB](https://www.mongodb.com/) as the database for storing feature and task data
- [Upstash](https://upstash.com/) Redis as in memory storage, storing user task submission to prevent spam  
- [Discord API](https://discord.com/developers/docs/intro) discord social account connection and task completion
- [Twitter API](https://developer.twitter.com/en/docs/twitter-api) twitter social account connection and task completion

-----

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

- NEXTAUTH_SECRET: Replace YOUR_SECRET with a secret key. You can generate one using:
    ```bash  
    openssl rand -base64 32
    ```
- MONGODB_URI: See [Obtaining MongoDB Connection String URI](#obtaining-mongodb-connection-string-uri)
- NEXT_PUBLIC_WALLET_CONNECT_ID: See [Obtaining WalletConnect Project ID](#obtaining-walletconnect-project-id)
- UPSTASH_REDIS_REST_TOKEN: See [Obtaining Upstash Redis Token and URL](#obtaining-upstash-redis-token-and-url)
- UPSTASH_REDIS_REST_URL: See [Obtaining Upstash Redis Token and URL](#obtaining-upstash-redis-token-and-url)
- DISCORD_CLIENT_ID: See [Obtaining Discord Client ID and Secret](#obtaining-discord-client-id-and-secret)
- DISCORD_CLIENT_SECRET: See [Obtaining Discord Client ID and Secret](#obtaining-discord-client-id-and-secret)
- TWITTER_CONSUMER_KEY: See [Obtaining Twitter Consumer Key and Secret](#obtaining-twitter-consumer-key-and-secret)
- TWITTER_CONSUMER_SECRET: See [Obtaining Twitter Consumer Key and Secret](#obtaining-twitter-consumer-key-and-secret)

Here is an example of how your .env.local file might look:
```dotenv
# App
NEXT_PUBLIC_HOST_URL=http://localhost:3000
NEXT_PUBLIC_WALLET_CONNECT_ID=5dd18f61f54044c53f0e1ea9d1829b08

# next-auth
NEXTAUTH_URL=http://localhost:3000
# to generate secret 'openssl rand -base64 32'
NEXTAUTH_SECRET=JfRIvY4uhgOaTaWjcXETGYM7MpAyXooElqcTKuV8hfA=

# MongoDB -> https://www.mongodb.com/
MONGODB_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/?retryWrites=true&w=majority

# Upstash Redis -> https://upstash.com/
UPSTASH_REDIS_REST_TOKEN=
UPSTASH_REDIS_REST_URL=

# Twitter API
TWITTER_API_URL=https://api.twitter.com/2
TWITTER_CONSUMER_KEY=
TWITTER_CONSUMER_SECRET=

# Discord API
DISCORD_CLIENT_ID=
DISCORD_CLIENT_SECRET=
```

## Running Migration

to fill the data with predefined tasks run:
```bash
yarn migrate
```

## Running Server

run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

-----

## Obtaining Upstash Redis Token and URL

To use Upstash Redis as your caching solution, follow these steps to obtain the required credentials:

1. **Sign up for Upstash:**
    - Go to the Upstash website: [https://upstash.com/](https://upstash.com/)
    - Click on the "Get Started for Free" button.
    - Sign up for a new account by providing the necessary information.

2. **Create a New Redis Database:**
    - After signing in, navigate to the dashboard.
    - Click on the "Create New Database" button.
    - Choose a plan based on your requirements (e.g., Free Plan).
    - Configure the database settings and click on the "Create" button.

3. **Get Redis REST API Token:**
    - Once your database is created, click on it to view the details.
    - In the database dashboard, you will find the "REST API" tab.
    - Click on the "Generate Token" button to create a new REST API token.
    - Copy the generated token.

4. **Get Redis REST API URL:**
    - In the same "REST API" tab, you will find the API URL. Copy the URL.

5. **Update `.env` File:**
    - Open your `.env` file in a text editor.
    - Replace `your_upstash_redis_rest_token` and `your_upstash_redis_rest_url` with the actual values you obtained.

-----

## Obtaining MongoDB Connection String URI

MongoDB Atlas is a cloud-based database service that allows you to host MongoDB databases. Follow these steps to obtain the connection string URI for your MongoDB Atlas database.

### Step 1: Sign Up/Login to MongoDB Atlas

1. Go to the MongoDB Atlas website: [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. If you don't have an account, click on the "Sign Up" button and follow the registration process. If you already have an account, click on "Log In."

### Step 2: Create a New Cluster

1. After logging in, click on the "Build a New Cluster" button.
2. Choose the cloud provider and region for your cluster. (e.g., AWS, Azure, Google Cloud, etc.)
3. Select the appropriate settings for your cluster, such as the cluster tier, version, and additional settings.
4. Click on the "Create Cluster" button.

### Step 3: Monitor Cluster Deployment

1. Once the cluster is created, you'll be redirected to the cluster dashboard.
2. Monitor the cluster deployment progress. It may take a few minutes to provision the cluster.

### Step 4: Add IP Whitelist Entry

1. In the cluster dashboard, click on the "Network Access" tab in the left sidebar.
2. Click on the "Add IP Address" button to whitelist your IP address for accessing the database. You can whitelist your current IP or enter `0.0.0.0/0` for all IP addresses (not recommended for production).

### Step 5: Create Database User

1. In the left sidebar, click on "Database Access."
2. Click on the "Add New Database User" button.
3. Enter a username and password for the new user.
4. Assign appropriate roles to the user. (e.g., Atlas Admin, Read and Write to Any Database, etc.)
5. Click on the "Add User" button.

### Step 6: Get Connection String URI

1. Return to the cluster dashboard.
2. Click on the "Connect" button.
3. Choose "Connect Your Application."
4. Copy the connection string URI provided. It should look like:
```
mongodb+srv://<username>:<password>@<cluster-name>.mongodb.net/<database-name>?retryWrites=true&w=majority`
```
Replace `<username>`, `<password>`, `<cluster-name>`, and `<database-name>` with your actual values.

### Step 7: Update .env File

1. Open your project's `.env.local` file.
2. Replace the `MONGODB_URI=<connection string>` placeholder with the copied connection string URI.

Now, you have successfully obtained and configured the MongoDB connection string URI from MongoDB Atlas for your application.

**Note:** Ensure to keep your connection string URI and database credentials secure, especially in production environments.

-----

## Obtaining Discord Client ID and Secret

Discord provides an API that allows developers to integrate their applications with Discord services. Follow these steps to obtain the Discord Client ID and Client Secret for your application.

### Step 1: Create a New Discord Application

1. Go to the Discord Developer Portal: [https://discord.com/developers/applications](https://discord.com/developers/applications).
2. If you haven't logged in, sign in with your Discord account. If you don't have an account, you'll need to create one.
3. Click on the "New Application" button.

### Step 2: Configure Your Application

1. Enter a name for your application in the "App Name" field.
2. Click on the "Create" button.

### Step 3: Obtain Client ID

1. In the application dashboard, go to the "General Information" tab.
2. Copy the "Client ID" value. This is your Discord Client ID.

### Step 4: Create Bot User

1. Navigate to the "Bot" tab in the left sidebar.
2. Click on the "Add Bot" button.
3. Confirm the action by clicking on "Yes, do it!"

### Step 5: Obtain Client Secret

1. Still in the "Bot" tab, under the "Token" section, click on "Copy" to copy the token. This is your Discord Bot Token.
   **Note:** Keep your bot token secure and do not share it publicly.

### Step 6: Add Bot to a Discord Server

1. In the "OAuth2" tab, under the "OAuth2 URL Generator" section, select the "bot" scope.
2. Scroll down and choose the necessary bot permissions.
3. Copy the generated OAuth2 URL and paste it into your browser.
4. Select a server to add the bot to and follow the authorization process.

### Step 7: Configure Redirect URI

1. In the Discord Developer Portal, navigate to your application.
2. Go to the "OAuth2" tab in the left sidebar.

### Step 8: Add Redirect URI

1. Under the "Redirects" section, you'll see a list of Redirect URIs.
2. Click on "Add Redirect" and enter the following URI:
`http://localhost:3000/api/social/discord/verify`

### Step 9: Update .env File

1. Open your project's `.env.local` file.
2. Replace the placeholders for `DISCORD_CLIENT_ID` and `DISCORD_CLIENT_SECRET` with the obtained values.

```dotenv
DISCORD_CLIENT_ID=your_discord_client_id
DISCORD_CLIENT_SECRET=your_discord_client_secret
```

-----

## Obtaining Twitter Consumer Key and Secret

When integrating Twitter API in your application, you need to obtain the Consumer Key and Consumer Secret. Additionally, you must set up a callback URI to handle the OAuth1.0a authentication process. Here's a step-by-step guide:

### Step 1: Create a Twitter Developer Account

1. Go to the [Twitter Developer Portal](https://developer.twitter.com/).
2. Sign in with your Twitter account or create one if you don't have an account.

### Step 2: Create a Twitter Developer App

1. Once signed in, navigate to the "Developer Dashboard" by clicking your profile picture.
2. Click on the "Projects & Apps" tab.
3. Click on the "Create App" button.

### Step 3: Fill in the App Details

1. Fill in the required details for your app.
2. Provide a unique name, description, and website URL for your app.

### Step 4: Obtain Consumer Key and Consumer Secret

1. After creating the app, go to the "Keys and tokens" tab.
2. Under the "Consumer API keys" section, you'll find your "API key" (Consumer Key) and "API key secret" (Consumer Secret). Copy these values.

### Step 5: Set Up Callback URI

1. In the "App settings" section, navigate to the "Authentication settings."
2. Under "Sign in with Twitter," add a callback URL. Set it to:
`http://localhost:3000/api/social/twitter/verify`

This URI corresponds to the endpoint in your application that will handle Twitter OAuth1.0a verification.

3. Save your changes.

### Step 6: Update .env File

Open your project's `.env.local` file and ensure the `TWITTER_CONSUMER_KEY` and `TWITTER_CONSUMER_SECRET` variables are set:

```dotenv
TWITTER_CONSUMER_KEY=your_twitter_consumer_key
TWITTER_CONSUMER_SECRET=your_twitter_consumer_secret
```

-----

## Obtaining WalletConnect Project ID

When integrating WalletConnect in your application, you need to obtain the Project ID. This is crucial for ensuring secure and reliable connections to cryptocurrency wallets. Follow these steps to obtain the WalletConnect Project ID:

### Step 1: Visit WalletConnect Website

1. Go to the [WalletConnect Website](https://walletconnect.org/).
2. Navigate to the "Developers" section.

### Step 2: Sign In or Create an Account

1. Sign in with your WalletConnect account or create a new account.
2. Access the Developer Dashboard.

## Step 3: Create a New Project

1. Click on the "Create New Project" button.
2. Fill in the required details for your project, including the project name, description, and website URL.

### Step 4: Obtain Project ID

1. After creating the project, you'll be provided with a unique Project ID. This is what you need for integrating WalletConnect into your application.
2. Copy the Project ID.

### Step 5: Update .env File

Open your project's `.env.local` file and set the `NEXT_PUBLIC_WALLET_CONNECT_ID` variable:

```dotenv
NEXT_PUBLIC_WALLET_CONNECT_ID=your_wallet_connect_project_id
```

### Step 6: Update walletconnect.txt

WalletConnect requires a walletconnect.txt file to be available at `./public/.well-known/walletconnect.txt`.
Create or update this file with the verification code