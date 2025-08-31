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
      subject: "History",
      startTime: "8:30",
      endTime: "9:10",
      teacher: "Heying Zhao",
      location: "R415",
    },
    {
      subject: "H English Literature",
      startTime: "9:20",
      endTime: "10:00",
      teacher: "Andersen",
      location: "R414",
    },
    {
      subject: "H English Language Arts",
      startTime: "10:15",
      endTime: "10:55",
      teacher: "Jing Liu",
      location: "R414",
    },
    {
      subject: "H Chinese Literature",
      startTime: "11:05",
      endTime: "11:50",
      teacher: "Yeqing Li",
      location: "R415",
    },
    {
      subject: "AP Computer Science A",
      startTime: "12:40",
      endTime: "13:20",
      teacher: "Wenjie Yu",
      location: "R219",
    },
    {
      subject: "AP Microeconomics",
      startTime: "13:30",
      endTime: "14:10",
      teacher: "Shizhen Li",
      location: "R413",
    },
    {
      subject: "Discrete Mathematics",
      startTime: "14:20",
      endTime: "15:00",
      teacher: "Minglong Yuan",
      location: "R409",
    },
    {
      subject: "AP Precalculus",
      startTime: "15:10",
      endTime: "15:50",
      teacher: "Haohao Xu",
      location: "R420",
    },
  ],
  Tuesday: [
    {
      subject: "AP Computer Science A",
      startTime: "8:30",
      endTime: "9:10",
      teacher: "Wenjie Yu",
      location: "R219",
    },
    {
      subject: "AP Microeconomics",
      startTime: "9:20",
      endTime: "10:00",
      teacher: "Shizhen Li",
      location: "R413",
    },
    {
      subject: "H English Language Arts",
      startTime: "10:15",
      endTime: "10:55",
      teacher: "Jing Liu",
      location: "R414",
    },
    {
      subject: "H English Literature",
      startTime: "11:05",
      endTime: "11:50",
      teacher: "Andersen",
      location: "R414",
    },
    {
      subject: "AP Precalculus",
      startTime: "12:40",
      endTime: "13:20",
      teacher: "Haohao Xu",
      location: "R420",
    },
    {
      subject: "Art",
      startTime: "13:30",
      endTime: "14:10",
      teacher: "Chan Yang",
      location: "Auditorium",
    },
    {
      subject: "PE",
      startTime: "14:20",
      endTime: "15:00",
      teacher: "Hao Huang",
      location: "Field",
    },
    {
      subject: "Optional Vocal Performance",
      startTime: "15:10",
      endTime: "15:50",
      teacher: "Chan Yang",
      location: "R016",
    },
  ],
  Wednesday: [
    {
      subject: "AP Microeconomics",
      startTime: "8:30",
      endTime: "9:10",
      teacher: "Shizhen Li",
      location: "R413",
    },
    {
      subject: "AP Computer Science A",
      startTime: "9:20",
      endTime: "10:00",
      teacher: "Wenjie Yu",
      location: "R219",
    },
    {
      subject: "H Chinese Literature",
      startTime: "10:15",
      endTime: "10:55",
      teacher: "Yeqing Li",
      location: "R415",
    },
    {
      subject: "PE",
      startTime: "11:05",
      endTime: "11:50",
      teacher: "Hao Huang",
      location: "Field",
    },
    {
      subject: "H English Language Arts",
      startTime: "12:40",
      endTime: "13:20",
      teacher: "Jing Liu",
      location: "R414",
    },
    {
      subject: "Optional Vocal Performance",
      startTime: "13:30",
      endTime: "14:10",
      teacher: "Chan Yang",
      location: "R016",
    },
    {
      subject: "AP Precalculus",
      startTime: "14:20",
      endTime: "15:00",
      teacher: "Haohao Xu",
      location: "R420",
    },
    {
      subject: "H English Literature",
      startTime: "15:10",
      endTime: "15:50",
      teacher: "Andersen",
      location: "R414",
    },
  ],
  Thursday: [
    {
      subject: "AP Precalculus",
      startTime: "8:30",
      endTime: "9:10",
      teacher: "Haohao Xu",
      location: "R420",
    },
    {
      subject: "AP Computer Science A",
      startTime: "9:20",
      endTime: "10:00",
      teacher: "Wenjie Yu",
      location: "R219",
    },
    {
      subject: "H English Literature",
      startTime: "10:15",
      endTime: "10:55",
      teacher: "Andersen",
      location: "R414",
    },
    {
      subject: "Geography",
      startTime: "11:05",
      endTime: "11:50",
      teacher: "Xinzhong Zhang",
      location: "R415",
    },
    {
      subject: "AP Microeconomics",
      startTime: "12:40",
      endTime: "13:20",
      teacher: "Shizhen Li",
      location: "R413",
    },
    {
      subject: "Discrete Mathematics",
      startTime: "13:30",
      endTime: "14:10",
      teacher: "Minglong Yuan",
      location: "R409",
    },
    {
      subject: "Personal Growth",
      startTime: "14:20",
      endTime: "15:00",
      teacher: "Xinyue Fan",
      location: "R415",
    },
    {
      subject: "Personal Growth",
      startTime: "15:10",
      endTime: "15:50",
      teacher: "Xinyue Fan",
      location: "R415",
    },
  ],
  Friday: [
    {
      subject: "H Chinese Literature",
      startTime: "8:30",
      endTime: "9:10",
      teacher: "Yeqing Li",
      location: "R415",
    },
    {
      subject: "H English Language Arts",
      startTime: "9:20",
      endTime: "10:00",
      teacher: "Jing Liu",
      location: "R414",
    },
    {
      subject: "H English Language Arts",
      startTime: "10:15",
      endTime: "10:55",
      teacher: "Jing Liu",
      location: "R414",
    },
    {
      subject: "H English Literature",
      startTime: "11:05",
      endTime: "11:50",
      teacher: "Andersen",
      location: "R414",
    },
    {
      subject: "Discrete Mathematics",
      startTime: "12:40",
      endTime: "13:20",
      teacher: "Minglong Yuan",
      location: "R409",
    },
    {
      subject: "AP Microeconomics",
      startTime: "13:30",
      endTime: "14:10",
      teacher: "Shizhen Li",
      location: "R413",
    },
    {
      subject: "AP Computer Science A",
      startTime: "14:20",
      endTime: "15:00",
      teacher: "Wenjie Yu",
      location: "R219",
    },
    {
      subject: "AP Precalculus",
      startTime: "15:10",
      endTime: "15:50",
      teacher: "Haohao Xu",
      location: "R420",
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
