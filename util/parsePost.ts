import { PostType, RedditPostType, ThumbnailType } from '.';

var dayjs = require('dayjs');
var relativeTime = require('dayjs/plugin/relativeTime');

// Parse the Imagen Thumbnail to mach the biggest imagen aviable
const getThumbnail = (images: any[]): ThumbnailType => {
  if (images[0].resolutions[2]) {
    return {
      url: images[0].resolutions[2].url.replace(/\&amp;/g, '&'),
      width: images[0].resolutions[2].width,
      height: images[0].resolutions[2].height,
    };
  } else if (images[0].resolutions[1]) {
    return {
      url: images[0].resolutions[1].url.replace(/\&amp;/g, '&'),
      width: images[0].resolutions[1].width,
      height: images[0].resolutions[1].height,
    };
  } else {
    return {
      url: images[0].resolutions[0].url.replace(/\&amp;/g, '&'),
      width: images[0].resolutions[0].width,
      height: images[0].resolutions[0].height,
    };
  }
};

// Parse the Post recive from Reddit and just pass only the use field.
const parseRedditPostToPost = (item: RedditPostType): PostType => {
  const thumbnail: ThumbnailType = item.data.preview && getThumbnail(item.data.preview.images);
  dayjs.extend(relativeTime);

  dayjs.unix(item.data.created_utc);

  return {
    id: item.data.name,
    title: item.data.title,
    author: `u/${item.data.author}`,
    thumbnail: thumbnail,
    created: `${dayjs().from(dayjs.unix(item.data.created_utc), true)} ago`,
    ups: item.data.ups,
    downs: item.data.downs,
    num_comments: item.data.num_comments,
    full_imagen: item.data.preview
      ? {
          url: item.data.preview.images[0].source.url.replace(/\&amp;/g, '&'),
          width: item.data.preview.images[0].source.width,
          height: item.data.preview.images[0].source.height,
        }
      : undefined,
    videoUrl: item.data.is_video ? item.data.secure_media.reddit_video.fallback_url : undefined,
    is_video: item.data.is_video,
    read: false,
    dismiss: false,
  };
};

export { parseRedditPostToPost };
