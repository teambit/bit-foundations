export function setGatsbyGlobals(){
  const safeWindow = typeof window === "undefined" ? undefined : window;
  const safeGlobal = typeof global === "undefined" ? undefined : global;

  const globalCtx = safeWindow || safeGlobal;
  if(!globalCtx) throw new Error('sorry sir, need global context for Gatsby');

  // Gatsby's Link overrides:
  // Gatsby Link calls the `enqueue` & `hovering` methods on the global variable ___loader.
  // This global object isn't set in non-gatsby context, requiring you to override it to empty functions (no-op),
  // so Gatsby Link doesn't throw errors.
  globalCtx.___loader = {
      enqueue: () => {},
      hovering: () => {},
    }

  // This global variable prevents the "__BASE_PATH__ is not defined" error when using Gatsby components outside a Gatsby application.
  globalCtx.__BASE_PATH__ = "/"
}
