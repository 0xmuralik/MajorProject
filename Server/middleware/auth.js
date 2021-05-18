import jwt, {decode} from 'jsonwebtoken';

const auth = async (req,res,next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedData = jwt.verify(token,'test'); //test is the encryption key use while creating a user
        req.userId = decodedData?._id;

        next();
    } catch (error) {
        console.log(error);
        res.status(404);
    }
}

export default auth;