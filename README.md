# ansshita kumar · portfolio

A hand-drawn, pop-up-poster portfolio. The cover is a sky-blue chalk poster where "portfolio" writes itself. The pages after it are a cream craft-market collage with stickers, a stamp rally, ticket stubs, project booths and an envelope.

Plain HTML, CSS and JavaScript. There's no build step.

## What's interactive

- **cover:** the lettering draws itself and shimmers like a hand-drawn cartoon. Stars twinkle and drift with your mouse, letters wiggle when you touch them, and clicking anywhere makes a little star burst.
- **about:** a collage page. The small stickers can be dragged anywhere, the raffle ticket gives out fun facts, and the wax seal jumps to the wins.
- **stamp rally:** each win gets stamped onto the card as you scroll in. Tap a stamp to stamp it again.
- **the journey:** experience as ticket stubs, with a ribbon that draws itself (and a star that walks along it) as you scroll.
- **tiny treasures:** the projects. On desktop the page walks sideways past the booths, and the cards tilt toward the cursor.
- **rsvp:** a plaid envelope that opens and slides the letter out.

Smooth scrolling uses [Lenis](https://github.com/darkroomengineering/lenis) (MIT), which is bundled in `js/vendor/`. If someone has "reduce motion" turned on, all the motion switches off.

## Run it locally

Open `index.html` in a browser, or serve the folder:

```bash
npx http-server .   # or: python3 -m http.server
```

## Put it online (GitHub Pages)

1. Merge this branch into `main`.
2. On GitHub, go to **Settings → Pages**. Under *Source* choose **Deploy from a branch**, then pick `main` and `/ (root)`.
3. After a minute the site is live at `https://gurltff.github.io/myportfolio/`.

## Editing

| What | Where |
|---|---|
| All text (about, wins, experience, projects, contact) | `index.html` |
| Colours, fonts, layout | `css/style.css` (colours are the variables at the top) |
| Raffle fun facts | `js/main.js` → `facts` |
| Cover star positions | `js/main.js` → `whiteStars` / `blueStars` |
| GitHub QR code | `assets/qr-github.svg` |

Fonts come from Google Fonts: Mystery Quest, Gaegu, EB Garamond and Fredoka.
