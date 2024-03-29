import config from 'config'
import { Express } from 'express'
import morgan from 'morgan'
import { createExpressServer, useContainer } from 'routing-controllers'
import Container from 'typedi'

import { CONTROLLERS } from './controllers'
import { authorize } from './middlewares'

export function createApp(): Express {
  useContainer(Container)

  const app = createExpressServer({
    defaultErrorHandler: false,
    controllers: CONTROLLERS,
    authorizationChecker: authorize,
  })

  // Disable request logging for test environment
  if (config.get('environment') !== 'test') {
    app.use(morgan('dev'))
  }

  return app
}
