# Hope Foundation — Institute Website

Static website for **Hope Foundation** Computer & Skill Training Institute.

## Open locally

1. Open the `hope-foundation` folder.
2. Double-click `index.html`, or right-click → Open with your browser.

For best results (especially if you add more files later), use a simple local server:

```bash
# Python 3
python -m http.server 8080
```

Then visit `http://localhost:8080` in your browser.

## Deploy online (free options)

### Netlify Drop

1. Go to [https://app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag the entire `hope-foundation` folder onto the page.
3. Your site will get a public URL instantly.

### GitHub Pages

1. Create a GitHub repository and upload these files.
2. Go to **Settings → Pages**.
3. Set source to `main` branch, folder `/ (root)`.
4. Save — your site will be live at `https://yourusername.github.io/repo-name/`.

## Customize

| What | Where |
|------|--------|
| Institute address | `index.html` — Contact section |
| Course descriptions | `index.html` — Courses section |
| Colors / fonts | `css/style.css` — `:root` variables |
| Phone / WhatsApp | `index.html` and `js/main.js` (`WHATSAPP_NUMBER`) |
| Logo | `assets/logo.png` |
| Bio video (MP4) | Save as `assets/institution-bio.mp4` |
| Bio video (YouTube) | In `index.html`, set `data-youtube-id="YOUR_VIDEO_ID"` on `#video-player-wrap` |
| **Course intro videos** | Use the filenames in the table below in the `assets/` folder. |

**Course video filenames** (each card plays the matching file):

| Course | File in `assets/` |
|--------|-------------------|
| Python | `course-python.mp4` |
| MS Office | `course-ms-office.mp4` |
| Basic Computer | `course-basic-computer.mp4` |
| Tailoring | `course-tailoring.mp4` |
| Aari Work | `course-aari-work.mp4` |
| Spoken English | `course-spoken-english.mp4` |
| Drawing | `course-drawing.mp4` |
| Tally | `course-tally.mp4` |
| Beautician | `course-beautician.mp4` |
| Mehndi | `course-mehndi.mp4` |

If your file has another name (e.g. `myvideo.mp4`), rename it to match the row for that course, or edit the `src` on the matching `<source>` tag in `index.html`.

## Contact on site

- **Manager:** Rajasekaran  
- **Phone:** [9944500963](tel:+919944500963)  
- **WhatsApp:** Enquiry form opens WhatsApp with a pre-filled message.
