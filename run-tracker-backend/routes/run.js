const Run = require("../models/Run");
const router = require("express").Router();


router.put("/:id/run", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const run = await Run.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Run has been updated");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can update only your run!");
  }
});

router.delete("/:id/run", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await Run.findByIdAndDelete(req.params.id);
      res.status(200).json("Run has been deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can delete only your run!");
  }
}
);

router.get("/:id/run", async (req, res) => {
  try {
    const run = await Run.findById(req.params.id);
    res.status(200).json(run);
  } catch (err) {
    res.status(500).json(err);
  }
}
);

router.post("/:id/run", async (req, res) => {
  const newRun = new Run(req.body);
  try {
    await newRun.save();
    res.status(201).json("Run data saved successfully!");
  } catch (error) {
    res.status(500).json(error);
  }
}   
);

router.get("/:id/allruns", async (req, res) => {
  try {
    const runs = await Run.find({ user: req.params.id });
    res.status(200).json(runs);
  } catch (err) {
    res.status(500).json(err);
  }
}
);


module.exports = router;