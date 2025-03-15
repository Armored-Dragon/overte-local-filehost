# Overte Local FileHost

Quick and dirty http based file server. This was made to quickly test models in [Overte](https://overte.org).
**This server is intended to only run locally and not on the cloud.**

## How to run

Clone the repository

Run `node index.js` in the terminal.

```bash
node server.js
```

Expected output:

```bash
[  Info  ] Server is running on port 3001
```

## How to use

Drop a model or other file into the `/public/` folder. Request the file by going to http://localhost:3001/{model name and file extension}. This webserver will automatically forward the request to a unique (enough) url so that Overte will always try and download a new copy.

Examples:

- `http://localhost:3001/my_avatar.glb`
- `http://localhost:3001/folder/best_mug_model_of_all_time.fbx`
