# VEYORA Shopify header section

This is a Shopify Liquid section port of the VEYORA React reference header.

## Install on the duplicated Dawn theme only

1. In Shopify Admin, open **Online Store → Themes**.
2. On the duplicated theme **VEYORA — Premium Women’s Store**, choose **… → Edit code**.
3. Under **Sections**, add a new section named `veyora-header`.
4. Copy the complete contents of `sections/veyora-header.liquid` from this folder into that new section and save.
5. In **Customize**, open the Header group and add **VEYORA premium header**. Keep the existing Dawn header until the new section is configured and checked.
6. Configure the main menu, announcement text, tracking page, WhatsApp link, Style Journal, Rewards, Fashion Copilot and wishlist destinations.
7. Build the Shopify navigation menu with one top-level **Departments** item, department links beneath it, and category links one level deeper. The mega menu and mobile drawer read this menu structure.
8. Set the feature image and feature destination in the section settings.

## Important

- This section reads the live Shopify cart count and uses Shopify's native search, account, cart and collection routes.
- Wishlist, Style Journal, Rewards, Fashion Copilot and tracking links need matching pages/apps or page URLs in the store.
- This is a custom section file, not a complete Shopify theme. It has not been installed or published to the store.
- Keep all changes on the duplicated theme. Do not publish until desktop and mobile have been checked.
