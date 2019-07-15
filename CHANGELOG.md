# v2.0.0-rc.12
This is our fourth release candidate for this project. While this project is technically still `pre-release` until we've released the final 2.0.0 version, it's the most stable version of Reaction Commerce, and we recommend starting new projects with it at this point. See https://github.com/reactioncommerce/example-storefront/issues/487#issuecomment-507468894 for more detail on this.

This version should be used with `v2.0.0-rc.12` of https://github.com/reactioncommerce/reaction

## Highlights
We have [renamed](https://github.com/reactioncommerce/example-storefront/pull/544) this project from `reaction-next-starterkit` to `example-storefront` to better convey the intent behind our creating it.  We’re also [updating our docs](https://github.com/reactioncommerce/reaction-docs/pull/829) to clarify this change.

The GraphQL API in [reaction v2.0.0-rc.12](https://github.com/reactioncommerce/reaction/pull/5259) has been changed from `/graphql-alpha` to `graphql-beta` to indicate the increased stability of the API. We think there are still some breaking changes to come in the next 3-6 months to the GraphQL API which is why we're keeping the `-beta` suffix for now. As you find bugs with that API, please file issues in the [reaction](https://github.com/reactioncommerce/reaction/issues) repo.

# Improvements

## Feature

- feat: always send a response to logout requests (#520)
- feat: add Orders to Account Profile (#507)

## Fix

- fix: de-duplicate styled-components package (#542)
- fix: only run snyk when package.json changes (#541)
- fix: change calibre ci step to use npx (#535)
- fix: prettier config was in the wrong place (#532)
- feat: remove unused fields from GQL query (#527)
- fix: Update component theming example remove blocking code to allow starterkit to start (#514)

## Chore

- chore: removes fossa status from readme (#545)
- chore: rename project to example-storefront (#544)
- chore: fix debugger command in README (#539)
- chore: change pinned deps to ~ ranges (#538)
- chore: match license from LICENSE.md and README (#536)
- chore: Switch to semver ~1.2.3 style ranges (#534)
- chore: update yarn.lock to resolve snyk js-yaml vuln (#531)
- chore: ignore snyk js-yaml vuln for 30 days (#523)

## Docs

- docs: remove production warning (#543)
- docs: add instructions on how to run starterkit w/ prod API (#537)
- docs: Fix minor typo on [README.md](http://readme.md) (#525)

# v2.0.0-rc.11

This is our third release candidate for this project. This project should be considered `pre-release` until we've released the final 2.0.0 version.

This version should be used with `v2.0.0-rc.11` of https://github.com/reactioncommerce/reaction

# Improvements

## Feature

- feat: add Orders to Account Profile (#507)

## Fix

- fix: Update component theming example (#511)

## Chore

- chore: remove blocking code to allow starterkit to start (#514)

# v2.0.0-rc.10

This is our second release candidate for this project. This project should be considered `pre-release` until we've released the final 2.0.0 version.

This version should be used with `v2.0.0-rc.10` of https://github.com/reactioncommerce/reaction

# Improvements

### Dev Utilities

- We have made it easier to debug and troubleshoot issues in our Docker image:
  (#504)

### General

- We added a new new profile address book page (#499)
- We added support for GraphQL Subscriptions (#492)
- We added the ability to get sitemap data from GQL API and make it available on sitemap\*.xml routes (#488)
- We added the ability to have surcharges attached to an order (#499)

# Breaking Changes

### Multiple Payment Support

- All of the individual `placeOrder*` GraphQL mutations provided by the built-in payment plugins are removed and replaced with a single `placeOrder` mutation which supports multiple payments. Any custom payment method plugins will break due to the removal of `createOrder` internal mutation. Look at all changes. (https://github.com/reactioncommerce/reaction/pull/4908)

## Feature

- feat: performance metrics integration with calibre (#508)
- feat: add dev utilities to the docker image (#504)
- feat: new Profile Address page (#499)
- feat: add graphql subscription support (#492)
- feat: setup sitemap routes to get data from GQL server (#488)
- feat: display order surcharges in UI (#449)

## Fixes

- fix: add enhancements to sitemap route handling (#497)
- fix: updated dependencies and snyk policies (#496)

## Refactor

- refactor: update checkout to support multiple payments (#477)
- refactor: navigation data comes from new NavigationTree (#472)

## Chore

- chore: update typography variants based on MUI warning (#506)
- chore: updated config for modules and tree shaking (#495)

## Docs

- docs(tags): update tag docs to include sitemap, isVisible (#505)

# v2.0.0-rc.9

This is our first release candidate for this project - we're going to be synchronizing releases across the differents parts of the Reaction Commerce ecosystem, so that's why we're starting with rc.8. This project should be considered `pre-release` until we've released the final 2.0.0 version.

## Features

- feat: Improve loading pattern for tags and navItems (#461)
- feat(tlp metadata): render metafield as metadata on TLP (#453)
- feat(tlp title): add tag listing page's display title (#450)
- feat: 443: PDP: Remove Tags display (#447)
- feat: Add subtotal to CartItems (#437) .. Resolves #240
- feat: Simplify customization (#454)
- feat: Use new `order.referenceId` as displayed order ID (#434)
- feat: 366 nnnnat address validation (#421)
- feat: Enable/Disable Single-page app routing (#419)
- feat: Renew access tokens on 401 errors using redirects to auth endpoint (#399)
- feat: Add "Order Completed" event tracking (#388)
- feat: Add tracking to checkout flow (#384)
- feat: Add tracking for "Product Removed" + "Cart Viewed" events (#372)
- feat: Create hydra client on startup (#363)
- feat: Add tracking for "Product Added" Segment event (#361)
- feat: 353 nnnnat status labels (#358)
- feat: update node to version 10 (#347)
- feat: Add sign in/up info in auth URL generated by Passport (#320)

## Fixes

- fix: Fix infinite loader when cart empty (#474)
- fix: fix logic for retrying 401s with silent re-auth (#471)
- fix: Add proper isMounted checking (#455)
- fix: Fix error when clicking links when ENABLE_SPA_LINKS=false (#442)
- fix: Add null check (#429)
- fix: incorrect logger.debug (#428)
- fix: show tax total in all summaries (#424)
- fix(414): Fullname is not saved or displayed (#420)
- fix(config): add canonicalUrl to publicRuntimeConfig (#418)
- fix(340): catch Stripe Payment error and save error message (#406)
- fix(385): Fix Product title & image URLs in Cart, MiniCart, FinalReviewCheckoutAction (#412)
- fix: SSR issues with product grids and PDP pages (#407)
- fix: integration test finished before resolving (#401)
- fix: 369 compareAtPrice (#383)
- fix: Remove unused scopes and grant_type (#390)
- fix: Update src/lib/theme/components.js (#392)
- fix: PDP Mobile re-org (#373)
- fix: Add metafields to product query (#378) .. Resolves #375
- fix: Mobile nav design & bug fixes (#346)
- fix: issue cause by using Router from `next/routes` on the server (#368)
- fix: Always use https for npm registry (#365)
- fix: Duplicated initials in logged in indicator (#343)
- fix: clear a user's cart after placing an order, and remove MiniCart popper from order completed page. (#332)
- fix: add padding to cart items in order complete page (#338)
- fix: Replace passport server-side sessions with cookie session (#349)
- fix: MiniCart popper occasionally being drawn at the wrong position. (#336)

## Docs

- docs: update install instructions to link to the official Docs (#382)
- docs: numbering bug (#337)

## Performance Improvements

- perf: Performance improvements (#396)

## Refactors

- refactor: inventory status fixes and updated UI design (#459)
- refactor: unsplit first and last name fields in Checkout saving (#386)
- refactor: static assets (#367)
- refactor: progressive image (#362) .. Resolves #227

## Chores

- chore: integrate ssr test + broken link checker to CI (#473)
- chore: update the component library to 0.60.1 (#464)
- chore: Add logger messages for 401 error (#423)
- chore: upgrade reactioncommerce/components to latest (#425)
- chore: Deploy develop branch to staging environment in ECS (#355)
- chore: Enable Webpack tree shaking (#352)
- chore upgrade babel and next (#341)
- chore: Set project license to Apache 2.0 (#339)
