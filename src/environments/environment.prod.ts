import { LogLevel } from 'app/shared/constants/log-level';

export const environment = {
  production: true,
  logLevel: LogLevel.WARNING,
  defaultLanguage: 'en',
  apiServerURL: 'http://localhost:3000/',
  questionServiceURL: 'questions-service/',
  loginServiceURL: 'login-service/',
  organizationServiceURL: 'organization-service/',
  examServiceURL: 'exam-service/',
  examSessionURL: 'exam-session-service/'
};
