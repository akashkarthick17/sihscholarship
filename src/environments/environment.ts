import { LogLevel } from 'app/shared/constants/log-level';

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  logLevel: LogLevel.DEBUG,
  defaultLanguage: 'en',
  apiServerURL: 'http://localhost:3000/',
  questionServiceURL: 'questions-service/',
  loginServiceURL: 'login-service/',
  organizationServiceURL: 'organization-service/',
  examServiceURL: 'exam-service/',
  examSessionURL: 'exam-session-service/',
  questionsPerPage: 5
};
