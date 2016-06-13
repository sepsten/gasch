# Gasch

Online integrated environment to take, read and organize class notes.

Belthasar, known in Japan as *Gasch* (ガッシュ Gasshu), also known as the Guru of Reason, is a character that appears in both Chrono Trigger and Chrono Cross. (cited from Chronopedia)

## Planned features

- Substance editor
- Custom document model
- Tree-based (filesystem-like) document persistence
- Picture placeholders
- Multi-user, authentication and real-time collaboration
- Live recording (while taking notes) with automatic timecode inserts

## Project organization

### Directory structure

`/server` contains the server code which is run when launching the app. `/client` contains the client code. Some of it (stylesheets and scripts) are compiled to `/static` before launching the server. `/static` can contain other static assets. `/shared` contains the shared code between server and client--so to speak the core of the application.

### Technologies

Javascript is used for client and server code (with NodeJS). Client code may contain some ECMAScript 6 code, which will be compiled with BabelJS. Stylesheets are written in SCSS.

## API

The HTTP API lives under `/api/`. All requests (except `GET /api/token`) must pass a valid bearer token.

### Tokens

Gasch's API uses JSON Web Tokens with the following claims:
- `iss`: Issuer. Always has value `gasch`;
- `iat`: Issued At. Numeric date;
- `jti`: A unique ID for the JTW;
- `gasch:user`: A Gasch-specific username.

### Endpoints

#### /api/token

**GET.** Requests a JWT.
**DELETE.** Revokes the supplied JWT.

#### /api/documents

**GET.** Provides a list of all documents.
**POST.** Creates a new document.

#### /api/documents/[id]

**GET.** Fetches a specific document.
**PUT.** Updates a specific document.
**DELETE.** Deletes a specific document.

### /api/assets/

**POST.** Uploads a new asset.

### /api/assets/[id]

**GET.** Returns the raw asset data. Response type won't be JSON.
**HEAD.** Only returns the HTTP headers indicating content type and size.
**DELETE.** Deletes the asset.
