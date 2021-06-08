import { Request, Response } from "express";

import * as mongo from "../database/mongo";

const getNumberOfDays = () => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
};

const shuffle = (arr: any[]) => {
  let j, x, i;
  for (i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = arr[i];
    arr[i] = arr[j];
    arr[j] = x;
  }
  return arr;
};

const allFromMonth = (req: Request, res: Response) => {
  // NOTE: First get all engineers
  const enineers = mongo.client.collection("engineers");
  enineers.find({}).toArray((error, docs) => {
    if (!error && docs) {
      let results: any[] = [];
      let currentDay = 1;
      const totalDays = getNumberOfDays();
      const year = new Date().getFullYear();
      const month = new Date().getMonth();

      while (currentDay < totalDays) {
        shuffle(docs);
        docs.forEach((engineer, index) => {
          if (currentDay <= totalDays) {
            const startHour = index % 2 == 0 ? 8 : 12;
            const endHour = index % 2 == 0 ? 12 : 16;
            let startDate = new Date(year, month, currentDay, startHour);
            let endDate = new Date(year, month, currentDay, endHour);
            if (startDate.getDay() == 6) {
              currentDay += 2;
            }
            if (startDate.getDay() == 0) {
              currentDay++;
            }
            startDate = new Date(year, month, currentDay, startHour);
            endDate = new Date(year, month, currentDay, endHour);
            results.push({ engineer: engineer.name, start: startDate, end: endDate });
            if (index % 2 != 0) {
              currentDay++;
            }
          }
        });
      }
      res.status(200).json({ schedule: results });
    } else {
      res.status(500).json({ status: "error", message: "Something went wrong!" });
    }
  });
};

export { allFromMonth };