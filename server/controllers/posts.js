import PostMessage from "../models/postMessage.js"

export const getPosts = async (req, res) => {
    try {
        const postMessage = await PostMessage.find()
        res.status(200).json(postMessage)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

export const createPost = async (req, res) => {
    const post = req.body
    const newPost = new PostMessage(post)

    try {
        await newPost.save()
        res.status(200).json(newPost)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}


export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}
