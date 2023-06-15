import { Account, Client } from "appwrite";

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('PathFInder7567') // Your project ID




export const account = new Account(client);