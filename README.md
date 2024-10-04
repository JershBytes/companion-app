<div align="center">
  <div style="border: 1px solid red; background-color: #fff3cd; color: #856404; padding: 10px; border-radius: 5px; display: inline-block;">
    <strong>CAUTION:</strong> This is still a WIP. Since I'm new to JavaScript.
  </div>

  <br>
  <br>

</div>
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

+ [🧐 About ](#-about-)
+ [🏁 Getting Started ](#-getting-started-)
  + [Prerequisites](#prerequisites)
  + [Installing](#installing)
+ [🚀 Deployment ](#-deployment-)
+ [⛏️ Built Using ](#️-built-using-)
+ [✍️ Authors ](#️-authors-)
+ [🎉 Inspiration ](#-inspiration-)


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

- Add These Variables to the `.env` file
```
pushoverUserKEy=
pushoverToken=
EMAIL_USER=
EMAIL_PASS=
EMAIL_HOST=
EMAIL_PORT=
```
- Also add the emails you want the form to be sent to

```js
// This is found in /public/js/mailsender.js
// Array of recipient emails
const emails = [''];
```

## 🚀 Deployment <a name = "deployment"></a>

Afer all is done in the last step. You can test with

```shell
npm run dev server.js
```
Fill out some infomation and hit submit and it should send a push notification and email.

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
