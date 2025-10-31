import { NextResponse } from 'next/server';
import JSZip from 'jszip';

export const runtime = 'edge';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const urlsParam = searchParams.get('urls');

  if (!urlsParam) {
    return new NextResponse('Missing image URLs', { status: 400 });
  }

  try {
    const urls = JSON.parse(urlsParam);
    const zip = new JSZip();

    const imagePromises = urls.map(async (url, index) => {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      zip.file(`image_${index + 1}.jpg`, arrayBuffer);
    });

    await Promise.all(imagePromises);

    const zipContent = await zip.generateAsync({ type: 'blob' });

    return new NextResponse(zipContent, {
      status: 200,
      headers: {
        'Content-Disposition': `attachment; filename="tiktok_images.zip"`,
        'Content-Type': 'application/zip',
      },
    });
  } catch (error) {
    return new NextResponse('Failed to create ZIP file', { status: 500 });
  }
}
