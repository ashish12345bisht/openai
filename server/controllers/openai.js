const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const getImage = async (req, res) => {
    try {
        const { prompt } = req.body;

        const openai = new OpenAIApi(configuration);
        const completion = await openai.createImage({
            prompt,
            n: 2,
            size: "256x256",
        });
        return res.json({ result: completion.data })
    } catch (err) {
        res.status(400).json({ err });
    }
}

const generateStory = async (req, res) => {
    try {
        const { prompt } = req.body;
        const openai = new OpenAIApi(configuration);
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt,
            max_tokens: 2048
        });
        return res.json({ result: completion.data.choices[0].text })
    } catch (err) {
        res.status(400).json({ err });
    }
}

const getChat = async(req, res) => {
    try{
        const { prompt } = req.body;
        const openai = new OpenAIApi(configuration);
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: prompt}]
        });
        return res.json({ result: completion.data.choices[0].message })
        
    }catch (err) {
        res.status(400).json({ err });
    }
}
module.exports = { getImage, generateStory, getChat }