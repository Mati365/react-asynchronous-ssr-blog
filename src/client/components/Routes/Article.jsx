import React from 'react';

import AsyncFetch from '../Shared/AsyncFetch';

import {EditDatesToolbox} from '../Shared/ArticleCard';
import {TagsContainer} from '../Shared/Tag';
import {
  AsyncArticlesSection,
  ReactionsBar,
} from '../Shared';

const Article = ({article}) => (
  <article
    style={{
      color: 'rgba(0, 0, 0, 0.8)',
      marginBottom: 20,
    }}
  >
    <img
      alt='Cover'
      src={article.cover}
      style={{
        display: 'block',
        width: '100%',
        height: '350px',
        margin: '30px auto',
        objectFit: 'cover',
      }}
    />

    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        margin: '10px 0',
      }}
    >
      <h2
        style={{
          margin: '0 20px 0 0',
        }}
      >
        {article.title}
      </h2>

      <EditDatesToolbox
        article={article}
        style={{
          fontSize: 12,
          marginLeft: 'auto',
          minWidth: 320,
        }}
      />
    </div>

    <div
      style={{
        marginTop: 20,
        textAlign: 'justify',
      }}
    >
      {article.content}

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 20,
          width: '100%',
        }}
      >
        <ReactionsBar reactions={article.reactions} />

        <div
          style={{
            textAlign: 'right',
          }}
        >
          <TagsContainer tags={article.tags} />
        </div>
      </div>
    </div>
  </article>
);

const ArticleContainer = ({match}) => {
  const articleURL = `${process.env.API_URL}/articles/${match.params.id}`;

  return (
    <>
      <section>
        <AsyncFetch fetchUrl={articleURL}>
          {({article, error}) => (
            article
              ? <Article article={article} />
              : <span style={{textAlign: 'center'}}>{error}</span>
          )}
        </AsyncFetch>
      </section>

      <section>
        <h4>
          Read also:
        </h4>
        <AsyncArticlesSection
          fetchUrl={`${articleURL}/similar-articles`}
          emptyPlaceholder='Nothing :('
        />
      </section>
    </>
  );
};

export default ArticleContainer;
