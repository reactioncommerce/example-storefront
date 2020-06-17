# v3.2.0

## Refactors

- refactor: Configure `react-testing-library` and remove unnecessary testing dependencies [#686](https://github.com/reactioncommerce/example-storefront/pull/686)

This is a major update that introduces the following refactors in PR [#667](https://github.com/reactioncommerce/example-storefront/pull/667)
- Use React hooks for various parts of the application including orders, cart, shop, translations and more. This refactor remove various HOC that added unnecessary complexity to the app.
- React context is now used and all previous uses of MobX have been removed. Using React context greatly simplifies local states management.
- Simple translation helpers have been added to support multi-lingual shops. See the `useTranslation` React hook for more details.
- Next.js has been update to use version 9.4.1, which includes support for [SSG](https://nextjs.org/blog/next-9-3#next-gen-static-site-generation-ssg-support)(Static Site Generation). By default product pages are re-regenerated every two minutes. Further, various other features, such as dynamic routes and API routes are now used, either a dynamic route or API
as appropriate.
- Various components form the Reaction component library have been removed in favor of using the new Reaction Catalyst design system. This is a stepping stone towards consolidating styling solutions use use only one.


# v3.1.0

This release of `example-storefront` is designed to work with v3.x of the Reaction API.

### Chores

- chore: bump https-proxy-agent from 2.2.2 to 2.2.4 ([#669](http://github.com/reactioncommerce/reaction-admin/pull/669))
- chore: switch to 3.0.0 Docker tag ([#659](http://github.com/reactioncommerce/reaction-admin/pull/659))

# v3.0.0

This is the v3.0.0 release of `example-storefront`, designed to work with v3.0.0 of the Reaction API.

## Features

- feat: remove `-beta` from GraphQL paths [#646](https://github.com/reactioncommerce/example-storefront/pull/646)
- feat: Use Lambda webhook for automated PR creation and merging into reaction-gitops [#651](https://github.com/reactioncommerce/example-storefront/pull/651)
- feat: implemented change password flow and standard OpenID logout flow [#637](https://github.com/reactioncommerce/example-storefront/pull/637)
- feat: auto-create Hydra client on startup [#628](https://github.com/reactioncommerce/example-storefront/pull/628)

## Fixes

- fix: update query with required shopIds array [#656](https://github.com/reactioncommerce/example-storefront/pull/656)
- fixes: made `bin/setup` handle special characters in variables [#639](https://github.com/reactioncommerce/example-storefront/pull/639)
- fix: params for withTag API query [#621](https://github.com/reactioncommerce/example-storefront/pull/621)
- fix: handle OAUTH2_IDP_HOST_URL with no ending slash and missing shop [#627](https://github.com/reactioncommerce/example-storefront/pull/627)

## Chores

- chore: reconfigure docker-compose networks [#653](https://github.com/reactioncommerce/example-storefront/pull/653)
- chore: copy changes from 2.x/trunk [#650](https://github.com/reactioncommerce/example-storefront/pull/650)
- chore: use published image for docker-compose [#623](https://github.com/reactioncommerce/example-storefront/pull/623)

## Refactors

- refactor: Update token name `cartToken` [#616](https://github.com/reactioncommerce/example-storefront/pull/616)

## Notes

*These changes were originally tested and released in our alpha and beta releases*

- [v3.0.0-beta.2](https://github.com/reactioncommerce/example-storefront/releases/tag/v3.0.0-beta.2)
- [v3.0.0-beta](https://github.com/reactioncommerce/example-storefront/releases/tag/v3.0.0-beta)
- [v3.0.0-alpha.3](https://github.com/reactioncommerce/example-storefront/releases/tag/v3.0.0-alpha.3)
- [v3.0.0-alpha.2](https://github.com/reactioncommerce/example-storefront/releases/tag/v3.0.0-alpha.2)
- [v3.0.0-alpha](https://github.com/reactioncommerce/example-storefront/releases/tag/v3.0.0-alpha)

*The following Reaction projects are being released one time in coordination as v3.0.0*

- [Reaction API](https://github.com/reactioncommerce/reaction)
- [Reaction Hydra](https://github.com/reactioncommerce/reaction-hydra)
- [Reaction Identity](https://github.com/reactioncommerce/reaction-identity)
- [Reaction Admin (beta)](https://github.com/reactioncommerce/reaction-admin)
- [Example Storefront](https://github.com/reactioncommerce/example-storefront)
- [Reaction Development Platform](https://github.com/reactioncommerce/reaction-development-platform)

*After this release, Reaction releases will no longer be coordinated across all projects - we'll release each project independently, as needed. This means version numbers will no longer be in sync. The newest versions of each project will work together.*

# v2.9.1

Example Storefront v2.9.1 is a patch update to keep this project in sync with [Reaction v2.9.1](https://github.com/reactioncommerce/reaction) and [reaction-hydra v2.9.1](https://github.com/reactioncommerce/reaction-hydra)

## Fixes

- fix: login from storefront [#633](https://github.com/reactioncommerce/example-storefront/pull/633)

# v2.9.0

Example Storefront v2.9.0 is a minor update to keep this project in sync with [Reaction v2.9.0](https://github.com/reactioncommerce/reaction) and [reaction-hydra v2.9.0](https://github.com/reactioncommerce/reaction-hydra)

# v2.8.1

Example Storefront v2.8.1 is a patch update to keep this project in sync with [Reaction v2.8.1](https://github.com/reactioncommerce/reaction) and [reaction-hydra v2.8.1](https://github.com/reactioncommerce/reaction-hydra)

# v2.8.0

Example Storefront v2.8.0 is a minor update to keep this project in sync with [Reaction v2.8.0](https://github.com/reactioncommerce/reaction) and [reaction-hydra v2.8.0](https://github.com/reactioncommerce/reaction-hydra)

# v2.7.0

Example Storefront v2.7.0 is a minor update to keep this project in sync with [Reaction v2.7.0](https://github.com/reactioncommerce/reaction) and [reaction-hydra v2.7.0](https://github.com/reactioncommerce/reaction-hydra)

# v2.6.0

Example Storefront v2.6.0 is a minor update to keep this project in sync with [Reaction v2.6.0](https://github.com/reactioncommerce/reaction) and [reaction-hydra v2.6.0](https://github.com/reactioncommerce/reaction-hydra)

## Fixes

fix: restore empty_node_modules volume [#591](https://github.com/reactioncommerce/example-storefront/pull/591)

# v2.5.0

Example Storefront v2.5.0 is a minor update to keep this project in sync with [Reaction v2.5.0](https://github.com/reactioncommerce/reaction) and [reaction-hydra v2.5.0](https://github.com/reactioncommerce/reaction-hydra)

## Fixes

fix: Make sure development entry-point runs bin/start by default
fix: Cannot edit checkout address ([#494](https://github.com/reactioncommerce/example-storefront/issues/494))

## Chores

chore: Remove inactive end-to-end propel/calibre tests

## Breaking Changes

None

# v2.4.0

Example Storefront v2.4.0 is a minor update to keep this project in sync with [Reaction v2.4.0](https://github.com/reactioncommerce/reaction) and [reaction-hydra v2.4.0](https://github.com/reactioncommerce/reaction-hydra)

## Features
feat: Use host uid:gid and use in docker to avoid file permissions problems ([#576](https://github.com/reactioncommerce/example-storefront/pull/576))

## Fixes

fix: Resolve broken e2e tests by adding a checkout step in CircleCI ([#580](https://github.com/reactioncommerce/example-storefront/pull/580))

## Breaking Changes

None

# v2.3.0

Example Storefront v2.3.0 is a minor version update to keep this project in sync with [Reaction v2.3.0](https://github.com/reactioncommerce/reaction) and [reaction-hydra v2.3.0](https://github.com/reactioncommerce/reaction-hydra)

# v2.2.1

Example Storefront v2.2.1 is a patch update to keep this project in sync with [Reaction v2.2.1](https://github.com/reactioncommerce/reaction) and [reaction-hydra v2.2.1](https://github.com/reactioncommerce/reaction-hydra)


# v2.2.0

Example Storefront v2.2.0 is a minor update to keep this project in sync with [Reaction v2.2.0](https://github.com/reactioncommerce/reaction) and [reaction-hydra v2.2.0](https://github.com/reactioncommerce/reaction-hydra)

# v2.1.0

Example Storefront v2.1.0 is a minor update to keep this project in sync with [Reaction v2.1.0](https://github.com/reactioncommerce/reaction) and [reaction-hydra v2.1.0](https://github.com/reactioncommerce/reaction-hydra)

## Docs

docs(readme): component library naming [#555](https://github.com/reactioncommerce/example-storefront/pull/555)
docs: Adjust graphiql URLs links and docs [#551](https://github.com/reactioncommerce/example-storefront/pull/551)

## Chores

chore: Add 302 redirects to env.EXTERNAL_GRAPHQL_URL [#550](https://github.com/reactioncommerce/example-storefront/pull/550)
chore: update changelog + version match [#548](https://github.com/reactioncommerce/example-storefront/pull/548)

## Breaking Changes

None

# v2.0.0

Reaction v2.0.0—an API-first, real-time commerce engine built using Node.js, React, and GraphQL. It’s the second major release of our open source commerce software.

This release is coordinated with [Reaction Platform](https://github.com/reactioncommerce/reaction-platform) and is designed to work with the [Reaction](https://github.com/reactioncommerce/reaction) and [reaction-hydra](https://github.com/reactioncommerce/reaction-hydra).

Reaction v2.0.0 is built as a truly headless commerce platform that decouples the Reaction backend services from the frontend. We’ve decoupled the storefront application from the API. Reaction platform now consists of this [Example Storefront](https://github.com/reactioncommerce/example-storefront), which connects with the Reaction application via GraphQL to provide a customer-facing storefront. The API is provided by the [Reaction](https://github.com/reactioncommerce/reaction) project, which is now primarily our GraphQL API. The legacy integrated Meteor storefront is no longer part of the Reaction project.

### Notable changes
This Example Storefront is brand new for the 2.0 version of Reaction. Check out [previous release notes](https://github.com/reactioncommerce/example-storefront/releases) from this project for details and associated issues and PRs.

See the release notes for the [Reaction project](https://github.com/reactioncommerce/reaction/releases) for more information about our 2.0 release.

### New documentation
See [this page](https://github.com/reactioncommerce/reaction-docs/releases/tag/v2.0.0) for a non-comprehensive list of new and updated docs.

Some highlights:
- A [Storefront UI Development guide](https://docs.reactioncommerce.com/docs/next/storefront-intro) answering "How do I build a storefront for Reaction or adapt my storefront to get its data from Reaction, without starting from an example app"
- Helpful info about [GraphQL Resolvers](https://docs.reactioncommerce.com/docs/graphql-resolvers-file-structure) and [extending GraphQL to add a field](https://docs.reactioncommerce.com/docs/how-to-extend-graphql-to-add-field)
- A guide for [“How To Extend the Product Schema”](https://docs.reactioncommerce.com/docs/how-to-extend-product)


### OS notes
**Support for Windows.**
`[reaction-platform](https://github.com/reactioncommerce/reaction-platform)` is not compatible with Windows and has not been fully tested on Windows at this time.

**MacOS and Linux are supported.**
Reaction will support development in a dockerized environment and will focus on tooling and documentation for installation and configuration on the macOS and Linux OSes.

### We've adopted the DCO
We've adopted the [Developer Certificate of Origin (DCO)](https://developercertificate.org/) in lieu of a Contributor License Agreement for all contributions to Reaction Commerce open source projects. We request that contributors agree to the terms of the DCO and indicate that agreement by signing all commits made to Reaction Commerce projects by adding a line with your name and email address to every Git commit message contributed:
```
Signed-off-by: Jane Doe <jane.doe@example.com>
```

You can sign your commit automatically with Git by using `git commit -s` if you have your `user.name` and `user.email` set as part of your Git configuration.

We ask that you use your real name (please no anonymous contributions or pseudonyms). By signing your commit you are certifying that you have the right have the right to submit it under the open source license used by that particular Reaction Commerce project. You must use your real name (no pseudonyms or anonymous contributions are allowed.)

We use the [Probot DCO GitHub app](https://github.com/apps/dco) to check for DCO signoffs of every commit. If you forget to sign your commits, the DCO bot will remind you and give you detailed instructions for how to amend your commits to add a signature.

We're following in the footsteps of several other open source projects in adopting the DCO such as [Chef](https://blog.chef.io/2016/09/19/introducing-developer-certificate-of-origin/), [Docker](https://blog.docker.com/2014/01/docker-code-contributions-require-developer-certificate-of-origin/), and [GitLab](https://about.gitlab.com/2017/11/01/gitlab-switches-to-dco-license/)


### Contributors
Our sincere thanks to @loan-laux and @aldaircruz for contributing to this release.


### Share your feedback
We want to hear from you! Here are some good ways to get in touch.
- Want to request a new feature for Reaction? There’s now a Reaction repo just for [new feature requests](https://github.com/reactioncommerce/reaction-feature-requests).
- Reaction engineers and community engineers and developers are always collaborating in our [Gitter chat channel](https://gitter.im/reactioncommerce/reaction)
- Ask Us Anything! Watch this space for details about an upcoming Community Q&A session with the Reaction team.

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
