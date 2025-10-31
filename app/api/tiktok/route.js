import { NextResponse } from 'next/server';

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const ttdl = async (url) => {
  try {
    if (url.includes("vm.tiktok.com") || url.includes("vt.tiktok.com")) {
      const response = await fetch(url, {
        redirect: "follow",
        follow: 10,
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
        }
      });
      url = response.url;
    }

    const isVideo = url.includes("/video/");
    const isPhoto = url.includes("/photo/");
    if (!isVideo && !isPhoto) throw new Error(`Video or Photo not found`);

    const id = url.substring(
      url.indexOf(isVideo ? "/video/" : "/photo/") + 7,
      url.indexOf(isVideo ? "/video/" : "/photo/") + 26
    ).split("?")[0];
    if (!id) throw new Error(`Video or Photo not found`);

    const apiUrl = `https://api22-normal-c-alisg.tiktokv.com/aweme/v1/feed/?aweme_id=${id}&iid=7318518857994389254&device_id=7437644993508000801&channel=googleplay&app_name=musical_ly&version_code=300904&device_platform=android&device_type=Redmi%20Note%2010&version=9`;

    let attempt = 0;
    let data;
    while (attempt < 10) {
      const response = await fetch(apiUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
        }
      });
      const body = await response.text();

      if (body.includes("ratelimit triggered")) {
        attempt++;
        await delay(5000);
        continue;
      }

      data = JSON.parse(body);
      break;
    }

    if (!data) throw new Error("tiktok api ratelimit");

    const result = {
      success: true,
      music: {
        id: data.aweme_list[0].music.id_str,
        title: data.aweme_list[0].music.title,
        author: data.aweme_list[0].music.author,
        url: data.aweme_list[0].music.play_url.uri,
        duration: data.aweme_list[0].music.duration,
        cover: data.aweme_list[0].music.cover_thumb.url_list[0],
        album: data.aweme_list[0].music.album,
      },
      statistics: data.aweme_list[0].statistics,
      author: {
        id: data.aweme_list[0].author.uid,
        username: data.aweme_list[0].author.unique_id,
        nickname: data.aweme_list[0].author.nickname,
        avatar: data.aweme_list[0].author.avatar_thumb.url_list[0],
        region: data.aweme_list[0].author.region,
      }
    };
    delete result.statistics.aweme_id;

    if (data.aweme_list[0].image_post_info) {
      result.image = {
        id: data.aweme_list[0].aweme_id,
        desc: data.aweme_list[0].desc,
        cover: data.aweme_list[0].video.cover.url_list[0],
        dynamic_cover: data.aweme_list[0].video.dynamic_cover.url_list[0],
        origin_cover: data.aweme_list[0].video.origin_cover.url_list[0],
        image_url: data.aweme_list[0].image_post_info.images.map(i => i.display_image.url_list[0])
      };
    } else {
      result.video = {
        id: data.aweme_list[0].aweme_id,
        desc: data.aweme_list[0].desc,
        cover: data.aweme_list[0].video.cover.url_list[0],
        dynamic_cover: data.aweme_list[0].video.dynamic_cover.url_list[0],
        origin_cover: data.aweme_list[0].video.origin_cover.url_list[0],
        download_url: data.aweme_list[0].video.play_addr.url_list[0],
        download_url_wm: data.aweme_list[0].video.download_addr.url_list[0],
        duration: parseInt(data.aweme_list[0].video.duration / 1000),
        size: data.aweme_list[0].video.play_addr.data_size,
        wm_size: data.aweme_list[0].video.download_addr.data_size
      };
    }

    return result;
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};


export async function POST(request) {
  try {
    const { url } = await request.json();
    if (!url) {
      return NextResponse.json({ success: false, error: 'URL is required' }, { status: 400 });
    }
    const data = await ttdl(url);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
