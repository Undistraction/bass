# Bass

Bass is a thin layer of configuration and useful functions for your application.

# Config

It allows configuration of the following four key areas:

1. Rhythm

Most importantly you configure a series of vertical and horizontal rhythms for your project.
The default rhythm will be used if no breakpoint is supplied to the `bass-rythm-value` function.

By storing a set of horizontal and vertical rhythms for each breakpoint, you ensure consistancy throughout the project.

2. Breakpoints

Store a map of breakpoints keyed to their names

3. Type-scale

Store a set of font-sizes keyed to breakpoints

4. Z-index

The z-index map offers a single place to store z-index information about your application modules.
