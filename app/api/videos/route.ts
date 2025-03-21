import { authOptions } from "@/lib/auth-opt";
import { connectToDatabase } from "@/lib/db";
import Video, { IVideo } from "@/models/Video";
import { error } from "console";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDatabase();

    const videos = await Video.find({}).sort({ createdAt: -1 }).lean();

    if (!videos || videos.length === 0) {
      return NextResponse.json([], { status: 200 });
    }

    return NextResponse.json(videos);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch videos : ${error}` },
      { status: 200 }
    );
  }
}

export async function POST(res: NextResponse) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const body: IVideo = await res.json();

    if (
      !body.title ||
      !body.description ||
      !body.videoUrl ||
      !body.thumbnailUrl
    ) {
      return NextResponse.json(
        { error: `Missing required fields : ${error}` },
        { status: 400 }
      );
    }

    const videoData = {
        ...body,
        controls: body.controls ?? true,
        transformation: {
            height: 1920,
            width: 1080,
            quality: body.transformation?.quality ?? 100
        }
    }

    const newVideo = await Video.create(videoData);
    return NextResponse.json(newVideo);

  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch videos : ${error}` },
      { status: 200 }
    );
  }
}
