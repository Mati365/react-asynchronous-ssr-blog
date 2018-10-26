const R = require('ramda');

const genTimestamps = () => ({
  createdAt: new Date,
  updatedAt: new Date,
});

const createArticles = knex => userId => (
  knex
    .insert([
      {
        title: 'Jakiś artykuł',
        cover: 'https://media.wired.com/photos/59a459d3b345f64511c5e3d4/master/pass/MemeLoveTriangle_297886754.jpg',
        content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ut vulputate lacus, vitae convallis dolor. Aenean semper diam a ante molestie pellentesque. Nunc quis pellentesque risus, vel tristique nisi. Morbi elit nunc, egestas a mauris in, mollis euismod nisi. Integer nibh arcu, blandit quis neque ut, scelerisque tristique augue. Nam tempus lacus at elit lobortis malesuada. Etiam quis faucibus metus, ut tempus augue. Pellentesque condimentum est id diam ultricies bibendum quis et elit. Vestibulum ullamcorper vestibulum orci at pretium. Integer fringilla eros libero, nec rhoncus risus tempus vitae. Donec auctor magna vitae pulvinar consectetur. Pellentesque tempor tincidunt lobortis. Suspendisse eu laoreet justo, a dictum nisi.
        Donec feugiat nec neque ac dapibus. Vestibulum mauris lectus, tristique sit amet tortor at, euismod vulputate ligula. Vestibulum vel justo ante. Proin nec purus viverra, tempor eros eget, iaculis purus. Vivamus commodo, massa ut dapibus efficitur, ex dolor tincidunt neque, in fermentum ligula magna at massa. Ut gravida velit nulla, eu dictum turpis varius nec. Aliquam aliquam eleifend turpis non porttitor. Vivamus est quam, vulputate ac ante non, varius fringilla quam. Nam ultrices justo sit amet dui suscipit, mattis mattis dolor sodales. Sed vitae magna nunc. Vivamus hendrerit sed odio ac gravida. Phasellus dignissim imperdiet ex vitae vulputate.
        Proin eros urna, ornare sit amet convallis ac, fermentum eget nulla. Donec at orci aliquam, lacinia sem non, molestie erat. Morbi rhoncus nunc eget viverra efficitur. Morbi feugiat odio eget odio consequat ornare. Morbi eget eros condimentum, mollis urna eu, maximus lacus. Vestibulum tempor sollicitudin ornare. Ut ac facilisis lectus. Etiam lorem quam, rutrum sit amet suscipit sit amet, auctor a lectus. Sed leo magna, venenatis sit amet urna vitae, aliquet pellentesque felis. Duis scelerisque nibh orci, et lacinia erat aliquet sed. Duis sed semper tellus, sed pulvinar nulla.
        Morbi eget varius nisl, vel malesuada eros. Curabitur volutpat erat quam, ut vulputate mauris consequat et. Fusce congue arcu nec lacus viverra tincidunt. In hac habitasse platea dictumst. Integer lectus nibh, egestas facilisis felis sed, tempus venenatis velit. Mauris vitae accumsan erat, at pharetra ex. Sed fermentum tortor eget nibh ornare scelerisque. Nulla non vulputate quam. Cras varius accumsan felis vitae rutrum. Aliquam fringilla, eros sit amet pellentesque luctus, ex nibh elementum ipsum, ut rhoncus urna nibh quis ante.
        Vestibulum malesuada justo sed turpis placerat, quis mattis sapien ullamcorper. Donec vitae ullamcorper mauris. Phasellus id feugiat leo. Integer semper mi eu suscipit tincidunt. Aliquam efficitur finibus dolor. Nam eget cursus neque. Vestibulum lorem mauris, volutpat quis turpis at, pharetra euismod felis.`,
        userId: userId[0],
        ...genTimestamps(),
      },

      {
        title: 'Ważna wiadomość!!',
        cover: 'https://i.imgur.com/4ll0LsP.jpg',
        content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ut vulputate lacus, vitae convallis dolor. Aenean semper diam a ante molestie pellentesque. Nunc quis pellentesque risus, vel tristique nisi. Morbi elit nunc, egestas a mauris in, mollis euismod nisi. Integer nibh arcu, blandit quis neque ut, scelerisque tristique augue. Nam tempus lacus at elit lobortis malesuada. Etiam quis faucibus metus, ut tempus augue. Pellentesque condimentum est id diam ultricies bibendum quis et elit. Vestibulum ullamcorper vestibulum orci at pretium. Integer fringilla eros libero, nec rhoncus risus tempus vitae. Donec auctor magna vitae pulvinar consectetur. Pellentesque tempor tincidunt lobortis. Suspendisse eu laoreet justo, a dictum nisi.
        Donec feugiat nec neque ac dapibus. Vestibulum mauris lectus, tristique sit amet tortor at, euismod vulputate ligula. Vestibulum vel justo ante. Proin nec purus viverra, tempor eros eget, iaculis purus. Vivamus commodo, massa ut dapibus efficitur, ex dolor tincidunt neque, in fermentum ligula magna at massa. Ut gravida velit nulla, eu dictum turpis varius nec. Aliquam aliquam eleifend turpis non porttitor. Vivamus est quam, vulputate ac ante non, varius fringilla quam. Nam ultrices justo sit amet dui suscipit, mattis mattis dolor sodales. Sed vitae magna nunc. Vivamus hendrerit sed odio ac gravida. Phasellus dignissim imperdiet ex vitae vulputate.
        Proin eros urna, ornare sit amet convallis ac, fermentum eget nulla. Donec at orci aliquam, lacinia sem non, molestie erat. Morbi rhoncus nunc eget viverra efficitur. Morbi feugiat odio eget odio consequat ornare. Morbi eget eros condimentum, mollis urna eu, maximus lacus. Vestibulum tempor sollicitudin ornare. Ut ac facilisis lectus. Etiam lorem quam, rutrum sit amet suscipit sit amet, auctor a lectus. Sed leo magna, venenatis sit amet urna vitae, aliquet pellentesque felis. Duis scelerisque nibh orci, et lacinia erat aliquet sed. Duis sed semper tellus, sed pulvinar nulla.
        Morbi eget varius nisl, vel malesuada eros. Curabitur volutpat erat quam, ut vulputate mauris consequat et. Fusce congue arcu nec lacus viverra tincidunt. In hac habitasse platea dictumst. Integer lectus nibh, egestas facilisis felis sed, tempus venenatis velit. Mauris vitae accumsan erat, at pharetra ex. Sed fermentum tortor eget nibh ornare scelerisque. Nulla non vulputate quam. Cras varius accumsan felis vitae rutrum. Aliquam fringilla, eros sit amet pellentesque luctus, ex nibh elementum ipsum, ut rhoncus urna nibh quis ante.
        Vestibulum malesuada justo sed turpis placerat, quis mattis sapien ullamcorper. Donec vitae ullamcorper mauris. Phasellus id feugiat leo. Integer semper mi eu suscipit tincidunt. Aliquam efficitur finibus dolor. Nam eget cursus neque. Vestibulum lorem mauris, volutpat quis turpis at, pharetra euismod felis.`,
        userId: userId[1],
        ...genTimestamps(),
      },

      {
        title: 'Niezbyt ważna wiadomość!',
        cover: 'https://i.imgur.com/4ll0LsP.jpg',
        content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ut vulputate lacus, vitae convallis dolor. Aenean semper diam a ante molestie pellentesque. Nunc quis pellentesque risus, vel tristique nisi. Morbi elit nunc, egestas a mauris in, mollis euismod nisi. Integer nibh arcu, blandit quis neque ut, scelerisque tristique augue. Nam tempus lacus at elit lobortis malesuada. Etiam quis faucibus metus, ut tempus augue. Pellentesque condimentum est id diam ultricies bibendum quis et elit. Vestibulum ullamcorper vestibulum orci at pretium. Integer fringilla eros libero, nec rhoncus risus tempus vitae. Donec auctor magna vitae pulvinar consectetur. Pellentesque tempor tincidunt lobortis. Suspendisse eu laoreet justo, a dictum nisi.
        Donec feugiat nec neque ac dapibus. Vestibulum mauris lectus, tristique sit amet tortor at, euismod vulputate ligula. Vestibulum vel justo ante. Proin nec purus viverra, tempor eros eget, iaculis purus. Vivamus commodo, massa ut dapibus efficitur, ex dolor tincidunt neque, in fermentum ligula magna at massa. Ut gravida velit nulla, eu dictum turpis varius nec. Aliquam aliquam eleifend turpis non porttitor. Vivamus est quam, vulputate ac ante non, varius fringilla quam. Nam ultrices justo sit amet dui suscipit, mattis mattis dolor sodales. Sed vitae magna nunc. Vivamus hendrerit sed odio ac gravida. Phasellus dignissim imperdiet ex vitae vulputate.
        Proin eros urna, ornare sit amet convallis ac, fermentum eget nulla. Donec at orci aliquam, lacinia sem non, molestie erat. Morbi rhoncus nunc eget viverra efficitur. Morbi feugiat odio eget odio consequat ornare. Morbi eget eros condimentum, mollis urna eu, maximus lacus. Vestibulum tempor sollicitudin ornare. Ut ac facilisis lectus. Etiam lorem quam, rutrum sit amet suscipit sit amet, auctor a lectus. Sed leo magna, venenatis sit amet urna vitae, aliquet pellentesque felis. Duis scelerisque nibh orci, et lacinia erat aliquet sed. Duis sed semper tellus, sed pulvinar nulla.
        Morbi eget varius nisl, vel malesuada eros. Curabitur volutpat erat quam, ut vulputate mauris consequat et. Fusce congue arcu nec lacus viverra tincidunt. In hac habitasse platea dictumst. Integer lectus nibh, egestas facilisis felis sed, tempus venenatis velit. Mauris vitae accumsan erat, at pharetra ex. Sed fermentum tortor eget nibh ornare scelerisque. Nulla non vulputate quam. Cras varius accumsan felis vitae rutrum. Aliquam fringilla, eros sit amet pellentesque luctus, ex nibh elementum ipsum, ut rhoncus urna nibh quis ante.
        Vestibulum malesuada justo sed turpis placerat, quis mattis sapien ullamcorper. Donec vitae ullamcorper mauris. Phasellus id feugiat leo. Integer semper mi eu suscipit tincidunt. Aliquam efficitur finibus dolor. Nam eget cursus neque. Vestibulum lorem mauris, volutpat quis turpis at, pharetra euismod felis.`,
        userId: userId[0],
        ...genTimestamps(),
      },

      {
        title: 'Kolizja z udziałem Zaskakujące doniesienia o kierowcy!',
        cover: 'https://cdn3-www.dogtime.com/assets/uploads/gallery/funny-dog-memes-part-4/funny-dog-meme-he-pretended-to-throw-the-ball-never-again.jpg',
        content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ut vulputate lacus, vitae convallis dolor. Aenean semper diam a ante molestie pellentesque. Nunc quis pellentesque risus, vel tristique nisi. Morbi elit nunc, egestas a mauris in, mollis euismod nisi. Integer nibh arcu, blandit quis neque ut, scelerisque tristique augue. Nam tempus lacus at elit lobortis malesuada. Etiam quis faucibus metus, ut tempus augue. Pellentesque condimentum est id diam ultricies bibendum quis et elit. Vestibulum ullamcorper vestibulum orci at pretium. Integer fringilla eros libero, nec rhoncus risus tempus vitae. Donec auctor magna vitae pulvinar consectetur. Pellentesque tempor tincidunt lobortis. Suspendisse eu laoreet justo, a dictum nisi.
        Donec feugiat nec neque ac dapibus. Vestibulum mauris lectus, tristique sit amet tortor at, euismod vulputate ligula. Vestibulum vel justo ante. Proin nec purus viverra, tempor eros eget, iaculis purus. Vivamus commodo, massa ut dapibus efficitur, ex dolor tincidunt neque, in fermentum ligula magna at massa. Ut gravida velit nulla, eu dictum turpis varius nec. Aliquam aliquam eleifend turpis non porttitor. Vivamus est quam, vulputate ac ante non, varius fringilla quam. Nam ultrices justo sit amet dui suscipit, mattis mattis dolor sodales. Sed vitae magna nunc. Vivamus hendrerit sed odio ac gravida. Phasellus dignissim imperdiet ex vitae vulputate.
        Proin eros urna, ornare sit amet convallis ac, fermentum eget nulla. Donec at orci aliquam, lacinia sem non, molestie erat. Morbi rhoncus nunc eget viverra efficitur. Morbi feugiat odio eget odio consequat ornare. Morbi eget eros condimentum, mollis urna eu, maximus lacus. Vestibulum tempor sollicitudin ornare. Ut ac facilisis lectus. Etiam lorem quam, rutrum sit amet suscipit sit amet, auctor a lectus. Sed leo magna, venenatis sit amet urna vitae, aliquet pellentesque felis. Duis scelerisque nibh orci, et lacinia erat aliquet sed. Duis sed semper tellus, sed pulvinar nulla.
        Morbi eget varius nisl, vel malesuada eros. Curabitur volutpat erat quam, ut vulputate mauris consequat et. Fusce congue arcu nec lacus viverra tincidunt. In hac habitasse platea dictumst. Integer lectus nibh, egestas facilisis felis sed, tempus venenatis velit. Mauris vitae accumsan erat, at pharetra ex. Sed fermentum tortor eget nibh ornare scelerisque. Nulla non vulputate quam. Cras varius accumsan felis vitae rutrum. Aliquam fringilla, eros sit amet pellentesque luctus, ex nibh elementum ipsum, ut rhoncus urna nibh quis ante.
        Vestibulum malesuada justo sed turpis placerat, quis mattis sapien ullamcorper. Donec vitae ullamcorper mauris. Phasellus id feugiat leo. Integer semper mi eu suscipit tincidunt. Aliquam efficitur finibus dolor. Nam eget cursus neque. Vestibulum lorem mauris, volutpat quis turpis at, pharetra euismod felis.`,
        userId: userId[0],
        ...genTimestamps(),
      },
    ])
    .returning('id')
    .into('Article')
);

const randomPick = R.reject(
  () => Math.random() > 0.5,
);

const createListItem = (knex, table, name, fields) => knex
  .insert({
    name,
    ...fields,
    ...genTimestamps(),
  })
  .returning('id')
  .into(table);

exports.seed = (knex) => {
  const tags = Promise.all([
    createListItem(knex, 'Tag', 'news'),
    createListItem(knex, 'Tag', 'polityka'),
    createListItem(knex, 'Tag', 'gify'),
    createListItem(knex, 'Tag', 'humor'),
  ]);

  const reactions = Promise.all([
    createListItem(knex, 'Reaction', 'Śmieszne', {icon: 'https://image.flaticon.com/icons/svg/132/132234.svg'}),
    createListItem(knex, 'Reaction', 'Obrzydliwe', {icon: 'https://image.flaticon.com/icons/svg/132/132236.svg'}),
    createListItem(knex, 'Reaction', 'Słabe', {icon: 'https://image.flaticon.com/icons/svg/132/132268.svg'}),
    createListItem(knex, 'Reaction', 'Obojętne', {icon: 'https://image.flaticon.com/icons/svg/132/132226.svg'}),
    createListItem(knex, 'Reaction', 'WTF', {icon: 'https://image.flaticon.com/icons/svg/132/132265.svg'}),
  ]);

  return Promise
    .all([tags, reactions])
    .then(([appendedTags, appendedReactions]) => {
      const tagsIds = R.unnest(appendedTags);
      const reactionsIds = R.unnest(appendedReactions);

      knex
        .insert([
          {
            uuid: 'ashsf87asfvc7x7cver',
            lastSeen: '2017-01-10 17:30',
            nick: 'Obelix',
            lastUA: 'Firefoks',
            ...genTimestamps(),
          },
          {
            uuid: 'nscmxvnsdfghsdjfhfgj',
            lastSeen: '2017-01-10 17:30',
            nick: 'Asterix',
            lastUA: 'Firefoks',
            ...genTimestamps(),
          },
          {
            uuid: 'xcvxcvcxvvxcvxcvxv',
            lastSeen: '2017-01-10 17:30',
            nick: 'Krucyfix',
            lastUA: 'Firefoks',
            ...genTimestamps(),
          },
        ])
        .returning('uuid')
        .into('User')
        .then(createArticles(knex))
        .then((articleIds) => {
          const tagPromises = R.map(
            articleId => knex('ArticleTag').insert(
              R.map(
                tagId => ({tagId, articleId}),
                randomPick(tagsIds),
              ),
            ),
            articleIds,
          );

          const testReactions = [
            [
              {
                articleId: 1,
                reactionId: reactionsIds[1],
                userId: 'ashsf87asfvc7x7cver',
              },
              {
                articleId: 1,
                reactionId: reactionsIds[2],
                userId: 'nscmxvnsdfghsdjfhfgj',
              },
              {
                articleId: 1,
                reactionId: reactionsIds[2],
                userId: 'xcvxcvcxvvxcvxcvxv',
              },
            ],

            [
              {
                articleId: 2,
                reactionId: reactionsIds[1],
                userId: 'ashsf87asfvc7x7cver',
              },
              {
                articleId: 2,
                reactionId: reactionsIds[0],
                userId: 'xcvxcvcxvvxcvxcvxv',
              },
            ],

            [
              {
                articleId: 3,
                reactionId: reactionsIds[0],
                userId: 'xcvxcvcxvvxcvxcvxv',
              },
            ],
          ];

          const reactionPromises = R.map(
            articleId => knex('ArticleReaction').insert(testReactions[articleId - 1]),
            articleIds,
          );

          return Promise.all([
            Promise.all(tagPromises),
            Promise.all(reactionPromises),
            knex('PromotedTag').insert(
              R.map(
                tagId => ({tagId}),
                [
                  tagsIds[0],
                  tagsIds[1],
                ],
              ),
            ),
          ]);
        });
    });
};
