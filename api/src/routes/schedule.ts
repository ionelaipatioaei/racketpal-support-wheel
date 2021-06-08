import { Router } from "express";

import * as schedule from "../controllers/schedule";

const router = Router();

router.get("/:month", schedule.allFromMonth);

export default router;