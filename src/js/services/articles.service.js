export default class Articles {
  constructor(AppConstants, $http, $q){
    'ngInject';

    this._AppConstants = AppConstants;
    this._$http = $http;
    this._$q = $q;

  }

  get(slug) {
    let deferred = this._$q.defer();

    if(!slug.replace(' ', '')){
      deferred.reject('Article slug is empty');
      return deferred.promise;
    }
    this._$http({
      url: `${this._AppConstants.api}/articles/${slug}`,
      method: 'GET'
    }).then(
      (res) => deferred.resolve(res.data.article),
      (err) => deferred.reject(err)
    );

    return deferred.promise;
  }

  save(article) {
    let request = {
      url: `${this._AppConstants.api}/articles`,
      method: 'POST',
      data: { article: article }
    };

    if(article.slug){
      request.url = `${this._AppConstants.api}/articles/${article.slug}`;
      request.method = 'POST';
    } else {
      article.slug = undefined;
    }

    return this._$http(request).then((res) => res.data.article);
  }

}
