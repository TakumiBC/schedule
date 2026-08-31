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
      subject: "AP Physics 1",
      startTime: "8:30",
      endTime: "9:10",
      teacher: "Yuqian Jia",
      location: "R209B",
    },
    {
      subject: "H Language Arts",
      startTime: "9:25",
      endTime: "10:05",
      teacher: "Yuting Xiao",
      location: "R403",
    },
    {
      subject: "Civic Education",
      startTime: "10:20",
      endTime: "11:00",
      teacher: "Xiaomi Zhang",
      location: "R406",
    },
    {
      subject: "PE",
      startTime: "11:15",
      endTime: "11:55",
      teacher: "Linxiang Wang",
      location: "Field",
    },
    {
      subject: "AP Calculus BC",
      startTime: "12:40",
      endTime: "13:20",
      teacher: "Hanjue Shen",
      location: "R209B",
    },
    {
      subject: "PE",
      startTime: "13:35",
      endTime: "14:15",
      teacher: "Linxiang Wang",
      location: "Field",
    },
    {
      subject: "AP Macroeconomics",
      startTime: "14:30",
      endTime: "15:10",
      teacher: "Zhiyun Zheng",
      location: "R316",
    },
    {
      subject: "H American Literature",
      startTime: "15:25",
      endTime: "16:05",
      teacher: "Ms. Blain",
      location: "R406",
    },
  ],

  Tuesday: [
    {
      subject: "AP Macroeconomics",
      startTime: "8:30",
      endTime: "9:10",
      teacher: "Zhiyun Zheng",
      location: "R316",
    },
    {
      subject: "H Language Arts",
      startTime: "9:25",
      endTime: "10:05",
      teacher: "Yuting Xiao",
      location: "R403",
    },
    {
      subject: "H American Literature",
      startTime: "10:20",
      endTime: "11:00",
      teacher: "Ms. Blain",
      location: "R406",
    },
    {
      subject: "H American Literature",
      startTime: "11:15",
      endTime: "11:55",
      teacher: "Ms. Blain",
      location: "R406",
    },
    {
      subject: "AP Macroeconomics",
      startTime: "12:40",
      endTime: "13:20",
      teacher: "Zhiyun Zheng",
      location: "R316",
    },
    {
      subject: "AP Physics 1",
      startTime: "13:35",
      endTime: "14:15",
      teacher: "Yuqian Jia",
      location: "R209B",
    },
    {
      subject: "AP Calculus BC",
      startTime: "14:30",
      endTime: "15:10",
      teacher: "Hanjue Shen",
      location: "R209B",
    },
    {
      subject: "Civic Education",
      startTime: "15:25",
      endTime: "16:05",
      teacher: "Xiaomi Zhang",
      location: "R406",
    },
  ],

  Wednesday: [
    {
      subject: "AP Physics 1",
      startTime: "8:30",
      endTime: "9:10",
      teacher: "Yuqian Jia",
      location: "R209B",
    },
    {
      subject: "Optional Finance",
      startTime: "9:25",
      endTime: "10:05",
      teacher: "Peter Li",
      location: "R408",
    },
    {
      subject: "PE",
      startTime: "10:20",
      endTime: "11:00",
      teacher: "Linxiang Wang",
      location: "Field",
    },
    {
      subject: "AP Calculus BC",
      startTime: "11:15",
      endTime: "11:55",
      teacher: "Hanjue Shen",
      location: "R209B",
    },
    {
      subject: "",
      startTime: "12:40",
      endTime: "13:20",
      teacher: "",
      location: "",
    },
    {
      subject: "H Language Arts",
      startTime: "13:35",
      endTime: "14:15",
      teacher: "Yuting Xiao",
      location: "R403",
    },
    {
      subject: "H Chinese Literature",
      startTime: "14:30",
      endTime: "15:10",
      teacher: "Xinyue Fan",
      location: "R406",
    },
    {
      subject: "AP Macroeconomics",
      startTime: "15:25",
      endTime: "16:05",
      teacher: "Zhiyun Zheng",
      location: "R316",
    },
  ],

  Thursday: [
    {
      subject: "AP Calculus BC",
      startTime: "8:30",
      endTime: "9:10",
      teacher: "Hanjue Shen",
      location: "R209B",
    },
    {
      subject: "AP Macroeconomics",
      startTime: "9:25",
      endTime: "10:05",
      teacher: "Zhiyun Zheng",
      location: "R316",
    },
    {
      subject: "H Language Arts",
      startTime: "10:20",
      endTime: "11:00",
      teacher: "Yuting Xiao",
      location: "R403",
    },
    {
      subject: "Linear Algebra",
      startTime: "11:15",
      endTime: "11:55",
      teacher: "Zhihao Wang",
      location: "R419",
    },
    {
      subject: "Geography",
      startTime: "12:40",
      endTime: "13:20",
      teacher: "Xinzhong Zhang",
      location: "R406",
    },
    {
      subject: "AP Physics 1",
      startTime: "13:35",
      endTime: "14:15",
      teacher: "Yuqian Jia",
      location: "R209B",
    },
    {
      subject: "History",
      startTime: "14:30",
      endTime: "15:10",
      teacher: "Heying Zhao",
      location: "R406",
    },
    {
      subject: "H American Literature",
      startTime: "15:25",
      endTime: "16:05",
      teacher: "Ms. Blain",
      location: "R406",
    },
  ],

  Friday: [
    {
      subject: "H Language Arts",
      startTime: "8:30",
      endTime: "9:10",
      teacher: "Yuting Xiao",
      location: "R403",
    },
    {
      subject: "AP Physics 1",
      startTime: "9:25",
      endTime: "10:05",
      teacher: "Yuqian Jia",
      location: "R209B",
    },
    {
      subject: "AP Calculus BC",
      startTime: "10:20",
      endTime: "11:00",
      teacher: "Hanjue Shen",
      location: "R209B",
    },
    {
      subject: "Linear Algebra",
      startTime: "11:15",
      endTime: "11:55",
      teacher: "Zhihao Wang",
      location: "R419",
    },
    {
      subject: "H Chinese Literature",
      startTime: "12:40",
      endTime: "13:20",
      teacher: "Xinyue Fan",
      location: "R406",
    },
    {
      subject: "PE",
      startTime: "13:35",
      endTime: "14:15",
      teacher: "Linxiang Wang",
      location: "Field",
    },
    {
      subject: "H American Literature",
      startTime: "14:30",
      endTime: "15:10",
      teacher: "Ms. Blain",
      location: "R406",
    },
    {
      subject: "Linear Algebra",
      startTime: "15:25",
      endTime: "16:05",
      teacher: "Zhihao Wang",
      location: "R419",
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
