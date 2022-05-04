# ServiceWorker for github pages
This is a ServiceWorker template to turn small github pages into offline ready app.

## Why ?
Whenever I make small tools & toys, I create github repo and make a demo page using github pages (like [this one](https://kosamari.github.io/translucent/)).  
Often these "apps" are just an `index.html` file with all the nessesary CSS and JavaScript in it (or maybe 2-3 `html/css/js` files).  I wanted to cache these files so that I can access my tools offline as well.

## Notes
Make sure your github pages have HTTPS enforced, you can check `Settings > GitHub Pages > Enforce HTTPS` of your repository.

Persoanl github pages are all hosted under one root domain (`https://[username].github.io/`).  This caused some stumblings...

- When deleting outdated caches for the app, `caches.keys()` returns all the caches under the domain. We need to filter and delete only caches associated with the app.
- Path for ServiceWorker should be specified in absolute path
- the last '/' in URL is important. See following section "When is SwerviceWorker summoned"

## When is ServiceWorker summoned ?
In this example ServiceWorker is present to every page under `https://{guthub_username}.github.io/{repository}/`, but not `https://{guthub_username}.github.io/{repository}`. Notice any difference? that's right, __the trailing__  `/`

Assuming you have `index.html` at the root of your repository, a visitor may access `/{repository}` or `/{repository}/` to get same `index.html`. This is bad practice in general and one should redirect to the other (or that's what [Jake said](https://twitter.com/jaffathecake/status/800966521015205888)), but most importantly when a visitor is seeing `index.html` from  `/{repository}` (no '/' at the end), ServiceWorker __will not__ be present on the page. 

Just in case your server doesn't handle trailing `/`, I have `<link rel="canonical" href="https://{guthub_username}.github.io/{repository}/" />` in my index.html header *1.

*1 I mean ... I don't know why I had `link rel="canonical"` in my code. I do remember having issue with trailing `/` thought ! So it's the only reason I can think of me wanting to use unfamiliar thing like canonical ¯\_(ツ)_/¯