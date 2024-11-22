<!-- Header -->
<p align="center">
  <a href="" rel="noopener">
  <img width=200px height=200px src="./assets/uwu-owo.gif" alt="uwu-owo"></a>
</p>

<h3 align="center"> The Companion App </h3>
<div align="center"> <i> A funny way to meet your next companion!</i> </div><br>
<div align="center">

  [![Status](https://img.shields.io/badge/status-active-success.svg)]()
  [![GitHub Issues](https://img.shields.io/github/issues/JershBytes/companion-app.svg)](https://github.com/JershBytes/companion-app/issues)
  [![GitHub Pull Requests](https://img.shields.io/github/issues-pr/JershBytes/companion-app.svg)](https://github.com/kylelobo/The-Documentation-Compendium/pulls)<br>
   [![License](https://img.shields.io/badge/license-MIT-pink.svg)](/LICENSE)

</div>

<h2> 📝 Table of Contents </h2>

- [🧐 About ](#-about-)
- [🏁 Getting Started ](#-getting-started-)
  - [Prerequisites](#prerequisites)
  - [Installing](#installing)
- [🚀 Deployment ](#-deployment-)
- [Docker](#docker)
- [⛏️ Built Using ](#️-built-using-)
- [✍️ Authors ](#️-authors-)
- [🎉 Inspiration ](#-inspiration-)


---

## 🧐 About <a name = "about"></a>

A friend of mine, made a joke about making a dating application form. Because of my bad luck with choosing woman. So I thought why the heck don't I make one. This project is simple and uses just basic front end HTML and CSS with some JavaScript to send a push notification. When someone Clicks submit.

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

### Prerequisites

- Node.js
  - express
  - nodemailer
  - dotenv
  - nodemon ( for tests)

### Installing

- Clone the repo.

```shell
git clone https://github.com/JershBytes/companion-app.git
```

- Install the dependencies

```shell
npm i
```
- Create the `.env` file.
```shell
# This should be in the root of the project
touch .env
```

- Add These Variables to the `.env` file ( I'm using proton and gotify here as my two ends but in theroy you'll just need to adjust to what ever using uusing in [`mailer.js`](./public/js/mailer.js) and [`gotify.sh`](./public/js/gotify.js))

```dotenv title=".env"
GOTIFY_URL= 
PROTON_SMTP_USER=
PROTON_SMTP_TOKEN=
PROTON_SMTP_SERVER=
PROTON_SMTP_PORT=
RECIPIENTS=  # Make sure to add a `,` between the emails.
```

## 🚀 Deployment <a name = "deployment"></a>

Afer all is done in the last step. You can test with

```shell
npm run dev 
```
Fill out some information and hit submit and it should send a push notification and email.

## Docker

I've also provided a docker file for this if you like to use docker.

Just change what you need and build.

## ⛏️ Built Using <a name = "built_using"></a>
- [Express](https://expressjs.com/) - Server Framework
- [NodeJs](https://nodejs.org/en/) - Server Environment

## ✍️ Authors <a name = "authors"></a>
- [@JershBytes](https://github.com/JershBytes) - Idea & Initial work

See also the list of [contributors](https://github.com/JershBytes/companion-app/graphs/contributors) who participated in this project.

## 🎉 Inspiration <a name = "acknowledgement"></a>

- My Friends (as this is a joke but fun to make.)
- [@elifgazioglu](https://github.com/elifgazioglu) from the repos they have made. That inspired me to mess with JS.
  - [doyouwannagooutwithme](https://github.com/elifgazioglu/doyouwannagooutwithme): A website to invite your lover for a date 🥰
  - [will-you-marry-me](https://github.com/elifgazioglu/will-you-marry-me): Proposal with plane ✈️💍
