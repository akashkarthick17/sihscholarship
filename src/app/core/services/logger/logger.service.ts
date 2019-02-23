import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { LogLevel } from '../../../shared/constants/log-level';

@Injectable()
export class Logger {

  level: number;

  constructor() {
    this.level = environment.logLevel;
  }

  get debug() {
    return this.log(LogLevel.DEBUG, console.debug);
  }

  get error() {
    return this.log(LogLevel.ERROR, console.error);
  }

  get warn() {
    return this.log(LogLevel.WARNING, console.warn);
  }

  get info() {
    return this.log(LogLevel.INFO, console.info);
  }

  private log(logLevel: LogLevel, func: Function) {
    if (logLevel <= this.level) {
      return func.bind(console);
    } else {
      return () => { };
    }
  }
}
