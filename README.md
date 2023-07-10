# Polaris Media Cloud Control Plane Prototype

## Description

This project serves as a starting point/sandbox for the DMC backend application. The application will manage:

- Creating/configuring Templates
- Managing Product Configurations
- Defining Workflows and the Workflow Steps they are composed of
- Creating the relationships between Functional Roles
- Executing and managing the state/status of Workflows and Workflow Steps
- Triggering deployments at various stages of the Workflow

## Deployment Functionality

(WIP)

As currently envisioned, the deployment process works as follows:

1. Based on the selected Template, and user-entered configuration, a Workflow is created
2. The workflow consists of one or more Deployment Steps
3. The Deployment details are dynamic, and are represented by a data model that is expressed as JSON
4. Each Product supported by the Application is defined as one or more Terraform modules
5. The data model contains the configuration details for each Product Deployment
  - Instance configuration
  - License info (entered by user or derived from previous Workflow step actions)
  - Names and unique IDs for components within the deployment
  - Anything needed to deploy the product successfully
6. An example configuration looks like this: 

```
{
  Vectar: {
    Primary: {
      component_id: 'viz1',
      instance_type: 't2.micro',
      ami: 'ami-003d3d03cfe1b0468',
    },
    Secondary: {
      component_id: 'viz2',
      instance_type: 't2.micro',
      ami: 'ami-003d3d03cfe1b0468',
    },
  },
  Chyron: {
    Chyron1: {
      component_id: 'chyron1',
      instance_type: 't2.micro',
      ami: 'ami-003d3d03cfe1b0468',
    },
    Chyron2: {
      component_id: 'chyron2',
      instance_type: 't2.micro',
      ami: 'ami-003d3d03cfe1b0468',
    },
  },
  TagVS: {
    Manager: {
      component_id: 'tagvs1',
      instance_type: 't2.micro',
      ami: 'ami-003d3d03cfe1b0468',
    },
    Worker: {
      component_id: 'tagvs2',
      instance_type: 't2.micro',
      ami: 'ami-003d3d03cfe1b0468',
    },
  },
  Telos: {
    Application: {
      component_id: 'telos1',
      instance_type: 't2.micro',
      ami: 'ami-003d3d03cfe1b0468',
    },
    License: {
      component_id: 'telos2',
      instance_type: 't2.micro',
      ami: 'ami-003d3d03cfe1b0468',
    },
  },
}
```

--

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
