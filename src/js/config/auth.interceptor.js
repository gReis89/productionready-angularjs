function authInterceptor(JWT, AppConstants, $window, $q){
  'ngInject';
  return {
    // authomatically attach authorization headers
    request: function(config){
      if(config.url.indexOf(AppConstants.api) === 0 && JWT.get()){
        config.headers.Authorization = 'Token '+ JWT.get();
      }
      return config;
    },

    // Handle 401
    responseError: function(rejection){
      if(rejection.status === 401){
        JWT.destroy();
        $window.location.reload();
      }
      return $q.reject(rejection);
    }
  };
}

export default authInterceptor;
