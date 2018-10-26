import express from 'express';
import Knex from 'knex';
import {Model} from 'objection';
import * as R from 'ramda';

import {
  Article,
  Tag,
  ArticleTag,
  PromotedTag,
  Reaction,
} from '@server/models';

import knexConfig from '../../../../knexfile';

const apiRouter = express.Router();

apiRouter
  .get('/promoted-tags', async (req, res) => {
    const tags = await PromotedTag
      .query()
      .eagerAlgorithm(Article.NaiveEagerAlgorithm)
      .select('id')
      .eager('[tags(pickTags)]', {
        pickTags: builder => builder.select('id', 'name'),
      });

    res.json({
      list: tags,
    });
  })

  .get('/tag/:tagId', async (req, res) => {
    const tag = await Tag
      .query()
      .findById(req.params.tagId)
      .select('id', 'name');

    if (!tag) {
      res
        .status(404)
        .json({
          error: 'Tag not found!',
        });
    } else
      res.json({tag});
  })

  .get('/reactions', async (req, res) => {
    const reactions = await Reaction
      .query()
      .select('id', 'name', 'icon');

    res.json({
      list: reactions,
    });
  })

  .get('/articles', async (req, res) => {
    const articles = await Article
      .query()
      .eagerAlgorithm(Article.NaiveEagerAlgorithm)
      .$pickListFields()
      .$pickDescriptionFields()
      .orderBy('Article.createdAt', 'desc');

    res.json({
      list: articles,
    });
  })

  .get('/articles/:articleId', async (req, res) => {
    const article = await Article
      .query()
      .findById(req.params.articleId)
      .$pickDescriptionFields();

    if (!article) {
      res
        .status(404)
        .json({
          error: 'Article not found!',
        });
    } else
      res.json({article});
  })

  .get('/articles/by-tag/:tagId', async (req, res) => {
    const articles = await Article
      .query()
      .eagerAlgorithm(Article.NaiveEagerAlgorithm)
      .$filterByTags([req.params.tagId]);

    res.json({
      list: articles,
    });
  })

  .get('/articles/:articleId/similar-articles', async (req, res) => {
    const {articleId} = req.params;
    const articleTagsIds = R.pluck(
      'tagId',
      await ArticleTag
        .query()
        .where('articleId', articleId),
    );

    const articles = await Article
      .query()
      .eagerAlgorithm(Article.NaiveEagerAlgorithm)
      .whereNot('id', articleId)
      .$filterByTags(articleTagsIds)
      .limit(4);

    res.json({
      list: articles,
    });
  });

export default () => {
  const knex = Knex(knexConfig[process.env.NODE_ENV || 'development']);
  Model.knex(knex);

  return apiRouter;
};
