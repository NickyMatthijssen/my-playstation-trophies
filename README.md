# My Playstation trophies

## Summary

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

This project was created as a small practice project which i started because i enjoy hunting for trophies on Playstation.

## Getting Started

To run the application you should first install all dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Before running the application make sure you've created a .env file which holds the NPSSO token.
To get this token you should login on your Playstation account through the their website:
[Playstation.com](https://playstation.com)

After authenticating go to the next URL:
[https://ca.account.sony.com/api/v1/ssocookie](https://ca.account.sony.com/api/v1/ssocookie)

Here you should find you SSO token.

```
{ "npsso": "<64 character token>" }
```

Place the SSO token in your environmental file.

```
NPSSO="<64 character token>"
```

After installing all dependencies, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm deva
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Refreshing the token

When running the app with the start or dev commands, Quirrel will be launched as well.
Quarrel handles serverless cronjobs to make sure the api token will be refreshed.
This is important since the SSO token can expire and the app won't work anymore
and it takes time to get a new SSO taken and setup again.
