# Tom's Recipes

Recipes and weekly meal plans, published at https://tc-blip-crumbs.github.io/toms-recipes/

- `src/recipes.js`, `src/recipes-extra.js`: the recipes
- `src/plans.js`: the meal plans
- `recipe-house-rules.md`: how every recipe is written
- `src/validate.js`: checks every recipe against the house rules
- `src/build.js`: builds the site into `dist/`

Every push to `main` runs the checks, builds the site and publishes it.
