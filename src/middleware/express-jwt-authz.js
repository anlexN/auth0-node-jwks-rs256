export default (requestedScope, options = { checkAllScopes: false }) => {
  if (typeof requestedScope !== "string") {
    throw new Error(
      "Parameter requestedScope must be an string representing the scopes for the endpoint(s)"
    );
  }

  return (req, res, next) => {
    let grantedScope = req.user.scope;
    let granted;

    requestedScope = requestedScope.split(" ");

    if (options.checkAllScopes) {
      granted = requestedScope.every((scope) => grantedScope.includes(scope));
    } else {
      granted = requestedScope.some((scope) => grantedScope.includes(scope));
    }

    return granted
      ? next()
      : next(new Error("The token does not contain sufficient scopes."));
  };
};
