import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth} from '../firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import '../styles/editor.css'



import FilerobotImageEditor, {
  TABS,
  TOOLS,
} from 'react-filerobot-image-editor';


function Editor() {
  const [isImgEditorShown, setIsImgEditorShown] = useState(true);
  const [loadedDesignState, setLoadedDesignState] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const design = [
    "{\"imgSrc\":\"blob:http://localhost:3000/5af86063-32be-4ffc-8aa4-44395b8643e4\",\"finetunes\":[\"Brighten\",\"Blur\",\"HSV\"],\"finetunesProps\":{\"brightness\":0,\"blurRadius\":0,\"hue\":0,\"saturation\":0,\"value\":0,\"warmth\":0},\"filter\":null,\"adjustments\":{\"crop\":{\"ratio\":\"original\",\"ratioTitleKey\":\"original\",\"width\":565.4136,\"height\":565.4136,\"x\":0,\"y\":0},\"isFlippedX\":false,\"isFlippedY\":false,\"rotation\":0},\"annotations\":{\"Text-438804911553\":{\"fill\":\"rgb(255, 0, 0)\",\"stroke\":\"rgb(193, 92, 92)\",\"strokeWidth\":0,\"shadowOffsetX\":-7,\"shadowOffsetY\":13,\"shadowBlur\":12,\"shadowColor\":\"#000000\",\"shadowOpacity\":1,\"opacity\":1,\"text\":\"Math Club\",\"fontFamily\":\"Nabla\",\"fontSize\":70,\"letterSpacing\":0,\"lineHeight\":1,\"align\":\"center\",\"fontStyle\":\"normal\",\"name\":\"Text\",\"x\":65.03448058515716,\"y\":33.69252476909624,\"width\":431.4233081315281,\"height\":170,\"id\":\"Text-438804911553\",\"rotation\":0,\"scaleX\":1,\"scaleY\":1},\"Text-191114871028\":{\"fill\":\"rgb(255, 0, 0)\",\"stroke\":\"rgb(255, 255, 255)\",\"strokeWidth\":1,\"shadowOffsetX\":-7,\"shadowOffsetY\":7,\"shadowBlur\":4,\"shadowColor\":\"#000000\",\"shadowOpacity\":1,\"opacity\":1,\"text\":\"At Empitherter \",\"fontFamily\":\"Rock Salt\",\"fontSize\":35,\"letterSpacing\":0,\"lineHeight\":3,\"align\":\"center\",\"fontStyle\":\"normal\",\"name\":\"Text\",\"id\":\"Text-191114871028\",\"x\":2.162676736961032,\"y\":338.01617730337415,\"width\":390.8411326424739,\"height\":100.40178508018872,\"rotation\":0,\"scaleX\":1,\"scaleY\":1},\"Text-1076420494916\":{\"fill\":\"rgb(255, 0, 157)\",\"stroke\":\"rgb(255, 245, 245)\",\"strokeWidth\":1,\"shadowOffsetX\":-7,\"shadowOffsetY\":7,\"shadowBlur\":6,\"shadowColor\":\"#000000\",\"shadowOpacity\":1,\"opacity\":1,\"text\":\"Starts 9:00 \\nBlack dress code\",\"fontFamily\":\"Rock Salt\",\"fontSize\":30,\"letterSpacing\":0,\"lineHeight\":1,\"align\":\"center\",\"fontStyle\":\"normal\",\"name\":\"Text\",\"x\":212.4645145408566,\"y\":466.66492812843325,\"width\":344.31316384112415,\"height\":78.25360591532024,\"id\":\"Text-1076420494916\"}},\"resize\":{},\"shownImageDimensions\":{\"width\":565.4136067708334,\"height\":565.4136067708334,\"scaledBy\":0.39333300555582873}}",
    "{\"imgSrc\":\"blob:http://localhost:3000/5af86063-32be-4ffc-8aa4-44395b8643e4\",\"finetunes\":[\"Brighten\",\"Blur\",\"HSV\"],\"finetunesProps\":{\"brightness\":0,\"blurRadius\":0,\"hue\":0,\"saturation\":0,\"value\":0,\"warmth\":0},\"filter\":null,\"adjustments\":{\"crop\":{\"ratio\":\"original\",\"ratioTitleKey\":\"original\",\"width\":565.4136,\"height\":565.4136,\"x\":0,\"y\":0},\"isFlippedX\":false,\"isFlippedY\":false,\"rotation\":0},\"annotations\":{\"Text-438804911553\":{\"fill\":\"rgb(255, 0, 0)\",\"stroke\":\"rgb(193, 92, 92)\",\"strokeWidth\":0,\"shadowOffsetX\":-7,\"shadowOffsetY\":3,\"shadowBlur\":4,\"shadowColor\":\"rgb(27, 27, 105)\",\"shadowOpacity\":1,\"opacity\":1,\"text\":\"Math Club\",\"fontFamily\":\"Nabla\",\"fontSize\":70,\"letterSpacing\":0,\"lineHeight\":1,\"align\":\"center\",\"fontStyle\":\"normal\",\"name\":\"Text\",\"x\":65.03448058515716,\"y\":33.69252476909624,\"width\":431.4233081315281,\"height\":170,\"id\":\"Text-438804911553\",\"rotation\":0,\"scaleX\":1,\"scaleY\":1},\"Text-191114871028\":{\"fill\":\"rgb(255, 255, 255)\",\"stroke\":\"rgb(240, 197, 247)\",\"strokeWidth\":1,\"shadowOffsetX\":-7,\"shadowOffsetY\":7,\"shadowBlur\":3,\"shadowColor\":\"rgb(231, 131, 131)\",\"shadowOpacity\":1,\"opacity\":1,\"text\":\"At  Empitherter \",\"fontFamily\":\"Orbitron\",\"fontSize\":35,\"letterSpacing\":0,\"lineHeight\":3,\"align\":\"center\",\"fontStyle\":\"normal\",\"name\":\"Text\",\"id\":\"Text-191114871028\",\"x\":68.91735736548429,\"y\":332.1662332301658,\"width\":420.56711877860914,\"height\":100.40178508018661,\"rotation\":0,\"scaleX\":1,\"scaleY\":1},\"Text-1076420494916\":{\"fill\":\"rgb(255, 0, 0)\",\"stroke\":\"rgb(255, 245, 245)\",\"strokeWidth\":1,\"shadowOffsetX\":-7,\"shadowOffsetY\":7,\"shadowBlur\":6,\"shadowColor\":\"#000000\",\"shadowOpacity\":1,\"opacity\":1,\"text\":\"Starts 9:00 \\nBlack dress code\",\"fontFamily\":\"Permanent Marker\",\"fontSize\":30,\"letterSpacing\":0,\"lineHeight\":1,\"align\":\"center\",\"fontStyle\":\"normal\",\"name\":\"Text\",\"x\":104.03325306407578,\"y\":456.0276176316699,\"width\":344.31316384112415,\"height\":78.25360591532024,\"id\":\"Text-1076420494916\"}},\"resize\":{},\"shownImageDimensions\":{\"width\":565.4136067708334,\"height\":565.4136067708334,\"scaledBy\":0.39333300555582873}}",
    "{\"imgSrc\":\"blob:http://localhost:3000/5af86063-32be-4ffc-8aa4-44395b8643e4\",\"finetunes\":[\"Brighten\",\"Blur\",\"HSV\"],\"finetunesProps\":{\"brightness\":0,\"blurRadius\":0,\"hue\":0,\"saturation\":0,\"value\":0,\"warmth\":0},\"filter\":null,\"adjustments\":{\"crop\":{\"ratio\":\"original\",\"ratioTitleKey\":\"original\",\"width\":565.4136,\"height\":565.4136,\"x\":0,\"y\":0},\"isFlippedX\":false,\"isFlippedY\":false,\"rotation\":0},\"annotations\":{\"Text-438804911553\":{\"fill\":\"rgb(255, 0, 0)\",\"stroke\":\"rgb(193, 92, 92)\",\"strokeWidth\":0,\"shadowOffsetX\":-5,\"shadowOffsetY\":3,\"shadowBlur\":8,\"shadowColor\":\"rgb(136, 205, 139)\",\"shadowOpacity\":1,\"opacity\":1,\"text\":\"Math Club\",\"fontFamily\":\"Nabla\",\"fontSize\":70,\"letterSpacing\":0,\"lineHeight\":1,\"align\":\"center\",\"fontStyle\":\"normal\",\"name\":\"Text\",\"x\":65.03448058515716,\"y\":33.69252476909624,\"width\":431.4233081315281,\"height\":170,\"id\":\"Text-438804911553\",\"rotation\":0,\"scaleX\":1,\"scaleY\":1},\"Text-191114871028\":{\"fill\":\"rgb(255, 255, 255)\",\"stroke\":\"rgb(240, 197, 247)\",\"strokeWidth\":1,\"shadowOffsetX\":-7,\"shadowOffsetY\":7,\"shadowBlur\":3,\"shadowColor\":\"rgb(231, 131, 131)\",\"shadowOpacity\":1,\"opacity\":1,\"text\":\"At  Empitherter \",\"fontFamily\":\"Rubik Marker Hatch\",\"fontSize\":35,\"letterSpacing\":0,\"lineHeight\":3,\"align\":\"center\",\"fontStyle\":\"normal\",\"name\":\"Text\",\"id\":\"Text-191114871028\",\"x\":67.03194512374972,\"y\":335.93946789694235,\"width\":420.56711877860914,\"height\":100.40178508018661,\"rotation\":0,\"scaleX\":1,\"scaleY\":1},\"Text-1076420494916\":{\"fill\":\"rgb(205, 91, 91)\",\"stroke\":\"rgb(255, 255, 255)\",\"strokeWidth\":1,\"shadowOffsetX\":-7,\"shadowOffsetY\":7,\"shadowBlur\":6,\"shadowColor\":\"#000000\",\"shadowOpacity\":1,\"opacity\":0.69,\"text\":\"Starts 9:00 \\nBlack dress code\",\"fontFamily\":\"Rubik Maze\",\"fontSize\":25,\"letterSpacing\":0,\"lineHeight\":1,\"align\":\"center\",\"fontStyle\":\"normal\",\"name\":\"Text\",\"x\":104.03325306407578,\"y\":456.0276176316699,\"width\":344.31316384112415,\"height\":78.25360591532024,\"id\":\"Text-1076420494916\"}},\"resize\":{},\"shownImageDimensions\":{\"width\":565.4136067708334,\"height\":565.4136067708334,\"scaledBy\":0.39333300555582873}}",
    "{\"imgSrc\":\"blob:http://localhost:3000/5af86063-32be-4ffc-8aa4-44395b8643e4\",\"finetunes\":[\"Brighten\",\"Blur\",\"HSV\"],\"finetunesProps\":{\"brightness\":0,\"blurRadius\":0,\"hue\":0,\"saturation\":0,\"value\":0,\"warmth\":0},\"filter\":null,\"adjustments\":{\"crop\":{\"ratio\":\"original\",\"ratioTitleKey\":\"original\",\"width\":565.4136,\"height\":565.4136,\"x\":0,\"y\":0},\"isFlippedX\":false,\"isFlippedY\":false,\"rotation\":0},\"annotations\":{\"Text-438804911553\":{\"fill\":\"rgb(255, 0, 0)\",\"stroke\":\"rgb(193, 92, 92)\",\"strokeWidth\":0,\"shadowOffsetX\":-7,\"shadowOffsetY\":19,\"shadowBlur\":12,\"shadowColor\":\"#000000\",\"shadowOpacity\":1,\"opacity\":1,\"text\":\"Math Club\",\"fontFamily\":\"Bungee Spice\",\"fontSize\":60,\"letterSpacing\":0,\"lineHeight\":1,\"align\":\"center\",\"fontStyle\":\"normal\",\"name\":\"Text\",\"x\":65.03448058515716,\"y\":33.69252476909624,\"width\":431.4233081315281,\"height\":170,\"id\":\"Text-438804911553\",\"rotation\":0,\"scaleX\":1,\"scaleY\":1},\"Text-191114871028\":{\"fill\":\"rgb(255, 0, 0)\",\"stroke\":\"rgb(255, 255, 255)\",\"strokeWidth\":1,\"shadowOffsetX\":-7,\"shadowOffsetY\":7,\"shadowBlur\":4,\"shadowColor\":\"#000000\",\"shadowOpacity\":1,\"opacity\":1,\"text\":\"At  Empitherter \",\"fontFamily\":\"Monoton\",\"fontSize\":35,\"letterSpacing\":0,\"lineHeight\":3,\"align\":\"center\",\"fontStyle\":\"normal\",\"name\":\"Text\",\"id\":\"Text-191114871028\",\"x\":76.45900633242275,\"y\":313.3000598962836,\"width\":420.56711877860914,\"height\":100.40178508018661,\"rotation\":0,\"scaleX\":1,\"scaleY\":1},\"Text-1076420494916\":{\"fill\":\"rgb(255, 0, 0)\",\"stroke\":\"rgb(255, 245, 245)\",\"strokeWidth\":1,\"shadowOffsetX\":-7,\"shadowOffsetY\":7,\"shadowBlur\":6,\"shadowColor\":\"#000000\",\"shadowOpacity\":1,\"opacity\":1,\"text\":\"Starts 9:00 \\nBlack dress code\",\"fontFamily\":\"Roboto Mono\",\"fontSize\":30,\"letterSpacing\":0,\"lineHeight\":1,\"align\":\"center\",\"fontStyle\":\"normal\",\"name\":\"Text\",\"x\":104.03325306407578,\"y\":456.0276176316699,\"width\":344.31316384112415,\"height\":78.25360591532024,\"id\":\"Text-1076420494916\"}},\"resize\":{},\"shownImageDimensions\":{\"width\":565.4136067708334,\"height\":565.4136067708334,\"scaledBy\":0.39333300555582873}}",
    "{\"imgSrc\":\"blob:http://localhost:3000/5af86063-32be-4ffc-8aa4-44395b8643e4\",\"finetunes\":[\"Brighten\",\"Blur\",\"HSV\"],\"finetunesProps\":{\"brightness\":0,\"blurRadius\":0,\"hue\":0,\"saturation\":0,\"value\":0,\"warmth\":0},\"filter\":null,\"adjustments\":{\"crop\":{\"ratio\":\"original\",\"ratioTitleKey\":\"original\",\"width\":565.4136,\"height\":565.4136,\"x\":0,\"y\":0},\"isFlippedX\":false,\"isFlippedY\":false,\"rotation\":0},\"annotations\":{\"Text-438804911553\":{\"fill\":\"rgb(255, 0, 0)\",\"stroke\":\"rgb(193, 92, 92)\",\"strokeWidth\":0,\"shadowOffsetX\":-7,\"shadowOffsetY\":3,\"shadowBlur\":4,\"shadowColor\":\"rgb(255, 255, 255)\",\"shadowOpacity\":1,\"opacity\":1,\"text\":\"Math Club\",\"fontFamily\":\"Bungee Spice\",\"fontSize\":60,\"letterSpacing\":0,\"lineHeight\":1,\"align\":\"center\",\"fontStyle\":\"normal\",\"name\":\"Text\",\"x\":65.03448058515716,\"y\":33.69252476909624,\"width\":431.4233081315281,\"height\":170,\"id\":\"Text-438804911553\",\"rotation\":0,\"scaleX\":1,\"scaleY\":1},\"Text-191114871028\":{\"fill\":\"rgb(255, 255, 255)\",\"stroke\":\"rgb(240, 197, 247)\",\"strokeWidth\":1,\"shadowOffsetX\":-7,\"shadowOffsetY\":7,\"shadowBlur\":3,\"shadowColor\":\"rgb(231, 131, 131)\",\"shadowOpacity\":1,\"opacity\":1,\"text\":\"At  Empitherter \",\"fontFamily\":\"Monoton\",\"fontSize\":35,\"letterSpacing\":0,\"lineHeight\":3,\"align\":\"center\",\"fontStyle\":\"normal\",\"name\":\"Text\",\"id\":\"Text-191114871028\",\"x\":68.91735736548429,\"y\":332.1662332301658,\"width\":420.56711877860914,\"height\":100.40178508018661,\"rotation\":0,\"scaleX\":1,\"scaleY\":1},\"Text-1076420494916\":{\"fill\":\"rgb(255, 0, 0)\",\"stroke\":\"rgb(255, 245, 245)\",\"strokeWidth\":1,\"shadowOffsetX\":-7,\"shadowOffsetY\":7,\"shadowBlur\":6,\"shadowColor\":\"#000000\",\"shadowOpacity\":1,\"opacity\":1,\"text\":\"Starts 9:00 \\nBlack dress code\",\"fontFamily\":\"Permanent Marker\",\"fontSize\":30,\"letterSpacing\":0,\"lineHeight\":1,\"align\":\"center\",\"fontStyle\":\"normal\",\"name\":\"Text\",\"x\":104.03325306407578,\"y\":456.0276176316699,\"width\":344.31316384112415,\"height\":78.25360591532024,\"id\":\"Text-1076420494916\"}},\"resize\":{},\"shownImageDimensions\":{\"width\":565.4136067708334,\"height\":565.4136067708334,\"scaledBy\":0.39333300555582873}}",

  ]

  const imageBase = useSelector((state) => state.imageBase64)



  useEffect(() => {

    let currentIndex = localStorage.getItem('currentIndex') || 0;
    const parsedData = JSON.parse(design[currentIndex])
    console.log(currentIndex)

    if (currentIndex == 4) {
      currentIndex= 0
    } else {
      currentIndex++
    }
    localStorage.setItem('currentIndex', currentIndex)
    
   

    const Title = localStorage.getItem('title');
    const Time = localStorage.getItem('time') || "Text main";

    parsedData.imgSrc = imageBase;
    parsedData.annotations['Text-438804911553'].text = Title;
    parsedData.annotations['Text-191114871028'].text = Time;
    parsedData.annotations['Text-1076420494916'].text =  "Any other text";

    setIsLoading(false);

    if (parsedData) {
      setLoadedDesignState(parsedData)
    }
  },[]);


  const closeImgEditor = () => {
    setIsImgEditorShown(false);
    navigate('/')
  };

  const handleNavigation = (check) => {
    if(check ===1){
      navigate('/dashboard');
    }
    else if(check ===2){
      navigate('/signup');
    }

  };

  function SaveCan(imageData, designState) {

    dispatch({ type: 'SET_IMAGE_DATA', payload: imageData });
    onAuthStateChanged(auth, (user) => {
      if (user) {
        localStorage.setItem('UID',user.uid)
        handleNavigation(1);
      } else {
        handleNavigation(2);

      }
    });
  }

  return (
    <div style={{ width: '100%', height: '95vh' }}>
      {!isLoading && isImgEditorShown && loadedDesignState && (
        <FilerobotImageEditor
          loadableDesignState={loadedDesignState}
          // source="https://scaleflex.airstore.io/demo/stephen-walker-unsplash.jpg"
          source={imageBase}
          onSave={(imageData, designState) =>
          (
            SaveCan(imageData, designState)
          )
          }

          onClose={closeImgEditor}
          annotationsCommon={{
            fill: '#ff0000',
          }}

          Text={
            {
              text: 'Editor...',
              fontFamily: 'Arial',
              fontSize: 70,
              fonts: [
                { label: 'Arial', value: 'Arial' },
                'Sans-serif',
                { label: 'Comic Sans', value: 'Comic-sans' },
                { label: 'Tangerine', value: 'Tangerine' },
                { label: 'Orbitron', value: 'Orbitron' },
                { label: 'Zeyada', value: 'Zeyada' },
                { label: 'Monoton', value: 'Monoton' },
                { label: 'Rock Salt', value: 'Rock Salt' },
                { label: 'Agbalumo', value: 'Agbalumo' },
                { label: 'Moirai One', value: 'Moirai One' },
                { label: 'Castoro Titling', value: 'Castoro Titling' },
                { label: 'Tilt Prism', value: 'Tilt Prism' },
                { label: 'Rubik Marker Hatch', value: 'Rubik Marker Hatch' },
                { label: 'Rubik Maze', value: 'Rubik Maze' },
                { label: 'Rubik Burned', value: 'Rubik Burned' },
                { label: 'Roboto Mono', value: 'Roboto Mono' },
                { label: 'Nunito Sans', value: 'Nunito Sans' },
                { label: 'Permanent Marker', value: 'Permanent Marker' },
                { label: 'Satisfy', value: 'Satisfy' },
                { label: 'Cinzel', value: 'Cinzel' },
                { label: 'Lobster Two', value: 'Lobster Two' },
                { label: 'Amiri', value: 'Amiri' },
                { label: 'Nabla', value: 'Nabla' },
                { label: 'Blaka Ink', value: 'Blaka Ink' },
                { label: 'Bungee Spice', value: 'Bungee Spice' },
              ],
              align: 'center',
              onFontChange: (selectedFontValue, reRenderCanvasFn) => {
                reRenderCanvasFn();
              },


            }}
          Rotate={{ angle: 90, componentType: 'slider' }}
          Crop={{
            presetsItems: [
              {
                titleKey: 'classicTv',
                descriptionKey: '4:3',
                ratio: 4 / 3,

              },
              {
                titleKey: 'cinemascope',
                descriptionKey: '21:9',
                ratio: 21 / 9,

              },
            ],
            presetsFolders: [
              {
                titleKey: 'socialMedia',
                groups: [
                  {
                    titleKey: 'facebook',
                    items: [
                      {
                        titleKey: 'profile',
                        width: 180,
                        height: 180,
                        descriptionKey: 'fbProfileSize',
                      },
                      {
                        titleKey: 'coverPhoto',
                        width: 820,
                        height: 312,
                        descriptionKey: 'fbCoverPhotoSize',
                      },
                    ],
                  },
                ],
              },
            ],
          }}
          tabsIds={[TABS.ADJUST, TABS.ANNOTATE, TABS.WATERMARK, TABS.FINETUNE, TABS.FILTERS]}
          defaultTabId={TABS.ANNOTATE}
          defaultToolId={TOOLS.PEN}
        />
      )}
    </div>
  );
  
}

export default Editor;
