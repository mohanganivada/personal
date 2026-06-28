# 📁 How to Add Your Photos

This folder contains all the photo albums for our love story website.

## Folder Structure

```
photos/
├── love-confession/     → Section 1: Love Confession Day (Sep 18, 2025)
├── first-meet-vizag/    → Section 2: First Meet – Vizag Trip (Feb 7-9)
├── fav-pics/            → Section 3: My Favorite Pics of Her
├── second-meet-cafe/    → Section 4: 2nd Meet – Cafe Day
├── third-meet-vizag/    → Section 5: 3rd Meet – Vizag TTD & Beaches
├── fourth-meet-wedding/ → Section 6: 4th Meet – Brother's Wedding
├── video-calls/         → Section 7: Long Distance Video Call Screenshots
└── flowers/             → Section 8: Daily Flower Collection
```

## How to Add Photos (Simple Method)

1. Copy your photos into the right folder
2. **Name them as numbers**: `1.jpg`, `2.jpg`, `3.jpg` ... up to `20.jpg`
3. Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`
4. The website will automatically detect and show them when you click the folder box!

## How to Add Photos (Advanced Method — For More Than 20 Photos)

Create a file called `manifest.json` inside the folder with a list of your filenames:

```json
["photo1.jpg", "my-selfie.jpg", "beach-day.png", "temple-visit.jpg"]
```

The website reads this manifest and loads all the listed photos automatically.

## Example

To add photos to the **Love Confession Day** section:
1. Copy your photos into `photos/love-confession/`
2. Rename them: `1.jpg`, `2.jpg`, `3.jpg`, etc.
3. Open the website, click the "Love Confession Day" folder box → photos appear!

---

*Made with ❤️ for our love story*
