# HyperApp Example

This directory is a brief example of a [HyperApp](https://github.com/jorgebucaran/hyperapp) app that can be deployed to ZEIT Now with zero configuration.

## How we created this example

To get started with HyperApp on Now, you can use the [Now CLI](https://zeit.co/download) to initialize the project:

```shell
$ now init hyperapp
```

> The only change made is to amend the `releaseTarget` to `"public"` in the `taskfile.js` file.

## Deploying this Example

Once initialized, you can deploy the HyperApp example with just a single command:

```shell
$ now
```
