import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "../../../lib/ConnectPrisma";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";

async function handler(req: Request) {
  const session = await getServerSession(options);
  if (req.method == "POST") {
    if (session?.user?.name) {
      const body = await req.json();

      if (
        typeof body.title != "string" ||
        body.title.length < 3 ||
        typeof body.description != "string" ||
        body.description.length < 3 ||
        typeof body.location != "string" ||
        body.location.length < 3 ||
        typeof body.tickets != "string" ||
        body.tickets.length < 0 ||
        !body.eventDate ||
        !body.closingDate
      ) {
        return NextResponse.json(
          { error: "Please provide correct/missing values" },
          { status: 200 }
        );
      }
      try {
        const event = await prisma.event.create({
          data: {
            title: body.title,
            description: body.description,
            location: body.location,
            tickets: parseInt(body.tickets),
            eventDate: new Date(body.eventDate),
            closingDate: new Date(body.closingDate),
            organizerName: session.user.name,
          },
        });
        if (event) {
          return NextResponse.json(
            { message: "Event created successfully" },
            { status: 200 }
          );
        } else {
          return NextResponse.json(
            { error: "Could not create the event" },
            { status: 200 }
          );
        }
      } catch (error) {
        return NextResponse.json(
          { error: "Server Internal Error" },
          { status: 500 }
        );
      }
    } else {
      return NextResponse.json({ error: "Not Authorized" }, { status: 401 });
    }
  } else if (req.method == "DELETE") {
    if (!session?.user?.name) {
      return NextResponse.json({ error: "Not Authorized" }, { status: 401 });
    }

    try {
      const body = await req.json();
      const deletedEvent = await prisma.event.delete({
        where: {
          id: body.id,
        },
      });
      if (!deletedEvent) {
        return NextResponse.json(
          { error: "Internal server error" },
          { status: 500 }
        );
      }
      return NextResponse.json({ message: "Event deleted successfully" });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.log(error)
        return NextResponse.json({ error: error.message }, { status: 400 });
      }
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
  } else {
    const events = await prisma.event.findMany();

    if (events) {
      return NextResponse.json(events);
    }
  }
}

export { handler as GET, handler as POST, handler as DELETE };
