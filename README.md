# Gasch

Online integrated environment to take, read and organize class notes.

Belthasar, known in Japan as *Gasch* (ガッシュ Gasshu), also known as the Guru of Reason, is a character that appears in both Chrono Trigger and Chrono Cross. (cited from Chronopedia)

## Planned features

- Substance editor
- Custom document model
- Tree-based (filesystem-like) document persistence
- Picture placeholders
- Multi-user, authentication and real-time collaboration

## Project organization

### Directory structure

`/server` contains the server code which is run when launching the app.
`/client` contains the client code. Some of it (stylesheets and scripts) are
compiled to `/static` before launching the server.
`/static` can contain other static assets.

### Technologies

Javascript is used for client and server code (with NodeJS).
Client code may contain some ECMAScript 6 code, which will be compiled with
BabelJS.
Stylesheets are written in SCSS.
HTML templates are written in Jade.
