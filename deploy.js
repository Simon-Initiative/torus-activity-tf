const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs/promises');
require('dotenv').config();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0

function register(torusHost, token) {
    
  // Read image from disk as a Buffer
  const bundle = fs.readFile('./bundle.zip')
  .then(bundle => {
    // Create a form and append image with additional fields
    const form = new FormData();
    form.append('upload', bundle, 'bundle');

    // Send form data with axios
    return axios.post(`${torusHost}/api/v1/registration`, form, {
      headers: {
        ...form.getHeaders(),
        Authorization: `Bearer ${btoa(token)}`,
      },
    });
  });
}

register(process.argv[2], process.env.TORUS_API_KEY);
