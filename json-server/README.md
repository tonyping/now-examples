# json-server (fake REST API) on ZEIT Now

Get a full fake REST API deployed with zero coding in less than 30 seconds (seriously) on ZEIT Now

**Live Demo /**: https://json-server.now-examples.now.sh/

**Live Demo /posts**: https://json-server.now-examples.now.sh/posts

## Get Started with This Project

To get started with this project yourself, you can use [Now CLI](https://zeit.co/download) to initialize it.

From your terminal, use the following command to create a directory called `josn-server-now` including the files of this example:

```bash
now init json-server json-server-now
```

Change the db.js file to meet your initial requirements

Then, `cd` into your new project's directory (with `cd json-server-now`).

You now have a project, ready to go into development, staging, or production with Now. Your next step is up to you. Try one of the following:

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

## Troubleshooting Resources

- [How do I upload a file to the /tmp directory on ZEIT now](https://spectrum.chat/zeit/general/how-do-i-upload-a-file-to-the-tmp-directory~a1548ae0-91b1-42f5-9388-c79673ba09e4)
- [Why Lambda functions error for read-only files on ZEIT now](https://stackoverflow.com/questions/43389724/lambda-function-error-erofs-read-only-file-system-open-tmp-test-zip-proc)
