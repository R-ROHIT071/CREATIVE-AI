const fetch = require('node-fetch');
const Replicate = require("replicate");



const replicate = new Replicate({
  auth: process.env.REPLIT_TOKEN,
}); 

const generatePosters = async (req, res) => {
    const { title, location, time } = req.body;
    console.log("Generating Posters");

    const products = [
        'poster background design, ( retro cyber , bright ) , "' + title + location + '" ,a 3D render, new objectivity',
        'poster background design, ( Surreal Dream , bright ) , "' + title +location + '" ,a 3D render, new objectivity',
        'poster background design, ( Abstract Art" , bright ) , "' + title +location + '" a 2D render, new objectivity',
        'poster background design, ( Fantasy , bright ) , "' + title +location + '" ,a 2D render, new objectivity',
        'poster background design, ( Fantasy , bright ) , "' + title +location + '" ,a 3D render, new objectivity',
        'poster background design, ( Ethereal Celestial , bright ) , "' + title +location + '" ,a 2D render, new objectivity'
    ];
    // res.json({ success: true});
    try {
   
        const replicatePromises = products.map(async (product) => {
            const output = await replicate.run(
                "stability-ai/stable-diffusion:ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4",
                {
                    input: {
                        width: 768,
                        height: 768,
                        prompt: product,
                        scheduler: "K_EULER",
                        num_outputs: 2,
                        guidance_scale: 9.0,
                        num_inference_steps: 50
                    }
                }
            );

            return { product, output };
        });

        const results = await Promise.all(replicatePromises);

        res.json({ success: true, results });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = { generatePosters };
