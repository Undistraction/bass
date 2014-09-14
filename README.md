# Bass

Sass toolkit made from elements of Compass, Bourbon, Foundation, Inuit etc and including useful tools for development.

It is intended as a modular, bare-minimum kit that leverages existing libs wherever possible. It takes the opinion that pixel fallbacks and vendor-prefixing have no place in Sass and should be dealt with by a postprocessor.

It targets IE9+ and latest versions of everything else.

## Units

Use `rem(16)` to calculate rem values using pixels. If you need pixel fallback, insert using a postprocessor such as [Node Pixrem](https://github.com/robwierzbowski/node-pixrem).

## Prefixes

There are no mixins to support vendor prefixes. Use the unprefixed version then postprocess with [Autoprefixer](https://github.com/postcss/autoprefixer) to insert required vendor prefixes.

## Naming

Bass uses a slightly modified version [SUIT CSS naming conventions](https://github.com/suitcss/suit/blob/master/doc/naming-conventions.md) by Nicholas Gallagher, itself a more readable version of the BEM syntax.

### Components

Components are named in Pascal-case:

```
.ExampleComponent {};
```

Specialisations or Variations are appended with two hyphens and named in camel-case:

```
.ExampleComponent--variation {};
```

Child elements of a component are added using a single hyphen and named in camel-case:

```
.ExampleComponent-childComponent
```

Classes encapsulating state are prefixed with `is-` and named in snake-case:

```
.ExampleComponent.is-active {};
```

Wherever possible, elements and combinations of elements should be composed into a component. Using
the naming conventions above for child components should avoid the need to nest classes. However there are times when nesting is sometimes OK.

- In cases where one component contains another component
- In cases where a child element is very generic (for example `.Icon`) and styling is made easier by the existance of this generic hook.

Even in these cases, deep nesting should be avoided.

### Composed classes vs multiple classes

... TODO ...

