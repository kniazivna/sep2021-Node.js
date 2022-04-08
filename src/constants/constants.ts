export const constants = {
    AUTHORIZATION: 'Authorization',

    EMAIL_REGEXP: /^.+@[^@]+\.[^@]{2,}$/,
    PHONE_REGEXP: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[0-9]*$/,

    PHOTO_MAX_SIZE: 2 * 1024 * 1024,//2мегабайти = 2 байти * 1024 кілобайти * 1024 мегабайти
    VIDEO_MAX_SIZE: 20 * 1024 * 1024,

    PHOTO_MIMETYPE: [
        'image/gif', // .gif
        'image/jpeg', // .jpg, .jpeg
        'image/pjpeg', // .jpeg
        'image/png', // .png
        'image/webp' // .webp
    ],
    VIDEO_MIMETYPE: [
       // 'video/mpeg', //MPEG-1
        'video/mp4', //MP4
        // 'video/ogg', //Ogg Theora чи іню
        // 'video/quicktime', //QuickTime
        // 'video/webm', //WebM
        // 'video/x-ms-wmv', //Windows Media Video
        // 'video/x-flv', //FLV
        'video/x-msvideo', //AVI
        // 'video/3gpp', //.3gpp .3gp
        // 'video/3gpp2' //.3gpp2 .3g2
    ]
};
