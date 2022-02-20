# NES Mapper Picker

This is a pretty simple vue app meant to allow you to pick what mapper best works for you based on
a varied set of parameters. 

There are a few tools out there that already do this, but I've found that they generally have one
of two pitalls - either they do not let you change your mind without going through the whole
selection process again, or they just don't consider the features I want. 

This hopes to be exhaustive, and also present the data in such a way that it can be
extended with more options or more mappers with minimal knowledge of the inner 
workings of the tool.

## Adding a feature

Features are written in [mapper-options.js](./mapper-options.js). Add an option here first,
then add a value for the `field` you specify to each mapper in the mapper list in 
[mapper-list.js](./mapper-list.js).

TODO: Document the required options here, and what comparisons are done.

## Adding a mapper

Mappers are written in [mapper-list.js](./mapper-list.js). The have a number of 
fields, which line up to the features defined in [mapper-options.js](./mapper-options.js).

TODO: Document required fields, or at least explain how to get them better.

## License

This is release under the MIT license. I'm open to PRs, or feel free to split this off
to do whatever you like with it. Cheers.