import { values, omit } from 'lodash';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import * as services from 'services';
import * as repositories from 'repositories';
import * as workers from 'workers';

import * as middlewares from 'middlewares';
import * as controllers from 'controllers';

import JwtModule from './jwt.module';
import ScheduleModule from './schedule.module';
import EventEmitterModule from './event-emitter.module';

@Module({
  imports: [JwtModule, ScheduleModule, EventEmitterModule],
  controllers: values(controllers),
  providers: [
    ...values(omit(services, 'JwtService')),
    ...values(repositories),
    ...values(workers)
    // ...values(listeners)
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    values(middlewares).forEach((middleware) => {
      consumer.apply(middleware).forRoutes('/');
    });
  }
}
