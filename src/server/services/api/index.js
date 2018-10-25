import express from 'express';
import Knex from 'knex';
import {Model} from 'objection';

import {Article} from '@server/models';
import knexConfig from '../../../../knexfile';

const apiRouter = express.Router();

apiRouter
  .get('/articles', async (req, res) => {
    const articles = await Article
      .query()
      .select('id', 'title', 'createdAt', 'updatedAt')
      .$pickDescriptionFields()
      .orderBy('createdAt', 'desc');

    res.json({
      list: articles,
    });
  })

  .get('/articles/:articleId', async (req, res) => {
    const articles = await Article
      .query()
      .findById(req.params.articleId)
      .$pickDescriptionFields();

    res.json({
      list: articles,
    });
  });

export default () => {
  const knex = Knex(knexConfig[process.env.NODE_ENV || 'development']);
  Model.knex(knex);

  return apiRouter;
};
