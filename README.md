# Design Studio

A cream-and-yellow, bento-style starter for design work: websites, landing pages, ads, social posts, emails, UI components, icons and a brand kit.
Plain HTML, CSS and JavaScript. No build step, no outside requests.

**Live:** https://amireven-crypto.github.io/design-studio/

## How to open it
- Online: open the live link above.
- On your computer: download the repo (Code → Download ZIP), unzip it, and double-click `index.html`.

## Change the accent colour
Open `assets/style.css` and change this line at the top:

```css
--accent:#F07A1A;
```

You can also pick a colour on the hub page (it is remembered in your browser).

### Colour scheme
| Role | Colour |
|---|---|
| Page background | `#FAF6EC` (cream) |
| Cards | `#FFFDF7` |
| Brand yellow (sidebar, tabs, toggles, highlight fills) | `#D4FF3A`, used only as a fill with dark text on top (never as text on cream) |
| Yellow tint (light surfaces) | `#F6FFD1` |
| Accent orange (buttons, highlights) | `#F07A1A` with dark text `#141414` |
| Orange text on cream | `#A84B00` (passes WCAG AA) |
| Text | `#141414`, muted `#4A4A42` |

The 10 FreshDrop example ads keep their own bold colours.

## What's inside
| Folder | What it is |
|---|---|
| `index.html` | Hub dashboard |
| `websites/` | 3 site templates: landing, small business/service, product shop |
| `landing/` | 3 landing pages: app launch, event, coming-soon/waitlist (visual-only form) |
| `ads/` | Post 1080×1080, story 1080×1920, banner 1200×628, editable, **Export PNG** |
| `ads/freshdrop/` | Ad competition: 10 FreshDrop ads ranked by a measured eye-catch score (`tools/score-ads.js`), (1080×1080), each "Inspired by <site> style", editable + PNG export |
| `social/` | Quote card, carousel slide 1080×1350, announcement, story highlight cover |
| `email/` | 3 table-based, inline-styled newsletters with **Copy HTML** |
| `components/` | Buttons, pills, toggles, inputs, tabs, cards, modal, badges, table, nav with **Copy code** |
| `icons/` | 50 original line icons: search, click to copy SVG, download `sprite.svg` |
| `brand-kit/` | Palette, type scale, buttons, toggles, cards, icons |

PNG export uses the browser's own canvas (`canvas.toBlob`), no libraries.

## Design resources
- [Dribbble](https://dribbble.com) – design shots
- [Behance](https://www.behance.net) – full case studies
- [Mobbin](https://mobbin.com) – real app screens
- [Figma Community](https://www.figma.com/community) – free files and UI kits
- [Awwwards](https://www.awwwards.com) – award-winning websites
- [Land-book](https://land-book.com) – landing pages
- [Godly](https://godly.website) – modern web design
- [Lapa Ninja](https://www.lapa.ninja) – landing pages
- [Coolors](https://coolors.co) – colour palettes
- [Google Fonts](https://fonts.google.com) – free fonts

## Credits
- All code, layouts, icons and placeholder art are original (MIT, see `LICENSE`). No third-party code was copied.
- The "Inspired by … style" labels describe a general design trend only; these sites are not affiliated.
- Fredoka font (SIL Open Font License 1.1), self-hosted in `assets/fonts/` – see `LICENSE-NOTE.txt`.
- FreshDrop product photos belong to FreshDrop (Amir Even).

## FreshDrop video spots
`ads/freshdrop/video/ad-1..10.mp4` — 1080×1080 H.264/AAC motion-graphics spots with Hebrew voiceover (edge-tts), rendered from `tools/spot/spot.html` by `tools/render-spots.js` (headless Chrome frames → ffmpeg). The competition page plays them in ranked order, muted autoplay, sound on first click/tap/key.
