# Metalsmith Example

This directory is a brief example of a [Metalsmith](https://metalsmith.io/) app that can be deployed to ZEIT Now with zero configuration.

## How we created this example

To get started with Metalsmith on Now, you can use the [Now CLI](https://zeit.co/download) to initialize the project:

```shell
$ now init metalsmith
```

> The only changes made were to add a build script in `package.json` and change the `destination` in `index.js` to be `"public"`.

## Deploying this Example

Once initialized, you can deploy the Metalsmith example with just a single command:

```shell
$ now
```
