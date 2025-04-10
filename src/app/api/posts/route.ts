import { PostDetail } from "@/app/types/post";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body: PostDetail = await req.json();
    const {
      modelName,
      comments,
      planeFullName,
      planeDetail,
      flightRule,
      price,
      planeCode,
      authorId,
      images,
    } = body;

    const newPost = await prisma.post.create({
      data: {
        modelName,
        comments,
        planeFullName,
        planeDetail,
        flightRule,
        price,
        planeCode,
        authorId,
        images,
      },
    });
    return NextResponse.json(
      { message: "성공적으로 저장되었습니다." },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("이메일 전송 오류:", error);
    if (res.status == 504) {
      NextResponse.json({ message: "이메일 전송 실패" }, { status: 504 });
    }
    return NextResponse.json({ message: "이메일 전송 실패" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const body: Partial<PostDetail> = await req.json();
  const {
    modelName,
    comments,
    planeFullName,
    planeDetail,
    flightRule,
    price,
    planeCode,
    authorId,
    images,
    author,
  } = body;
  const updatedPost = await prisma.post.update({
    where: { id: Number(params.id) },
    data: {
      modelName,
      comments,
      planeFullName,
      planeDetail,
      flightRule,
      price,
      planeCode,
      authorId,
      images,
      author,
    },
  });
  return NextResponse.json(updatedPost);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await prisma.post.delete({
    where: { id: Number(params.id) },
  });

  return NextResponse.json({ message: "Deleted" });
}
