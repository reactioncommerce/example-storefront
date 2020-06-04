# Breadcrumbs

Breadcrumbs can be either a location or heiarchial based navigation trail to help users see how they navigated to a specific page.

This startkit uses breadcrumbs in two locations:
1. On any `Tag` grid page, we use a heiarchial system to show where the current tag lives
1. On any Product Detail Page (PDP), we use our `routingStore` to create a navigation based system using the stored `tag`, to show how the user has landed on this PDP.

## Tag Grid Breadcrumbs
On a tag grid page, the Breadcrumbs will always show a heirachal view of where this Tag lives.

If the tag is a top level tag (`isTopLevel === true`), the Breadcrumbs will show `Home > {tagName}`.

If the tag is a second level tag, the Breadcrumbs will inject it's parent and show show `Home > {topLevelTag} > {tagName}`.

## PDP Breadcrumbs
On the PDP, the Breadcrumbs will show a path of how the user landed on the PDP.

If a product is navigated to from anywhere aside from a tag (i.e. the default grid or a direct link) the Breadcrumbs will show `Home > {productName}`.

If a product is clicked from a tag page, the Breadcrumbs will show `Home > {parentTag / tagName} > {productName}`.
