# Next.js Frontend with a Node.js API, Using Data from MongoDB, on ZEIT Now

**Live Demo**: https://nextjs-node-js-mongodb.now-examples.now.sh/

This example shows a pre-setup project including:

- An `api` directory, containing endpoints that control the application data (stored using MongoDB Atlas), using Node.js via the [@now/node Builder](https://zeit.co/docs/v2/deployments/official-builders/node-js-now-node/).
- A `pages` directory, containing Next.js pages that make-up the frontend of the application, utilizing data from the API to display the UI.

> For a step-by-step walkthrough on creating a Node.js API with data from MongoDB, [read our guide](https://zeit.co/guides/deploying-a-mongodb-powered-api-with-node-and-now/).

## Get Started with This Project

To get started with this project yourself, you can use [Now CLI](https://zeit.co/download) to initialize it.

From your terminal, use the following command to create a directory called `my-project` including the files of this example:

```bash
now init nextjs-nodejs-mongodb my-project
```

Then, `cd` into your new project's directory (with `cd my-project`).

You will then need to [prepare a GitHub oAuth application](https://developer.github.com/apps/building-oauth-apps/creating-an-oauth-app/) with a Client ID and Client Secret, and a [MongoDB URI](https://docs.atlas.mongodb.com/driver-connection/), stored as [Now Secrets](https://zeit.co/docs/v2/deployments/environment-variables-and-secrets/#securing-environment-variables-using-secrets)

> For [local development](#local-development), you will need to store these pieces of information in a `.env` file. Read more on secrets in local development with Now here: https://zeit.co/docs/v2/development/environment-variables/#using-a-.env-file

You now have a Next.js project, using data from MongoDB through a Node.js API, ready to go into development, staging, or production with Now. Your next step is up to you. Try one of the following:

#### Local Development

Using Now CLI, as you did to initialize this project, you can use the following command from your terminal to start a development environment locally which replicates the production environment on Now so you can test your new project:

```bash
now dev
```

#### Automatic Deployments with Git

Using either [Now for GitHub](https://zeit.co/github) or [Now for GitLab](https://zeit.co/gitlab), you can push this project to a Git repository and it will deploy automatically.

If on anything other than the default branch, with each push your project will be deployed, automatically, to a unique staging URL.

If pushing or merging to the default branch, your project will be deployed and aliased in a production environment, automatically.

Read more about the ZEIT Now Git Integrations:

- [Now for GitHub](https://zeit.co/docs/v2/integrations/now-for-github/)
- [Now for GitLab](https://zeit.co/docs/v2/integrations/now-for-gitlab/)

#### Deploying from Your Terminal

Using [Now CLI](https://zeit.co/download), you can also deploy to both [staging](https://zeit.co/docs/v2/domains-and-aliases/aliasing-a-deployment#staging) and [production](https://zeit.co/docs/v2/domains-and-aliases/aliasing-a-deployment#production) environments from your terminal.

For a staging deployment, you can use the following one-word command:

```bash
now
```

Then, for production, including automatic aliasing, you can use the following:

```bash
now --target production
```

For more information on deploying, see the [Deployment Basics documentation](https://zeit.co/docs/v2/deployments/basics#introducing-a-build-step).

## Configuration Breakdown

This example contains a `now.json` file which instructs Now how to treat this project when developing locally and deploying.

```json
{
  "version": 2,
  "name": "my-project",
  "alias": "my-project",
  "builds": [
    { "src": "api/**/*.js", "use": "@now/node" },
    { "src": "next.config.js", "use": "@now/next" }
  ],
  "regions": ["iad"],
  "env": {
    "MONGODB_URI": "@mongodb_guestbook_uri",
    "GITHUB_CLIENT_ID": "@github_guestbook_client_id",
    "GITHUB_CLIENT_SECRET": "@github_guestbook_client_secret"
  }
}

```

The above instructs Now with:

- The [`version` property](https://zeit.co/docs/v2/deployments/configuration#version), specifying the latest Now 2.0 Platform version.
- The [`name` property](https://zeit.co/docs/v2/deployments/configuration#name), setting the name for the deployment.
- The [`builds` property](https://zeit.co/docs/v2/deployments/configuration#builds), allowing Now to use [the @now/node Builder](https://zeit.co/docs/v2/deployments/official-builders/node-js-now-node/) with the API endpoint files and utilities, and [the @now/next Builder](https://zeit.co/docs/v2/deployments/official-builders/next-js-now-next) for the Next.js front-end.
- The [`regions` property](https://zeit.co/docs/v2/deployments/configuration#regions), allowing you to deploy your application as close as possible to the data source, minimizing latency.
- The [`env` property](https://zeit.co/docs/v2/deployments/configuration#env), allowing your code to use predefined values in runtime without hardcoding those values.

For more information on configuring Now, see the [Configuration documentation](https://zeit.co/docs/v2/deployments/configuration).

## Resources

Learn more about the ZEIT Now platform from [our documentation](https://zeit.co/docs), including:

- [More information on deploying Next.js front-ends with Now](https://zeit.co/docs/v2/deployments/official-builders/next-js-now-next), with additional details.
- [More information on deploying Node.js projects with Now](https://zeit.co/docs/v2/deployments/official-builders/node-js-now-node/), with additional details.
- [More information on the platform itself](https://zeit.co/docs), including [domains and aliasing](https://zeit.co/docs/v2/domains-and-aliases/introduction/) and [local development](https://zeit.co/docs/v2/development/basics/).
- [Read the Next.js documentation for evolving your new front-end](https://nextjs.org/docs).
- [The ZEIT Now Guide for creating a Node.js API utilizing data from MongoDB](https://zeit.co/guides/deploying-a-mongodb-powered-api-with-node-and-now/).
