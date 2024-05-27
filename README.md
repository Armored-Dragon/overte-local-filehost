# HTTP File Server

Quick and dirty http based file server. This was made to quickly test models in [Overte](https://overte.org).
**This server is intended to only run locally and not on the cloud.**

## How to run

Clone the repository

Run `server.js` in the terminal

```bash
node server.js
```

Expected output:

```bash
Server is running on port 3000
```

## How to use

Drop a model or other file into the `/subdirectory/` folder. Request the file by going to http://localhost:3000/{model name and file extension}

Examples:

- `http://localhost:3000/my_avatar.glb`
- `http://localhost:3000/folder/best_mug_model_of_all_time.fbx`
