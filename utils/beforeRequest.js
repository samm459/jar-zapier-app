function configureAuth(request, _, bundle) {
  request.headers["x-auth-token"] = bundle.authData.api_key;
  request.url = request.url.replace(
    /^https:\/\//,
    "https://" + bundle.authData.subdomain + "."
  );
  return request;
}

module.exports = [configureAuth];
