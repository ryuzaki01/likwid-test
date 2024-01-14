require('dotenv').config({ path: '.env.local' })
const {MongoClient} =  require('mongodb')
const client = new MongoClient(process.env.MONGODB_URI)
const db = client.db("likwid");

const feature = db.collection('feature');

const features = [
  {
    "title": "Connect Wallet",
    "description": "Connect your wallet to create Likwid profile",
    "tasks": [
      {
        "type": "connection",
        "name": "wallet"
      }
    ],
    "exp": 25
  },
  {
    "title": "Set your Username",
    "description": "Go to Edit Profile page and set your Username",
    "tasks": [
      {
        "type": "profile",
        "name": "username"
      }
    ],
    "exp": 25
  },
  {
    "title": "Set your Bio",
    "description": "Go to Edit Profile page and set your Bio",
    "tasks": [
      {
        "type": "profile",
        "name": "bio"
      }
    ],
    "exp": 25
  },
  {
    "id": 4,
    "title": "Update your avatar",
    "description": "Go to Edit Profile page and update your avatar",
    "tasks": [
      {
        "type": "profile",
        "name": "avatar"
      }
    ],
    "exp": 25
  },
  {
    "title": "Join OpenSea Discord",
    "description": "Connect your discord account on Edit Profile page and Join the OpenSea community in Discord to start earning XP.",
    "tasks": [
      {
        "type": "connection",
        "name": "discord"
      },
      {
        "type": "discord",
        "id": "397566282729390110",
        "name": "OpenSea",
        "url": "https://discord.gg/opensea"
      }
    ],
    "exp": 125
  },
  {
    "title": "Follow Likwid on X",
    "description": "Connect your twitter account on Edit Profile page and Follow Likwid on X to get latest update.",
    "tasks": [
      {
        "type": "connection",
        "name": "twitter"
      },
      {
        "type": "twitter_follow",
        "id": "397566282729390110",
        "user": "@wearelikwid"
      }
    ],
    "exp": 125
  }
];


(async function () {
  await feature.insertMany(features);
  console.log(`Data Migrated`);
  client.close()
})()