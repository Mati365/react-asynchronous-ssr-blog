const addTimestamps = (knex, table) => {
  table
    .datetime('createdAt', 6)
    .defaultTo(knex.fn.now(6));

  table
    .datetime('updatedAt', 6)
    .defaultTo(knex.fn.now(6));
};

exports.up = knex => (
  knex
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .then(() => (
      knex.schema
        .createTable('User', (table) => {
          table
            .string('uuid', 36)
            .primary()
            .defaultTo(knex.raw('uuid_generate_v4()'));

          table
            .datetime('lastSeen', 6)
            .defaultTo(knex.fn.now(6));

          table
            .string('nick', 30)
            .nullable();

          table.string('lastUA', 512);
          addTimestamps(knex, table);
        })

        .createTable('Article', (table) => {
          table
            .increments('id')
            .primary();

          table
            .string('cover', 400);

          table
            .string('userId', 36)
            .references('uuid')
            .inTable('User');

          table
            .string('title').notNullable();


          table.text('content', 'longtext');
          addTimestamps(knex, table); // table.timestamps(); sucks
        })

        .createTable('Tag', (table) => {
          table
            .increments('id')
            .primary();

          table
            .string('name')
            .unique()
            .notNullable();

          addTimestamps(knex, table);
        })

        .createTable('PromotedTag', (table) => {
          table
            .increments('id')
            .primary();

          table
            .integer('tagId')
            .unsigned()
            .references('id')
            .inTable('Tag');

          addTimestamps(knex, table);
        })

        .createTable('ArticleTag', (table) => {
          table
            .integer('tagId')
            .unsigned()
            .references('id')
            .inTable('Tag');

          table
            .integer('articleId')
            .unsigned()
            .references('id')
            .inTable('Article');
        })

        .createTable('Comment', (table) => {
          table
            .increments('id')
            .primary();

          table
            .integer('parentCommentId')
            .unsigned()
            .references('id')
            .inTable('Comment');

          table
            .string('userId', 36)
            .references('uuid')
            .inTable('User');

          addTimestamps(knex, table);
        })

        .createTable('Reaction', (table) => {
          table
            .increments('id')
            .primary();

          table
            .string('icon')
            .notNullable();

          table
            .string('name')
            .unique()
            .notNullable();

          addTimestamps(knex, table);
        })

        .createTable('ArticleReaction', (table) => {
          table
            .increments('id')
            .primary();

          table
            .integer('reactionId')
            .unsigned()
            .references('id')
            .inTable('Reaction');

          table
            .integer('articleId')
            .unsigned()
            .references('id')
            .inTable('Article');

          table
            .string('userId', 36)
            .references('uuid')
            .inTable('User');

          addTimestamps(knex, table);
        })
    ))
    .then(() => knex.seed.run())
);

exports.down = knex => (
  knex
    .schema
    .dropTableIfExists('PromotedTag')
    .dropTableIfExists('ArticleReaction')
    .dropTableIfExists('Reaction')
    .dropTableIfExists('Comment')
    .dropTableIfExists('ArticleTag')
    .dropTableIfExists('Tag')
    .dropTableIfExists('Article')
    .dropTableIfExists('User')
);
