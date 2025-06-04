"use client";

import { useState } from "react";
import { format, addDays, isSaturday, isSunday, nextMonday } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type ClassInfo = {
  subject: string;
  startTime: string;
  endTime: string;
  teacher: string;
  location: string;
};

type Schedule = Record<string, ClassInfo[]>;

const scheduleData: Schedule = {
  Monday: [
    {
      subject: "S+ Chemistry",
      startTime: "8:30",
      endTime: "9:10",
      teacher: "Raincy Pan",
      location: "R320",
    },
    {
      subject: "H Chinese Literature",
      startTime: "9:20",
      endTime: "10:00",
      teacher: "Ailsa Wu",
      location: "R320",
    },
    {
      subject: "Optional",
      startTime: "10:15",
      endTime: "10:55",
      teacher: "",
      location: "",
    },
    {
      subject: "English Literature",
      startTime: "11:05",
      endTime: "11:40",
      teacher: "Luke Harris",
      location: "R320",
    },
    {
      subject: "Civic Education",
      startTime: "12:40",
      endTime: "13:20",
      teacher: "",
      location: "",
    },
    {
      subject: "H Algebra 2",
      startTime: "13:30",
      endTime: "14:10",
      teacher: "Seth Xia",
      location: "R320",
    },
    {
      subject: "H Algebra 2",
      startTime: "14:20",
      endTime: "15:00",
      teacher: "Seth Xia",
      location: "R320",
    },
    {
      subject: "H Physics",
      startTime: "15:10",
      endTime: "15:50",
      teacher: "Lexie Huang",
      location: "R320",
    },
  ],
  Tuesday: [
    {
      subject: "English Language",
      startTime: "8:30",
      endTime: "9:10",
      teacher: "Kim Qin",
      location: "R320",
    },
    {
      subject: "H Physics",
      startTime: "9:20",
      endTime: "10:00",
      teacher: "Lexie Huang",
      location: "R320",
    },
    {
      subject: "H Algebra 2",
      startTime: "10:15",
      endTime: "10:55",
      teacher: "Seth Xia",
      location: "R320",
    },
    {
      subject: "H Chinese Literature",
      startTime: "11:05",
      endTime: "11:40",
      teacher: "Ailsa Wu",
      location: "R320",
    },
    {
      subject: "Civic Education",
      startTime: "12:40",
      endTime: "13:20",
      teacher: "",
      location: "",
    },
    {
      subject: "English Literature",
      startTime: "13:30",
      endTime: "14:10",
      teacher: "Luke Harris",
      location: "R320",
    },
    {
      subject: "PE",
      startTime: "14:20",
      endTime: "15:00",
      teacher: "Zhengdong Ni",
      location: "Field",
    },
    {
      subject: "S+ Chemistry",
      startTime: "15:10",
      endTime: "15:50",
      teacher: "Raincy Pan",
      location: "R320",
    },
  ],
  Wednesday: [
    {
      subject: "H Algebra 2",
      startTime: "8:30",
      endTime: "9:10",
      teacher: "Seth Xia",
      location: "R320",
    },
    {
      subject: "S+ Biology",
      startTime: "9:20",
      endTime: "10:00",
      teacher: "Jane Qiu",
      location: "R320",
    },
    {
      subject: "English Literature",
      startTime: "10:15",
      endTime: "10:55",
      teacher: "Luke Harris",
      location: "R320",
    },
    {
      subject: "English Language",
      startTime: "11:05",
      endTime: "11:40",
      teacher: "Kim Qin",
      location: "R320",
    },
    {
      subject: "H Chinese Literature",
      startTime: "12:40",
      endTime: "13:20",
      teacher: "Ailsa Wu",
      location: "R320",
    },
    {
      subject: "Civic Education",
      startTime: "13:30",
      endTime: "14:10",
      teacher: "",
      location: "",
    },
    {
      subject: "PE",
      startTime: "14:20",
      endTime: "15:00",
      teacher: "Zhengdong Ni",
      location: "R320",
    },
    {
      subject: "S+ Chemistry",
      startTime: "15:10",
      endTime: "15:50",
      teacher: "Raincy Pan",
      location: "R320",
    },
  ],
  Thursday: [
    {
      subject: "Art",
      startTime: "8:30",
      endTime: "9:10",
      teacher: "",
      location: "",
    },
    {
      subject: "English Literature",
      startTime: "9:20",
      endTime: "10:00",
      teacher: "Luke Harris",
      location: "R320",
    },
    {
      subject: "H Physics",
      startTime: "10:15",
      endTime: "10:55",
      teacher: "Lexie Huang",
      location: "R320",
    },
    {
      subject: "H Chinese Literature",
      startTime: "11:05",
      endTime: "11:40",
      teacher: "Ailsa Wu",
      location: "R320",
    },
    {
      subject: "H Algebra 2",
      startTime: "12:40",
      endTime: "13:20",
      teacher: "Seth Xia",
      location: "R320",
    },
    {
      subject: "H Algebra 2",
      startTime: "13:30",
      endTime: "14:10",
      teacher: "Seth Xia",
      location: "R320",
    },
    {
      subject: "S+ Biology",
      startTime: "14:20",
      endTime: "15:00",
      teacher: "Jane Qiu",
      location: "R320",
    },
    {
      subject: "PE",
      startTime: "15:10",
      endTime: "15:50",
      teacher: "Zhengdong Ni",
      location: "Field",
    },
  ],
  Friday: [
    {
      subject: "English Literature",
      startTime: "8:30",
      endTime: "9:10",
      teacher: "Luke Harris",
      location: "R320",
    },
    {
      subject: "H Chinese Literature",
      startTime: "9:20",
      endTime: "10:00",
      teacher: "Ailsa Wu",
      location: "R320",
    },
    {
      subject: "H Physics / S+ Chemistry",
      startTime: "10:15",
      endTime: "10:55",
      teacher: "Lexie Huang / Raincy Pan",
      location: "R320",
    },
    {
      subject: "H Chinese Literature",
      startTime: "11:05",
      endTime: "11:40",
      teacher: "Ailsa Wu",
      location: "R320",
    },
    {
      subject: "Personal Growth",
      startTime: "12:40",
      endTime: "13:20",
      teacher: "Seth Xia",
      location: "R320",
    },
    {
      subject: "H Algebra 2",
      startTime: "13:30",
      endTime: "14:10",
      teacher: "Seth Xia",
      location: "R320",
    },
  ],
};

export default function Home() {
  const [currentDate, setCurrentDate] = useState(() => {
    const today = new Date();
    return isSaturday(today) || isSunday(today) ? nextMonday(today) : today;
  });

  const navigateDay = (direction: "prev" | "next") => {
    let newDate = addDays(currentDate, direction === "prev" ? -1 : 1);
    while (isSaturday(newDate) || isSunday(newDate)) {
      newDate = addDays(newDate, direction === "prev" ? -1 : 1);
    }
    setCurrentDate(newDate);
  };

  const dayName = format(currentDate, "EEEE");
  const schedule = scheduleData[dayName];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-8">
      <div className="w-full max-w-6xl px-8 py-10">
        <h1 className="mb-8 text-center text-3xl font-bold">
          Thomas Wu&apos;s Schedule
        </h1>
        <div className="w-full space-y-6">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigateDay("prev")}
            >
              {" "}
              <ChevronLeft className="h-6 w-6" />{" "}
            </Button>
            <div className="text-center">
              <h2 className="text-2xl font-medium text-foreground">
                {dayName}
              </h2>
              <p className="text-lg text-muted-foreground">
                {format(currentDate, "MMMM d, yyyy")}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigateDay("next")}
            >
              {" "}
              <ChevronRight className="h-6 w-6" />{" "}
            </Button>
          </div>
          <Separator />
        </div>
        <div className="mt-8 w-full space-y-6">
          {schedule?.map((classInfo, index) => (
            <Card key={index} className="w-full border border-border/50">
              <CardContent className="p-8">
                <div className="flex flex-col space-y-2">
                  <h3 className="text-xl font-semibold">{classInfo.subject}</h3>
                  <p className="text-md text-muted-foreground">
                    {classInfo.startTime} - {classInfo.endTime}
                  </p>
                  <div className="text-md flex justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Teacher</p>
                      <p className="font-medium">{classInfo.teacher}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-medium">{classInfo.location}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
