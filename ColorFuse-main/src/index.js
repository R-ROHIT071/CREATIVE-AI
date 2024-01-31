import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import Dashboard from './pages/Dashboard';
import Editor from './pages/Editor';
import Home from './pages/Home';
import Poster from './pages/Poster';
import Selection from './pages/Selection';
import Signup from './pages/SignUp';
import store from './store';





import fs from "fs";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "poster",
    element: <Poster />,
  },

  {
    path: "postercanvas",
    element: <Editor />,
  },
  {
    path: "product",
    element: <Selection />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "dashboard",
    element: <Dashboard />,
  },

]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

export const textToImage = async () => {
  const path =
    "https://api.stability.ai/v1/generation/stable-diffusion-v1-6/text-to-image";

  const headers = {
    Accept: "application/json",
    Authorization: "Bearer YOUR_API_KEY"
  };

  const body = {
    steps: 40,
	width: 512,
	height: 512,
	seed: 0,
	cfg_scale: 5,
	samples: 1,
	style_preset: "enhance",
	text_prompts: [
	  {
	    "text": "A painting of a cat",
	    "weight": 1
	  },
	  {
	    "text": "blurry, bad",
	    "weight": -1
	  }
	],
  };

  const response = fetch(
    path,
    {
      headers,
      method: "POST",
      body: JSON.stringify(body),
    }
  );
  
  if (!response.ok) {
    throw new Error(`Non-200 response: ${await response.text()}`)
  }
  
  const responseJSON = await response.json();
  
  responseJSON.artifacts.forEach((image, index) => {
    fs.writeFileSync(
      `./out/txt2img_${image.seed}.png`,
      Buffer.from(image.base64, 'base64')
    )
  })
};