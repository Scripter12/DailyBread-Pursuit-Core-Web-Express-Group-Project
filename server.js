const express = require('express');
const app = express();
const port = 3000


const userRouter = require('./Routes/users');
const albumRouter = require('./Routes/albums');
const likesRouter = require('./Routes/likes');
const pictureRouter = require('./Routes/pictures');
const postRouter = require('./Routes/posts');
const commentsRouter = require('./Routes/comments');
const cors = require('cors')


app.use(cors())

app.use(express.json())

app.use(express.urlencoded({
    extended: false
}))

app.use('/users', userRouter);
app.use('/albums', albumRouter);
app.use('/likes', likesRouter);
app.use('/pictures', pictureRouter);
app.use('/posts', postRouter);
app.use('/comments', commentsRouter);

app.listen(port, () => {
    console.log(`Listening on port ${port}!`)
});