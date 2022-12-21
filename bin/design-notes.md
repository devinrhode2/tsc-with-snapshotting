# Design notes

This package, if based on binaries produced by `deno compile`,
would probably be too big.
If a runtime is going to be included, as is the case with deno, we might as well use dart.
Copilot says: The deno runtime is 20MB, and the dart runtime is 2MB.

What are the most important metrics?

- Size of the binary => install time
- Ease of contribution: tsx or ts-node
- "Cool" factor: deno or dart
- Performance: golang

I do fear that something will end up running as a ci/cd check,
and optimizing for install time, in this situation, would be good.
