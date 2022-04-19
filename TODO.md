* Handle redirects
  - actions and pages
* Add req.allow
* Add req.validate
* Add option autoType to set content type automatically?
* Add lang option

### Pass routes

If routes are defined, adds the matching route to req.route
Remove req.file?

From waveorb:
  - actions are post#hello
  - pages are get#hello

Read from disk, then merge app.config.routes into it
(remove routemap, keep it flat)

In `app.config.routes.yml`:

get#hello/_about: no@nisse
get#project/list: no@project/list
get#project/_project_id/edit: en@project/edit
post#project/create: project/edit

Only `get` should have _ (underscore) urls and language no@, en@

- `get` maps to pages
- `post` maps to actions

In Waveorb, on init, convert routes to:

get#hello/_about: no@pages/nisse
post#project/create: actions/project/edit

Add default lang if missing:
get#hello/_about: nisse > get#hello/_about: en@nisse

* Create a lib (extract pager from Waveorb), use it in Furu to return req.route
