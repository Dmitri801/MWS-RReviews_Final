# Mobile Web Specialist Certification Course

---

# STAGE 3

## **Restaurant Reviews**

- After cloning or downloading project run `npm install`
- Than move into the Server directory and run `npm install`
- Return back to the root directory

## 1. Start server and project

`npm run dev`

---

# Features

### Responsive

- Responsive design lets you view the app on mobile devices as well as laptops/computers/tvs

### Offline Capabable

- Browse all pages that were viewed before while not connected to the internet
- Post new reviews with no internet connection (Chrome browser only)
- Favorite/Unfavorite a restaurant with no internet connection (Chrome browser only)

## Bugs

- Rapid favorite and unfavorite of restaurants can cause keyframe animation on snackbar to be glitchy

- Background sync incompatible on Safari, Firefox, and Microsft Edge at the moment. (1/19)

- Background sync on favorite/unfavorite is buggy if making multiple requests in offline mode, reason I believe is due to the server not responding with a unique id , and access origin does not allow me to send a unique id to the server to referance.

- For Lighthouse Audit dock the Dev Tools window to prevent viewport width failure
