# Bass

Sass toolkit made from elements of Compass, Bourbon, Foundation, Inuit etc and including useful tools for development.

It is intended as a modular, bare-minimum kit that leverages existing libs wherever possible. It takes the opinion that pixel fallbacks and vendor-prefixing have no place in Sass and should be dealt with by a postprocessor.

It targets IE9+ and latest versions of everything else.

## Units

Use `rem(16)` to calculate rem values using pixels. If you need pixel fallback, insert using a postprocessor such as [Node Pixrem](https://github.com/robwierzbowski/node-pixrem).

## Prefixes

There are no mixins to support vendor prefixes. Use the unprefixed version then postprocess with [Autoprefixer](https://github.com/postcss/autoprefixer) to insert required vendor prefixes.