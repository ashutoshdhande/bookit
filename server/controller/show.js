/* eslint-disable operator-linebreak */
const { DateTime } = require('luxon');
const Show = require('../model/Show');

/* eslint-disable camelcase */
exports.addShow = async (req, res) => {
  try {
    // Grab fields
    // eslint-disable-next-line object-curly-newline
    const { showDate, startTime, screen, tmdb_id, price } = req.body;

    // Checking if fields exist
    if (
      !(
        DateTime.fromISO(showDate).isValid &&
        startTime &&
        screen &&
        tmdb_id &&
        price
      )
    ) {
      return res.status(400).json({
        msg: 'All fields are required',
      });
    }

    // Two shows with same start time and screen cannot exist in a cinema
    const showExists = await Show.find({
      showDate,
      startTime,
      screen,
      cinemaId: req.profile.cinemaId,
    });

    if (showExists) {
      return res.status(200).json({
        msg: 'Cannot post!!! as another show exists',
      });
    }

    // Create Show instance
    const show = await Show.create({
      cinemaId: req.profile.cinemaId,
      showDate,
      startTime,
      screen,
      tmdb_id,
      price,
    });

    return res.status(200).json(show);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      msg: 'Something went wrong!!!',
    });
  }
};

exports.updateShow = async (req, res) => {
  const { showDate, startTime, screen, tmdb_id, price } = req.body;

  // Building Show object
  const showFields = {};
  if (showDate) showFields.showDate = showDate;
  if (startTime) showFields.startTime = startTime;
  if (screen) showFields.screen = screen;
  if (price) showFields.price = price;
  if (tmdb_id) showFields.tmdb_id = tmdb_id;

  try {
    const show = await Show.findOneAndUpdate(
      { _id: req.params.id, cinemaId: req.profile.cinemaId },
      { $set: showFields },
      { new: true }
    );

    if (show === null) {
      return res.status(404).json({
        msg: 'Show not found!!!',
      });
    }

    return res.status(200).json({
      msg: 'Updated Successfully',
      show,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      msg: 'Something went wrong!!!',
    });
  }
};
