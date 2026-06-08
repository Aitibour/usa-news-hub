// Derive article image from slug — no stored URLs needed in articles-meta.js
window.resolveArticleImage = function(a) {
  return a.image || ('https://picsum.photos/seed/' + (a.slug || 'news') + '/900/600');
};
