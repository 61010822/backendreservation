import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ExpressAdapter } from '@nestjs/platform-express'

import * as express from 'express'
import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

import { AppModule } from './app.module'

const server = express()

export const createNestServer = async (expressInstance) => {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance)
  )

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))

  app.enableCors({
    origin: '*'
  })

  admin.initializeApp()

  const config = new DocumentBuilder()
    .setTitle('Reservation Backend')
    .setDescription('Reservation Backend building using NestJS')
    .setVersion('1.0.0')
    .addTag('Reservation')
    .addServer(
      process.env.NODE_ENV === 'production'
        ? 'https://us-central1-reservation-1137b.cloudfunctions.net/api/'
        : 'http://localhost:5001/reservation-1137b/us-central1/api/'
    )
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document)

  return app.init()
}

createNestServer(server).then()

export const api = functions.https.onRequest(server)
