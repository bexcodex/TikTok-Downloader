import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const fileUrl = searchParams.get('url');
  const fileName = searchParams.get('fileName');
  const fileType = searchParams.get('type'); // 'video' or 'music'

  if (!fileUrl) {
    return new NextResponse('Missing file URL', { status: 400 });
  }

  try {
    const response = await fetch(fileUrl);
    const blob = await response.blob();
    
    let extension = 'mp4'; // default to video
    if (fileType === 'music') {
        extension = 'mp3';
    }

    const finalFileName = fileName ? `${fileName}.${extension}` : `download.${extension}`;

    return new NextResponse(blob, {
      status: 200,
      headers: {
        'Content-Disposition': `attachment; filename="${finalFileName}"`,
        'Content-Type': response.headers.get('Content-Type') || 'application/octet-stream',
      },
    });
  } catch (error) {
    return new NextResponse('Failed to download file', { status: 500 });
  }
}
