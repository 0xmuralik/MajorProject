import PostMessage from '../models/postMessages.js'

export const getPosts= async (req,res)=>{
    try {
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages)
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}

export const createPost=async (req,res)=>{
    const post = req.body;

    const newPost = new PostMessage(post);
    try {
        await newPost.save()
        res.status(201).json(newPost)
    } catch (error) {
        res.status(409).json({message:error.message});
    }
}

export const updatePost= async (req,res)=>{
    const{id:_id} =req.params;
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

    
    const updatePost = await PostMessage.findByIdAndUpdate(_id,{...post,_id},{new:true});

    res.json(updatePost);
}

export const deletePost= async (req,res)=>{
    const{id:_id} =req.params;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

    await PostMessage.findByIdAndRemove(_id);

    res.json({message: 'Post deleted successfully'});
}

export const likePost= async (req,res)=>{
    const{id:_id} =req.params;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

    const post = await PostMessage.findById(_id);
    const updatedPost = await PostMessage.findByIdAndUpdate(_id,{likeCount: post.likeCount+1},{new:true});

    res.json(updatedPost);
}

export const savePost= async (req,res)=>{
    const{id:_id} =req.params;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

    const post = await PostMessage.findById(_id);
    const updatedPost = await PostMessage.findByIdAndUpdate(_id,{saveCount: post.saveCount+1},{new:true});

    res.json(updatedPost);
}

export const viewPost= async (req,res)=>{
    const{id:_id} =req.params;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

    const post = await PostMessage.findById(_id);
    const updatedPost = await PostMessage.findByIdAndUpdate(_id,{viewCount: post.viewCount+1},{new:true});

    res.json(updatedPost);
}