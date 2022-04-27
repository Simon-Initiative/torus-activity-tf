# torus-activity-tf

An example Torus activity, built using the Torus Activity SDK.

## Getting Started

First, clone and build this repository:

```
git clone https://github.com/Simon-Initiative/torus-activity-tf
npm install
npm run build
npm run bundle
```

Next, in the Torus instance that you wish to register this activity with, create
an API key with `Registration Enabled` and `"example"` as the `Registration Namespace`.

Then, create a `.env` file with the API Key set as the value of `TORUS_API_KEY`. See
the `.env-sample` file.

Finally, register the activity by invoking the `deploy.js` script. The only required
command line argument is the Torus server URL.

```
node ./deploy.js https://localhost
```
