import { NextResponse } from "next/server";
import connectToDB from "@/app/lib/connectToDB";
import Area from "@/app/Models/AreaSchema";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/authOptions";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, icon } = await req.json();

    await connectToDB();

    const area = new Area({
      name,
      icon,
      userId: session.user.id,
    });

    const savedArea = await area.save();

    return NextResponse.json({ area: savedArea });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function GET(req: any) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDB();
    const areas = await Area.find({ userId: session.user.id });
    return NextResponse.json({ areas: areas });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function DELETE(request: any) {
  try {
    const { areaId } = await request.json();

    const areaToDelete = await Area.findOneAndDelete({
      _id: areaId,
    });

    if (!areaToDelete) {
      return NextResponse.json({ message: "area not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Area deleted successfully" });
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}

export async function PUT(request: any) {
  try {
    const areaId = request.nextUrl.searchParams.get("areaId");
    const { name, icon } = await request.json();

    if (!areaId) {
      return NextResponse.json(
        { message: "area ID is required" },
        { status: 400 }
      );
    }

    await connectToDB();

    const updateArea = await Area.findOneAndUpdate(
      { _id: areaId },
      {
        $set: {
          name,
          icon,
        },
      },
      { returnDocument: "after" } 
    );

    console.log(updateArea);

    return NextResponse.json({
      message: "Area has been updated successfully",
      habit: updateArea.value,
    });
  } catch (error) {
    console.error("Error updating area:", error);
    return NextResponse.json(
      { message: "An error occurred while updating the area" },
      { status: 500 }
    );
  }
}
