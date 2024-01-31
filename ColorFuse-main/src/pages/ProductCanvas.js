import React, { useState, useEffect, useCallback } from 'react';
import { fabric } from 'fabric';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import '../styles/productcanvas.css';

function App(props) {
  const [selectedObject, setSelectedObject] = useState(null);
  const [hueRotation, setHueRotation] = useState(0);
  const [saturation, setSaturation] = useState(0);
  const [contrast, setContrast] = useState(0);
  const [canvas, setCanvas] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigation = (check) => {
    if (check === 1) {
      navigate('/dashboard');
    }
    else if (check === 2) {
      navigate('/signup');
    }

  };

  const handleSliderChange = useCallback((event, setValue) => {
    const value = parseFloat(event.target.value);
    setValue(value);
  }, []);

  const convertImageToFileURL = useCallback((imageFile) => {
    return new Promise((resolve, reject) => {
      if (!imageFile) {
        reject(new Error('Image file is undefined or null'));
        return;
      }

      if (!(imageFile instanceof Blob)) {
        reject(new Error('Invalid image file type'));
        return;
      }

      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = (error) => {
        console.error('Error reading file:', error);
        reject(error);
      };

      reader.readAsDataURL(imageFile);
    });
  }, []);

  useEffect(() => {
    const newCanvas = new fabric.Canvas('productCanvas', {
      backgroundColor: '#ecf0f1',
    });

    setCanvas(newCanvas);

    newCanvas.setDimensions({
      width: window.innerWidth * 0.98,
      height: window.innerHeight * 0.75,
    });

    const { frontView, backView, sideView, additionalImages } = props.selectedImages;

    const images = [frontView, backView, sideView, ...additionalImages];

    let separation = 50;
    let leftPosition = 40;
    let scaleToWidth = 300;
    let topPosition = 200;

    const promises = images.map((image, index) => {
      return convertImageToFileURL(image).then((imageUrl) => {
        return new Promise((resolve, reject) => {
          fabric.Image.fromURL(imageUrl, (productImage) => {
            productImage.scaleToWidth(scaleToWidth);
            productImage.set({
              selectable: true,
              evented: true,
              top: topPosition,
              left: leftPosition,
            });

            if (index > 2) {
              scaleToWidth = 70;
              leftPosition += scaleToWidth + separation;
            } else if (index === 2) {
              leftPosition = 40;
              separation = 25;
              topPosition = 75;
            } else {
              leftPosition += scaleToWidth + separation;
            }

            newCanvas.add(productImage);

            resolve();
          });
        });
      }).catch((error) => {
        console.error('Error converting image to URL:', error);
      });
    });

    Promise.all(promises).then(() => {
      newCanvas.renderAll();
    });

    newCanvas.on('mouse:up', (event) => {
      const target = event.target;
      if (target && target.type === 'image') {
        setSelectedObject(target);
      }
    });

    return () => {
      newCanvas.dispose();
    };

  }, [props.selectedImages, convertImageToFileURL]);

  useEffect(() => {
    if (canvas && selectedObject) {
      const hueFilter = new fabric.Image.filters.HueRotation({
        rotation: hueRotation,
      });

      selectedObject.filters = [hueFilter];

      // Apply saturation filter
      const saturationFilter = new fabric.Image.filters.Saturation({
        saturation: saturation,
      });

      selectedObject.filters.push(saturationFilter);

      // Apply contrast filter
      const contrastFilter = new fabric.Image.filters.Contrast({
        contrast: contrast,
      });

      selectedObject.filters.push(contrastFilter);

      selectedObject.applyFilters();
      canvas.renderAll();
    }
  }, [hueRotation, saturation, contrast, canvas, selectedObject]);

  const handleSaveCanvas = () => {
    const canvas = document.getElementById('productCanvas');
    const imageDataUrl = canvas.toDataURL();

    onAuthStateChanged(auth, (user) => {

      dispatch({ type: 'SET_POSTER_DATA', payload: imageDataUrl });

      if (user) {
        localStorage.setItem('UID', user.uid)
        handleNavigation(1)
      } else {
        handleNavigation(2);
      }
    });

  };

  useEffect(() => {
    document.getElementById("save_link").addEventListener('mouseup', handleSaveCanvas);

  }, []);


  return (

    <div className='main-wrapper'>
      <section className='canvas-wrapper'>
        <canvas id="productCanvas" />
      </section>
      <div className='filter-main'>
        <div className='filter-wrapper'>
          <label htmlFor="rotationSlider" className='slider-label'>Color Rotation:</label>
          <div className='slider-container'>
            <input
              type="range"
              id="rotationSlider"
              min="-1"
              max="1"
              step="0.01"
              value={hueRotation}
              onChange={(event) => handleSliderChange(event, setHueRotation)}
            />
            <div className='val-container'>
              <span className='val'>{hueRotation}</span>
            </div>
          </div>
        </div>

        <div className='filter-wrapper'>
          <label htmlFor="saturationSlider" className='slider-label'>Saturation:</label>
          <div className='slider-container'>
            <input
              type="range"
              id="saturationSlider"
              min="-1"
              max="1"
              step="0.01"
              value={saturation}
              onChange={(event) => handleSliderChange(event, setSaturation)}
            />
            <div className='val-container'>
              <span className='val'>{saturation}</span>
            </div>
          </div>
        </div>

        <div className='filter-wrapper'>
          <label htmlFor="contrastSlider" className='slider-label'>Contrast:</label>
          <div className='slider-container'>
            <input
              type="range"
              id="contrastSlider"
              min="-1"
              max="1"
              step="0.01"
              value={contrast}
              onChange={(event) => handleSliderChange(event, setContrast)}
            />
            <div className='val-container'>
              <span className='val'>{contrast}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
