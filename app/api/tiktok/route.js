export const runtime = 'edge';
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

    const aweme = data.aweme_list?.[0];
    if (!aweme) throw new Error("No data found");

    const result = {
      success: true,
      music: {
        id: aweme.music?.id_str || "",
        title: aweme.music?.title || "",
        author: aweme.music?.author || "",
        url: aweme.music?.play_url?.uri || "",
        duration: aweme.music?.duration || 0,
        cover: aweme.music?.cover_thumb?.url_list?.[0] || "",
        album: aweme.music?.album || "",
      },
      statistics: aweme.statistics || {},
      author: {
        id: aweme.author?.uid || "",
        username: aweme.author?.unique_id || "",
        nickname: aweme.author?.nickname || "",
        avatar: aweme.author?.avatar_thumb?.url_list?.[0] || "",
        region: aweme.author?.region || "",
      }
    };
    delete result.statistics.aweme_id;

    if (aweme.image_post_info) {
      result.image = {
        id: aweme.aweme_id || "",
        desc: aweme.desc || "",
        cover: aweme.video?.cover?.url_list?.[0] || "",
        dynamic_cover: aweme.video?.dynamic_cover?.url_list?.[0] || "",
        origin_cover: aweme.video?.origin_cover?.url_list?.[0] || "",
        image_url: aweme.image_post_info.images?.map(i => i.display_image?.url_list?.[0] || "") || []
      };
    } else {
      result.video = {
        id: aweme.aweme_id || "",
        desc: aweme.desc || "",
        cover: aweme.video?.cover?.url_list?.[0] || "",
        dynamic_cover: aweme.video?.dynamic_cover?.url_list?.[0] || "",
        origin_cover: aweme.video?.origin_cover?.url_list?.[0] || "",
        download_url: aweme.video?.play_addr?.url_list?.[0] || "",
        download_url_wm: aweme.video?.download_addr?.url_list?.[0] || "",
        duration: parseInt(aweme.video?.duration / 1000) || 0,
        size: aweme.video?.play_addr?.data_size || 0,
        wm_size: aweme.video?.download_addr?.data_size || 0
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
