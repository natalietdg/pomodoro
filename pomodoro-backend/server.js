const cors = require('cors');
const express = require('express');
const app = express();
var path = require('path');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ffmpeg = require('fluent-ffmpeg');
const router = express.Router();
require('dotenv/config');
app.use(cors());
app.use(express.json())
 app.use(bodyParser.urlencoded({extended: true}))
// const stream = require('youtube-audio-stream');
 const jsonParser = bodyParser.json();
//routes
app.get('/addyoutubelink', jsonParser, async(req, res) => {
   
     res.json({requestBody: req.body});
     console.log('config', req.body.config.data.link);
    // console.dir(req.body);
    let link = req.body.link;
    console.log('link', link);
    res.setHeader('Content-disposition', 'application/json');
    //   res.send(JSON.stringify(link));
    // const requestURL = stream(link); 
    console.log(link);
    try {
        res.setHeader('Content-disposition', 'attachment; filename=' + title + '.mp3');
        res.set({
            "Content-Type":"audio/mpeg"
        })
        // new ffmpeg({source: video}).toFormat('mp3').writeToStream(res, function(data, err) {
        //     if(err) console.log(err);
        // })
        // ffmpeg().input( youtubedl(link)).toFormat('mp3').pipe(res);
        var stream = youtubedl(link);
        var proc = new ffmpeg({ source: stream });
        proc.setFfmpegPath(ffmpegLocation);
        proc.withAudioCodec('libmp3lame')
            .toFormat('mp3')
            .output(res)
            .run();
        proc.on('end', function() {
            console.log('finished');
        })
        // stream(link).pipe(decoder()).pipe(speaker())
        // res.status(200).send({error: null, data: link});
    }
    catch (err) {
        res.status(500).send(err);
    }
});

// router.get('/test', async (req, res) => {
//     res.send('I AM HERE');
//     console.log('here here');
// });

app.get('/test', async (req, res) => {
    res.send('I AM HERE');
    console.log('here here');
});

//Middlewares
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3001, console.log('Server started on 3001'));