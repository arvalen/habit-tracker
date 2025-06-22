import { NextResponse } from "next/server";
import connectToDB from "@/app/lib/connectToDB";
import HabitsCollection from "@/app/Models/HabitSchema";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/authOptions";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {
      name,
      icon,
      frequency,
      notificationTime,
      isNotificationOn,
      areas,
      completedDays,
    } = await req.json();

    await connectToDB();

    const habit = new HabitsCollection({
      name,
      icon,
      userId: session.user.id,
      frequency,
      notificationTime,
      isNotificationOn,
      areas,
      completedDays,
    });

    const savedHabit = await habit.save();

    return NextResponse.json({ habit: savedHabit });
  } catch (error) {
    console.log(error);

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
    const habits = await HabitsCollection.find({ userId: session.user.id });
    return NextResponse.json({ habits: habits });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function DELETE(request: any) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { habitId } = await request.json(); 

    const habitToDelete = await HabitsCollection.findOneAndDelete({
      _id: habitId,
      userId: session.user.id,
    });

    if (!habitToDelete) {
      return NextResponse.json({ message: "habit not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Habit deleted successfully" });
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}

export async function PUT(request: any) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const habitId = request.nextUrl.searchParams.get("habitId");
    const {
      name,
      icon,
      frequency,
      notificationTime,
      isNotificationOn,
      areas,
      completedDays,
    } = await request.json();

    if (!habitId) {
      return NextResponse.json(
        { message: "Habit ID is required" },
        { status: 400 }
      );
    }

    await connectToDB();

    const updatedHabit = await HabitsCollection.findOneAndUpdate(
      { _id: habitId, userId: session.user.id },
      {
        $set: {
          name,
          icon,
          frequency,
          notificationTime,
          isNotificationOn,
          areas,
          completedDays,
        },
      },
      { returnDocument: "after" } 
    );

    console.log(updatedHabit);

    return NextResponse.json({
      message: "Habit has been updated successfully",
      habit: updatedHabit.value,
    });
  } catch (error) {
    console.error("Error updating habit:", error);
    return NextResponse.json(
      { message: "An error occurred while updating the habit" },
      { status: 500 }
    );
  }
}
