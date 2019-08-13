'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const path = require('path');

module.exports = class extends Generator {
  constructor(...args) {
    super(...args);

    this.answers = {
      pkg: '',
      gitName: '',
      gitEmail: '',
    };
  }

  async prompting() {
    this.log(chalk.green('typescript npm package 生成器'));

    const prompts = [
      {
        type: 'input',
        name: 'pkg',
        message: 'Your package name (no word-breaks)',
        default: path.basename(this.determineAppname().replace(/ /g, '-')),
      },
      {
        type: 'input',
        name: 'gitName',
        message: 'git name',
        default: this.git && this.git.name(),
      },
      {
        type: 'input',
        name: 'gitEmail',
        message: 'git email',
        default: this.git && this.git.email(),
      },
    ];

    this.answers = {
      ...this.answers,
      ...(await this.prompt(prompts)),
    };
  }

  writing() {
    [
      ['__tests__', '__tests__'],
      ['src', 'src'],
      ['_gitignore', '.gitignore'],
      ['_jest.config.js', 'jest.config.js'],
      ['_package.json', 'package.json'],
      ['_travis.yml', '.travis.yml'],
      ['_tsconfig.build.es.json', 'tsconfig.build.es.json'],
      ['_tsconfig.build.json', 'tsconfig.build.json'],
      ['_tsconfig.json', 'tsconfig.json'],
      ['LICENSE', 'LICENSE'],
    ].forEach(([a, b]) => {
      this.fs.copyTpl(this.templatePath(a), this.destinationPath(b), this.answers);
    });
  }
};
